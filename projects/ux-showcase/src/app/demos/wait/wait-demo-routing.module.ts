import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaitDemoComponent } from './wait-demo.component';

const routes: Routes = [
  {
    path: '',
    component: WaitDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitDemoRoutingModule {}
