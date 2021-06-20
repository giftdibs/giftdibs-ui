import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormFieldModule, IconModule } from 'projects/ux/src/public-api';

import { ButtonsDemoComponent } from './buttons-demo.component';
import { ThemeDemoRoutingModule } from './theme-demo-routing.module';

@NgModule({
  declarations: [ButtonsDemoComponent],
  exports: [ButtonsDemoComponent],
  imports: [CommonModule, FormFieldModule, IconModule, ThemeDemoRoutingModule],
})
export class ThemeDemoModule {}
