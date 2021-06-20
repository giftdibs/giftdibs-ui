import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MediaSize } from './media-size';

@Component({
  selector: 'gd-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaComponent {
  @Input()
  public size: `${MediaSize}` = MediaSize.Medium;
}
