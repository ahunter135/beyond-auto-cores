import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LotListPageRoutingModule } from './lot-list-routing.module';
import { SharedModule } from '@app/shared.module';

import { LotListPage } from './lot-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LotListPageRoutingModule,
    SharedModule,
  ],
  declarations: [LotListPage],
})
export class LotListPageModule {}
