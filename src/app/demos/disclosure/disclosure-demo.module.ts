import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisclosureDemoRoutingModule } from './disclosure-demo-routing.module';
import { DisclosureDemoComponent } from './disclosure-demo.component';
import { DisclosureModule } from 'projects/ux/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DisclosureModule,
    DisclosureDemoRoutingModule
  ],
  declarations: [DisclosureDemoComponent]
})
export class DisclosureDemoModule { }
