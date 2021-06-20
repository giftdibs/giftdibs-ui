import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconModule } from '../icon/icon.module';

import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule, FormsModule, IconModule, ReactiveFormsModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
