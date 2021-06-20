import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';

import { PasswordViewerComponent } from './password-viewer.component';

@NgModule({
  imports: [CommonModule, IconModule],
  exports: [PasswordViewerComponent],
  declarations: [PasswordViewerComponent],
})
export class PasswordViewerModule {}
