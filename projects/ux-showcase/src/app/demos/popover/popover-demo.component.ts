import { Component } from '@angular/core';

import { PopoverMessage, PopoverMessageType } from 'projects/ux/src/public-api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popover-demo',
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.scss'],
})
export class PopoverDemoComponent {
  public extraContentVisible = false;
  public messageStream = new Subject<PopoverMessage>();

  constructor() {}

  public positionPopover(): void {
    this.messageStream.next({
      type: PopoverMessageType.Reposition,
    });
  }
}
