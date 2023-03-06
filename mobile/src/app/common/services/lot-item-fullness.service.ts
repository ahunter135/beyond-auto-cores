import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LotItemFullnessInput } from '../models/lot-item-fullness';

import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class LotItemFullnessService {
  constructor(private rest: RestService) {}

  /**
   *  Create item fullness details in code
   *
   */
  createItemFullness(lotItem: LotItemFullnessInput): Promise<any> {
    return this.rest
      .post<any>(`/lotitemfullness`, lotItem)
      .pipe(
        map((response: any) => {
          const { data }: { data: any } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   *  Update item fullness details in code
   *
   */
  updateItemFullness(lotItem: LotItemFullnessInput): Promise<any> {
    return this.rest
      .put<any>(`/lotitemfullness`, lotItem)
      .pipe(
        map((response: any) => {
          const { data }: { data: any } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   *  Remove item fullness in code
   *
   */
  removeItemFullness(id: string): Promise<boolean> {
    return this.rest
      .delete<boolean>(`/lotitemfullness/${id}`)
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
