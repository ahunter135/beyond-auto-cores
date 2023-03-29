import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '@components/header/header.component';
import { GenericCodeCardComponent } from '@components/generic-code-card/generic-code-card.component';
import { AddToLotComponent } from './common/components/add-to-lot/add-to-lot.component';
import { SkeletonListLoaderComponent } from './common/components/skeleton-list-loader/skeleton-list-loader.component';
import { AddFullnessComponent } from './common/components/add-fullness/add-fullness.component';
import { SubmitLotComponent } from './common/components/submit-lot/submit-lot.component';
import { UploadPhotoGradeComponent } from './common/components/upload-photo-grade/upload-photo-grade.component';
import { PhotoGradeCardComponent } from './common/components/photo-grade-card/photo-grade-card.component';
import { AddCodeToLotComponent } from './common/components/add-code-to-lot/add-code-to-lot.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    HeaderComponent,
    GenericCodeCardComponent,
    AddToLotComponent,
    SkeletonListLoaderComponent,
    AddFullnessComponent,
    SubmitLotComponent,
    UploadPhotoGradeComponent,
    PhotoGradeCardComponent,
    AddCodeToLotComponent
  ],
  exports: [
    HeaderComponent,
    GenericCodeCardComponent,
    AddToLotComponent,
    SkeletonListLoaderComponent,
    AddFullnessComponent,
    SubmitLotComponent,
    UploadPhotoGradeComponent,
    PhotoGradeCardComponent,
    AddCodeToLotComponent
  ],
})
export class SharedModule {}
