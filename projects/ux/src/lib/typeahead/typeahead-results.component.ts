import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { Subject } from 'rxjs';

import { TypeaheadResultsContext } from './typeahead-results-context';
import { TypeaheadResultsSelectionChange } from './typeahead-results-selection-change';

@Component({
  selector: 'gd-typeahead-results',
  templateUrl: './typeahead-results.component.html',
  styleUrls: ['./typeahead-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeaheadResultsComponent implements OnInit, OnDestroy {
  @ViewChild('resultsElementRef', { read: ElementRef, static: true })
  public resultsElementRef: ElementRef<any> | undefined;

  public searchResultsEmptyMessage: string = '';

  public get activeIndex(): number {
    return this._activeIndex;
  }

  public set activeIndex(value: number) {
    if (value > this.results.length - 1) {
      value = 0;
    }

    if (value < 0) {
      value = this.results.length - 1;
    }

    this._activeIndex = value;
    this.changeDetector.markForCheck();
  }

  public get activeResult(): any {
    return this.results[this.activeIndex];
  }

  public get results(): any[] {
    return this._results;
  }

  public set results(value: any[]) {
    this._results = value || [];
    this.activeIndex = 0;
    this.changeDetector.markForCheck();
  }

  public isVisible = false;

  public templateRef: TemplateRef<any>;

  public selectionChange = new Subject<TypeaheadResultsSelectionChange>();

  private _activeIndex = 0;
  private _results: any[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private context: TypeaheadResultsContext,
  ) {
    this.templateRef = this.context.templateRef;
  }

  public ngOnInit(): void {
    this.results = this.context.results;
    this.searchResultsEmptyMessage = this.context.searchResultsEmptyMessage;
  }

  public ngOnDestroy(): void {
    this.selectionChange.complete();
  }

  public onResultClick(result: any): void {
    if (!result) {
      return;
    }

    const x = this.context.resultSelectedAction.call({}, result);
    this.selectionChange.next({ result, label: x?.resolvedSearchTerms || '' });
  }

  public hideResults(): void {
    this.isVisible = false;
    this.changeDetector.markForCheck();
  }

  public showResults(): void {
    this.isVisible = true;
    this.changeDetector.markForCheck();
  }

  public triggerActiveResultAction(): void {
    this.onResultClick(this.activeResult);
  }

  public focusNextItem(): void {
    this.activeIndex++;
  }

  public focusPreviousItem(): void {
    this.activeIndex--;
  }
}
