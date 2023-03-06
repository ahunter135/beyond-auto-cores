import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoGradePage } from './photo-grade.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoGradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoGradePageRoutingModule {}
