import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationViewPage } from './notification-view.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationViewPageRoutingModule {}
