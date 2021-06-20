import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-card-controls',
  templateUrl: './card-controls.component.html',
  styleUrls: ['./card-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardControlsComponent {}
