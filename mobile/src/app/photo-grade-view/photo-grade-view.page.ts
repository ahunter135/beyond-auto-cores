import { Component, OnInit } from '@angular/core';
import { PhotoGradeListResponse } from '@app/common/models/photo-grade';
import { PhotoGradeService } from '@app/common/services/photo-grade.service';

@Component({
  selector: 'app-photo-grade-view',
  templateUrl: './photo-grade-view.page.html',
  styleUrls: ['./photo-grade-view.page.scss'],
})
export class PhotoGradeViewPage implements OnInit {
  photoGrade: PhotoGradeListResponse;
  thumbnail = '../../../assets/cm-logo-home.svg';
  constructor(private photoGradeService: PhotoGradeService) {}

  ngOnInit() {
    this.photoGrade = this.photoGradeService.selectedPhotoGrade;
  }
}
