import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Subject } from 'rxjs';

import { OverlayConfig } from './overlay-config';
import { OverlayInstance } from './overlay-instance';
import { OverlayComponent } from './overlay.component';

@Component({
  selector: 'gd-overlay-host',
  templateUrl: './overlay-host.component.html',
  styleUrls: ['./overlay-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayHostComponent implements OnDestroy {
  @ViewChild('target', { read: ViewContainerRef, static: true })
  private targetRef: ViewContainerRef | undefined;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
  ) {}

  public attach<T>(
    component: Type<T>,
    config: OverlayConfig,
  ): OverlayInstance<T> {
    const injector = Injector.create({
      providers: [],
      parent: this.injector,
    });

    const factory = this.resolver.resolveComponentFactory(OverlayComponent);
    const componentRef = this.targetRef!.createComponent(
      factory,
      undefined,
      injector,
    );
    const instance = componentRef.instance.attach(component, config);

    componentRef.instance.destroyed.subscribe(() => {
      componentRef.destroy();
    });

    return instance;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
