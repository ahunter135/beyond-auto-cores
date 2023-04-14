import { Component, OnInit } from '@angular/core';
import { PhotoGradeListResponse } from '@app/common/models/photo-grade';
import { PhotoGradeService } from '@app/common/services/photo-grade.service';
import { PhotoviewerComponent } from '@app/photoviewer/photoviewer.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo-grade-view',
  templateUrl: './photo-grade-view.page.html',
  styleUrls: ['./photo-grade-view.page.scss'],
})
export class PhotoGradeViewPage implements OnInit {
  photoGrade: PhotoGradeListResponse;
  thumbnail = '../../../assets/cm-logo-home.svg';
  constructor(private photoGradeService: PhotoGradeService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.photoGrade = this.photoGradeService.selectedPhotoGrade;
  }
  
  async openViewer() {
    if (this.photoGrade.fileUrl) {
      const modal = await this.modalCtrl.create({
        component: PhotoviewerComponent,
        componentProps: {
          url: this.photoGrade.fileUrl
        }
      });
  
      modal.present();
    }
    
  }
}
