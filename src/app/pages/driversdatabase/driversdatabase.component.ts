import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AddDriverModalComponent } from '../drivers/add-driver-modal/add-driver-modal.component';

@Component({
  selector: 'app-driversdatabase',
  standalone: true,
  imports: [RouterModule, CommonModule, AddDriverModalComponent],
  templateUrl: './driversdatabase.component.html',
  styleUrl: './driversdatabase.component.scss',
})
export class DriversdatabaseComponent {
  @ViewChild(AddDriverModalComponent)
  addDriverModalComponent!: AddDriverModalComponent;

  tabs: string[] = ['Assigned Drivers', 'All drivers'];
  activeTab: number = 0;

  showAddDriverModal = false;
  modalIsOpen: boolean = false;

  openModal() {
    console.log('Diversdatabase...');
    this.addDriverModalComponent?.openModal();
    this.modalIsOpen = true;
  }

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
