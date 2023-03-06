import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PhotoGradePageRoutingModule } from './photo-grade-routing.module';
import { SharedModule } from '@app/shared.module';

import { PhotoGradePage } from './photo-grade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoGradePageRoutingModule,
    SharedModule,
  ],
  declarations: [PhotoGradePage],
})
export class PhotoGradePageModule {}
