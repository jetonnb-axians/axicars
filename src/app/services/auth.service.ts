import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  readonly authState$: Observable<User | null> = authState(this.auth).pipe(
    shareReplay(1)
  );

  readonly userName$: Observable<string | null> = this.authState$.pipe(
    map((user) => user?.displayName ?? null)
  );

  readonly userId$: Observable<string | null> = this.authState$.pipe(
    map((user) => user?.uid ?? null)
  );

  readonly isLoggedIn$: Observable<boolean> = this.authState$.pipe(
    map((user) => !!user)
  );

  constructor() {
    console.log('AuthService Initialized. Listening to auth state...');
  }

  listenToAuthState(): Observable<User | null> {
    console.warn(
      'listenToAuthState() is deprecated. Subscribe to authState$ directly.'
    );
    return this.authState$;
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap((response: UserCredential) => {
        console.log(`User created: ${response.user.uid}. Updating profile...`);
        return from(updateProfile(response.user, { displayName: username }));
      }),
      tap(() =>
        console.log(`User registered and profile updated for: ${username}`)
      )
    );
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((credential) => {
        console.log(
          `User logged in: ${credential.user.displayName} (${credential.user.uid})`
        );
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        console.log('User logged out.');
      })
    );
  }

  getUserName(): string | null {
    return this.auth.currentUser?.displayName ?? null;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
