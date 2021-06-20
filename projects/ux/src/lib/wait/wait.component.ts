import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gd-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitComponent {
  @Input()
  public showBackdrop = true;
}
