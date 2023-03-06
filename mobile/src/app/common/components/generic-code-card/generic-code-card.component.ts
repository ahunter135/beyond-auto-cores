import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Code } from '@app/common/models/codes';
import { CodesService } from '@app/common/services/codes.service';
import { AddToLotComponent } from '../add-to-lot/add-to-lot.component';
import { currencyFormat } from '@app/common/utils/currencyUtils';

@Component({
  selector: 'app-generic-code-card',
  templateUrl: './generic-code-card.component.html',
  styleUrls: ['./generic-code-card.component.scss'],
})
export class GenericCodeCardComponent implements OnInit {
  @Input()
  code: Code;

  constructor(
    private router: Router,
    private codeService: CodesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  goToGeneric() {
    this.codeService.setSelectedCode = this.code;
    this.router.navigate(['/generic-view']);
  }

  async openModal() {
    this.codeService.setSelectedCode = this.code;
    const modal = await this.modalCtrl.create({
      component: AddToLotComponent,
      cssClass: 'add-lot-modal',
      animated: false,
    });

    await modal.present();
  }

  formatPrice(price: number) {
    return currencyFormat(price);
  }
}
