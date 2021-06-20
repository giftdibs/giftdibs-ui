import { Component, OnInit } from '@angular/core';

import {
  DropdownMenuItem,
  ModalClosedEventArgs,
  ModalService,
} from 'projects/ux/src/public-api';

import { DropdownMenuDemoModalComponent } from './dropdown-menu-demo-modal.component';

@Component({
  selector: 'app-dropdown-menu-demo',
  templateUrl: './dropdown-menu-demo.component.html',
  styleUrls: ['./dropdown-menu-demo.component.scss'],
})
export class DropdownMenuDemoComponent implements OnInit {
  public menuItems: DropdownMenuItem[] = [];

  constructor(private modalService: ModalService) {}

  public ngOnInit(): void {
    this.menuItems = [
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
  }

  public openModal(): void {
    const modal = this.modalService.open(DropdownMenuDemoModalComponent, {
      clickOverlayToClose: true,
    });

    modal.closed.subscribe((args: ModalClosedEventArgs) => {
      console.log('modal closed:', args);
    });
  }
}
