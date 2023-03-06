import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { RestService } from './rest.service';
import {
  LotInventoryList,
  LotInventoryResponse,
  LotRequest,
  Lots,
  SubmitLotRequest,
} from '../models/lots';
import { FilterRequest } from '../models/rest';

@Injectable({
  providedIn: 'root',
})
export class LotsService {
  public isLoadingMore = false;
  private selectLotStateSubject: BehaviorSubject<Lots | LotInventoryResponse> =
    new BehaviorSubject(null);

  constructor(private rest: RestService) {}

  /** Gets a value of the selected generic code */
  get selectedLot(): Lots | LotInventoryResponse {
    return this.selectLotStateSubject.value;
  }

  /** Sets the value of the selected generic code */
  set setSelectedLot(lot: Lots | LotInventoryResponse) {
    this.selectLotStateSubject.next(lot);
  }

  /**
   * Retrieve all lots list details
   *
   */
  lots(filter?: FilterRequest): Promise<Lots[]> {
    return this.rest
      .get<Lots[]>({ endpoint: `/lots`, params: filter })
      .pipe(
        map((response: any) => {
          const { data }: { data: Lots[] } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   * Retrieve lot inventory list
   *
   */
  inventory(filter?: FilterRequest): Promise<LotInventoryList> {
    return this.rest
      .get<LotInventoryList>({
        endpoint: `/lots/inventory`,
        params: filter,
      })
      .pipe(
        map((response: any) => {
          const { data, pagination } = response.body;
          return { data, pagination };
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   * Retrieve lot inventory summary list
   *
   */
  inventorySummary(filter?: FilterRequest): Promise<LotInventoryList> {
    return this.rest
      .get<LotInventoryList>({
        endpoint: `/lots/inventorysummary`,
        params: filter,
      })
      .pipe(
        map((response: any) => {
          const { data, pagination } = response.body;
          return { data, pagination };
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   * Retrieves next page for inventory list details
   *
   */
  nextInventory(endpoint: string): Promise<LotInventoryList> {
    this.isLoadingMore = true;

    return this.rest
      .get<LotInventoryList>({ endpoint, server: 'none' })
      .pipe(
        map((response: any) => {
          const { data, pagination } = response.body;
          return {
            data,
            pagination,
          };
        }),
        tap(() => (this.isLoadingMore = false)),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   *  Create new lot inventory
   *
   */
  addlot(lot: LotRequest): Promise<LotInventoryResponse> {
    return this.rest
      .post<LotInventoryResponse>(`/lots`, lot)
      .pipe(
        map((response: any) => {
          const { data }: { data: LotInventoryResponse } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   *  submit lot to invoice
   *
   */
  submitLot(lot: SubmitLotRequest): Promise<boolean> {
    return this.rest
      .post<boolean>(
        {
          endpoint: `/lots/submit`,
          params: {
            lotId: lot.lotId,
            businessName: lot.businessName,
            email: lot.email,
          },
        },
        lot.formData,
        false,
        true
      )
      .pipe(
        map((response: any) => {
          const { data }: { data: boolean } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }
}
