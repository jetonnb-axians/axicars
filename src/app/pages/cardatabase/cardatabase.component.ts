import { Component, ViewChild, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cardatabase',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './cardatabase.component.html',
  styleUrls: ['./cardatabase.component.scss'],
})
export class CardatabaseComponent implements OnInit {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  tabs: string[] = ['Active Cars', 'Available Cars', 'All Cars'];
  activeTab: number = 0;
  // ki me i kriju interface per kerre  nvend t'any[] ki me kriju 1 interface CarInterface 
  carInfo: any[] = [];

  

  constructor(private carService: CarService) {}

  ngOnInit() {
    // e qet ne nje metod te vecant 
    this.carService.getCars().subscribe((data: any[]) => {
      this.carInfo = data ? data : [];
      console.log('Cars loaded:', this.carInfo);
    });
  }
  
  openModal(carObject?: any) {
    if (carObject) {
      this.modalComponent.openModal(carObject);
    } else {
      this.modalComponent.openModal();
    }
  }
  //Fshije ose kontrolloje 
  onCarAdded(car: any) {
    console.log('car', car)
  }
  //Fshije ose kontrolloje 

  onCarUpdated(updatedCar: any) {}

  setActiveTab(index: number): void {
    this.activeTab = index;
  }

  get filteredCars(): any[] {
    if (!this.carInfo) return [];

    if (this.activeTab === 0) {
      return this.carInfo.filter((car) => car.status === 'Active');
    } else if (this.activeTab === 1) {
      return this.carInfo.filter((car) => car.status === 'Available');
    } else {
      return this.carInfo;
    }
  }
  //Check thiss 
  toggleDropdown(car: any) {
    this.carInfo.forEach((c) => {
      if (c !== car) {
        c.showDropdown = false;
      }
    });
    car.showDropdown = !car.showDropdown;
  }

  deleteCar(car: any): void {
    const carId = car.id;
    if (carId) {
      this.carService.deleteCar(carId);
    }
  }
}
