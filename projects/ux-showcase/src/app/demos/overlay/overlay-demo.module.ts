import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverlayModule } from 'projects/ux/src/public-api';

import { OverlayDemoRoutingModule } from './overlay-demo-routing.module';
import { OverlayDemoSubjectComponent } from './overlay-demo-subject.component';
import { OverlayDemoComponent } from './overlay-demo.component';

@NgModule({
  imports: [CommonModule, OverlayModule, OverlayDemoRoutingModule],
  declarations: [OverlayDemoComponent, OverlayDemoSubjectComponent],
})
export class OverlayDemoModule {}
