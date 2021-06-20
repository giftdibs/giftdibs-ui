import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gd-character-counter',
  templateUrl: './character-counter.component.html',
  styleUrls: ['./character-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCounterComponent implements OnInit, OnDestroy {
  @Input()
  public maxCharacters = 0;

  @Input()
  public inputReference: any;

  public isVisible = false;
  public remaining = 0;

  private ngUnsubscribe = new Subject();

  constructor(private changeDetector: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.checkRemaining();

    fromEvent(this.inputReference, 'keyup')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.checkRemaining();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private checkRemaining(): void {
    const remaining = this.maxCharacters - this.inputReference.value.length;

    if (remaining < this.maxCharacters) {
      this.remaining = remaining;
    } else {
      this.remaining = this.maxCharacters;
    }

    if (this.remaining <= 50) {
      this.isVisible = true;
    }

    this.changeDetector.markForCheck();
  }
}
