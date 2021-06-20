import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownMenuModule, ModalModule } from 'projects/ux/src/public-api';

import { DropdownMenuDemoModalComponent } from './dropdown-menu-demo-modal.component';
import { DropdownMenuDemoRoutingModule } from './dropdown-menu-demo-routing.module';
import { DropdownMenuDemoComponent } from './dropdown-menu-demo.component';

@NgModule({
  imports: [
    CommonModule,
    DropdownMenuModule,
    DropdownMenuDemoRoutingModule,
    ModalModule,
  ],
  declarations: [DropdownMenuDemoComponent, DropdownMenuDemoModalComponent],
})
export class DropdownMenuDemoModule {}
