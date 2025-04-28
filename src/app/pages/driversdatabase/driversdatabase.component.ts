import {
  Component,
  inject,
  ViewChild,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddDriverModalComponent } from '../drivers/add-driver-modal/add-driver-modal.component';
import { DriverService } from '../../services/driver.service';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';

@Component({
  selector: 'app-driversdatabase',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    AddDriverModalComponent,
    DeleteModalComponent,
  ],
  templateUrl: './driversdatabase.component.html',
  styleUrls: ['./driversdatabase.component.scss'],
})
export class DriversdatabaseComponent implements OnInit {
  @ViewChild(AddDriverModalComponent)
  addDriverModalComponent!: AddDriverModalComponent;
  @ViewChild(DeleteModalComponent)
  deleteModalComponent!: DeleteModalComponent;
  activeDropdownId: string | null = null;
  tabs: string[] = ['Assigned Drivers', 'All drivers'];
  activeTab: number = 0;
  allDrivers: any[] = [];
  searchTerm: string = '';
  driverService = inject(DriverService);

  carToDelete: any = null;
  isDeleteModalOpen: boolean = false;
  driverToDelete: any = null;

  private clickedTriggerElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.getDrivers();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.activeDropdownId &&
      this.clickedTriggerElement &&
      !this.clickedTriggerElement.contains(event.target as Node)
    ) {
      this.activeDropdownId = null;
      this.clickedTriggerElement = null;
    }
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
    this.clickedTriggerElement = null;
  }

  onSearchChange(value: string): void {
    this.searchTerm = value.toLowerCase();
    this.activeDropdownId = null;
    this.clickedTriggerElement = null;
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

  toggleDropdown(item: any, event: MouseEvent) {
    event.stopPropagation();

    if (this.activeDropdownId === item.id) {
      this.activeDropdownId = null;
      this.clickedTriggerElement = null;
    } else {
      this.activeDropdownId = item.id;
      this.clickedTriggerElement = event.currentTarget as HTMLElement;
    }
  }

  deleteDriver(item: any) {
    this.carToDelete = item;
    this.isDeleteModalOpen = true;
  }

  onConfirmDelete() {
    if (this.carToDelete) {
      this.driverService
        .deleteDriver(this.carToDelete.id)
        .then(() => {
          this.allDrivers = this.allDrivers.filter(
            (driver) => driver.id !== this.carToDelete.id
          );
          this.isDeleteModalOpen = false;
          this.carToDelete = null;
        })
        .catch((error) => {
          console.error('Error deleting driver:', error);
          alert('Error deleting driver. Please try again.');
        });
    }
  }

  cancelDelete() {
    this.isDeleteModalOpen = false;
    this.driverToDelete = null;
  }

  editDriver(item: any) {
    this.openModal(item);
    this.activeDropdownId = null;
    this.clickedTriggerElement = null;
  }
}
