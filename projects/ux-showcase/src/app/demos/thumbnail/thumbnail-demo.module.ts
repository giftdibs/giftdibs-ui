import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThumbnailModule } from 'projects/ux/src/public-api';

import { ThumbnailDemoRoutingModule } from './thumbnail-demo-routing.module';
import { ThumbnailDemoComponent } from './thumbnail-demo.component';

@NgModule({
  imports: [CommonModule, ThumbnailModule, ThumbnailDemoRoutingModule],
  declarations: [ThumbnailDemoComponent],
})
export class ThumbnailDemoModule {}
