import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@app/common/services/photo.service';
import { Photo } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-submit-lot',
  templateUrl: './submit-lot.component.html',
  styleUrls: ['./submit-lot.component.scss'],
})
export class SubmitLotComponent implements OnInit {
  businessName = '';
  email: string;
  currentPhoto: Photo | null;

  constructor(
    private modalCtrl: ModalController,
    private photoService: PhotoService
  ) {}

  ngOnInit() {}

  async uploadIdPhoto() {
    const photo = await this.photoService.promptPhoto();
    this.currentPhoto = photo;
  }

  onRemovePhotoGrade() {
    this.currentPhoto = null;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    return this.modalCtrl.dismiss(
      {
        businessName: this.businessName,
        email: this.email,
        attachment: this.currentPhoto
          ? this.photoService.dataURItoBlob(this.currentPhoto.dataUrl)
          : '',
      },
      'submit'
    );
  }
}
