import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driversdatabase',
  imports: [RouterModule, CommonModule],
  templateUrl: './driversdatabase.component.html',
  styleUrl: './driversdatabase.component.scss',
})
export class DriversdatabaseComponent {
  tabs: string[] = ['Assigned Drivers', 'All drivers'];
  activeTab: number = 0;

  driversInfo = Array.from({ length: 9 }, () => ({
    carPng: 'icons/carpng.png',
    driversName: 'Jetoni',
    carModel: 'Peugeot 208 2021',
    carpng: 'icons/carpng.png',
    driverpng: 'icons/driver.png',
    plateNumber: '01-120-RKS',
  }));

  setActiveTab(index: number): void {
    this.activeTab = index;
  }
}
