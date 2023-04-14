import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePhotoGradePage } from './create-photo-grade.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePhotoGradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePhotoGradePageRoutingModule {}
