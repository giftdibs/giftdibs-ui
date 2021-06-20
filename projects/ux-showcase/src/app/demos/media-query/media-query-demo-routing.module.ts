import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaQueryDemoComponent } from './media-query-demo.component';

const routes: Routes = [
  {
    path: '',
    component: MediaQueryDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaQueryDemoRoutingModule {}
