import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  FormFieldModule,
  ImageUploaderModule,
} from 'projects/ux/src/public-api';

import { ImageUploaderDemoRoutingModule } from './image-uploader-demo-routing.module';
import { ImageUploaderDemoComponent } from './image-uploader-demo.component';

@NgModule({
  declarations: [ImageUploaderDemoComponent],
  imports: [
    CommonModule,
    FormFieldModule,
    ImageUploaderModule,
    ImageUploaderDemoRoutingModule,
  ],
})
export class ImageUploaderDemoModule {}
