import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoticeModule } from 'projects/ux/src/public-api';

import { NoticeDemoRoutingModule } from './notice-demo-routing.module';
import { NoticeDemoComponent } from './notice-demo.component';

@NgModule({
  declarations: [NoticeDemoComponent],
  imports: [CommonModule, NoticeDemoRoutingModule, NoticeModule],
})
export class NoticeDemoModule {}
