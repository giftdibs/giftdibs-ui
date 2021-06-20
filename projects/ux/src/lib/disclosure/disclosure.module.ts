import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';

import { DisclosureBodyComponent } from './disclosure-body.component';
import { DisclosureHeadingComponent } from './disclosure-heading.component';
import { DisclosureComponent } from './disclosure.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [
    DisclosureComponent,
    DisclosureHeadingComponent,
    DisclosureBodyComponent,
  ],
  exports: [
    DisclosureComponent,
    DisclosureHeadingComponent,
    DisclosureBodyComponent,
  ],
})
export class DisclosureModule {}
