import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '../icon/icon.module';

import { NoticeHeadingComponent } from './notice-heading.component';
import { NoticeComponent } from './notice.component';

@NgModule({
  imports: [CommonModule, IconModule],
  exports: [NoticeComponent, NoticeHeadingComponent],
  declarations: [NoticeComponent, NoticeHeadingComponent],
})
export class NoticeModule {}
