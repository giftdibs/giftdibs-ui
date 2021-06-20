import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FormFieldModule,
  IconModule,
  MediaModule,
  ThumbnailModule,
  TypeaheadModule,
} from 'projects/ux/src/public-api';

import { TypeaheadDemoRoutingModule } from './typeahead-demo-routing.module';
import { TypeaheadDemoComponent } from './typeahead-demo.component';

@NgModule({
  declarations: [TypeaheadDemoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldModule,
    IconModule,
    MediaModule,
    ThumbnailModule,
    TypeaheadDemoRoutingModule,
    TypeaheadModule,
  ],
})
export class TypeaheadDemoModule {}
