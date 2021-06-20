import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconModule } from '../icon/icon.module';
import { OverlayModule } from '../overlay/overlay.module';

import { TypeaheadResultsComponent } from './typeahead-results.component';
import { TypeaheadComponent } from './typeahead.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    OverlayModule,
    ReactiveFormsModule,
  ],
  exports: [TypeaheadComponent],
  declarations: [TypeaheadComponent, TypeaheadResultsComponent],
})
export class TypeaheadModule {}
