import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gd-card-heading',
  templateUrl: './card-heading.component.html',
  styleUrls: ['./card-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeadingComponent {
  @Input()
  public multiline = true;
}
