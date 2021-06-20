import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
} from '@angular/core';

import { MediaSize } from './media-size';
import { MediaComponent } from './media.component';

@Component({
  selector: 'gd-media-thumbnail',
  templateUrl: './media-thumbnail.component.html',
  styleUrls: ['./media-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaThumbnailComponent implements OnInit {
  public size: `${MediaSize}` = MediaSize.Medium;

  constructor(@Optional() private wrapper: MediaComponent) {}

  public ngOnInit(): void {
    if (this.wrapper) {
      this.size = this.wrapper.size;
    }
  }
}
