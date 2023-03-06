import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@app/common/services/account.service';
import { PhotoService } from '@app/common/services/photo.service';
import { Photo } from '@capacitor/camera';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  @ViewChild('cropper') cropper: ImageCropperComponent;

  userProfileForm: FormGroup;
  currentPhoto: Photo;
  userProfileImage: string;
  userEmail: string;
  myImage: any = '';
  croppedImage: any = '';
  userSubscriptionName = '';

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private photoService: PhotoService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertController: AlertController
  ) {
    this.userProfileImage =
      this.accountService.currentUser.fileUrl ||
      // eslint-disable-next-line max-len
      `https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=170667a&w=0&h=VlwTJ3LpA8Pjzk9u8XYgkII0Vrvrb07e67cHALFX_aY=`;
    this.userEmail = this.accountService.currentUser.email;
    this.userSubscriptionName =
      this.accountService.currentUser.subscriptionName;
  }

  ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      firstName: [
        this.accountService.currentUser.firstName,
        [Validators.required],
      ],
      lastName: [
        this.accountService.currentUser.lastName,
        [Validators.required],
      ],
    });
  }

  async save() {
    if (this.userProfileForm.valid) {
      const user = this.accountService.currentUser;
      const { firstName, lastName } = this.userProfileForm.value;

      const loading = await this.loadingCtrl.create({
        message: 'Updating user ...',
      });

      const toast = await this.toastCtrl.create({
        message: 'Successfully updated user.',
        duration: 2000,
        color: 'success',
      });

      loading.present();

      const formData = new FormData();

      if (this.croppedImage) {
        const dataImage = this.photoService.dataURItoBlob(this.croppedImage);
        formData.append('photo', dataImage as Blob);
      }

      const data = await this.accountService.updateUser({
        id: user.id,
        email: user.email,
        firstName,
        lastName,
        role: user.role,
        subscription: user.subscription,
        tier: user.tier,
        isUpdatePhoto: this.currentPhoto ? true : false,
        tier1AdminEnabled: this.accountService.currentUser.tier1AdminEnabled,
        tier1UserEnabled: this.accountService.currentUser.tier1UserEnabled,
        tier1PercentLevel: this.accountService.currentUser.tier1PercentLevel,
        ...(this.currentPhoto && { formData }),
      });

      if (data) {
        this.accountService.user(user.id.toString());
        toast.present();
      }
      loading.dismiss();
    }
  }

  async uploadPhoto() {
    const photo = await this.photoService.promptPhotoBase64();
    this.currentPhoto = photo;

    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.myImage = `data:image/jpeg;base64,${photo.base64String}`;
    this.croppedImage = null;
  }

  imageLoaded() {
    this.loadingCtrl.dismiss();
  }

  loadImageFailed() {
    this.loadingCtrl.dismiss();
  }

  cropImage() {
    this.croppedImage = this.cropper.crop().base64;
    this.myImage = null;
  }

  async cancelSubscription() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to cancel your subscription?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.accountService.cancelSubscription(
              this.accountService.currentUser.id
            );
          },
        },
      ],
    });

    await alert.present();
  }
}
