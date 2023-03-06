import { Component, OnInit } from '@angular/core';
import { fullnessPrice } from '@app/common/utils/currencyUtils';
import { InputCustomEvent, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-fullness',
  templateUrl: './add-fullness.component.html',
  styleUrls: ['./add-fullness.component.scss'],
})
export class AddFullnessComponent implements OnInit {
  fullness = 100;
  qty: number;
  price: number;
  fullPrice: number;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  add() {
    return this.modalCtrl.dismiss(
      { qty: this.qty, fullness: this.fullness, price: this.price },
      'add'
    );
  }

  onPriceKeyDown(e) {
    if (e.key === 'e' || e.key === '.') {
      e.preventDefault();
    }
  }

  onInputPrice(e) {
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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
