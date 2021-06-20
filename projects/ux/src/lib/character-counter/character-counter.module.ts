import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CharacterCounterComponent } from './character-counter.component';

@NgModule({
  declarations: [CharacterCounterComponent],
  imports: [CommonModule],
  exports: [CharacterCounterComponent],
})
export class CharacterCounterModule {}
