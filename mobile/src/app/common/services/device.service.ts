import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DeviceRegister } from '../models/device';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private rest: RestService) {}

  /**
   *  Register device to firebase
   *
   * @deviceData device data token
   */
  registerDevice(deviceData: DeviceRegister): Promise<any> {
    return this.rest
      .post<any>('/device/register', deviceData, false, true)
      .pipe(
        map((response: any) => {
          const { data }: { data: any } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }
}
