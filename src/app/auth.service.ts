import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from "@angular/fire/auth";
import { BehaviorSubject, from, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  listenToAuthState() {
    throw new Error('Method not implemented.');
  }
  firebaseAuth = inject(Auth);
  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();

  constructor() {
    const currentUser = this.firebaseAuth.currentUser;
    if (currentUser) {
      this.userNameSubject.next(currentUser.displayName);
    }
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        return updateProfile(response.user, { displayName: username }).then(() => {
          this.userNameSubject.next(username);
        });
      });

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        if (response.user) {
          this.userNameSubject.next(response.user.displayName);
        }
      });

    return from(promise);
  }

  getUserName(): string | null {
    return this.userNameSubject.value;
  }

  logout(p0: string): void {
    this.firebaseAuth.signOut().then(() => {
      this.userNameSubject.next(null);
    });
  }
}
