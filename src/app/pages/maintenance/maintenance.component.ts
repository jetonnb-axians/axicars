import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KmReportModalComponent } from '../km-report-modal/km-report-modal.component';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, KmReportModalComponent],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal = () => {
    this.showModal = false;
  };
}
