import { Injectable } from '@angular/core';

import { OverlayInstance } from '../overlay/overlay-instance';
import { OverlayService } from '../overlay/overlay.service';

import { Alert } from './alert';
import { AlertContext } from './alert-context';
import { AlertType } from './alert-type';
import { AlertComponent } from './alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private currentInstance: OverlayInstance<AlertComponent> | undefined;

  constructor(private overlayService: OverlayService) {}

  public error(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({
      text: message,
      type: AlertType.Danger,
      keepAfterNavigationChange,
    });
  }

  public info(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({
      text: message,
      type: AlertType.Info,
      keepAfterNavigationChange,
    });
  }

  public success(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({
      text: message,
      type: AlertType.Success,
      keepAfterNavigationChange,
    });
  }

  private sendMessage(alert: Alert): void {
    if (this.currentInstance) {
      this.currentInstance.destroy();
    }

    const context = new AlertContext(alert);
    this.currentInstance = this.overlayService.attach(AlertComponent, {
      destroyOnOverlayClick: false,
      keepAfterNavigationChange: alert.keepAfterNavigationChange,
      providers: [
        {
          provide: AlertContext,
          useValue: context,
        },
      ],
    });

    this.currentInstance.componentInstance!.closed.subscribe(() => {
      if (this.currentInstance) {
        this.currentInstance.destroy();
      }
    });
  }
}
