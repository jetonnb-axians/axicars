import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-carrequets',
  imports: [RouterModule, CommonModule], 
  templateUrl: './carrequets.component.html',
  styleUrl: './carrequets.component.scss'
})
export class CarrequetsComponent {
  tabs: string[] = ['New Car Requests', 'Archived Requests'];
  activeTab: number = 0; 

  setActiveTab(index: number): void {
    this.activeTab = index;
  }
}
