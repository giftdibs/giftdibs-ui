import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NoticeType } from './notice-type';

@Component({
  selector: 'gd-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeComponent {
  @Input()
  public noticeType: NoticeType = 'info';
}
