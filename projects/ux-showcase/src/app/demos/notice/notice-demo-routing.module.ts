import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoticeDemoComponent } from './notice-demo.component';

const routes: Routes = [
  {
    path: '',
    component: NoticeDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeDemoRoutingModule {}
