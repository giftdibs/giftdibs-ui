import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { gdAnimationEmerge } from '../animation/emerge';

import { ConfirmAnswerType } from './confirm-answer-type';
import { ConfirmContext } from './confirm-context';

@Component({
  selector: 'gd-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [gdAnimationEmerge],
})
export class ConfirmComponent implements OnInit {
  public message: string = '';

  public supplemental: string | undefined;

  public get animationState(): string {
    return this.isOpen ? 'open' : 'closed';
  }

  private answerType: ConfirmAnswerType = ConfirmAnswerType.Okay;

  private isOpen = true;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private context: ConfirmContext,
  ) {}

  public ngOnInit(): void {
    this.message = this.context.config.message;
    this.supplemental = this.context.config.supplemental;
  }

  public confirm(): void {
    this.answerType = ConfirmAnswerType.Okay;
    this.close();
  }

  public cancel(): void {
    this.answerType = ConfirmAnswerType.Cancel;
    this.close();
  }

  public close(): void {
    this.isOpen = false;
    this.changeDetector.markForCheck();
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'closed') {
      this.context.answer({
        type: this.answerType,
      });
    }
  }
}
