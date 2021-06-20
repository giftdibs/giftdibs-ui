import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-media-content',
  templateUrl: './media-content.component.html',
  styleUrls: ['./media-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaContentComponent {}
