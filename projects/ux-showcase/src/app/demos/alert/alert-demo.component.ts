import { Component } from '@angular/core';

import { AlertService } from 'projects/ux/src/public-api';

@Component({
  selector: 'app-alert-demo',
  templateUrl: './alert-demo.component.html',
  styleUrls: ['./alert-demo.component.scss'],
})
export class AlertDemoComponent {
  private message = [
    'Lorem ipsum dolor sit amet,',
    'consectetur adipiscing elit.',
    'Ut a ante scelerisque, cursus',
    'neque non, rutrum eros. Praesent',
    'id tortor eu mi sagittis auctor',
    'auctor ac turpis. Lorem ipsum dolor',
    'sit amet, consectetur adipiscing elit.',
    'Nam mattis vestibulum ante. Maecenas',
  ].join(' ');

  constructor(private alertService: AlertService) {}

  public openAlert(type: string): void {
    switch (type) {
      case 'success':
        this.alertService.success(this.message, true);
        break;
      case 'info':
        this.alertService.info(this.message, true);
        break;
      case 'danger':
        this.alertService.error(this.message);
        break;
    }
  }
}
