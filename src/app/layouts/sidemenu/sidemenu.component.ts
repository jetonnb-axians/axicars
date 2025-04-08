import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service'; // Import AuthService

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  isClosed = false;
  userName: string | null = null; // Store logged-in user name

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the auth service to get the username
    this.authService.userName$.subscribe((name) => {
      this.userName = name;
    });
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }

  logout(): void {
    this.authService.logout('User logged out');
    this.userName = null; // Reset username on logout
  }
}
