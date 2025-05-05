import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  isClosed = false;
  userName: string | null = null;
  isAdmin: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userNameSub = this.authService.userName$.subscribe((name) => {
      this.userName = name;
    });

    const isAdminSub = this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.subscriptions.add(userNameSub);
    this.subscriptions.add(isAdminSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
  logout(): void {
    this.authService.logout();
    this.userName = null;
    this.router.navigate(['/auth/login']);
  }
}
