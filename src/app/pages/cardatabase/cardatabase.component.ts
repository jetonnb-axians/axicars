import {
  Component,
  ViewChild,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CarService } from '../../services/car.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component'; // 👈 Import it

@Component({
  selector: 'app-cardatabase',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent, DeleteModalComponent], // 👈 Add DeleteModalComponent here
  templateUrl: './cardatabase.component.html',
  styleUrls: ['./cardatabase.component.scss'],
})
export class CardatabaseComponent implements OnInit {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  tabs: string[] = ['Active Cars', 'Available Cars', 'All Cars'];
  activeTab: number = 0;
  carInfo: any[] = [];
  searchTerm: string = '';

  carToDelete: any = null;
  isDeleteModalOpen: boolean = false;

  constructor(private carService: CarService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((data: any[]) => {
      this.carInfo = data ? data : [];
      this.carInfo.forEach((car) => (car.showDropdown = false));
    });
  }

  openModal(carObject?: any) {
    if (carObject) {
      this.modalComponent.openModal(carObject);
    } else {
      this.modalComponent.openModal();
    }
  }

  setActiveTab(index: number): void {
    this.activeTab = index;
    this.closeAllDropdowns();
  }

  onSearchChange(value: string): void {
    this.searchTerm = value.toLowerCase();
    this.closeAllDropdowns();
  }

  get filteredCars(): any[] {
    if (!this.carInfo) return [];

    let tabFilteredCars: any[] = [];

    if (this.activeTab === 0) {
      tabFilteredCars = this.carInfo.filter((car) => car.status === 'Active');
    } else if (this.activeTab === 1) {
      tabFilteredCars = this.carInfo.filter(
        (car) => car.status === 'Available'
      );
    } else {
      tabFilteredCars = [...this.carInfo];
    }

    if (!this.searchTerm) {
      return tabFilteredCars;
    } else {
      return tabFilteredCars.filter((car) =>
        car.carModel.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  toggleDropdown(car: any) {
    const currentState = car.showDropdown;
    this.closeAllDropdowns();
    car.showDropdown = !currentState;
  }

  closeAllDropdowns(): void {
    this.carInfo.forEach((c) => {
      c.showDropdown = false;
    });
  }

  deleteCar(car: any): void {
    const carId = car.id;
    if (carId) {
      this.carService
        .deleteCar(carId)
        .then(() => {
          this.carInfo = this.carInfo.filter((c) => c.id !== carId);
        })
        .catch((error: any) => {
          console.error(`Error deleting car with id ${carId}:`, error);
          alert('Error deleting car. Please try again.');
        });
    } else {
      console.error('Cannot delete car without an ID.');
      alert('Cannot delete car: Missing ID.');
    }
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const moreOptionsElements = document.querySelectorAll('.more-options');

    let clickedInside = false;

    moreOptionsElements.forEach((element) => {
      if (element.contains(event.target as Node)) {
        clickedInside = true;
      }
    });

    if (!clickedInside) {
      this.closeAllDropdowns();
    }
  }

  openDeleteModal(car: any) {
    this.carToDelete = car;
    this.isDeleteModalOpen = true;
  }

  // When user confirms deletion
  confirmDelete() {
    if (this.carToDelete?.id) {
      this.carService
        .deleteCar(this.carToDelete.id)
        .then(() => {
          this.carInfo = this.carInfo.filter(
            (c) => c.id !== this.carToDelete.id
          );
        })
        .catch((error: any) => {
          console.error(
            `Error deleting car with id ${this.carToDelete.id}:`,
            error
          );
          alert('Error deleting car. Please try again.');
        });
    } else {
      console.error('Cannot delete car without an ID.');
      alert('Cannot delete car: Missing ID.');
    }
    this.isDeleteModalOpen = false;
    this.carToDelete = null;
  }

  // When user cancels
  cancelDelete() {
    this.isDeleteModalOpen = false;
    this.carToDelete = null;
  }
}
