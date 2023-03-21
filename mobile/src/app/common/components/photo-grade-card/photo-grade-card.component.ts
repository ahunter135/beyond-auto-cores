import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PhotoGradeListResponse,
  PhotoGradeResponse,
} from '@app/common/models/photo-grade';
import { PhotoGradeService } from '@app/common/services/photo-grade.service';
import { currencyFormat } from '@app/common/utils/currencyUtils';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { AddToLotComponent } from '../add-to-lot/add-to-lot.component';

@Component({
  selector: 'app-photo-grade-card',
  templateUrl: './photo-grade-card.component.html',
  styleUrls: ['./photo-grade-card.component.scss'],
})
export class PhotoGradeCardComponent implements OnInit {
  @Input() photoGrade: PhotoGradeListResponse;
  name: string;
  thumbnail = '../../../assets/cm-logo-home.svg';

  constructor(
    private modalCtrl: ModalController,
    private photoGradeService: PhotoGradeService,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log(this.photoGrade.converterName === "");
    this.name = this.photoGrade.converterName === "" ? "No Code" : this.photoGrade.converterName;
  }

  async openModal() {
    this.photoGradeService.setSelectedPhotoGrade = this.photoGrade;
    console.log(this.photoGrade);
    const modal = await this.modalCtrl.create({
      component: AddToLotComponent,
      cssClass: 'add-lot-modal',
      componentProps: {
        isPhotoGrade: true,
      },
      animated: false,
    });

    await modal.present();
  }

  onView() {
    this.photoGradeService.setSelectedPhotoGrade = this.photoGrade;
    this.router.navigate(['/photo-grade-view']);
  }

  async delete() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Delete this photo grade?',
      cssClass: 'photo-grade-action-sheet',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Deleting ...',
            });
            loading.present();

            await this.photoGradeService.deletePhotoGrade(
              this.photoGrade.photoGradeId.toString()
            );

            loading.dismiss();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  formatPrice(price: number) {
    return currencyFormat(price);
  }
}
