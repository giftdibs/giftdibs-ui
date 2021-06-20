import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-media-body',
  templateUrl: './media-body.component.html',
  styleUrls: ['./media-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaBodyComponent {}
