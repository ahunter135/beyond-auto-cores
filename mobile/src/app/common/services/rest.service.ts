/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  FileTransfer,
  FileTransferObject,
  FileUploadResult,
} from '@ionic-native/file-transfer/ngx';
import { ToastController } from '@ionic/angular';
import { Observable, throwError, of, from } from 'rxjs';
import { catchError, map, switchMap, retryWhen, delay } from 'rxjs/operators';

import { EnvironmentService } from './environment.service';
import {
  HttpCacheOptions,
  HttpDelegate,
  HttpEndpointOptions,
  HttpEndpointResponse,
} from '@models/http';
import { ApiErrorResponse, ApiStandardResponse } from '@models/api-error';
import { AUTH_TOKEN_KEY } from '../constants/auth';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

const RETRY_COUNT = 2;

@Injectable({
  providedIn: 'root',
})
export class RestService implements HttpDelegate {
  token: string = null;

  private disconnected = false;
  private readyPromise: Promise<void>;

  constructor(
    private environment: EnvironmentService,
    private http: HttpClient,
    private transfer: FileTransfer,
    private storage: StorageService,
    private toastController: ToastController,
    private auth: AuthService
  ) {}

  /** Returns a promise that resolves when the storage is ready to be accessed. */
  ready(): Promise<void> {
    return this.readyPromise;
  }

  /**
   * Performs an HTTP GET to the specified API endpoint and returns the response.
   *
   * @param endpoint The API endpoint to perform the HTTP GET for.
   * @param cache A value containing caching options. If not specified, caching will not be performed for the API request.
   */
  get<T>(
    endpoint: string | HttpEndpointOptions,
    cache?: HttpCacheOptions,
    ignoreAuth?: boolean,
    isFileUpload?: boolean
  ): Observable<HttpEndpointResponse<T>> {
    const params = {};
    const options =
      typeof endpoint === 'string'
        ? ({ endpoint, params } as HttpEndpointOptions)
        : endpoint;

    const url: string = this.getApiUrl(options);

    return this.http
      .get<T>(url, {
        params: options.params,
        headers: this.addHeaders(
          this.getDefaultHeaders(ignoreAuth, isFileUpload),
          options
        ),
        observe: 'response',
      })
      .pipe(
        map((data) => this.toHttpEndpointResponse<T>(data)),
        retryWhen((errors) =>
          errors.pipe(
            switchMap((error, index) => {
              this.auth.deauthenticate();

              if (index === RETRY_COUNT || error.status === 403) {
                return throwError(error);
              }

              return of(error);
            }),
            delay(2000)
          )
        ),
        catchError((err) => this.formatErrorResponse(err))
      );
  }

  /**
   * Performs an HTTP POST to the specified API endpoint with the specified content and returns the response.
   *
   * @param endpoint The API endpoint to perform the HTTP POST for.
   * @param body The content to send with the HTTP POST.
   */
  post<T>(
    endpoint: string | HttpEndpointOptions,
    body?: any,
    ignoreAuth?: boolean,
    isFileUpload?: boolean
  ): Observable<HttpEndpointResponse<T>> {
    if (this.disconnected) {
      return throwError(
        'You must be connected to the internet to perform the requested action.'
      );
    }
    const params = {};
    const options =
      typeof endpoint === 'string'
        ? ({ endpoint, params } as HttpEndpointOptions)
        : endpoint;
    const url: string = this.getApiUrl(options);

    return this.http
      .post<T>(url, body, {
        headers: this.addHeaders(
          this.getDefaultHeaders(ignoreAuth, isFileUpload),
          options
        ),
        observe: 'response',
        params: options.params,
      })
      .pipe(
        map((data) => this.toHttpEndpointResponse<T>(data)),
        retryWhen((errors) =>
          errors.pipe(
            switchMap((error, index) => {
              if (index === RETRY_COUNT || error.status === 403) {
                return throwError(error);
              }

              return of(error);
            }),
            delay(2000)
          )
        ),
        catchError((err) => this.formatErrorResponse(err))
      );
  }

