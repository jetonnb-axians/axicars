import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  imports: [CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  isClosed = false;

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}