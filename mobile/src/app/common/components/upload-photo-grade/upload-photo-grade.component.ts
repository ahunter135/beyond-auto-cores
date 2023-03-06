import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PhotoService } from '@app/common/services/photo.service';
import { Photo } from '@capacitor/camera';

@Component({
  selector: 'app-upload-photo-grade',
  templateUrl: './upload-photo-grade.component.html',
  styleUrls: ['./upload-photo-grade.component.scss'],
})
export class UploadPhotoGradeComponent implements OnInit {
  @Input()
  photoDataUrl = '';
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  currentPhoto: Photo;

  constructor(private photo: PhotoService) {}

  ngOnInit() {}

  async addPhotoGrade() {
    const photo = await this.photo.promptPhoto();
    this.currentPhoto = photo;
    this.add.emit(this.currentPhoto);
  }

  onRemovePhotoGrade() {
    this.remove.emit(this.currentPhoto);
    this.currentPhoto = null;
  }
}