  /**
   * Performs an HTTP PUT to the specified API endpoint with the specified content and returns the response.
   *
   * @param endpoint The API endpoint to perform the HTTP PUT for.
   * @param body The content to send with the HTTP PUT.
   */
  put<T>(
    endpoint: string | HttpEndpointOptions,
    body?: any,
    ignoreAuth?: boolean,
    isFileUpload?: boolean
  ): Observable<HttpEndpointResponse<T>> {
    if (this.disconnected) {
      return throwError(
        'You must be connected to the internet to perform the requested action.'
      );
    }
    const params = {};
    const options =
      typeof endpoint === 'string'
        ? ({ endpoint, params } as HttpEndpointOptions)
        : endpoint;
    const url: string = this.getApiUrl(options);

    return this.http
      .put<T>(url, body, {
        headers: this.addHeaders(
          this.getDefaultHeaders(ignoreAuth, isFileUpload),
          options
        ),
        observe: 'response',
        params: options.params,
      })
      .pipe(
        map((data) => this.toHttpEndpointResponse<T>(data)),
        retryWhen((errors) =>
          errors.pipe(
            switchMap((error, index) => {
              if (index === RETRY_COUNT || error.status === 403) {
                return throwError(error);
              }

              return of(error);
            }),
            delay(2000)
          )
        ),
        catchError((err) => this.formatErrorResponse(err))
      );
  }

  /**
   * Performs an HTTP DELETE to the specified API endpoint with the specified content and returns the response.
   *
   * @param endpoint The API endpoint to perform the HTTP PUT for.
   * @param body The content to send with the HTTP PUT.
   */
  delete<T>(
    endpoint: string | HttpEndpointOptions,
    body?: any,
    ignoreAuth?: boolean,
    isFileUpload?: boolean
  ): Observable<HttpEndpointResponse<T>> {
    if (this.disconnected) {
      return throwError(
        'You must be connected to the internet to perform the requested action.'
      );
    }

    const options =
      typeof endpoint === 'string'
        ? ({ endpoint } as HttpEndpointOptions)
        : endpoint;
    const url: string = this.getApiUrl(options);

    return this.http
      .delete<T>(url, {
        headers: this.addHeaders(
          this.getDefaultHeaders(ignoreAuth, isFileUpload),
          options
        ),
        observe: 'response',
      })
      .pipe(
        map((data) => this.toHttpEndpointResponse<T>(data)),
        retryWhen((errors) =>
          errors.pipe(
            switchMap((error, index) => {
              if (index === RETRY_COUNT || error.status === 403) {
                return throwError(error);
              }

              return of(error);
            }),
            delay(2000)
          )
        ),
        catchError((err) => this.formatErrorResponse(err))
      );
  }

