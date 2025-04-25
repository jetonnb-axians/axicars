import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddDriverModalComponent } from '../drivers/add-driver-modal/add-driver-modal.component';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-driversdatabase',
  standalone: true,
  imports: [RouterModule, CommonModule, AddDriverModalComponent],
  templateUrl: './driversdatabase.component.html',
  styleUrls: ['./driversdatabase.component.scss'],
})
export class DriversdatabaseComponent implements OnInit {
  @ViewChild(AddDriverModalComponent)
  addDriverModalComponent!: AddDriverModalComponent;

  activeDropdownId: string | null = null;
  tabs: string[] = ['Assigned Drivers', 'All drivers'];
  activeTab: number = 0;
  allDrivers: any[] = [];
  searchTerm: string = '';
  driverService = inject(DriverService);

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.driverService.getDrivers().subscribe((drivers: any[]) => {
      this.allDrivers = drivers ? drivers : [];
    });
  }

  onDriverAdded(driverData: any) {
    this.getDrivers();
  }

  openModal(driver?: any) {
    if (driver) {
      this.addDriverModalComponent.openModal(driver);
    } else {
      this.addDriverModalComponent.openModal();
    }
  }

  setActiveTab(index: number) {
    this.activeTab = index;
    this.activeDropdownId = null;
  }

  onSearchChange(value: string): void {
    this.searchTerm = value.toLowerCase();
    this.activeDropdownId = null;
  }

  get filteredDrivers(): any[] {
    if (!this.allDrivers) return [];

    let tabFiltered: any[];

    if (this.activeTab === 0) {
      tabFiltered = this.allDrivers.filter(
        (driver) => driver.carModel && driver.plateNumber
      );
    } else {
      tabFiltered = [...this.allDrivers];
    }

    if (!this.searchTerm) {
      return tabFiltered;
    } else {
      return tabFiltered.filter((driver) =>
        driver.driversName.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  toggleDropdown(item: any) {
    if (this.activeDropdownId === item.id) {
      this.activeDropdownId = null;
    } else {
      this.activeDropdownId = item.id;
    }
  }

  deleteDriver(item: any) {
    // Renamed method
    if (!item.id) {
      console.error('Driver ID is missing');
      alert('Cannot delete driver: Missing ID.');
      return;
    }

    this.driverService
      .deleteDriver(item.id)
      .then(() => {
        this.allDrivers = this.allDrivers.filter((d) => d.id !== item.id);
        this.activeDropdownId = null;
      })
      .catch((error: any) => {
        console.error('Error deleting driver:', error);
        alert('Error deleting driver. Please try again.');
      });
  }

  editDriver(item: any) {
    this.openModal(item);
    this.activeDropdownId = null;
  }
}
