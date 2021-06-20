import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';
import { OverlayModule } from '../overlay/overlay.module';

import { AlertComponent } from './alert.component';

@NgModule({
  imports: [CommonModule, IconModule, OverlayModule],
  declarations: [AlertComponent],
})
export class AlertModule {}
