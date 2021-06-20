import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnChanges,
} from '@angular/core';
import { FormArray, FormControlName } from '@angular/forms';

@Component({
  selector: 'gd-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements AfterContentInit, OnChanges {
  @Input()
  public errors: any[] = [];

  @ContentChild(FormControlName)
  public controlName: FormControlName | undefined;

  public errorMessages: string[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}

  public ngAfterContentInit(): void {
    if (!this.controlName) {
      return;
    }

    this.controlName?.valueAccessor?.registerOnTouched(() => {
      this.errors = [];
      this.controlName?.control.markAsTouched();
      this.changeDetector.markForCheck();
      this.updateErrorMessages();
    });
  }

  public ngOnChanges(changes: any): void {
    if (changes.errors && changes.errors.currentValue) {
      this.handleErrors(changes.errors.currentValue);
    }
  }

  public updateErrorMessages(): void {
    this.errorMessages = [];

    if (!this.controlName) {
      return;
    }

    const control = this.controlName.control;

    if (!control.errors) {
      return;
    }

    Object.keys(control.errors).forEach((key: string) => {
      switch (key) {
        case 'required':
          this.errorMessages.push('This field is required.');
          break;
        case 'validation':
          this.errorMessages.push(control.errors![key]);
          break;
      }
    });

    this.changeDetector.detectChanges();
  }

  private handleErrors(errors: any[]): void {
    let hasErrors = false;

    errors.forEach((err: any) => {
      let field = err.field;
      const fragments = err.field.split('.');

      // Mongoose separates child fields with periods.
      // We'll need to parse out the last field to match it to what's
      // on the form.
      if (fragments.length > 0) {
        field = fragments[fragments.length - 1];
      }

      if (field === this.controlName?.name) {
        const formGroup = this.controlName?.control.parent;
        const formArray = formGroup?.parent;

        // This form control is part of a form array.
        // Check to make sure the error from the server
        // matches the index of the form array.
        if (formArray instanceof FormArray) {
          const index = parseInt(fragments[fragments.length - 2], 10);
          if (formArray.controls[index] !== formGroup) {
            return;
          }
        }

        hasErrors = true;
        this.controlName?.control.setErrors({
          validation: err.message,
        });
      }
    });

    if (hasErrors) {
      this.updateErrorMessages();
    }
  }
}
