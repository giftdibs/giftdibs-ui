import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfirmModule } from 'projects/ux/src/public-api';

import { ConfirmDemoRoutingModule } from './confirm-demo-routing.module';
import { ConfirmDemoComponent } from './confirm-demo.component';

@NgModule({
  declarations: [ConfirmDemoComponent],
  imports: [CommonModule, ConfirmModule, ConfirmDemoRoutingModule],
})
export class ConfirmDemoModule {}
