import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IconModule } from '../icon/icon.module';
import { OverlayModule } from '../overlay/overlay.module';

import { DropdownMenuTriggerDirective } from './dropdown-menu-trigger.directive';
import { DropdownMenuComponent } from './dropdown-menu.component';

@NgModule({
  imports: [CommonModule, IconModule, OverlayModule, RouterModule],
  exports: [DropdownMenuTriggerDirective],
  declarations: [DropdownMenuComponent, DropdownMenuTriggerDirective],
})
export class DropdownMenuModule {}
