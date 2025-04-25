import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Assuming path is correct
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // <-- Import AngularFireAuth

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // --- Injected services ---
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  afAuth = inject(AngularFireAuth); // <-- Inject AngularFireAuth correctly

  // --- Form Definition ---
  userForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // --- State ---
  errorMessage: string | null = null;
  // afAuth: any; // <-- REMOVED THIS LINE - Replaced by injection

  ngOnInit(): void {
    // Optional: Listen to auth state changes via service (implementation details in AuthService matter)
    this.authService.listenToAuthState();

    // Optional: Check if user is *already* logged in when visiting the login page
    // If so, redirect them away from the login page.
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        console.log(
          'User already logged in, redirecting from ngOnInit to dashboard'
        );
        // Redirect to dashboard or home page if user is already authenticated
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    // Mark all fields as touched to show validation errors if form is submitted prematurely
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) {
      // Check specific errors for better messages if desired
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
      return; // Stop submission if form is invalid
    }

    // Clear previous error messages on new submission attempt
    this.errorMessage = null;

    const { email, password } = this.userForm.getRawValue();

    // Call the login method from AuthService
    this.authService.login(email, password).subscribe({
      next: () => {
        // Login successful
        console.log('Login successful, navigating to dashboard.');
        // Navigate directly to the dashboard or desired landing page
        this.router.navigate(['/dashboard']); // <-- CHANGED: Direct navigation
      },
      error: (error) => {
        // Login failed
        console.error('Login failed:', error);
        // Provide a user-friendly error message
        // Avoid exposing detailed error info like 'user-not-found' directly for security
        this.errorMessage =
          'Login failed. Please check your email and password.';
      },
    });
  }
}
