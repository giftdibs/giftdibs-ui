// #region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RepeaterControlsComponent } from './repeater-controls.component';
import { RepeaterItemComponent } from './repeater-item.component';
import { RepeaterComponent } from './repeater.component';

// #endregion

@NgModule({
  imports: [CommonModule],
  exports: [
    RepeaterControlsComponent,
    RepeaterComponent,
    RepeaterItemComponent,
  ],
  declarations: [
    RepeaterControlsComponent,
    RepeaterComponent,
    RepeaterItemComponent,
  ],
})
export class RepeaterModule {}
