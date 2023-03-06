import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Alert, AlertList, AlertUpdateInput } from '../models/alert';

import { FilterRequest } from '../models/rest';
import { AccountService } from './account.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public isLoadingMore = false;
  private selectAlertStateSubject: BehaviorSubject<Alert> = new BehaviorSubject(
    null
  );

  constructor(
    private rest: RestService,
    private accountService: AccountService
  ) {}

  /** Gets an observable to watch for changes in the current account id logged in */
  get currentSelectedAlertState$(): Observable<Alert> {
    return this.selectAlertStateSubject.asObservable();
  }

  /** Gets a value of the selected notification alert */
  get selectedAlert(): Alert {
    return this.selectAlertStateSubject.value;
  }

  /** Sets the value of the selected generic code */
  set setSelectedAlert(alert: Alert) {
    this.selectAlertStateSubject.next(alert);
  }

  /**
   * Retrieve all notification alert
   *
   */
  alerts(filter?: FilterRequest): Promise<AlertList> {
    return this.rest
      .get<AlertList>({
        endpoint: `/alerts/${this.accountService.currentUser.id}`,
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
   * Retrieves next page for notification alert
   *
   */
  nextAlerts(endpoint: string): Promise<AlertList> {
    this.isLoadingMore = true;

    return this.rest
      .get<AlertList>({ endpoint, server: 'none' })
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
   * Update alert details
   *
   * @param alertData current alert details
   */
  updateAlert(alertData: AlertUpdateInput): Promise<any> {
    return this.rest
      .put<any>(`/alerts`, alertData, false, true)
      .pipe(
        map((response) => response.body),
        tap((response: any) => {
          const { data } = response;
          return data;
        })
      )
      .toPromise();
  }

  /**
   *  Delete notification alert
   *
   * @alertId id of notification alert
   */
  deleteAlert(alertId: string): Promise<any> {
    return this.rest
      .delete<any>(`/alerts/${alertId}`)
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
   * Retrieve unread count alert
   *
   */
  alertUnreadCount(): Promise<number> {
    return this.rest
      .get<number>(`/alerts/${this.accountService.currentUser.id}/unreadcount`)
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
