import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  afAuth = inject(AngularFireAuth);

  userForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // --- State ---
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.authService.listenToAuthState();

    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        console.log(
          'User already logged in, redirecting from ngOnInit to dashboard'
        );
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) {
      if (
        this.userForm.get('email')?.errors?.['required'] ||
        this.userForm.get('password')?.errors?.['required']
      ) {
        this.errorMessage = 'Email and password are required.';
      } else if (this.userForm.get('email')?.errors?.['email']) {
        this.errorMessage = 'Please enter a valid email address.';
      } else if (this.userForm.get('password')?.errors?.['minlength']) {
        this.errorMessage = 'Password must be at least 6 characters long.';
      } else {
        this.errorMessage = 'Please correct the errors above.';
      }
      return;
    }

    this.errorMessage = null;

    const { email, password } = this.userForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => {
        console.log('Login successful, navigating to dashboard.');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage =
          'Login failed. Please check your email and password.';
      },
    });
  }
}
