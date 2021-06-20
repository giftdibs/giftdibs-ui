import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OverlayConfig } from './overlay-config';
import { OverlayInstance } from './overlay-instance';

@Component({
  selector: 'gd-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent implements OnInit, OnDestroy {
  public get destroyed(): Observable<void> {
    return this._destroyed;
  }

  public allowClickThrough = false;
  public showBackdrop = false;

  @ViewChild('target', { read: ViewContainerRef, static: true })
  private targetRef: ViewContainerRef | undefined;

  private destroyOnOverlayClick = true;

  private instance: OverlayInstance<any> | undefined;

  private ngUnsubscribe = new Subject<void>();

  private _destroyed = new Subject<void>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    fromEvent(this.elementRef.nativeElement, 'click')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.destroyOnOverlayClick) {
          this.instance?.destroy();
        }
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this._destroyed.complete();
  }

  public attach<T>(
    component: Type<T>,
    config: OverlayConfig,
  ): OverlayInstance<T> {
    const overlayInstance = new OverlayInstance<T>();

    const defaultProviders: any[] = [];
    config.providers = defaultProviders.concat(
      (config && config.providers) || [],
    );

    const injector = Injector.create({
      providers: config.providers,
      parent: this.injector,
    });

    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = this.targetRef!.createComponent(
      factory,
      undefined,
      injector,
    );

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (config.keepAfterNavigationChange) {
            config.keepAfterNavigationChange = false;
          } else {
            overlayInstance.destroy();
          }
        }
      });

    overlayInstance.componentInstance = componentRef.instance;
    overlayInstance.destroyed.subscribe(() => {
      componentRef.destroy();
      this._destroyed.next();
    });

    this.instance = overlayInstance;
    this.allowClickThrough =
      !config.showBackdrop && !config.destroyOnOverlayClick;
    this.showBackdrop = !!config.showBackdrop;
    this.destroyOnOverlayClick = !!config.destroyOnOverlayClick;
    this.changeDetector.markForCheck();

    return overlayInstance;
  }
}
