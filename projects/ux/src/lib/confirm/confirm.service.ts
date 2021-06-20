import { Injectable } from '@angular/core';

import { OverlayService } from '../overlay/overlay.service';

import { ConfirmAnswer } from './confirm-answer';
import { ConfirmConfig } from './confirm-config';
import { ConfirmContext } from './confirm-context';
import { ConfirmComponent } from './confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private overlayService: OverlayService) {}

  public confirm(
    config: ConfirmConfig,
    callback: (answer: ConfirmAnswer) => void,
  ): void {
    const context = new ConfirmContext(config);

    const overlayInstance = this.overlayService.attach(ConfirmComponent, {
      providers: [
        {
          provide: ConfirmContext,
          useValue: context,
        },
      ],
      showBackdrop: true,
      destroyOnOverlayClick: false,
    });

    context.answered.subscribe((answer: ConfirmAnswer) => {
      callback(answer);
      overlayInstance.destroy();
    });
  }
}
