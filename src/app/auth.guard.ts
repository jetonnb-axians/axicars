import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Observable<boolean>((observer) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log('THIS', user);
      if (user) {
        console.log('User is authenticated:', user);
        observer.next(true);
      } else {
        console.log('User is not authenticated, redirecting to login...');
        router.navigate(['auth/login']);
        observer.next(false);
      }
      observer.complete();
    });

    return { unsubscribe: unsub }; // cleanup
  });
};
