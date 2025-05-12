import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KmReportModalComponent } from '../km-report-modal/km-report-modal.component';

@Component({
  selector: 'app-damage-report',
  standalone: true,
  imports: [CommonModule, KmReportModalComponent],
  templateUrl: './damage-report.component.html',
  styleUrls: ['./damage-report.component.scss'],
})
export class DamageReportComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal = () => {
    this.showModal = false;
  };
}
