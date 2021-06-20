import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverlayModule } from '../overlay/overlay.module';

import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [PopoverComponent, PopoverDirective],
  exports: [PopoverDirective],
})
export class PopoverModule {}
