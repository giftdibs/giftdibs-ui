import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { ModalClosedEventArgs } from './modal-closed-event-args';
import { ModalClosedEventReason } from './modal-closed-event-reason';
import { ModalWrapperComponent } from './modal-wrapper.component';

export class ModalInstance<T> {
  public componentInstance: T | undefined;

  public get closed(): Observable<ModalClosedEventArgs> {
    return this._closed;
  }

  private closedEventArgs: ModalClosedEventArgs | undefined;

  private _closed = new EventEmitter<ModalClosedEventArgs>();

  constructor(private wrapperInstance: ModalWrapperComponent) {
    // Wait for the wrapper closed animation to complete before triggering closed event.
    this.wrapperInstance.closed.subscribe(() => {
      this._closed.emit(this.closedEventArgs);
      this._closed.complete();
    });
  }

  public close(reason: ModalClosedEventReason = 'cancel', data?: any): void {
    this.closedEventArgs = { reason, data };
    this.wrapperInstance.close();
  }
}
