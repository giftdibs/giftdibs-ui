import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  OnDestroy,
  Type,
} from '@angular/core';

import { OverlayConfig } from './overlay-config';
import { OverlayDomAdapterService } from './overlay-dom-adapter.service';
import { OverlayHostComponent } from './overlay-host.component';
import { OverlayInstance } from './overlay-instance';

@Injectable({
  providedIn: 'root',
})
export class OverlayService implements OnDestroy {
  private host: ComponentRef<OverlayHostComponent> | undefined;

  private instances: OverlayInstance<any>[] = [];

  constructor(
    private adapter: OverlayDomAdapterService,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
  ) {}

  public ngOnDestroy(): void {
    this.removeHostComponent();
  }

  public attach<T>(
    component: Type<T>,
    config?: OverlayConfig,
  ): OverlayInstance<T> {
    const defaults: OverlayConfig = {
      destroyOnOverlayClick: true,
      keepAfterNavigationChange: false,
      preventBodyScroll: false,
      showBackdrop: false,
    };

    const settings = Object.assign(defaults, config || {});

    this.ensureHostExists();

    if (settings.preventBodyScroll) {
      this.adapter.restrictBodyScroll();
    }

    const instance = this.host!.instance.attach(component, settings);

    instance.destroyed.subscribe(() => {
      this.instances.splice(this.instances.indexOf(instance), 1);
      if (this.instances.length === 0) {
        this.removeHostComponent();
      }
    });

    this.instances.push(instance);

    return instance;
  }

  private createHostComponent(): ComponentRef<OverlayHostComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(OverlayHostComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0];

    this.appRef.attachView(componentRef.hostView);
    this.adapter.appendToBody(domElem);

    return componentRef;
  }

  private ensureHostExists(): ComponentRef<OverlayHostComponent> {
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    return this.host;
  }

  private removeHostComponent(): void {
    if (this.host) {
      this.adapter.removeHostElement();
      this.appRef.detachView(this.host.hostView);
      this.host.destroy();
      this.host = undefined;
      this.adapter.releaseBodyScroll();
    }
  }
}
