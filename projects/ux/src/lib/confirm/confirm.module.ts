import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FocusTrapModule } from '../focus-trap/focus-trap.module';
import { OverlayModule } from '../overlay/overlay.module';

import { ConfirmComponent } from './confirm.component';

@NgModule({
  imports: [CommonModule, FocusTrapModule, OverlayModule],
  declarations: [ConfirmComponent],
})
export class ConfirmModule {}
