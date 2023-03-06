import { Component, OnInit } from '@angular/core';

import { AddToLotComponent } from '@app/common/components/add-to-lot/add-to-lot.component';
import { Code } from '@app/common/models/codes';
import { PhotoGradeResponse } from '@app/common/models/photo-grade';
import { CodesService } from '@app/common/services/codes.service';
import { PhotoGradeService } from '@app/common/services/photo-grade.service';
import { currencyFormat } from '@app/common/utils/currencyUtils';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-generic-view',
  templateUrl: './generic-view.page.html',
  styleUrls: ['./generic-view.page.scss'],
})
export class GenericViewPage implements OnInit {
  code: Code;
  photoGrade: PhotoGradeResponse;
  currentPhoto: string;

  constructor(
    private codeService: CodesService,
    private photoGradeService: PhotoGradeService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.code = this.codeService.selectedCode;

    if (this.code.photoGradeId) {
      this.photoGrade = await this.photoGradeService.photoGrade(
        this.code.photoGradeId
      );

      this.currentPhoto =
        this.photoGrade.photoGradeItems.length > 0
          ? this.photoGrade.photoGradeItems[0].fileUrl
          : '/assets/cm-logo-home.svg';
    } else {
      this.currentPhoto = '/assets/cm-logo-home.svg';
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddToLotComponent,
      cssClass: 'add-lot-modal',
      animated: false,
    });
    await modal.present();
  }

  onSelectImage = (image: string) => {
    this.currentPhoto = image;
  };

  formatPrice(price: number) {
    return currencyFormat(price);
  }
}
