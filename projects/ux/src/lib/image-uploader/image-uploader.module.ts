import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridModule } from '../grid/grid.module';
import { IconModule } from '../icon/icon.module';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';

import { ImageUploaderComponent } from './image-uploader.component';

@NgModule({
  imports: [CommonModule, GridModule, IconModule, ThumbnailModule],
  declarations: [ImageUploaderComponent],
  exports: [ImageUploaderComponent],
})
export class ImageUploaderModule {}
