import { Observable, Subject } from 'rxjs';

import { ConfirmAnswer } from './confirm-answer';
import { ConfirmConfig } from './confirm-config';

export class ConfirmContext {
  public get answered(): Observable<ConfirmAnswer> {
    return this._answered;
  }

  private _answered = new Subject<ConfirmAnswer>();

  constructor(public config: ConfirmConfig) {}

  public answer(answer: ConfirmAnswer): void {
    this._answered.next(answer);
    this._answered.complete();
  }
}
