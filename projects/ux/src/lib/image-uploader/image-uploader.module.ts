import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule
} from '../icon/icon.module';

import {
  MediaModule
} from '../media/media.module';

import {
  ThumbnailModule
} from '../thumbnail/thumbnail.module';

import {
  ImageUploaderComponent
} from './image-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    MediaModule,
    ThumbnailModule
  ],
  declarations: [
    ImageUploaderComponent
  ],
  exports: [
    ImageUploaderComponent
  ]
})
export class ImageUploaderModule { }
