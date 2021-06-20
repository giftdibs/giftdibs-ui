import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FocusTrapModule } from '../focus-trap/focus-trap.module';
import { OverlayModule } from '../overlay/overlay.module';

import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalHeadingComponent } from './modal-heading.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, FocusTrapModule, OverlayModule],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalHeadingComponent,
    ModalBodyComponent,
    ModalFooterComponent,
  ],
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalHeadingComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalWrapperComponent,
  ],
})
export class ModalModule {}
