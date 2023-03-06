import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericsPage } from './generics.page';

const routes: Routes = [
  {
    path: '',
    component: GenericsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenericsPageRoutingModule {}
