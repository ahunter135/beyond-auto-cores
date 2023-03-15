import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

import { FormPageBase } from '@app/form-page-base';
import { SimpleAuthenticateRequest } from '@app/common/models/login';
import { UtilityService } from '@app/common/services/utility.service';
import { AccountService } from '@app/common/services/account.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '@app/common/services/environment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage
  extends FormPageBase<SimpleAuthenticateRequest>
  implements OnInit
{
  constructor(
    utility: UtilityService,
    navController: NavController,
    loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private account: AccountService,
    private router: Router,
    private environmentService: EnvironmentService
  ) {
    super(loadingController, navController, utility);
  }

  /** Builds the form object. */
  buildForm(): void {
    this.form = this.formBuilder.group({
      userName: ["catalyticmastermind@catalyticmastermind.org", Validators.required],
      password: ["bacadmin", Validators.required],
    });
  }

  /** Populates the form object with data. */
  populateForm(): void {}

  /** Submits the form and logs the user in. */
  processValidForm(): void {
    const request: SimpleAuthenticateRequest = this.getFormData();

    this.load(this.account.login({ ...request, validateSubscription: true }))
      .pipe(catchError((err) => this.handleError(err as HttpErrorResponse)))
      .subscribe(() => {
        this.isSubmitting = false;
      });
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  async signUp() {
    await Browser.open({ url: this.environmentService.signUpUrl });
  }

  private handleError(err: any): Observable<any> {
    // Show the API given error message if we have one.
    return this.showError(err);
  }
}
