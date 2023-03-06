import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@app/common/services/account.service';
import { CustomValidators } from '@app/common/validators/custom.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  emailForm: FormGroup;
  codeForm: FormGroup;
  resetForm: FormGroup;

  currentStep = 1;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  get passwordMatchError() {
    return (
      this.resetForm.getError('mismatch') &&
      this.resetForm.get('confirm')?.touched
    );
  }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.codeForm = this.formBuilder.group({
      code: [null, [Validators.required, Validators.maxLength(4)]],
    });

    this.resetForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        confirm: ['', [Validators.required]],
      },
      { validators: CustomValidators.matchValidator('password', 'confirm') }
    );
  }

  async forgotSubmit() {
    if (this.emailForm.valid) {
      const { email } = this.emailForm.value;
      const data = await this.accountService.validateEmail(email);

      if (data) {
        this.currentStep = 2;
      }
    }
  }

  async verifyCode() {
    if (this.codeForm.valid) {
      const { code } = this.codeForm.value;
      const data = await this.accountService.validateResetCode(code);
      if (data) {
        this.currentStep = 3;
      }
    }
  }

  async resetPassword() {
    if (this.resetForm.valid) {
      const { email } = this.emailForm.value;
      const { password } = this.resetForm.value;

      const data = await this.accountService.resetPassword({
        email,
        password,
      });

      if (data) {
        this.currentStep = 1;
        this.router.navigate(['/login']);
      }
    }
  }
}
