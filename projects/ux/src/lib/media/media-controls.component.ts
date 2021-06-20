import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-media-controls',
  templateUrl: './media-controls.component.html',
  styleUrls: ['./media-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaControlsComponent {}
