import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-km-report-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './km-report-modal.component.html',
  styleUrls: ['./km-report-modal.component.scss'],
})
export class KmReportModalComponent {
  @Input() closeCallback!: () => void;

  close() {
    if (this.closeCallback) {
      this.closeCallback();
    }
  }
}
