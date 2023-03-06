/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  token: string = null;
  private authenticationStateSubject: BehaviorSubject<AuthenticationState> =
    new BehaviorSubject(AuthenticationState.Unknown);
  private accessTokenStateSubject: BehaviorSubject<string> =
    new BehaviorSubject('');
  private readyPromise: Promise<void>;

  constructor(private storage: StorageService) {
    this.readyPromise =
      Promise.all([this.checkToken().toPromise()])
      .catch(() => {})
      .then(() => {});
  }

  /** Gets an observable to watch for changes in the current authentication state. */
  get authenticationState$(): Observable<AuthenticationState> {
    return this.authenticationStateSubject.asObservable();
  }

  /** Gets a value indicating if the application state is authenticated. */
  get isAuthenticated(): boolean {
    return (
      this.authenticationStateSubject.value ===
      AuthenticationState.Authenticated
    );
  }

  /** Gets an observable to watch for changes in the current access token. */
  get accessTokenState$(): Observable<string> {
    return this.accessTokenStateSubject.asObservable();
  }

  /** Gets the current account id of the user who logged in */
  get accessToken(): string {
    return this.accessTokenStateSubject.value;
  }

  /** Returns a promise that resolves when the authorization service is ready to be accessed. */
  ready(): Promise<void> {
    return this.readyPromise;
  }

  /** Deauthenticates the user. */
  deauthenticate(): void {
    this.updateToken(null);
    this.storage.remove(REFRESH_TOKEN_KEY);
  }

  storeTokens(tokensObject): Promise<void> {
    return this.updateToken(tokensObject.accessToken).then(() => {
      this.storage.set(REFRESH_TOKEN_KEY, tokensObject.refreshToken);
    });
  }

  public checkToken(): Observable<any> {
    return from(this.storage.get<string>(AUTH_TOKEN_KEY)).pipe(
      switchMap((token) => {
        if (token) {
          //If the state is authenticated that means the interceptor failed and authenticated with the refresh token
          //and we don't want to overwrite the new auth token the interceptor stored with the old one in storage
          if (
            this.authenticationStateSubject.getValue() !==
            AuthenticationState.Authenticated
          ) {
            return from(this.updateToken(token));
          }

          return of(null);
        } else {
          this.updateToken(null);
          return throwError('no token');
        }
      })
    );
  }

  /**
   * Updates the saved access token.
   *
   * @param token The access token.
   */
  updateToken(token: string): Promise<void> {
    let promise: Promise<any>;
    let newState: AuthenticationState;

    if (token) {
      newState = AuthenticationState.Authenticated;
      this.accessTokenStateSubject.next(token);
      promise = this.storage.set(AUTH_TOKEN_KEY, token);
    } else {
      newState = AuthenticationState.Unauthenticated;
      promise = this.storage.remove(AUTH_TOKEN_KEY);
    }

    return promise
      .then(() => (this.token = token))
      .then(() => {
        if (this.authenticationStateSubject.value !== newState) {
          this.authenticationStateSubject.next(newState);
        }
      });
  }

  /**
   * Decode access token ang return account id.
   *
   * @param token The access token.
   */
  decodeToken(token: string): string {
    const { id } = this.jwtHelper.decodeToken(token);
    return id;
  }
}

export enum AuthenticationState {
  Unknown,
  Verifying,
  NewSignup,
  Authenticated,
  Unauthenticated,
}
