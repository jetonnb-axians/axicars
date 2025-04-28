import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userName$.subscribe((name) => {
      this.userName = name;
    });
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
