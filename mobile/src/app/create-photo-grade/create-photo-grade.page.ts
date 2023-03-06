import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/common/services/account.service';
import { PhotoGradeService } from '@app/common/services/photo-grade.service';
import { PhotoService } from '@app/common/services/photo.service';
import { Photo } from '@capacitor/camera';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-photo-grade',
  templateUrl: './create-photo-grade.page.html',
  styleUrls: ['./create-photo-grade.page.scss'],
})
export class CreatePhotoGradePage implements OnInit {
  fullness = 100;
  notes = '';
  photoGrade: Blob[] = [];
  photoGradeDataUrl: string[] = [];
  showError = false;

  constructor(
    private photoGradeService: PhotoGradeService,
    private accountService: AccountService,
    private photoService: PhotoService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private route: Router
  ) {}

  ngOnInit() {}

  async submitGrading() {
    if (this.photoGradeDataUrl.length) {
      const loading = await this.loadingCtrl.create({
        message: 'Submitting photo grade ...',
      });
      loading.present();
      const formData = new FormData();
      this.photoGrade.forEach((dataUrl: string | Blob) => {
        formData.append('photoGrades', dataUrl as Blob);
      });

      await this.photoGradeService.submitPhotoGrade({
        fullNess: this.fullness,
        notes: this.notes,
        formData,
      });

      await this.accountService.user(
        this.accountService.currentUser.id.toString()
      );

      loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: 'Successfully submited photo grade.',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      this.route.navigate(['/tabs/tabs/photo-grade']);
    } else {
      this.showError = true;
    }
  }

  onAddPhoto(photoUrl: Photo, index: number) {
    this.photoGradeDataUrl[index] = photoUrl.dataUrl;
    this.photoGrade[index] = this.photoService.dataURItoBlob(photoUrl.dataUrl);
  }

  onRemovePhotoGrade(index: number) {
    this.photoGrade.splice(index, 1);
    this.photoGradeDataUrl.splice(index, 1);
  }
}
