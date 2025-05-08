import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KmReportModalComponent } from '../km-report-modal/km-report-modal.component';

@Component({
  selector: 'app-km-reports',
  standalone: true,
  imports: [CommonModule, KmReportModalComponent],
  templateUrl: './km-reports.component.html',
  styleUrls: ['./km-reports.component.scss'],
})
export class KmReportsComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal = () => {
    this.showModal = false;
  };
}
