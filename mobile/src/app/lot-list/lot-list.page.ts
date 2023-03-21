import { Component, OnInit } from '@angular/core';
import {
  AccordionGroupCustomEvent,
  AlertController,
  InputCustomEvent,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';

import {
  LotItemsFullnessResponse,
  LotItemsResponse,
} from '@app/common/models/lot-items';
import { LotInventoryResponse, Lots } from '@app/common/models/lots';
import { LotItemsService } from '@app/common/services/lot-items.service';
import { LotsService } from '@app/common/services/lots.service';
import { AddFullnessComponent } from '@app/common/components/add-fullness/add-fullness.component';
import { LotItemFullnessService } from '@app/common/services/lot-item-fullness.service';
import { SubmitLotComponent } from '@app/common/components/submit-lot/submit-lot.component';
import { AccountService } from '@app/common/services/account.service';
import { currencyFormat, fullnessPrice } from '@app/common/utils/currencyUtils';

@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.page.html',
  styleUrls: ['./lot-list.page.scss'],
})
export class LotListPage implements OnInit {
  lot: LotInventoryResponse;
  lotItems: LotItemsResponse[] = [];
  lotItemsFullness: LotItemsFullnessResponse[] = [];
  lotItem2Fullness = {};
  isLoading = false;
  fullness = 100;
  codeName = '';
  price: number;
  lotItemId: string | number;
  fullPrice: number;
  canInvoice: boolean;
  isModalActive = false;

  constructor(
    private lotsService: LotsService,
    private lotItemsService: LotItemsService,
    private itemFullnessService: LotItemFullnessService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accountService: AccountService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.onLoad();
  }

  async onLoad() {
    this.canInvoice = this.accountService.currentUser.canInvoice;
    this.lot = this.lotsService.selectedLot as LotInventoryResponse;
    await this.fetchLot();
    await this.fetchLotCodes();
    this.lotItems.forEach(async (lotItem) => {
      const fullness = await this.lotItemsService.lotItemsFullness(
        lotItem.id.toString(),
        {
          pageNumber: 1,
          pageSize: 66955359,
        }
      );
      this.lotItem2Fullness[lotItem.id] = fullness;
    });
  }

  async fetchLot(isLoadingShow = true) {
    this.isLoading = isLoadingShow;
    const data = await this.lotsService.inventorySummary({
      pageNumber: 1,
      pageSize: 1,
      searchCategory: 'lotId',
      searchQuery: (this.lot.lotId || this.lot.id) as string,
    });
    this.lot = data.data[0];
    this.isLoading = false;
  }

  async fetchLotCodes() {
    this.isLoading = true;
    this.lotItems = await this.lotItemsService.lotItems(
      (this.lot.lotId || this.lot.id) as string,
      { pageNumber: 1, pageSize: 66955359 }
    );
    this.isLoading = false;
    console.log(this.lotItems);
  }

  async openModalFullness() {
    const modal = await this.modalCtrl.create({
      component: AddFullnessComponent,
      cssClass: 'fullness-modal',
      animated: false,
    });

    this.isModalActive = true; // Hack for #66008
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    this.isModalActive = false;

    if (role === 'add') {
      const loading = await this.loadingCtrl.create({
        message: 'Adding to code ...',
      });
      loading.present();
      await this.itemFullnessService.createItemFullness({
        fullnessPercentage: data.fullness,
        qty: data.qty,
        unitPrice: data.price,
        lotItemId: this.lotItemId,
      });
      this.lotItemsFullness = await this.lotItemsService.lotItemsFullness(
        this.lotItemId as string,
        {
          pageNumber: 1,
          pageSize: 66955359,
        }
      );

      this.fetchLot();

      loading.dismiss();
      await this.onLoad();
    }
  }

  async accordionGroupChange(e: Event) {
    const event = e as AccordionGroupCustomEvent;
    const { detail } = event;
    if (detail.value && detail.value in this.lotItem2Fullness) {
      this.lotItemId = detail.value;
      this.lotItemsFullness = this.lotItem2Fullness[detail.value];
    } else if (detail.value) {
      this.lotItemId = detail.value;
      this.lotItemsFullness = await this.lotItemsService.lotItemsFullness(
        detail.value,
        {
          pageNumber: 1,
          pageSize: 66955359,
        }
      );
    }
  }

  async addCode() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding to code ...',
    });

    loading.present();
    await this.lotItemsService.addCodeToLot({
      lotId: this.lot.lotId || this.lot.id,
      converterName: this.codeName,
      originalPrice: this.price,
      fullnessPercentage: this.fullness,
    });
    await this.fetchLot();
    await this.fetchLotCodes();
    this.modalCtrl.dismiss();
    loading.dismiss();
  }

  async removeItemFullness(id: string | number) {
    const confirm = await this.presentConfirmationDelete();

    if (confirm === 'confirm') {
      const data = await this.itemFullnessService.removeItemFullness(
        id as string
      );

      if (data) {
        this.lotItemsFullness = this.lotItemsFullness.filter(
          (item) => item.id !== id
        );

        if (!this.lotItemsFullness.length) {
          this.fetchLot();
          this.fetchLotCodes();
        }
      }
    }
  }

  async updateQtyItemFullness(
    item: LotItemsFullnessResponse,
    increment: boolean
  ) {
    const qty = increment ? item.qty + 1 : item.qty - 1;

    if (qty < 1) {
      this.removeItemFullness(item.id as string);
    } else {
      item.qty = qty;
      this.lotItemsFullness = this.lotItemsFullness.map((lotItem) =>
        lotItem.id === item.id ? item : lotItem
      );

      await this.itemFullnessService.updateItemFullness({
        id: item.id,
        fullnessPercentage: item.fullnessPercentage,
        lotItemId: item.lotItemId,
        unitPrice: item.unitPrice,
        qty: item.qty,
      });

      this.fetchLot(false);
    }
  }

  async presentConfirmationDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure you want to delete ?',
      cssClass: 'confirmation-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'confirm',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    return role;
  }

  async submitLot() {
    const modal = await this.modalCtrl.create({
      component: SubmitLotComponent,
      cssClass: 'submit-lot-modal',
      animated: false,
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'submit') {
      const loading = await this.loadingCtrl.create({
        message: 'Submitting lot ...',
      });

      loading.present();
      const formData = new FormData();
      formData.append('attachment', data.attachment);

      const dataResult = await this.lotsService.submitLot({
        lotId: this.lot.lotId || this.lot.id,
        businessName: data.businessName,
        email: data.email,
        formData,
      });

      if (dataResult) {
        const toast = await this.toastCtrl.create({
          message: 'Successfully submitted lot.',
          duration: 2000,
          color: 'success',
        });

        toast.present();
        this.router.navigate(['/tabs/tabs/inventory']);
      }

      loading.dismiss();
    }
  }

  onPriceKeyDown(e) {
    if (e.key === 'e' || e.key === '.') {
      e.preventDefault();
    }
  }

  onInputPrice() {
    this.fullness = 100;
    this.fullPrice = 0;
  }

  onBlurPrice(e: Event) {
    const event = e as InputCustomEvent;
    this.fullPrice = event.target.value as number;
  }

  onChangeFullness() {
    this.price = fullnessPrice(this.fullness, this.fullPrice);
  }

  reset() {
    this.fullness = 100;
    this.codeName = '';
    this.price = null;
    this.fullPrice = null;
  }

  formatPrice(price: number) {
    return currencyFormat(price);
  }
}
