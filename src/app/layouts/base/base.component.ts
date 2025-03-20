import { Component } from '@angular/core';
import { SidemenuComponent } from "../sidemenu/sidemenu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [SidemenuComponent,RouterOutlet],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

}
