import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Margin } from '@app/common/models/margin';
import { User } from '@app/common/models/user';
import { AccountService } from '@app/common/services/account.service';
import { MarginService } from '@app/common/services/margin.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-margin',
  templateUrl: './margin.page.html',
  styleUrls: ['./margin.page.scss'],
})
export class MarginPage implements OnInit {
  marginForm: FormGroup;
  margin: number;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private marginService: MarginService,
    private loadingCtrl: LoadingController,
    private accountService: AccountService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.marginForm = this.formBuilder.group({
      margin: ['', []],
    });

    const loading = await this.loadingCtrl.create({
      message: 'Loading ...',
    });

    loading.present();

    this.currentUser = await this.accountService.user(
      String(this.accountService.currentUser.id)
    );

    this.margin = this.currentUser.margin || 0;

    this.marginForm.setValue({ margin: this.margin });
    loading.dismiss();
  }

  async save() {
    if (this.marginForm.valid) {
      const { margin } = this.marginForm.value;

      const loading = await this.loadingCtrl.create({
        message: 'Saving ...',
      });

      const toast = await this.toastController.create({
        message: 'Successfully updated margin.',
        duration: 2000,
        color: 'success',
      });

      loading.present();

      const data = await this.accountService.updateMargin({
        id: this.currentUser.id,
        margin,
      });

      if (data) {
        this.accountService.user(String(this.currentUser.id));
        toast.present();
      }

      loading.dismiss();
    }
  }
}
