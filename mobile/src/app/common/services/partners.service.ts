import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { PartnerList } from '../models/partners';

import { FilterRequest } from '../models/rest';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  constructor(private rest: RestService) {}

  /**
   * Retrieve all partners list
   *
   */
  partners(filter?: FilterRequest): Promise<PartnerList> {
    return this.rest
      .get<PartnerList>({ endpoint: `/partners`, params: filter })
      .pipe(
        map((response: any) => {
          const { data, pagination } = response.body;
          return { data, pagination };
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }
}
