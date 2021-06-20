import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-media-header',
  templateUrl: './media-header.component.html',
  styleUrls: ['./media-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaHeaderComponent {}
