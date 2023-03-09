import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, combineLatest, throwError, from } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/auth';
import { LoadingController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  jwtHelper = new JwtHelperService();
  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private http: HttpClient,
    private loadingController: LoadingController
  ) { }
  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const combined = combineLatest([
      this.storage.get<string>(REFRESH_TOKEN_KEY),
      this.storage.get<string>(AUTH_TOKEN_KEY),
    ]);

    return combined.pipe(
      switchMap((token) => {
        const refreshToken = token[0];
        const userId = token[1] ? this.authService.decodeToken(token[1]) : '';

        return handler.handle(req).pipe(
          map((res) => res),
          catchError((error) => {
            if (error.status === 401) {
              return this.http
                .post(`${environment.servers.default}/auth/refresh-token`, {
                  userId,
                  refreshToken,
                })
                .pipe(
                  switchMap((newTokens: any) =>
                    from(this.authService.storeTokens(newTokens)).pipe(
                      switchMap(() => {
                        const transformedReqRefreshToken = req.clone({
                          headers: req.headers.set(
                            'Authorization',
                            `bearer ${newTokens.accessToken}`
                          ),
                        });
                        return handler.handle(transformedReqRefreshToken);
                      })
                    )
                  ),
                  catchError((authError) => {
                    this.loadingController.dismiss();
                    //this.authService.deauthenticate();
                    return throwError(authError);
                  })
                );
            }

            return throwError(error);
          })
        );
      })
    );
  }
}
