import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Code } from '@app/common/models/codes';
import { CodesService } from '@app/common/services/codes.service';
import { AddToLotComponent } from '../add-to-lot/add-to-lot.component';
import { currencyFormat } from '@app/common/utils/currencyUtils';
import { AccountService } from '@app/common/services/account.service';

@Component({
  selector: 'app-generic-code-card',
  templateUrl: './generic-code-card.component.html',
  styleUrls: ['./generic-code-card.component.scss'],
})
export class GenericCodeCardComponent implements OnInit {
  @Input()
  code: Code;
  userSubscription: number = 1;
  constructor(
    private router: Router,
    private codeService: CodesService,
    private modalCtrl: ModalController,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.userSubscription = this.accountService.currentUser.subscription;
  }

  goToGeneric() {
    this.codeService.setSelectedCode = this.code;
    console.log(this.code);
    this.router.navigate(['/generic-view']);
  }

  async openModal() {
    if (this.userSubscription == 3) {
      alert("You need to upgrade to use this feature");
      return;
    }
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
