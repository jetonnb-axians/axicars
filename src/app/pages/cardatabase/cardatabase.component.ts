import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { NewcarComponent } from '../../shared/newcar/newcar.component';
@Component({
  selector: 'app-cardatabase',
  standalone: true,
  imports: [RouterModule, CommonModule, NewcarComponent,], 
  templateUrl: './cardatabase.component.html',
  styleUrls: ['./cardatabase.component.scss']
})
export class CardatabaseComponent {
  tabs: string[] = ['Active Cars', 'Available Cars', 'All Cars'];
  activeTab: number = 0; 
  openDialog: boolean = false;

  setActiveTab(index: number): void {
    this.activeTab = index;
  }

  

}
