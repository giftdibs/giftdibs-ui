import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AffixHorizontalAlignment } from '../affix/affix-horizontal-alignment';
import { AffixVerticalAlignment } from '../affix/affix-vertical-alignment';
import { OverlayInstance } from '../overlay/overlay-instance';
import { OverlayService } from '../overlay/overlay.service';

import { PopoverMessage } from './popover-message';
import { PopoverMessageType } from './popover-message-type';
import { PopoverComponent } from './popover.component';

@Directive({
  selector: '[gdPopover]',
})
export class PopoverDirective implements OnInit, OnDestroy {
  @Input()
  public gdPopover: TemplateRef<any> | undefined;

  @Input()
  public gdPopoverHorizontalAlignment:
    | `${AffixHorizontalAlignment}`
    | undefined;

  @Input()
  public gdPopoverVerticalAlignment: `${AffixVerticalAlignment}` | undefined;

  @Input()
  public gdPopoverMessageStream = new Subject<PopoverMessage>();

  private ngUnsubscribe = new Subject();

  private overlayInstance: OverlayInstance<PopoverComponent> | undefined;

  constructor(
    private elementRef: ElementRef,
    private overlayService: OverlayService,
  ) {}

  public ngOnInit(): void {
    if (this.gdPopoverMessageStream) {
      this.gdPopoverMessageStream
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((message: PopoverMessage) => {
          this.handleIncomingMessage(message);
        });
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: any): void {
    if (this.overlayInstance) {
      const key = event.key.toLowerCase();

      if (key === 'tab') {
        this.overlayInstance.componentInstance!.focusHostElement();
        event.preventDefault();
      }

      if (key === 'escape') {
        this.overlayInstance.componentInstance!.close();
      }
    }
  }

  @HostListener('click')
  public onClick(): void {
    if (this.overlayInstance) {
      this.overlayInstance.componentInstance!.close();
      return;
    }

    this.overlayInstance = this.overlayService.attach(PopoverComponent, {
      preventBodyScroll: false,
      showBackdrop: true,
    });

    this.overlayInstance.componentInstance!.attach(this.gdPopover!, {
      trigger: this.elementRef,
      affix: {
        horizontalAlignment: this
          .gdPopoverHorizontalAlignment as AffixHorizontalAlignment,
        verticalAlignment: this
          .gdPopoverVerticalAlignment as AffixVerticalAlignment,
      },
    });

    this.overlayInstance.componentInstance!.closed.subscribe(() => {
      this.overlayInstance?.destroy();
    });

    this.overlayInstance.destroyed.subscribe(() => {
      this.overlayInstance = undefined;
    });
  }

  private handleIncomingMessage(message: PopoverMessage): void {
    switch (message.type) {
      case PopoverMessageType.Reposition:
        this.overlayInstance?.componentInstance!.positionPopover();
        break;

      case PopoverMessageType.Close:
        this.overlayInstance?.componentInstance!.close();
        break;
    }
  }
}
