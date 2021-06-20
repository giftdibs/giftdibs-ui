import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaListComponent {}
