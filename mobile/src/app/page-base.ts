import { EventEmitter, Injectable, OnDestroy, ViewChild } from '@angular/core';
import { LoadingController, IonContent } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';
import { Observable, Subscription, from, of } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

@Injectable()
export abstract class PageBase implements OnDestroy {
  /** The content node of the page. */
  @ViewChild('content', { static: false }) content: IonContent;

  /** The current loading overlay, if one is visible. Will be null if no loading overlay is currently visible. */
  loading: HTMLIonLoadingElement;

  /** Contains the current observable subscriptions that should be unsubscribed from when the page is destroyed. */
  subscriptions: Subscription[] = [];

  constructor(protected loadingController: LoadingController) {}

  /** Method called when page is destroyed. */
  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      for (const sub of this.subscriptions) {
        sub.unsubscribe();
      }

      this.subscriptions.length = 0;
    }
  }

  /**
   * Executes the specified action, showing a loading overlay while the action is executing.
   *
   * @param action The action to execute.
   * @param event An optional event emitter that triggered the action.
   * If not specified, a loading overlay will be displayed.
   * Can be null (to disable the loading overlay when there is no event emitter).
   */
  load<T, Q>(action: Observable<T>, event?: EventEmitter<Q>): Observable<T> {
    if (event !== undefined) {
      action.pipe(
        tap(() => {
          if (event !== null) {
            event.complete();
          }
        })
      );
    }

    return from(this.showLoading()).pipe(
      switchMap(() => action),
      finalize(() => this.dismissLoading())
    );
  }

  /** Returns a value indicating if the loading overlay is visible. */
  isLoading(): boolean {
    return !!this.loading;
  }

  /**
   * Shows a loading overlay.
   *
   * @param message The loading message to show. Defaults to 'Please wait...'
   */
  protected showLoading(
    options: LoadingOptions = { message: 'Please wait...' }
  ): Promise<any> {
    if (this.loading) {
      return Promise.resolve();
    }

    return this.loadingController.create(options).then((loading) => {
      this.loading = loading;
      loading.present();
    });
  }

  /** Dismisses the current loading overlay if one is visible. */
  protected dismissLoading(): Promise<boolean> {
    if (!this.loading) {
      return Promise.resolve(true);
    }

    return this.loading.dismiss().then((successful) => {
      this.loading = null;
      return successful;
    });
  }

  /**
   * Shows a toast with the user-facing error message.
   *
   * @param err The user-facing error.
   */
  protected showError(err: any): Observable<any> {
    //the error has been handled, so log it instead of throwing it
    console.error('Handled error: ' + err);
    return of(err);
  }
}
