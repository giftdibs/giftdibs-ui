import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmDemoComponent } from './confirm-demo.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmDemoRoutingModule {}
