import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardBodyComponent } from './card-body.component';
import { CardControlsComponent } from './card-controls.component';
import { CardFooterComponent } from './card-footer.component';
import { CardHeaderComponent } from './card-header.component';
import { CardHeadingComponent } from './card-heading.component';
import { CardThumbnailComponent } from './card-thumbnail.component';
import { CardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    CardBodyComponent,
    CardComponent,
    CardControlsComponent,
    CardFooterComponent,
    CardHeaderComponent,
    CardHeadingComponent,
    CardThumbnailComponent,
  ],
  declarations: [
    CardBodyComponent,
    CardComponent,
    CardControlsComponent,
    CardFooterComponent,
    CardHeaderComponent,
    CardHeadingComponent,
    CardThumbnailComponent,
  ],
})
export class CardModule {}
