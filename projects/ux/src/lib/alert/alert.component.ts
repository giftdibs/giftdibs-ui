import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { gdAnimationEmerge } from '../animation/emerge';

import { Alert } from './alert';
import { AlertContext } from './alert-context';

@Component({
  selector: 'gd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [gdAnimationEmerge],
})
export class AlertComponent implements OnInit, OnDestroy {
  public get ariaLive(): string {
    let live: string;

    switch (this.alert?.type) {
      case 'danger':
        live = 'assertive';
        break;
      default:
        live = 'polite';
        break;
    }

    return live;
  }

  public get closed(): Observable<void> {
    return this._closed;
  }

  public alert: Alert | undefined;

  public animationState: 'open' | 'closed' = 'closed';

  private _closed = new Subject<void>();

  constructor(private context: AlertContext) {}

  public ngOnInit(): void {
    this.alert = this.context.alert;
    this.animationState = 'open';
  }

  public ngOnDestroy(): void {
    this._closed.complete();
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'closed') {
      this._closed.next();
      this._closed.complete();
    }
  }

  public close(): void {
    this.animationState = 'closed';
  }
}
