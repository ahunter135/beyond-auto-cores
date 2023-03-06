import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@app/common/services/account.service';
import { CustomValidators } from '@app/common/validators/custom.validator';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  get passwordMatchError() {
    return (
      this.changePasswordForm.getError('mismatch') &&
      this.changePasswordForm.get('confirm')?.touched
    );
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        old: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirm: ['', [Validators.required]],
      },
      { validators: CustomValidators.matchValidator('password', 'confirm') }
    );
  }

  async save() {
    if (this.changePasswordForm.valid) {
      const userId = this.accountService.currentUser.id;
      const { password: newPassword, old: oldPassword } =
        this.changePasswordForm.value;

      const loading = await this.loadingCtrl.create({
        message: 'Updating password ...',
      });

      const toast = await this.toastCtrl.create({
        message: 'Successfully update password.',
        duration: 2000,
        color: 'success',
      });

      loading.present();
      const data = await this.accountService.updatePassword({
        id: userId,
        oldPassword,
        newPassword,
        confirmPassword: newPassword,
      });

      if (data) {
        toast.present();
      }

      loading.dismiss();
    }
  }
}
