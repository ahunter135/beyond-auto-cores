import { Injectable, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { FormControlName, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { PageBase } from './page-base';
import { UtilityService } from '@services/utility.service';

const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
// eslint-disable-next-line space-before-function-paren
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  if (this.valueAccessor.el) {
    this.control.nativeElement = this.valueAccessor.el.nativeElement;
  } else if (this.valueAccessor.initialElem) {
    this.control.nativeElement = this.valueAccessor.initialElem.nativeElement;
  } else {
    console.warn(`Unable to find native element for form control.`);
    // eslint-disable-next-line no-debugger
    debugger;
  }
  return result;
};

@Injectable()
export abstract class FormPageBase<T> extends PageBase implements OnInit {
  /** The data object associated with the form. */
  data: T;

  /** The parent form group. */
  form: FormGroup;

  /** A value indicating if the form is currently submitting. */
  isSubmitting = false;

  /** A value indicating if the user has confirmed deactivation. */
  protected deactivateConfirm = false;

  /** The header for the alert that pops up to confirm deactivation. */
  protected deactivateAlertHeader = 'Alert';

  /** The message for the alert that pops up to confirm deactivation. */
  protected deactivateAlertMessage =
    'Your changes will not be saved. Continue?';

  constructor(
    loadingController: LoadingController,
    protected navController: NavController,
    protected utility: UtilityService
  ) {
    super(loadingController);
  }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    this.loadingController.dismiss();
    this.buildForm();
    this.populateForm();
  }

  /** Gets and populates a model of the given type from the form. */
  getFormData(): T {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const data: T = this.data ? this.utility.deepCopy(this.data) : <T>{};
    return this.utility.deepMerge(data, this.form.value);
  }

  /** Submits the form object. */
  submitForm(): Promise<void> {
    if (this.isSubmitting) {
      return Promise.resolve();
    }

    this.isSubmitting = true;
    if (this.form.valid) {
      this.processValidForm();
    } else {
      // Mark all form controls as touched to show validation messages.
      this.utility.markSelfAndDescendantsAsTouched(this.form);
      this.isSubmitting = false;

      return Promise.resolve();
    }
  }

  /**
   * Shows a toast with the user-facing error message.
   *
   * @param err The user-facing error.
   */
  protected showError(err: any): Observable<any> {
    this.isSubmitting = false;
    return super.showError(err);
  }

  /** Builds the form object. */
  abstract buildForm(): void;

  /** Populates the form object with data. */
  abstract populateForm(): void;

  /** Processes the valid form object on submit. */
  abstract processValidForm(): void;
}
