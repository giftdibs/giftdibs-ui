import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gd-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  public get value(): Date | undefined {
    return this._value;
  }

  public set value(value: Date | undefined) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  public disabled = false;

  public years: number[] = [];

  public months: { name: string; value: number }[] = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

  public days: number[] = [];

  @ViewChild('yearSelect', { static: true })
  private yearSelect: ElementRef<any> | undefined;

  @ViewChild('monthSelect', { static: true })
  private monthSelect: ElementRef<any> | undefined;

  @ViewChild('daySelect', { static: true })
  private daySelect: ElementRef<any> | undefined;

  private _value: Date | undefined;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.setupFields();
  }

  public writeValue(value: Date): void {
    if (typeof value === 'string') {
      value = new Date(value);
    }

    if (value) {
      this.value = value;

      if (this.yearSelect && this.monthSelect && this.daySelect) {
        this.yearSelect.nativeElement.value = value.getFullYear();
        this.monthSelect.nativeElement.value = value.getMonth();
        this.daySelect.nativeElement.value = value.getDay();
        this.changeDetector.markForCheck();
      }
    }
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

  public onSelection(): void {
    this.value = this.joinFieldValues();
    this.changeDetector.markForCheck();
  }

  private setupFields(): void {
    const thisYear = new Date().getFullYear();

    // Years
    for (let i = 0, len = 120; i < len - 1; i++) {
      this.years.push(thisYear - i);
    }

    // Days
    for (let k = 1, len = 31; k <= len; k++) {
      this.days.push(k);
    }
  }

  private joinFieldValues(): Date | undefined {
    if (!this.yearSelect || !this.monthSelect || !this.daySelect) {
      return;
    }

    const month = this.monthSelect.nativeElement.value;
    const day = this.daySelect.nativeElement.value;
    const year = this.yearSelect.nativeElement.value;
    const date = new Date(`${month}/${day}/${year}`);

    return date;
  }
}
