import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-driversdatabase',
  imports: [RouterModule, CommonModule],
  templateUrl: './driversdatabase.component.html',
  styleUrl: './driversdatabase.component.scss'
})
export class DriversdatabaseComponent {
  tabs: string[] = ['Assigned Drivers', 'All drivers'];
  activeTab: number = 0; 

  setActiveTab(index: number): void {
    this.activeTab = index;

}
}
