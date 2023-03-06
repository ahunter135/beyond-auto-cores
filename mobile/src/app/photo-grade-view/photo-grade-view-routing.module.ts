import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoGradeViewPage } from './photo-grade-view.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoGradeViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoGradeViewPageRoutingModule {}
