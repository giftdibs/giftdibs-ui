import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {}
