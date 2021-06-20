import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ChecklistChoice } from './checklist-choice';

let nextUniqueId = 0;

@Component({
  selector: 'gd-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => ChecklistComponent),
      multi: true,
    },
  ],
})
export class ChecklistComponent implements ControlValueAccessor {
  @Input()
  public choices: ChecklistChoice[] = [];

  @Input()
  public disabled = false;

  public inputName = `gd-checklist-${nextUniqueId++}`;

  public get value(): any[] {
    return this._value || [];
  }

  public set value(value: any[]) {
    this._value = value;
    this.onChange(this.value);
    this.onTouched();
    this.changeDetector.markForCheck();
  }

  private _value: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}

  public onCheckboxChange(choice: ChecklistChoice, checked: boolean): void {
    if (checked) {
      this.addValue(choice.value);
    } else {
      this.removeValue(choice.value);
    }
  }

  public isChecked(choice: ChecklistChoice): boolean {
    return this.value.indexOf(choice.value) > -1;
  }

  public writeValue(value: any[]): void {
    this.value = value;
  }

  // Angular automatically constructs these methods.
  public onChange = (value: any[]) => {};
  public onTouched = () => {};

  public registerOnChange(fn: (value: any[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  private addValue(value: any): void {
    const valueArray = this.value;
    if (valueArray.indexOf(value) === -1) {
      valueArray.push(value);
      this.value = valueArray;
    }
  }

  private removeValue(value: any): void {
    const valueArray = this.value;
    if (valueArray.indexOf(value) > -1) {
      valueArray.splice(valueArray.indexOf(value), 1);
      this.value = valueArray;
    }
  }
}
