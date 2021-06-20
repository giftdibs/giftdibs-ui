import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { fromEvent, merge, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';

import { AffixVerticalAlignment } from '../affix/affix-vertical-alignment';
import { AffixService } from '../affix/affix.service';
import { OverlayConfig } from '../overlay/overlay-config';
import { OverlayInstance } from '../overlay/overlay-instance';
import { OverlayService } from '../overlay/overlay.service';

import { TypeaheadDomAdapterService } from './typeahead-dom-adapter.service';
import { TypeaheadResultsContext } from './typeahead-results-context';
import { TypeaheadResultsSelectionChange } from './typeahead-results-selection-change';
import { TypeaheadResultsComponent } from './typeahead-results.component';
import { TypeaheadSearchFunction } from './typeahead-search-function';
import { TypeaheadSearchResultAction } from './typeahead-search-result-action';

const KEYUP_DEBOUNCE_TIME = 400;

@Component({
  selector: 'gd-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TypeaheadDomAdapterService,
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => TypeaheadComponent),
      multi: true,
    },
  ],
})
export class TypeaheadComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor
{
  @Input()
  public ariaDescribedBy: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public searchButtonIcon: string | undefined;

  @Input()
  public searchButtonText = 'Search';

  @Input()
  public searchFunction: TypeaheadSearchFunction<any> | undefined;

  @Input()
  public searchOnKeyUp = true;

  @Input()
  public searchResultsEmptyMessage = 'No results found.';

  @Input()
  public searchResultTemplate: TemplateRef<any> | undefined;

  @Input()
  public searchResultAction: TypeaheadSearchResultAction | undefined;

  @Input()
  public set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  public get value(): any {
    return this._value;
  }

  public isLoading = false;
  public disabled = false;

  @ViewChild('searchInput')
  private searchInput: ElementRef | undefined;

  private _value: string | undefined;

  private hasResults = false;

  private ngUnsubscribe = new Subject();

  private overlayInstance:
    | OverlayInstance<TypeaheadResultsComponent>
    | undefined;

  constructor(
    private affixService: AffixService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private domAdapter: TypeaheadDomAdapterService,
    private overlayService: OverlayService,
  ) {}

  public ngAfterViewInit(): void {
    const input = this.searchInput!.nativeElement;

    fromEvent(input, 'keyup')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(KEYUP_DEBOUNCE_TIME),
        distinctUntilChanged(),
      )
      .subscribe((event: any) => {
        if (this.searchOnKeyUp) {
          const key = event.key.toLowerCase();
          switch (key) {
            case 'tab':
            case 'enter':
            case 'escape':
            case 'arrowup':
            case 'arrowdown':
            case 'up':
            case 'down':
              break;

            default:
              this.search();
              break;
          }
        } else {
          // Update the value on keyup.
          this.value = input.value;
        }
      });

    // Update the value of the input.
    input.value = this._value || '';
  }

  public ngOnDestroy(): void {
    this.removeResults();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onButtonClick(event: any): void {
    event.stopPropagation();
    this.search();
  }

  public onInputEnterKeyUp(event: any): void {
    event.stopPropagation();
    if (!this.hasResults) {
      this.search();
    }
  }

  public writeValue(value: string): void {
    if (value) {
      if (this.searchInput) {
        this.searchInput.nativeElement.value = value;
      }

      this._value = value;
    }
  }

  // Angular automatically constructs these methods.
  public onChange = (_: any) => {};
  public onTouched = () => {};

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  private search(): void {
    const searchText = this.searchInput!.nativeElement.value;
    if (searchText === this.value && this.hasResults) {
      return;
    }

    this.isLoading = true;
    this.disabled = true;
    this.value = searchText;

    this.searchFunction!.call({}, searchText)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.disabled = false;
          this.changeDetector.markForCheck();
        }),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(
        (results: any[]) => {
          if (!results || results.length === 0) {
            // No need to refresh the results if unchanged.
            if (
              this.overlayInstance &&
              this.overlayInstance.componentInstance!.results.length === 0
            ) {
              if (this.hasResults) {
                return;
              }
            }
          }

          if (this.hasResults) {
            this.overlayInstance!.componentInstance!.results = results;
            this.positionResults();
            return;
          }

          this.showResults(results);
        },
        () => {
          // Swallow error for now.
        },
      );
  }

  private showResults(results: any[]): void {
    const resultsContext: TypeaheadResultsContext = {
      results,
      templateRef: this.searchResultTemplate!,
      resultSelectedAction: this.searchResultAction!,
      searchResultsEmptyMessage: this.searchResultsEmptyMessage,
    };

    const overlayConfig: OverlayConfig = {
      providers: [
        {
          provide: TypeaheadResultsContext,
          useValue: resultsContext,
        },
      ],
      destroyOnOverlayClick: true,
    };

    this.overlayInstance = this.overlayService.attach(
      TypeaheadResultsComponent,
      overlayConfig,
    );

    // Set the input value to what is selected in the dropdown.
    this.overlayInstance.componentInstance!.selectionChange.subscribe(
      (change: TypeaheadResultsSelectionChange) => {
        if (change.label !== undefined) {
          this.searchInput!.nativeElement.value = change.label;
        }

        if (this.overlayInstance) {
          this.overlayInstance.destroy();
        }
      },
    );

    this.hasResults = true;
    this.overlayInstance.destroyed.subscribe(() => {
      this.hasResults = false;
      this.changeDetector.markForCheck();
    });

    this.positionResults();
    this.changeDetector.detectChanges();
    this.addEventListeners();
    this.changeDetector.markForCheck();
  }

  private removeResults(): void {
    this.hasResults = false;
    if (this.overlayInstance) {
      this.overlayInstance.destroy();
    }

    this.changeDetector.markForCheck();
  }

  private positionResults(): void {
    const componentInstance = this.overlayInstance!.componentInstance!;

    componentInstance.hideResults();
    const resultsRef = componentInstance.resultsElementRef;

    setTimeout(() => {
      this.affixService.affixTo(resultsRef!, this.searchInput!, {
        verticalAlignment: AffixVerticalAlignment.Bottom,
      });

      this.domAdapter.matchWidth(resultsRef!, this.elementRef);

      componentInstance.showResults();
    });
  }

  private addEventListeners(): void {
    const resultsComponent = this.overlayInstance?.componentInstance;

    merge(
      fromEvent(window, 'scroll').pipe(takeWhile(() => this.hasResults)),
      fromEvent(window, 'resize').pipe(takeWhile(() => this.hasResults)),
    ).subscribe(() => {
      this.positionResults();
    });

    fromEvent(this.searchInput!.nativeElement, 'keyup')
      .pipe(takeWhile(() => this.hasResults))
      .subscribe((event: any) => {
        const key = event.key.toLocaleUpperCase();

        if (key === 'ARROWDOWN' || key === 'DOWN') {
          resultsComponent!.focusNextItem();
        }

        if (key === 'ARROWUP' || key === 'UP') {
          resultsComponent!.focusPreviousItem();
        }

        if (key === 'TAB' || key === 'ESCAPE') {
          this.searchInput!.nativeElement.value = '';
          this.removeResults();
        }

        if (key === 'ENTER') {
          resultsComponent!.triggerActiveResultAction();
          event.stopPropagation();
        }
      });

    fromEvent(resultsComponent!.resultsElementRef!.nativeElement, 'click')
      .pipe(takeWhile(() => this.hasResults))
      .subscribe((event: any) => {
        event.stopPropagation();
      });
  }
}
