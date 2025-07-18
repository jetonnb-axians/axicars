import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  authService = inject(AuthService);
  router = inject(Router);

  selectedTab: string = 'KM Report';
  showModal: boolean = false;

  viewAll() {
    let route = '';

    switch (this.selectedTab) {
      case 'KM Report':
        route = '/kmreports';
        break;
      case 'Maintenance History':
        route = '/maintenance';
        break;
      case 'Damage Report':
        route = '/damage-report';
        break;
      default:
        route = '/kmreports';
    }

    this.router.navigate([route]);
  }

  getAddLabel(): string {
    switch (this.selectedTab) {
      case 'KM Report':
        return 'Km Report';
      case 'Maintenance History':
        return 'Maintenance';
      case 'Damage Report':
        return 'Damage Report';
      default:
        return '';
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal = () => {
    this.showModal = false;
  };
}
