import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HideUntilDirective } from './hide-until.directive';

@NgModule({
  imports: [CommonModule],
  exports: [HideUntilDirective],
  declarations: [HideUntilDirective],
})
export class HideUntilModule {}
