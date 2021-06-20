import { Observable, Subject } from 'rxjs';

import { OverlayInstance } from '../overlay/overlay-instance';

import { DropdownMenuComponent } from './dropdown-menu.component';

export class DropdownMenuInstance {
  public componentInstance: DropdownMenuComponent;

  public get closed(): Observable<void> {
    return this._closed;
  }

  private _closed = new Subject<void>();

  constructor(private overlayInstance: OverlayInstance<DropdownMenuComponent>) {
    this.componentInstance = this.overlayInstance.componentInstance!;

    this.overlayInstance.destroyed.subscribe(() => {
      this._closed.next();
      this._closed.complete();
    });
  }
}
