import { Component } from '@angular/core';

import { ConfirmAnswer, ConfirmService } from 'projects/ux/src/public-api';

@Component({
  selector: 'app-confirm-demo',
  templateUrl: './confirm-demo.component.html',
  styleUrls: ['./confirm-demo.component.scss'],
})
export class ConfirmDemoComponent {
  constructor(private confirmService: ConfirmService) {}

  public openConfirm(): void {
    this.confirmService.confirm(
      {
        message: 'Are you sure?',
        supplemental: 'This action cannot be undone!',
      },
      (answer: ConfirmAnswer) => {
        console.log('answer:', answer);
      },
    );
  }
}
