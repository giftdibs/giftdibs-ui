import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  IconModule,
  MediaModule,
  ThumbnailModule,
} from 'projects/ux/src/public-api';

import { MediaDemoRoutingModule } from './media-demo-routing.module';
import { MediaDemoComponent } from './media-demo.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    MediaDemoRoutingModule,
    MediaModule,
    ThumbnailModule,
  ],
  declarations: [MediaDemoComponent],
})
export class MediaDemoModule {}