  /**
   * Performs an upload to the specified API endpoint with the specified content and returns the response.
   *
   * @param endpoint The API endpoint to perform the upload for.
   * @param filePath The file URI to upload
   */
  upload(
    endpoint: string,
    filePath: string,
    mimeType: string,
    fileKey: string,
    fileName: string,
    params?: { [s: string]: any }
  ): Observable<FileUploadResult> {
    if (this.disconnected) {
      return throwError(
        'You must be connected to the internet to perform the requested action.'
      );
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    const options =
      typeof endpoint === 'string'
        ? ({ endpoint } as HttpEndpointOptions)
        : endpoint;
    const url: string = this.getApiUrl(options);

    const headers = this.addHeaders(
      this.getDefaultHeaders(false, true),
      options
    );

    return this.appendAuthHeader(headers).pipe(
      switchMap((fullHeaders) =>
        from(
          fileTransfer.upload(filePath, url, {
            headers: fullHeaders,
            mimeType,
            fileKey,
            fileName,
            params,
          })
        ).pipe(
          retryWhen((errors) =>
            errors.pipe(
              switchMap((error, index) => {
                if (index === RETRY_COUNT || error.status === 403) {
                  return throwError(error);
                }

                return of(error);
              }),
              delay(2000)
            )
          ),
          catchError((err) => this.formatErrorResponse(err))
        )
      )
    );
  }

  private addHeaders(
    headers: HttpHeaders,
    options: HttpEndpointOptions
  ): HttpHeaders {
    if (options.headers) {
      for (const name of Object.keys(options.headers)) {
        const value: string | string[] = options.headers[name];
        if (value) {
          headers = headers.set(name, value);
        } else {
          headers = headers.delete(name);
        }
      }
    }

    return headers;
  }

  private getDefaultHeaders(
    ignoreAuth: boolean,
    isFileUpload: boolean
  ): HttpHeaders {
    let headers: { [name: string]: string } = isFileUpload
      ? {
          enctype: 'multipart/form-data',
        }
      : {
          'Content-Type': 'application/json',
        };

    if (ignoreAuth) {
      headers = Object.assign(
        {
          'x-ignore-auth': 'true',
        },
        headers
      );
    } else {
      headers = Object.assign(
        {
          Authorization: `Bearer ${this.auth.accessToken}`,
        },
        headers
      );
    }

    return new HttpHeaders(headers);
  }

  private appendAuthHeader(headers: HttpHeaders): Observable<HttpHeaders> {
    return from(
      this.storage.get(AUTH_TOKEN_KEY).then((authKey) => {
        headers = Object.assign(
          {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `bearer ${authKey}`,
          },
          headers
        );

        return headers;
      })
    );
  }

  private getApiUrl(options: HttpEndpointOptions): string {
    return (
      this.environment.servers[options.server || 'default'] + options.endpoint
    );
  }

  private toHttpEndpointResponse<T>(
    data: HttpResponse<T>
  ): HttpEndpointResponse<T> {
    if (!data) {
      return null;
    }

    let pagination: { [key: string]: string | number };

    const headers: { [name: string]: string } = {};
    for (const name of data.headers.keys()) {
      headers[name.toLocaleLowerCase()] = data.headers.get(name);
    }

    const body: ApiStandardResponse = data.body as any;

    if (!body.success) {
      body.data = null;
      this.presentToastMessageHandler(body.message);
    }

    if (headers['x-pagination']) {
      pagination = JSON.parse(headers['x-pagination']);
    }

    const response: HttpEndpointResponse<T> = {
      status: data.status,
      headers,
      url: data.url,
      body: { ...data.body, pagination },
    };
    return response;
  }

  private formatErrorResponse(
    httpResponse: HttpErrorResponse
  ): Observable<never> {
    // Default error message if more specific error message(s) are not found.
    let errorResponse: ApiErrorResponse = { errors: [] };

    if (httpResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred.

      errorResponse.errors.push({
        error: 'Error',
        errorDescription:
          'Uh-oh, something went wrong! Please try again later.',
      });
    } else {
      // The back-end returned an unsuccessful response code.

      if (this.isApiErrorResponse(httpResponse.error)) {
        errorResponse = httpResponse.error;
      } else {
        // Response is not in the expected error response format, build an error response based on the HTTP status code.
        switch (httpResponse.status) {
          case 400:
            errorResponse.errors.push({
              error: httpResponse.status + '',
              errorDescription: 'There seems to be a problem with your data.',
            });
            break;

          case 403:
            errorResponse.errors.push({
              error: httpResponse.status + '',
              // eslint-disable-next-line @typescript-eslint/quotes
              errorDescription: "You don't have permission to see this.",
            });
            break;

          case 404:
            errorResponse.errors.push({
              error: httpResponse.status + '',
              errorDescription:
                'We apologize. There was a problem processing your request.',
            });
            break;

          case 422:
            errorResponse.errors.push({
              error: httpResponse.status + '',
              errorDescription:
                'There seems to be some validation problems with your data.',
            });
            break;

          case 500:
            errorResponse.errors.push({
              error: httpResponse.status + '',
              errorDescription:
                'Uh-oh, something went wrong! Please try again later.',
            });
            break;

          case 503:
            errorResponse.errors.push({
              error: httpResponse.status + '',
              errorDescription:
                'The service is currently down for scheduled maintenance. Please try again later.',
            });
            break;

          default:
            errorResponse.errors.push({
              error: httpResponse.status + '',
              errorDescription:
                'Uh-oh, something went wrong! Please try again later.',
            });
            break;
        }
      }
    }

    // Return an observable with a user-facing error message.
    return throwError(errorResponse);
  }

  private isApiErrorResponse(error: any): error is ApiErrorResponse {
    return (
      error &&
      (((error as ApiErrorResponse).errors !== undefined &&
        error.status == null) ||
        (error.errors !== undefined && error.status == null))
    );
  }

  private async presentToastMessageHandler(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}
