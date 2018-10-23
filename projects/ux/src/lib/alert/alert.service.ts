import {
  Injectable
} from '@angular/core';

import {
  OverlayInstance
} from '../overlay/overlay-instance';

import {
  OverlayService
} from '../overlay/overlay.service';

import { Alert } from './alert';
import { AlertContext } from './alert-context';
import { AlertComponent } from './alert.component';

@Injectable()
export class AlertService {
  private currentInstance: OverlayInstance<AlertComponent>;

  constructor(
    private overlayService: OverlayService
  ) { }

  public error(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({ text: message, type: 'danger', keepAfterNavigationChange });
  }

  public info(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({ text: message, type: 'info', keepAfterNavigationChange });
  }

  public success(message: string, keepAfterNavigationChange = false): void {
    this.sendMessage({ text: message, type: 'success', keepAfterNavigationChange });
  }

  private sendMessage(alert: Alert): void {
    if (this.currentInstance) {
      this.currentInstance.destroy();
    }

    const context = new AlertContext(alert);
    this.currentInstance = this.overlayService.attach(AlertComponent, {
      keepAfterNavigationChange: alert.keepAfterNavigationChange,
      providers: [{
        provide: AlertContext,
        useValue: context
      }]
    });
  }
}
