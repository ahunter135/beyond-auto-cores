import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Code, CodeList } from '../models/codes';
import { FilterRequest } from '../models/rest';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class CodesService {
  public isLoadingMore = false;
  private selectCodeStateSubject: BehaviorSubject<Code> = new BehaviorSubject(
    null
  );

  constructor(private rest: RestService) {}

  /** Gets a value of the selected generic code */
  get selectedCode(): Code {
    return this.selectCodeStateSubject.value;
  }

  /** Sets the value of the selected generic code */
  set setSelectedCode(code: Code) {
    this.selectCodeStateSubject.next(code);
  }

  /**
   * Retrieve code list details
   *
   */
  codes(filter?: FilterRequest): Promise<CodeList> {
    return this.rest
      .get<CodeList>({
        endpoint: `/codes`,
        params: filter,
      })
      .pipe(
        map((response: any) => {
          const { data, pagination } = response.body;
          return {
            data,
            pagination,
          };
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   * Retrieves next page for code list details
   *
   */
  nextCodes(endpoint: string, filter?: FilterRequest): Promise<CodeList> {
    this.isLoadingMore = true;

    return this.rest
      .get<CodeList>({ endpoint, server: 'none', params: filter })
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
}
