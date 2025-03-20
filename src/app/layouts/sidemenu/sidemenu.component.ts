import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  isClosed = false;

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}