import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationViewPageRoutingModule } from './notification-view-routing.module';

import { NotificationViewPage } from './notification-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationViewPageRoutingModule
  ],
  declarations: [NotificationViewPage]
})
export class NotificationViewPageModule {}
