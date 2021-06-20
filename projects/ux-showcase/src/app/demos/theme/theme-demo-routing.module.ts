import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonsDemoComponent } from './buttons-demo.component';

const routes: Routes = [
  {
    path: '',
    component: ButtonsDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeDemoRoutingModule {}
