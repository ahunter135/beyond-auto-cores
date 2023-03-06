import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '@app/common/models/alert';
import { AlertService } from '@app/common/services/alert.service';
import { ActionSheetController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.page.html',
  styleUrls: ['./notification-view.page.scss'],
})
export class NotificationViewPage implements OnInit, OnDestroy {
  alert: Alert;
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private route: Router
  ) {}

  async ngOnInit() {
    this.alert = this.alertService.selectedAlert;
    if (!this.alert.status) {
      await this.alertService.updateAlert({
        id: this.alert.id,
        dateSent: this.alert.dateSent,
        message: this.alert.message,
        photoGradeId: this.alert.photoGradeId,
        photoGradeUserId: this.alert.photoGradeUserId,
        title: this.alert.title,
        status: 1,
      });
    }
  }

  ngOnDestroy() {
    this.alertService.setSelectedAlert = null;
  }

  async delete() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Delete this notification?',
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

            const data = await this.alertService.deleteAlert(
              String(this.alert.id)
            );

            if (data) {
              loading.dismiss();
              actionSheet.dismiss();
              this.alertService.setSelectedAlert = null;

              this.route.navigate(['/notifications']);
            }
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
}
