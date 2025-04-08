import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-cardatabase',
  standalone: true,
  imports: [RouterModule, CommonModule, ModalComponent],
  templateUrl: './cardatabase.component.html',
  styleUrls: ['./cardatabase.component.scss'],
})
export class CardatabaseComponent {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  tabs: string[] = ['Active Cars', 'Available Cars', 'All Cars'];
  activeTab: number = 0;

  carInfo: any[] = [];

  openModal() {
    this.modalComponent.openModal();
  }

  onCarAdded(car: any) {
    this.carInfo.push(car);
  }

  setActiveTab(index: number): void {
    this.activeTab = index;
  }
}
