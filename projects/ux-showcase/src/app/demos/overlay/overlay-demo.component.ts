import { Component } from '@angular/core';

import {
  OverlayConfig,
  OverlayInstance,
  OverlayService,
} from 'projects/ux/src/public-api';

import { OverlayDemoSubjectComponent } from './overlay-demo-subject.component';

@Component({
  selector: 'app-overlay-demo',
  templateUrl: './overlay-demo.component.html',
  styleUrls: ['./overlay-demo.component.scss'],
})
export class OverlayDemoComponent {
  constructor(private overlayService: OverlayService) {}

  public openOverlayWithBackdrop(): void {
    const config: OverlayConfig = {
      preventBodyScroll: true,
      showBackdrop: true,
    };

    this.openOverlay(config);
  }

  public openOverlayWithoutBackdrop(): void {
    const config: OverlayConfig = {
      preventBodyScroll: true,
      showBackdrop: false,
    };

    this.openOverlay(config);
  }

  private openOverlay(config: OverlayConfig): OverlayInstance<any> {
    const instance = this.overlayService.attach(
      OverlayDemoSubjectComponent,
      config,
    );

    instance.destroyed.subscribe(() => {
      console.log('closed.');
    });

    // instance.click.subscribe(() => {
    //   console.log('Overlay clicked!');
    //   instance.destroy();
    // });

    instance.componentInstance!.closed.subscribe(() => {
      console.log('Closed!');
      instance.destroy();
    });

    return instance;
  }
}
