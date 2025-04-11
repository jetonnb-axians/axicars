import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  userForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  errorMessage: string | null = null;

  get passwordInvalid(): boolean {
    const passwordControl = this.userForm.get('password');
    return (
      !!passwordControl &&
      passwordControl.dirty &&
      passwordControl.hasError('minlength')
    );
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (
      this.userForm.get('email')?.invalid ||
      this.userForm.get('username')?.invalid
    ) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.passwordInvalid) {
      this.errorMessage = 'Password must be at least 8 characters';
      return;
    }

    const rawForm = this.userForm.getRawValue();
    console.log('rawForm', rawForm);

    this.authService
      .register(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/auth/login');
        },
        error: () => {
          this.errorMessage =
            'Sign-up failed. Please make sure the email is entered correctly and try again.';
        },
      });
  }
}
