import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let nextUniqueId = 0;

@Component({
  selector: 'gd-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input()
  public set value(value: any) {
    this._value = value;
  }

  public get value(): any {
    return this._value;
  }

  public disabled = false;

  public get checked(): boolean {
    return this._checked;
  }

  public set checked(value: boolean) {
    this._checked = value;
    this.onChange(this.checked);
    this.onTouched();
  }

  public readonly inputId = `gd-checkbox-${nextUniqueId++}`;

  private ngUnsubscribe = new Subject<void>();

  private _checked: boolean = false;
  private _value: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) {}

  public ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    fromEvent(element, 'click')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.checked = !this.checked;
        this.changeDetector.markForCheck();
      });

    fromEvent(element, 'keydown')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: any) => {
        // Spacebar
        if (event.keyCode === 32) {
          this.checked = !this.checked;
          this.changeDetector.markForCheck();
          event.preventDefault();
        }
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public writeValue(value: boolean): void {
    this.checked = !!value;
    this.changeDetector.markForCheck();
  }

  // Angular automatically constructs these methods.
  public onChange = (value: any) => {};
  public onTouched = () => {};

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }
}
