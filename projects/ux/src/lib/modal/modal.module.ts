import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  OverlayModule
} from '../overlay/overlay.module';

import {
  FocusTrapModule
} from '../focus-trap/focus-trap.module';

import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalHeadingComponent } from './modal-heading.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule,
    FocusTrapModule,
    OverlayModule
  ],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalHeadingComponent,
    ModalBodyComponent,
    ModalFooterComponent
  ],
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalHeadingComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalWrapperComponent
  ],
  providers: [
    ModalService
  ],
  entryComponents: [
    ModalWrapperComponent
  ]
})
export class ModalModule { }
