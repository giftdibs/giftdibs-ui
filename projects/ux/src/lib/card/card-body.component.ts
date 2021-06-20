import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBodyComponent {}
