import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridDemoComponent } from './grid-demo.component';

const routes: Routes = [
  {
    path: '',
    component: GridDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridDemoRoutingModule {}
