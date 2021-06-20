import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WaitModule } from 'projects/ux/src/public-api';

import { WaitDemoRoutingModule } from './wait-demo-routing.module';
import { WaitDemoComponent } from './wait-demo.component';

@NgModule({
  imports: [CommonModule, WaitModule, WaitDemoRoutingModule],
  declarations: [WaitDemoComponent],
})
export class WaitDemoModule {}
