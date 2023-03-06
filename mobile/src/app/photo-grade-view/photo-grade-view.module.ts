import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoGradeViewPageRoutingModule } from './photo-grade-view-routing.module';

import { PhotoGradeViewPage } from './photo-grade-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoGradeViewPageRoutingModule
  ],
  declarations: [PhotoGradeViewPage]
})
export class PhotoGradeViewPageModule {}
