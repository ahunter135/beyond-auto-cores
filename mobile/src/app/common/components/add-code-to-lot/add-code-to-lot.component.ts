import { Component, OnInit } from '@angular/core';
import { LotItemsService } from '@app/common/services/lot-items.service';
import { InputCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { fullnessPrice } from '@app/common/utils/currencyUtils';

@Component({
  selector: 'app-add-code-to-lot',
  templateUrl: './add-code-to-lot.component.html',
  styleUrls: ['./add-code-to-lot.component.scss'],
})
export class AddCodeToLotComponent implements OnInit {
  codeName = '';
  price: number = null;
  fullness: number = 100;
  fullPrice: number = null

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private lotItemsService: LotItemsService,
  ) { }

  ngOnInit() {}

  submit() {
    return this.modalCtrl.dismiss(
      { codeName: this.codeName, price: this.price, fullness: this.fullness, fullPrice: this.fullPrice },
      'add'
    );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  reset() {
    this.fullness = 100;
    this.codeName = '';
    this.price = null;
    this.fullPrice = null;
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

  checkEnterKeyDown(e) {
    if (e.keyCode === 13) {
      Keyboard.hide();
    }
  }

}
