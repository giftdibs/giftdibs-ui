import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridModule } from 'projects/ux/src/public-api';

import { MediaQueryDemoRoutingModule } from './media-query-demo-routing.module';
import { MediaQueryDemoComponent } from './media-query-demo.component';

@NgModule({
  declarations: [MediaQueryDemoComponent],
  imports: [CommonModule, GridModule, MediaQueryDemoRoutingModule],
})
export class MediaQueryDemoModule {}
