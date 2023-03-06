import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  LotItemsFullnessResponse,
  LotItemsRequest,
  LotItemsResponse,
} from '../models/lot-items';
import { FilterRequest } from '../models/rest';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class LotItemsService {
  constructor(private rest: RestService) {}

  /**
   * Retrieve lot items details
   *
   * @param id the id of the lot to retrieve.
   * @param filter parameters for search and pagination.
   */
  lotItems(id: string, filter?: FilterRequest): Promise<LotItemsResponse[]> {
    return this.rest
      .get<LotItemsResponse[]>({
        endpoint: `/lots/${id}/items`,
        params: filter,
      })
      .pipe(
        map((response: any) => {
          const { data }: { data: LotItemsResponse[] } = response.body;
          return data;
        })
      )
      .toPromise();
  }

  /**
   *  Add code to lot inventory
   *
   */
  addCodeToLot(lot: LotItemsRequest): Promise<LotItemsResponse> {
    return this.rest
      .post<LotItemsResponse>(`/lotitems`, lot)
      .pipe(
        map((response: any) => {
          const { data }: { data: LotItemsResponse } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   *  Remove code in lot inventory
   *
   */
  removeCodeInLot(id: string): Promise<boolean> {
    return this.rest
      .delete<boolean>(`/lotitems/${id}`)
      .pipe(
        map((response: any) => {
          const { data } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   * Retrieve lot items fullness list
   *
   * @param id the id of the lot item.
   * @param filter parameters for search and pagination.
   */
  lotItemsFullness(
    id: string,
    filter?: FilterRequest
  ): Promise<LotItemsFullnessResponse[]> {
    return this.rest
      .get<LotItemsFullnessResponse[]>({
        endpoint: `/lotitems/${id}/fullness`,
        params: filter,
      })
      .pipe(
        map((response: any) => {
          const { data }: { data: LotItemsFullnessResponse[] } = response.body;
          return data;
        })
      )
      .toPromise();
  }
}
