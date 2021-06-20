import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gd-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
  @Input()
  public reverseColumnOrder = false;
}
