import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AffixConfig } from '../affix/affix-config';
import { AffixHorizontalAlignment } from '../affix/affix-horizontal-alignment';
import { AffixVerticalAlignment } from '../affix/affix-vertical-alignment';
import { AffixService } from '../affix/affix.service';
import { WindowRefService } from '../window/window-ref.service';

import { DropdownMenuContext } from './dropdown-menu-context';
import { DropdownMenuItem } from './dropdown-menu-item';

@Component({
  selector: 'gd-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  public get closed(): Observable<void> {
    return this._closed;
  }

  public itemTemplate: TemplateRef<any> | undefined;

  public isVisible = false;

  public items: any[] = [];

  @ViewChild('defaultItemTemplate', { static: true })
  private defaultItemTemplate: TemplateRef<any> | undefined;

  private get activeIndex(): number {
    return this._activeIndex;
  }

  private set activeIndex(value: number) {
    if (value > this.buttons.length - 1) {
      value = 0;
    }

    if (value < 0) {
      value = this.buttons.length - 1;
    }

    this._activeIndex = value;
  }

  private buttons: any[] = [];

  private ngUnsubscribe = new Subject();

  private _activeIndex = -1;

  private _closed = new Subject<void>();

  private _itemTemplate: TemplateRef<any> | undefined;

  @ViewChild('menuElementRef', { static: true })
  private menuElementRef: ElementRef | undefined;

  constructor(
    private affixService: AffixService,
    private changeDetector: ChangeDetectorRef,
    private context: DropdownMenuContext,
    private elementRef: ElementRef,
    private windowRef: WindowRefService,
  ) {}

  public ngOnInit(): void {
    this.items = this.context.config.items;

    this.itemTemplate =
      this.context.config.itemTemplate || this.defaultItemTemplate!;

    this.addEventListeners();
    this.changeDetector.markForCheck();
  }

  public ngAfterContentInit(): void {
    this.positionMenu();
    this.windowRef.nativeWindow.setTimeout(() => {
      this.buttons = [].slice.call(
        this.elementRef.nativeElement.querySelectorAll('.gd-button'),
      );
      this.menuElementRef!.nativeElement.focus();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this._closed.complete();
  }

  public handleItemAction(item: DropdownMenuItem): void {
    if (item.action) {
      item.action();
    }

    this.close();
  }

  public close(): void {
    this._closed.next();
    this._closed.complete();
    this.context.config.caller.nativeElement.focus();
  }

  private focusActiveButton(): void {
    this.buttons[this.activeIndex].focus();
  }

  private positionMenu(): void {
    const defaultAffixConfig: AffixConfig = {
      horizontalAlignment: AffixHorizontalAlignment.Left,
      verticalAlignment: AffixVerticalAlignment.Bottom,
    };

    this.changeDetector.detectChanges();

    this.affixService.affixTo(
      this.menuElementRef!,
      this.context.config.caller,
      Object.assign({}, defaultAffixConfig, this.context.config.affix),
    );

    this.isVisible = true;
    this.changeDetector.markForCheck();
  }

  private addEventListeners(): void {
    const hostElement = this.elementRef.nativeElement;
    const nativeWindow = this.windowRef.nativeWindow;

    let isLastButtonFocused = false;

    // Close the menu with escape key.
    fromEvent(nativeWindow, 'keyup')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();
        if (key === 'escape') {
          this.close();
        }
      });

    // Navigate the items with arrow keys.
    fromEvent(hostElement, 'keydown')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();

        if (key === 'arrowdown' || key === 'down') {
          this.activeIndex++;
          this.focusActiveButton();
          event.preventDefault();
        }

        if (key === 'arrowup' || key === 'up') {
          this.activeIndex--;
          this.focusActiveButton();
          event.preventDefault();
        }

        // Close the menu if the last item is focused and the tab key is pressed.
        if (key === 'tab' && isLastButtonFocused) {
          this.close();
          event.preventDefault();
          event.stopPropagation();
        }
      });

    // This will check if the focus leaves the document.
    fromEvent(hostElement, 'focusin')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: any) => {
        isLastButtonFocused =
          event.target === this.buttons[this.buttons.length - 1];
      });

    fromEvent(nativeWindow, 'scroll')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.positionMenu();
      });

    fromEvent(nativeWindow, 'resize')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.positionMenu();
      });
  }
}
