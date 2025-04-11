import { Component, ViewChild } from '@angular/core';
import { CarService } from '../../services/car.service'; // adjust path if necessary
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-cardatabase',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './cardatabase.component.html',
  styleUrls: ['./cardatabase.component.scss'],
})
export class CardatabaseComponent {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  tabs: string[] = ['Active Cars', 'Available Cars', 'All Cars'];
  activeTab: number = 0;
  carInfo: any[] = [];
  dropdownOpen = false;

  constructor(private carService: CarService, private eRef: ElementRef) {}

  ngOnInit() {
    this.carService.getCars().subscribe((data: any) => {
      if (data) {
        this.carInfo = data;
      }
    });
  }

  openModal() {
    this.modalComponent.openModal();
  }

  onCarAdded(car: any) {
    this.carInfo.push(car);

    this.carService
      .addCar(car)
      .then(() => {
        console.log('✅ Car saved to Firestore');
      })
      .catch((error) => {
        console.error('❌ Error saving car:', error);
      });
  }

  setActiveTab(index: number): void {
    this.activeTab = index;

    //filtro listen e this.carInfo dhe shfaqi te dhenat ne tabel
  }

  get filteredCars(): any[] {
    if (this.activeTab === 0) {
      return this.carInfo.filter((car) => car.status === 'Active');
    } else if (this.activeTab === 1) {
      return this.carInfo.filter((car) => car.status === 'Available');
    } else {
      return this.carInfo;
    }
  }

  toggleDropdown(car: any) {
    this.filteredCars.forEach((c) => {
      if (c !== car) {
        c.showDropdown = false; // Close others
      }
    });
    car.showDropdown = !car.showDropdown;
  }
}
