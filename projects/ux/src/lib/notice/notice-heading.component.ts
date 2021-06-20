import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-notice-heading',
  templateUrl: './notice-heading.component.html',
  styleUrls: ['./notice-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeHeadingComponent {}
