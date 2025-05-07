import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-request-new-car',
  imports: [RouterModule, CommonModule],
  templateUrl: './request-new-car.component.html',
  styleUrl: './request-new-car.component.scss',
})
export class RequestNewCarComponent {
  added = false;
  tabs: string[] = ['Request Car', 'Archived Requests'];
  activeTab: number = 0;

  setActiveTab(index: number): void {
    this.activeTab = index;
  }

  markAsAdded() {
    this.added = true;
  }
}
