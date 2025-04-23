import { Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddDriverModalComponent } from '../drivers/add-driver-modal/add-driver-modal.component';
import { DriverService } from '..//..//services/driver.service';

@Component({
  selector: 'app-driversdatabase',
  standalone: true,
  imports: [RouterModule, CommonModule, AddDriverModalComponent],
  templateUrl: './driversdatabase.component.html',
  styleUrl: './driversdatabase.component.scss',
})
export class DriversdatabaseComponent {
  onDriverAdded($event: any) {
    throw new Error('Method not implemented.');
  }
  @ViewChild(AddDriverModalComponent)
  addDriverModalComponent!: AddDriverModalComponent;

  tabs: string[] = ['Assigned Drivers', 'All drivers'];
  activeTab: number = 0;

  filteredDrivers: any[] = [];
  driverService = inject(DriverService);

  ngOnInit() {
    // e qet ne nje metod te vecant =
    this.driverService.getDrivers().subscribe((drivers: any[]) => {
      this.filteredDrivers = drivers;
    });
  }

  openModal() {
    this.addDriverModalComponent.openModal();
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }
  //Fix duplicated dropdown
  toggleDropdown(item: any) {
    item.showDropdown = !item.showDropdown;
  }

  deleteCar(item: any) {
    if (!item.id) {
      console.error('Driver ID is missing');
      return;
    }

    this.driverService
      .deleteDriver(item.id)
      .then(() => {
        this.filteredDrivers = this.filteredDrivers.filter(
          (d) => d.id !== item.id
        );
      })
      .catch((error: any) => {
        console.error('Error deleting driver:', error);
      });
  }

  editDriver(item: any) {
    this.addDriverModalComponent.openModal(item); // Pass driver object
  }
}
