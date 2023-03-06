import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericViewPageRoutingModule } from './generic-view-routing.module';

import { GenericViewPage } from './generic-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericViewPageRoutingModule
  ],
  declarations: [GenericViewPage]
})
export class GenericViewPageModule {}
