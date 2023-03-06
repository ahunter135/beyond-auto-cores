import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  PhotoGradeList,
  PhotoGradeListResponse,
  PhotoGradeRequest,
  PhotoGradeResponse,
} from '../models/photo-grade';
import { FilterRequest } from '../models/rest';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoGradeService {
  isLoadingMore = false;
  private selectPhotoGradeStateSubject: BehaviorSubject<PhotoGradeListResponse> =
    new BehaviorSubject(null);

  constructor(private rest: RestService) {}

  /** Gets a value of the selected photo grade */
  get selectedPhotoGrade(): PhotoGradeListResponse {
    return this.selectPhotoGradeStateSubject.value;
  }

  /** Sets the value of the selected photo code */
  set setSelectedPhotoGrade(photoGrade: PhotoGradeListResponse) {
    this.selectPhotoGradeStateSubject.next(photoGrade);
  }

  /**
   *  Create new photo grade code
   *
   * @photoGrade input request for submitting photo grade
   */
  submitPhotoGrade(photoGrade: PhotoGradeRequest): Promise<PhotoGradeResponse> {
    return this.rest
      .post<PhotoGradeResponse>(
        {
          endpoint: '/photogrades',
          params: { fullNess: photoGrade.fullNess, comments: photoGrade.notes },
        },
        photoGrade.formData,
        false,
        true
      )
      .pipe(
        map((response: any) => {
          const { data }: { data: PhotoGradeResponse } = response.body;
          return data;
        }),
        catchError((error) => throwError(error))
      )
      .toPromise();
  }

  /**
   * Retrieve all photo grade list
   *
   */
  photoGradeList(filter?: FilterRequest): Promise<PhotoGradeList> {
    return this.rest
      .get<PhotoGradeList>({ endpoint: `/photogrades`, params: filter })
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
   * Retrieve all completed and rejected photo grade list
   *
   */
  photoGradeCompletedList(filter?: FilterRequest): Promise<PhotoGradeList> {
    return this.rest
      .get<PhotoGradeList>({
        endpoint: `/photogrades/completed`,
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
   * Retrieve photo grade details
   *
   */
  photoGrade(id: string | number): Promise<PhotoGradeResponse> {
    return this.rest
      .get<PhotoGradeResponse>({ endpoint: `/photogrades/${id}` })
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
   * Retrieve  photo grade image
   *
   */
  photoGradeImgUrl(fileKey: string): Promise<string> {
    return this.rest
      .get<string>({
        endpoint: `/photogrades/presigned-url`,
        params: { fileKey },
      })
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
   * Retrieves next page for photo grade list details
   *
   */
  nextPhotoGrade(endpoint: string): Promise<PhotoGradeList> {
    this.isLoadingMore = true;

    return this.rest
      .get<PhotoGradeList>({ endpoint, server: 'none' })
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
   *  Delete rejected photo grade
   *
   * @photoGradeId id for photo grade
   */
  deletePhotoGrade(photoGradeId: string): Promise<any> {
    return this.rest
      .delete<any>(`/photogrades/${photoGradeId}`)
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
