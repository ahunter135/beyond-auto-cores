import { Injectable } from '@angular/core';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { RestService } from './rest.service';

import {
  AuthenticateRequest,
  AuthenticateResponse,
  ResetPasswordRequest,
  UpdatePasswordRequest,
} from '@models/login';
import {
  UpdateUserRequest,
  User,
  UpdateUserTierRequest,
  UpdateUserMarginRequest,
} from '../models/user';
import { subscriptionLevel } from '../constants/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserStateSubject: BehaviorSubject<User> = new BehaviorSubject(
    null
  );
  private readyPromise: Promise<void>;

  constructor(private authService: AuthService, private rest: RestService) {
    this.readyPromise = Promise.all([this.rest.ready()]).then(() => {});
  }

  /** Gets an observable to watch for changes in the current account id logged in */
  get currentUserState$(): Observable<User> {
    return this.currentUserStateSubject.asObservable();
  }

  /** Gets the current account id of the user who logged in */
  get currentUser(): User {
    return this.currentUserStateSubject.value;
  }

  /** Returns a promise that resolves when the login service is ready to be accessed. */
  ready(): Promise<void> {
    return this.readyPromise;
  }

  /**
   * Authenticates the user with the API and sets the tokens if successful
   *
   * @param request The login request to authenticate with.
   */
  login(request: AuthenticateRequest): Observable<AuthenticateResponse> {
    return from(
      this.authenticate(request).then(
        ({ data }) => data as AuthenticateResponse
      )
    );
  }

  /**
   * Authenticates the user.
   *
   * @param token The authentication token.
   * @param staySignedIn A value indicating a prompt with 'stay signed-in' options should be shown.
   * @param request The authentication request.
   */
  authenticate(request: AuthenticateRequest): Promise<any> {
    return this.rest
      .post<AuthenticateResponse>('/users/login', request, true)
      .pipe(
        map((response) => response.body),
        tap(async (response: any) => {
          this.authService.storeTokens(response.data);
        })
      )
      .toPromise();
  }

  /**
   * Retrieve user details
   *
   * @param id the id of the user to retrieve.
   */
  user(id: string): Promise<User> {
    return this.rest
      .get<User>(`/users/${id}`)
      .pipe(
        map((response: any) => {
          const { data }: { data: User } = response.body;
          this.currentUserStateSubject.next({
            ...data,
            ...this.getSubscriptionLevel(data.subscription),
          });
          return data;
        })
      )
      .toPromise();
  }

  /**
   * Update current user details
   *
   * @param userData current user details
   */
  updateUser(userData: UpdateUserRequest): Promise<any> {
    return this.rest
      .put<User>(
        { endpoint: `/users`, params: { ...userData } },
        userData.formData,
        false,
        true
      )
      .pipe(
        map((response) => response.body),
        tap((response: any) => {
          const { data }: { data: User } = response;
          this.user(String(data.id));
        })
      )
      .toPromise();
  }

  /** Removes the currently authenticated user. This observable NEVER returns an error. */
  logout(): Promise<any> {
    return this.rest
      .post<AuthenticateResponse>('/users/logout', this.currentUser.id, false)
      .pipe(
        map((response) => response.body),
        tap(() => {
          this.authService.deauthenticate();
        })
      )
      .toPromise();
  }

  validateEmail(email: string): Promise<boolean> {
    return this.rest
      .post<boolean>('/users/validate-email', JSON.stringify(email), true)
      .pipe(
        map((response: any) => {
          const { data }: { data: boolean } = response.body;
          return data;
        })
      )
      .toPromise();
  }

  validateResetCode(code: string): Promise<boolean> {
    return this.rest
      .post<boolean>('/users/validate-reset-code', JSON.stringify(code), true)
      .pipe(
        map((response: any) => {
          const { data }: { data: boolean } = response.body;
          return data;
        })
      )
      .toPromise();
  }

  resetPassword(reset: ResetPasswordRequest): Promise<boolean> {
    return this.rest
      .post<boolean>('/users/reset-password', reset, true)
      .pipe(
        map((response: any) => {
          const { data }: { data: boolean } = response.body;
          return data;
        })
      )
      .toPromise();
  }

  updatePassword(update: UpdatePasswordRequest): Promise<boolean> {
    return this.rest
      .put<boolean>('/users/update-password', update)
      .pipe(
        map((response: any) => {
          const { data }: { data: boolean } = response.body;
          return data;
        })
      )
      .toPromise();
  }

  /**
   * Retrieve affiliate details
   *
   */
  affiliate(id): Promise<any> {
    return this.rest
      .get<User>(`/affiliates/${id}`)
      .pipe(
        map((response: any) => {
          const { data }: { data: any } = response.body;
          return data;
        })
      )
      .toPromise();
  }

  cancelSubscription(id): Promise<any> {
    return this.rest
      .put<User>({
        endpoint: `/registrations/${id}/enable-subscription`,
        params: { enable: false },
      })
      .pipe(
        tap(() => {
          this.logout();
        })
      )
      .toPromise();
  }

  getSubscriptionLevel(level: number) {
    return subscriptionLevel?.find((s) => s.level === level) ?? {};
  }

  /**
   * Update current user teir
   *
   * @param userData current user details
   */
  updateTier(userData: UpdateUserTierRequest): Promise<any> {
    return this.rest
      .put<User>(
        { endpoint: `/users/enable-tier`, params: { ...userData } },
        userData,
        false,
        true
      )
      .pipe(
        map((response) => response.body),
        tap((response: any) => {
          const { data }: { data: User } = response;
          this.user(String(data.id));
        })
      )
      .toPromise();
  }

  /**
   * Update current user margin
   *
   * @param userData current user details
   */
  updateMargin(userData: UpdateUserMarginRequest): Promise<any> {
    return this.rest
      .put<User>(
        { endpoint: `/users/set-margin`, params: { ...userData } },
        userData,
        false,
        true
      )
      .pipe(
        map((response) => response.body),
        tap((response: any) => {
          const { data }: { data: User } = response;
          this.user(String(data.id));
        })
      )
      .toPromise();
  }
}
