import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Margin } from '../models/margin';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class MarginService {
  constructor(private rest: RestService) {}

  /**
   * Retrieve margin
   *
   */
  getMargin(): Promise<Margin> {
    return this.rest
      .get<Margin>('/margins')
      .pipe(
        map((response: any) => {
          const { data }: { data: Margin } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   * Create margin
   *
   */
  createMargin(margin: number): Promise<Margin> {
    return this.rest
      .post<Margin>('/margins', { margin })
      .pipe(
        map((response: any) => {
          const { data }: { data: Margin } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   * Update margin
   *
   */
  updateMargin(margin: number): Promise<Margin> {
    return this.rest
      .put<Margin>('/margins', { margin })
      .pipe(
        map((response: any) => {
          const { data }: { data: Margin } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }
}
