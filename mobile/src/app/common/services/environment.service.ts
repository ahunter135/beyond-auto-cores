import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';

import { environment } from '@environments/environment';
import {
  EnvironmentAppSettings,
  EnvironmentServerName,
} from '@models/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  production: boolean = environment.production;
  version: string = environment.version;
  servers: { [name in EnvironmentServerName]: string } = environment.servers;
  web: string = environment.web;
  appSettings: EnvironmentAppSettings = environment.appSettings;
  signUpUrl: string = environment.signUpUrl;
  signInUrl: string = environment.signInUrl;

  //private userSubject: BehaviorSubject<AuthenticateUser> = new BehaviorSubject(null);

  constructor(private device: Device, private platform: Platform) {}

  /** Gets the device info. */
  get deviceInfo(): Device {
    if (this.platform.is('capacitor')) {
      return this.device;
    }
  }
}
