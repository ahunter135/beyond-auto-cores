import { Capacitor } from '@capacitor/core';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Router,
  Event as NavigationEvent,
  NavigationStart,
} from '@angular/router';
import {
  AnimationController,
  InputCustomEvent,
  IonInput,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PushNotifications } from '@capacitor/push-notifications';

import { CodeList } from '@app/common/models/codes';
import { Lots } from '@app/common/models/lots';
import { CodesService } from '@app/common/services/codes.service';
import { LotItemsService } from '@app/common/services/lot-items.service';
import { LotsService } from '@app/common/services/lots.service';
import { fullnessPrice } from '@app/common/utils/currencyUtils';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('search') searchInput: IonInput;
  dataCodes: CodeList | null = { data: [], pagination: null };
  searchCode = '';
  lots: Lots[];
  isLoading = false;
  fullness = 100;
  codeName = '';
  price: number;
  lotId = '';
  fullPrice: number;
  navigationSubscription: Subscription;
  isActivePage = true;
  searchCounter: number = 0;

  constructor(
    private route: Router,
    private codesService: CodesService,
    private lotsService: LotsService,
    private lotItemsService: LotItemsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController
  ) {
    this.navigationSubscription = route.events
      .pipe(
        filter((event: NavigationEvent) => event instanceof NavigationStart)
      )
      .subscribe(() => {
        this.search().then(([codes, searchNumber]) => {
          if (searchNumber === this.searchCounter - 1) {
            this.dataCodes = codes;
            this.isLoading = false;
          }
        }).catch(e => {
          this.isLoading = false;
        });
      });
  }

  ngOnInit() {
    if (Capacitor.isPluginAvailable('PushNotifications')) {
      this.initializeFCM();
    }
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    if (Capacitor.isPluginAvailable('Keyboard')) {
      Keyboard.addListener('keyboardWillShow', async (info) => {
        if (this.isActivePage) {
          await Keyboard.setResizeMode({ mode: KeyboardResize.None });
          await this.animationCtrl
            .create()
            .addElement(document.querySelector('.fab'))
            .duration(300)
            .iterations(1)
            .easing('cubic-bezier(.17, .59, .4, .77)')
            .to('transform', `translateY(-${info.keyboardHeight}px)`)
            .play();
        }
      });

      Keyboard.addListener('keyboardWillHide', async () => {
        await this.animateKeyboardDown();
      });
    }
  }

  ionViewDidEnter() {
    this.isActivePage = true;
  }

  ionViewWillLeave() {
    this.isActivePage = false;
  }

  async initializeFCM() {
    await PushNotifications.addListener('pushNotificationReceived', () => {
      this.search();
    });
  }

  async fetchLots() {
    this.lots = await this.lotsService.lots({
      pageNumber: 1,
      pageSize: 66955359,
      searchCategory: 'isSubmitted',
      searchQuery: 'false',
    });
  }

  async keyEnter(_) {
    Keyboard.hide();
    await this.animateKeyboardDown();
    const element = await this.searchInput.getInputElement();
    element.blur(); // Hack to stop bouncing keyboard.
  }

  goToGenerics() {
    this.route.navigate(['/generics']);
  }

  onSearch(e: Event) {
    const event = e as InputCustomEvent;
    this.searchCode = event.target?.value as string;
    this.search().then(([codes, searchNumber]) => {
      if (searchNumber === this.searchCounter - 1) {
        this.dataCodes = codes;
        this.isLoading = false;
      }
    }).catch(e => {
      this.isLoading = false;
    });
  }

  async search() : Promise<[CodeList, number]> {
    const currentSearch = this.searchCounter++;
    this.isLoading = true;
    let codes = { data: [], pagination: null }
    if (this.searchCode) {
      codes = await this.codesService.codes({
        searchCategory: 'converterName',
        searchQuery: this.searchCode as string,
        pageSize: 24,
        pageNumber: 1,
        isCustom: true,
        isAdmin: true,
      });
    } else {
      this.dataCodes.data = [];
    }
    return [codes, currentSearch];
  }

  onClearEmpty(e: Event) {
    const event = e as InputCustomEvent;
    const value = event.target?.value;
    if (!value) {
      this.dataCodes.data = [];
    }
  }

  async addCode() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding to lot ....',
    });

    loading.present();

    this.lotsService.setSelectedLot = this.lots.find(
      (lot) => lot.id === this.lotId
    );

    const data = await this.lotItemsService.addCodeToLot({
      lotId: this.lotId,
      converterName: this.codeName,
      originalPrice: this.price,
      fullnessPercentage: this.fullness,
    });

    if (data) {
      this.reset();
    }

    this.modalCtrl.dismiss();
    loading.dismiss();
    this.route.navigate(['/lot-list']);
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

  reset() {
    this.fullness = 100;
    this.codeName = '';
    this.price = null;
    this.fullPrice = null;
  }

  onCancelAddCode() {
    this.modalCtrl.dismiss();
    this.reset();
  }

  private async animateKeyboardDown() {
    await this.animationCtrl
      .create()
      .addElement(document.querySelector('.fab'))
      .duration(300)
      .iterations(1)
      .easing('cubic-bezier(.17, .59, .4, .77)')
      .to('transform', 'translateY(0)')
      .play();
    await Keyboard.setResizeMode({ mode: KeyboardResize.Native });
  }
}
