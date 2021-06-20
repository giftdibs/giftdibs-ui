import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImageUploaderDemoComponent } from './image-uploader-demo.component';

const routes: Routes = [
  {
    path: '',
    component: ImageUploaderDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageUploaderDemoRoutingModule {}
