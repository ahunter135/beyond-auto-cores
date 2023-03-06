import { Capacitor } from '@capacitor/core';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Device } from '@capacitor/device';
import { FCM } from '@capacitor-community/fcm';
import { PushNotifications } from '@capacitor/push-notifications';

import {
  AuthenticationState,
  AuthService,
} from './common/services/auth.service';
import { AccountService } from './common/services/account.service';
import { DeviceService } from './common/services/device.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private account: AccountService,
    private nav: NavController,
    private device: DeviceService
  ) {
    this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    document.body.classList.add('dark'); // enable dark mode always
    this.setStatusBarStyleDark();

    // Subscribe to changes in the authentication state.
    this.auth.authenticationState$.subscribe((state) => {
      this.handleAuthenticationStateChange(state);
    });

    // Subscribe to changes in the access token state.
    this.auth.accessTokenState$.subscribe(async (accessToken) => {
      if (accessToken) {
        const id = this.auth.decodeToken(accessToken);
        this.account.user(id);

        if (Capacitor.isPluginAvailable('PushNotifications')) {
          // register for push
          await PushNotifications.requestPermissions();
          await PushNotifications.register();

          const info = await Device.getInfo();

          await FCM.getToken()
            .then(async (d) => {
              await this.device.registerDevice({
                appUserId: String(id),
                deviceToken: d.token,
                deviceType: String(info.platform),
              });
            })
            .catch(async (err) => {
              console.log(err);
            });

          // // now you can subscribe to a specific topic
          await FCM.subscribeTo({ topic: 'margin' })
            .then(() => {})
            .catch((err) => console.log(err));
        }
      }
    });

    await SplashScreen.hide({ fadeOutDuration: 750 });
  }

  setStatusBarStyleDark = async () => {
    if (Capacitor.isPluginAvailable('StatusBar')) {
      await StatusBar.setStyle({ style: Style.Dark });
    }
  };

  private handleAuthenticationStateChange(state: AuthenticationState): void {
    // Navigate to home if already authenticated
    switch (state) {
      case AuthenticationState.Authenticated:
        this.nav.navigateRoot('/tabs/tabs/home', {
          animated: true,
          animationDirection: 'forward',
        });
        break;

      default:
        this.nav.navigateRoot('/login', {
          animated: true,
          animationDirection: 'back',
        });
        break;
    }
  }
}
