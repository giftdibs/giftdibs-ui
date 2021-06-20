import { Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-overlay-demo-subject',
  templateUrl: './overlay-demo-subject.component.html',
  styleUrls: ['./overlay-demo-subject.component.scss'],
})
export class OverlayDemoSubjectComponent {
  public get closed(): Observable<void> {
    return this._closed;
  }

  private _closed = new Subject<void>();

  public close(): void {
    this._closed.next();
    this._closed.complete();
  }
}
