import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FocusTrapDirective } from './focus-trap.directive';

@NgModule({
  imports: [CommonModule],
  exports: [FocusTrapDirective],
  declarations: [FocusTrapDirective],
})
export class FocusTrapModule {}
