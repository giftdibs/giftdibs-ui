import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OverlayHostComponent } from './overlay-host.component';
import { OverlayComponent } from './overlay.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [OverlayComponent, OverlayHostComponent],
})
export class OverlayModule {}
