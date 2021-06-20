import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconStackComponent } from './icon-stack.component';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IconComponent, IconStackComponent],
  exports: [IconComponent, IconStackComponent],
})
export class IconModule {}
