import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MetalFilterRequest, MetalPrices } from '../models/metals';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class MetalService {
  constructor(private rest: RestService) {}

  /**
   * Retrieve metal prices
   *
   */
  metalPrices(filter: MetalFilterRequest): Promise<MetalPrices> {
    return this.rest
      .get<MetalPrices>({ endpoint: `/metalprices`, params: filter })
      .pipe(
        map((response: any) => {
          const { data } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }
}
