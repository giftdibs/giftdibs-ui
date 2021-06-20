import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TypeaheadDemoComponent } from './typeahead-demo.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TypeaheadDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class TypeaheadDemoRoutingModule {}
