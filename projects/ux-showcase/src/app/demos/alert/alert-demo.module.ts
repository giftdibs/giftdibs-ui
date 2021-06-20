import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'projects/ux/src/public-api';

import { AlertDemoRoutingModule } from './alert-demo-routing.module';
import { AlertDemoComponent } from './alert-demo.component';

@NgModule({
  imports: [CommonModule, AlertModule, AlertDemoRoutingModule],
  declarations: [AlertDemoComponent],
})
export class AlertDemoModule {}
