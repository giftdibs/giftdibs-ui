import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'giftdibs-ux';

  public routes: any[] = [
    {
      path: '/demos/dropdown-menu',
      label: 'Dropdown Menu',
    },
    {
      path: '/demos/grid',
      label: 'Grid',
    },
    {
      path: '/demos/media',
      label: 'Media',
    },
    {
      path: '/demos/theme',
      label: 'Theme',
    },
    {
      path: '/demos/thumbnail',
      label: 'Thumbnail',
    },
    {
      path: '/demos/typeahead',
      label: 'Typeahead',
    },
    {
      path: '/demos/popover',
      label: 'Popover',
    },
    {
      path: '/demos/alert',
      label: 'Alert',
    },
    {
      path: '/demos/wait',
      label: 'Wait',
    },
    {
      path: '/demos/overlay',
      label: 'Overlay',
    },
    {
      path: '/demos/card',
      label: 'Card',
    },
    {
      path: '/demos/disclosure',
      label: 'Disclosure',
    },
    {
      path: '/demos/image-uploader',
      label: 'Image uploader',
    },
    {
      path: '/demos/confirm',
      label: 'Confirm',
    },
    {
      path: '/demos/media-query',
      label: 'Media Query',
    },
    {
      path: '/demos/notice',
      label: 'Notice',
    },
    {
      path: '/demos/tabs',
      label: 'Tabs',
    },
  ].sort(function (a: any, b: any): any {
    const keyA = a.label;
    const keyB = b.label;

    if (keyA < keyB) {
      return -1;
    }

    if (keyA > keyB) {
      return 1;
    }

    return 0;
  });
}
