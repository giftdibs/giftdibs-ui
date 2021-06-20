import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RibbonComponent } from './ribbon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RibbonComponent],
  exports: [RibbonComponent],
})
export class RibbonModule {}
