import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePhotoGradePageRoutingModule } from './create-photo-grade-routing.module';

import { CreatePhotoGradePage } from './create-photo-grade.page';
import { SharedModule } from '@app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePhotoGradePageRoutingModule,
    SharedModule,
  ],
  declarations: [CreatePhotoGradePage],
})
export class CreatePhotoGradePageModule {}
