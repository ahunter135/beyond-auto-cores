import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericsPageRoutingModule } from './generics-routing.module';
import { SharedModule } from '@app/shared.module';

import { GenericsPage } from './generics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericsPageRoutingModule,
    SharedModule,
  ],
  declarations: [GenericsPage],
})
export class GenericsPageModule {}
