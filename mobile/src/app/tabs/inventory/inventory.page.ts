import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NavigationStart,
  Router,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';
import {
  InfiniteScrollCustomEvent,
  LoadingController,
  ModalController,
  SegmentCustomEvent,
  IonContent,
  AlertController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LotsService } from '@app/common/services/lots.service';
import {
  LotInventoryList,
  LotInventoryResponse,
} from '@app/common/models/lots';
import { currencyFormat } from '@app/common/utils/currencyUtils';
import { toLocalTime } from '@app/common/utils/timeUtils';
import { AccountService } from '@app/common/services/account.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnDestroy {
  @ViewChild('content') content: IonContent;

  defaultSegment = 'active';
  lots: LotInventoryList = { data: [], pagination: null };
  lotName: string;
  isLoading = false;
  closed$ = new Subject<any>();
  navigationSubscription: Subscription;
  activeSegment = 'active';
  userSubscription: number = 0;

  constructor(
    private route: Router,
    private modalCtrl: ModalController,
    private lotsService: LotsService,
    private loadingCtrl: LoadingController,
    private accountService: AccountService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.onLoad();
    this.navigationSubscription = this.route.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.closed$)
    ).subscribe(event => {
      console.log(event['url'])
      if (event['url'] === '/tabs/tabs/inventory') {
        this.onLoad();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  async onLoad() {
    this.defaultSegment = 'active';
    this.activeSegment = this.defaultSegment;
    this.lots = { data: [], pagination: null };
    this.isLoading = true;
    this.lots = await this.lotsService.inventorySummary({
      pageNumber: 1,
      pageSize: 100,
      searchCategory: 'isSubmitted',
      searchQuery: 'false',
    });
    this.userSubscription = this.accountService.currentUser.subscription;
    this.sortLots();
    this.isLoading = false;
  }

  async segmentChanged(e: Event) {
    this.content.scrollToTop(0);

    const event = e as SegmentCustomEvent;
    this.activeSegment = event.detail.value;
    if (event.detail.value !== this.defaultSegment) {
      this.isLoading = true;
      this.lots = { data: [], pagination: null };
      this.defaultSegment = event.detail.value;
      this.activeSegment = this.defaultSegment;
      this.lots = await this.lotsService.inventorySummary({
        pageNumber: 1,
        pageSize: 100,
        ...(this.defaultSegment === 'closed'
          ? {
            searchCategory: 'isSubmitted',
            searchQuery: 'true',
          }
          : {
            searchCategory: 'isSubmitted',
            searchQuery: 'false',
          }),
      });
      this.sortLots();
      this.isLoading = false;
    }
  }

  goToLotList(lot: LotInventoryResponse) {
    this.lotsService.setSelectedLot = lot;
    this.route.navigate(['lot-list']);
  }

  async onCreateLot() {
    const loading = await this.loadingCtrl.create({
      message: 'Creating new lot ...',
    });

    loading.present();
    const data = await this.lotsService.addlot({ lotName: this.lotName });
    this.modalCtrl.dismiss();
    this.lots.data = [data, ...this.lots.data];
    loading.dismiss();
  }

  async onIonInfinite(ev) {
    const nextLink = this.lots?.pagination?.nextPageLink;
    this.isLoading = true;

    if (nextLink && !this.lotsService.isLoadingMore) {
      const { data, pagination } = await this.lotsService.nextInventory(
        nextLink
      );
      this.lots = {
        data: [...this.lots.data, ...data],
        pagination,
      };
    }

    this.isLoading = false;
    this.sortLots();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  sortLots() {
    function custom_sort(a, b) {
      return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
    }
    this.lots.data.sort(custom_sort);
  }

  async deleteLot(event: any, lot: LotInventoryResponse) {
    event.stopPropagation();

    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you would like to delete this lot?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: `Deleting ${lot.lotName} ...`,
            });
        
            loading.present();
            const data = await this.lotsService.deletelot(lot.lotId);
            if (data) {
              this.lots.data.splice(this.lots.data.indexOf(lot), 1);
            }
            loading.dismiss();
          }
        }
      ],
    });
    
    await alert.present();    
  }

  clear() {
    this.lotName = '';
  }

  formatDate(date: string) {
    return toLocalTime(date, 'MM/DD/YYYY');
  }

  formatPrice(price: number) {
    return currencyFormat(price);
  }
}
