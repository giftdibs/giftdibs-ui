import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MediaDemoComponent } from './media-demo.component';

const routes: Routes = [
  {
    path: '',
    component: MediaDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaDemoRoutingModule {}
