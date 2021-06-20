import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-repeater',
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterComponent {}
