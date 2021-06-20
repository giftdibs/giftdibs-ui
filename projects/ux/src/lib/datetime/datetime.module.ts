import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FriendlyDatePipe } from './friendly-date.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FriendlyDatePipe],
  exports: [FriendlyDatePipe],
})
export class DateTimeModule {}
