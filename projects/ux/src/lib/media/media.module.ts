import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MediaBodyComponent } from './media-body.component';
import { MediaContentComponent } from './media-content.component';
import { MediaControlsComponent } from './media-controls.component';
import { MediaHeaderComponent } from './media-header.component';
import { MediaHeadingComponent } from './media-heading.component';
import { MediaListComponent } from './media-list.component';
import { MediaSubheadingComponent } from './media-subheading.component';
import { MediaThumbnailComponent } from './media-thumbnail.component';
import { MediaComponent } from './media.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    MediaComponent,
    MediaHeaderComponent,
    MediaHeadingComponent,
    MediaBodyComponent,
    MediaContentComponent,
    MediaControlsComponent,
    MediaListComponent,
    MediaSubheadingComponent,
    MediaThumbnailComponent,
  ],
  declarations: [
    MediaComponent,
    MediaHeaderComponent,
    MediaHeadingComponent,
    MediaContentComponent,
    MediaControlsComponent,
    MediaBodyComponent,
    MediaListComponent,
    MediaSubheadingComponent,
    MediaThumbnailComponent,
    MediaSubheadingComponent,
  ],
})
export class MediaModule {}
