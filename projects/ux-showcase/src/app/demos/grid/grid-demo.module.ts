import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridModule } from 'projects/ux/src/public-api';

import { GridDemoRoutingModule } from './grid-demo-routing.module';
import { GridDemoComponent } from './grid-demo.component';

@NgModule({
  imports: [CommonModule, GridModule, GridDemoRoutingModule],
  declarations: [GridDemoComponent],
})
export class GridDemoModule {}
