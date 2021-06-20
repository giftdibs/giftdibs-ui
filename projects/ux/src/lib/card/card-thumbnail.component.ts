import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-card-thumbnail',
  templateUrl: './card-thumbnail.component.html',
  styleUrls: ['./card-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardThumbnailComponent {}
