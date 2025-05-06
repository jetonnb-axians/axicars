// redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAdmin$.pipe(
      take(1),
      tap((isAdmin) => {
        if (isAdmin) {
          this.router.navigate(['/cardatabase']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }),
      map(() => false)
    );
  }
}
