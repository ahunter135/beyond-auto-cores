import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoGradePage } from './photo-grade.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoGradePage
  },
  {
    path: 'create-photo-grade',
    loadChildren: () => import('./create-photo-grade/create-photo-grade.module').then( m => m.CreatePhotoGradePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoGradePageRoutingModule {}
