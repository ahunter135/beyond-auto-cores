import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarginPageRoutingModule } from './margin-routing.module';

import { MarginPage } from './margin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MarginPageRoutingModule,
  ],
  declarations: [MarginPage],
})
export class MarginPageModule {}
