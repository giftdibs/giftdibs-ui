import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DisclosureModule } from 'projects/ux/src/public-api';

import { DisclosureDemoRoutingModule } from './disclosure-demo-routing.module';
import { DisclosureDemoComponent } from './disclosure-demo.component';

@NgModule({
  imports: [CommonModule, DisclosureModule, DisclosureDemoRoutingModule],
  declarations: [DisclosureDemoComponent],
})
export class DisclosureDemoModule {}
