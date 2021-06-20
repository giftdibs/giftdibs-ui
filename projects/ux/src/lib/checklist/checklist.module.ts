import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxModule } from '../checkbox/checkbox.module';
import { HideUntilModule } from '../hide-until/hide-until.module';

import { ChecklistComponent } from './checklist.component';

@NgModule({
  imports: [
    CheckboxModule,
    CommonModule,
    FormsModule,
    HideUntilModule,
    ReactiveFormsModule,
  ],
  declarations: [ChecklistComponent],
  exports: [ChecklistComponent],
})
export class ChecklistModule {}
