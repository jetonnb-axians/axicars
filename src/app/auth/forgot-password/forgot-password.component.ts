import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  afAuth = inject(AngularFireAuth);

  forgotPasswordForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  onSubmit(): void {
    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.errorMessage = null;
    this.isLoading = true;

    const { email } = this.forgotPasswordForm.getRawValue();

    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.successMessage =
          'Password reset link has been sent to your email!';
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error sending reset email:', error);
        this.errorMessage =
          'Failed to send password reset email. Please try again.';
        this.isLoading = false;
      });
  }
}
