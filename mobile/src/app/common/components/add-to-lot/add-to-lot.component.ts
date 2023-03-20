import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LotsService } from '@app/common/services/lots.service';
import { Lots } from '@app/common/models/lots';
import { CodesService } from '@app/common/services/codes.service';
import { LotItemsService } from '@app/common/services/lot-items.service';
import { PhotoGradeService } from '@app/common/services/photo-grade.service';
import { fullnessPrice } from '@app/common/utils/currencyUtils';

@Component({
  selector: 'app-add-to-lot',
  templateUrl: './add-to-lot.component.html',
  styleUrls: ['./add-to-lot.component.scss'],
})
export class AddToLotComponent implements OnInit {
  @Input()
  isPhotoGrade = false;

  lotId: number;
  fullness = 100;
  lots: Lots[];
  codeDetails = {
    codeId: 0,
    converterName: '',
    originalPrice: 0,
    fullnessPercentage: 100,
  };

  constructor(
    private modalCtrl: ModalController,
    private lotsService: LotsService,
    private codesService: CodesService,
    private photoGradeService: PhotoGradeService,
    private lotItemsService: LotItemsService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Getting list of lots.',
    });

    loading.present();

    this.lots = await this.lotsService.lots({
      pageNumber: 1,
      pageSize: 66955359,
      searchCategory: 'isSubmitted',
      searchQuery: 'false',
    });

    this.lotId = Number(this.lotsService.selectedLot?.id) || 0;

    if (this.isPhotoGrade) {
      this.codeDetails = {
        codeId: this.photoGradeService.selectedPhotoGrade.codeId,
        converterName: this.photoGradeService.selectedPhotoGrade.converterName,
        originalPrice: this.photoGradeService.selectedPhotoGrade.price,
        fullnessPercentage: this.photoGradeService.selectedPhotoGrade.fullness,
      };
    } else {
      this.codeDetails = {
        codeId: this.codesService.selectedCode.id,
        converterName: this.codesService.selectedCode.converterName,
        originalPrice: this.codesService.selectedCode.finalUnitPrice,
        fullnessPercentage: 100,
      };
    }

    console.log(this.codesService.selectedCode);


    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async add() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding to lot ....',
    });

    loading.present();

    this.lotsService.setSelectedLot = this.lots.find(
      (lot) => Number(lot.id) === this.lotId
    );

    await this.lotItemsService.addCodeToLot({
      ...this.codeDetails,
      lotId: this.lotId,
      originalPrice: this.isPhotoGrade
        ? fullnessPrice(
          this.photoGradeService.selectedPhotoGrade.fullness,
          this.photoGradeService.selectedPhotoGrade.price
        )
        : fullnessPrice(
          this.fullness,
          this.codesService.selectedCode.finalUnitPrice
        ),
      fullnessPercentage: this.isPhotoGrade
        ? this.photoGradeService.selectedPhotoGrade.fullness
        : this.fullness,
      photoGradeId: this.photoGradeService.selectedPhotoGrade != null ? this.photoGradeService.selectedPhotoGrade.photoGradeId : null,
    }).finally(() => {
      this.photoGradeService.setSelectedPhotoGrade = null;
    });

    loading.dismiss();
    this.router.navigate(['/lot-list']);
    this.modalCtrl.dismiss();
  }
}
