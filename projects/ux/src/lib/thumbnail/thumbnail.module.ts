import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IconModule } from '../icon/icon.module';

import { ThumbnailComponent } from './thumbnail.component';

@NgModule({
  imports: [CommonModule, IconModule, RouterModule],
  exports: [ThumbnailComponent],
  declarations: [ThumbnailComponent],
})
export class ThumbnailModule {}
