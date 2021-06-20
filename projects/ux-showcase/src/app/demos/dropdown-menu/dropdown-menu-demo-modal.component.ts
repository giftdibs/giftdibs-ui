import { Component } from '@angular/core';

import { ModalInstance } from 'projects/ux/src/public-api';

@Component({
  selector: 'app-dropdown-menu-demo-modal',
  templateUrl: './dropdown-menu-demo-modal.component.html',
})
export class DropdownMenuDemoModalComponent {
  public menuItems: any[] = [
    {
      label: 'First item',
      icon: 'users',
      action: () => {
        console.log('First item clicked!');
      },
      addSeparatorAfter: true,
      data: {
        foo: 'bar',
      },
    },
    {
      label: 'Second item',
      icon: 'trash',
      action: () => {
        console.log('Second item clicked!');
      },
      data: {
        bar: 'baz',
      },
    },
  ];

  constructor(private modal: ModalInstance<any>) {}

  public onCancelClicked(): void {
    this.modal.close('cancel', {
      data: {
        foo: 'bar',
      },
    });
  }

  public onModalHeaderCloseButtonClick(): void {
    this.modal.close();
  }
}
