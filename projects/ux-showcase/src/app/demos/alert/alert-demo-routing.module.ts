import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertDemoComponent } from './alert-demo.component';

const routes: Routes = [
  {
    path: '',
    component: AlertDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertDemoRoutingModule {}
