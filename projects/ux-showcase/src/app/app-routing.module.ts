import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'demos/alert',
    loadChildren: () =>
      import('./demos/alert/alert-demo.module').then((m) => m.AlertDemoModule),
  },
  {
    path: 'demos/theme',
    loadChildren: () =>
      import('./demos/theme/theme-demo.module').then((m) => m.ThemeDemoModule),
  },
  {
    path: 'demos/card',
    loadChildren: () =>
      import('./demos/card/card-demo.module').then((m) => m.CardDemoModule),
  },
  {
    path: 'demos/confirm',
    loadChildren: () =>
      import('./demos/confirm/confirm-demo.module').then(
        (m) => m.ConfirmDemoModule,
      ),
  },
  {
    path: 'demos/disclosure',
    loadChildren: () =>
      import('./demos/disclosure/disclosure-demo.module').then(
        (m) => m.DisclosureDemoModule,
      ),
  },
  {
    path: 'demos/dropdown-menu',
    loadChildren: () =>
      import('./demos/dropdown-menu/dropdown-menu-demo.module').then(
        (m) => m.DropdownMenuDemoModule,
      ),
  },
  {
    path: 'demos/grid',
    loadChildren: () =>
      import('./demos/grid/grid-demo.module').then((m) => m.GridDemoModule),
  },
  {
    path: 'demos/image-uploader',
    loadChildren: () =>
      import('./demos/image-uploader/image-uploader-demo.module').then(
        (m) => m.ImageUploaderDemoModule,
      ),
  },
  {
    path: 'demos/media-query',
    loadChildren: () =>
      import('./demos/media-query/media-query-demo.module').then(
        (m) => m.MediaQueryDemoModule,
      ),
  },
  {
    path: 'demos/media',
    loadChildren: () =>
      import('./demos/media/media-demo.module').then((m) => m.MediaDemoModule),
  },
  {
    path: 'demos/overlay',
    loadChildren: () =>
      import('./demos/overlay/overlay-demo.module').then(
        (m) => m.OverlayDemoModule,
      ),
  },
  {
    path: 'demos/popover',
    loadChildren: () =>
      import('./demos/popover/popover-demo.module').then(
        (m) => m.PopoverDemoModule,
      ),
  },
  {
    path: 'demos/notice',
    loadChildren: () =>
      import('./demos/notice/notice-demo.module').then(
        (m) => m.NoticeDemoModule,
      ),
  },
  {
    path: 'demos/thumbnail',
    loadChildren: () =>
      import('./demos/thumbnail/thumbnail-demo.module').then(
        (m) => m.ThumbnailDemoModule,
      ),
  },
  {
    path: 'demos/typeahead',
    loadChildren: () =>
      import('./demos/typeahead/typeahead-demo.module').then(
        (m) => m.TypeaheadDemoModule,
      ),
  },
  {
    path: 'demos/wait',
    loadChildren: () =>
      import('./demos/wait/wait-demo.module').then((m) => m.WaitDemoModule),
  },
  {
    path: 'demos/tabs',
    loadChildren: () =>
      import('./demos/tabs/tabs-demo.module').then((m) => m.TabsDemoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
