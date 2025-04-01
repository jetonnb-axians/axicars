import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 



import { ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-cardatabase',
  standalone: true,
  imports: [RouterModule, CommonModule, ModalComponent], 
  templateUrl: './cardatabase.component.html',
  styleUrls: ['./cardatabase.component.scss']
})
export class CardatabaseComponent {

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  openModal() {
    this.modalComponent.openModal();
  }

  tabs: string[] = ['Active Cars', 'Available Cars', 'All Cars'];
  activeTab: number = 0; 
  openDialog: boolean = false;

  setActiveTab(index: number): void {
    this.activeTab = index;
  }
}
