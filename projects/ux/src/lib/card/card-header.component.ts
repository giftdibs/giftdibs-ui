import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {}
