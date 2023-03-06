import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ToggleChangeEventDetail,
  ToggleCustomEvent,
} from '@ionic/angular';
import { Share } from '@capacitor/share';

import { AccountService } from '@app/common/services/account.service';
import { AlertService } from '@app/common/services/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  name: string;
  userProfileImage: string;
  tier: boolean;
  tierPercent: number;
  enabledTier: boolean;
  unreadCount: number;
  affiliateLink: string;
  canMargin: boolean;
  uuid: string
  isShowAffiliateShare: boolean;

  constructor(
    private account: AccountService,
    private route: Router,
    private alertService: AlertService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading settings ...',
    });
    loading.present();

    this.unreadCount = await this.alertService.alertUnreadCount();

    this.account.currentUserState$.subscribe(async (currentUser) => {
      this.name = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : 'Beyond Auto Core';

      this.userProfileImage =
        currentUser.fileUrl ||
        // eslint-disable-next-line max-len
        `https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=170667a&w=0&h=VlwTJ3LpA8Pjzk9u8XYgkII0Vrvrb07e67cHALFX_aY=`;

      this.tier = currentUser.tier1UserEnabled;
      this.tierPercent = currentUser.tier1PercentLevel;
      this.enabledTier = currentUser.tier1AdminEnabled;
      this.affiliateLink = currentUser.affiliateLink;
      this.uuid = currentUser.uuid;
      this.canMargin = currentUser.canMargin;
      this.isShowAffiliateShare = currentUser.uuid && currentUser.affiliateLink && currentUser.affiliateEnable;

      if (!this.affiliateLink && currentUser.affiliateEnable) {
        const data = await this.account.affiliate(currentUser.id);
        this.affiliateLink = data.affiliatelink.link;
      }
    });

    loading.dismiss();
  }

  logout() {
    this.account.logout();
  }

  navigate(url: string) {
    this.route.navigate([url]);
  }

  async toggle(e: Event) {
    const event = e as ToggleCustomEvent;
    this.tier = event.detail.checked;

    await this.account.updateTier({
      id: this.account.currentUser.id,
      tier1AdminEnabled: this.account.currentUser.tier1AdminEnabled,
      tier1UserEnabled: this.tier,
    });
  }

  async share() {
    await Share.share({
      url: this.affiliateLink,
    });
  }
}
