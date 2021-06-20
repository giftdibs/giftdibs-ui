import { Injectable, Type } from '@angular/core';

import { OverlayService } from '../overlay/overlay.service';

import { ModalConfig } from './modal-config';
import { ModalInstance } from './modal-instance';
import { ModalWrapperComponent } from './modal-wrapper.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private overlayService: OverlayService) {}

  public open<T>(component: Type<T>, config: ModalConfig): ModalInstance<T> {
    const settings = Object.assign(
      {},
      {
        providers: [],
      },
      config,
    );

    const overlayInstance = this.overlayService.attach(ModalWrapperComponent, {
      destroyOnOverlayClick: !!settings.clickOverlayToClose,
      preventBodyScroll: true,
      showBackdrop: true,
    });

    const wrapper = overlayInstance.componentInstance!;
    const modalInstance = new ModalInstance<T>(wrapper);

    settings.providers.push({
      provide: ModalInstance,
      useValue: modalInstance,
    });

    const componentRef = wrapper.attach(component, settings);

    wrapper.closed.subscribe(() => {
      overlayInstance.destroy();
    });

    modalInstance.componentInstance = componentRef.instance;

    return modalInstance;
  }
}
