import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from './layouts/sidemenu/sidemenu.component';
import { CardatabaseComponent } from "./pages/cardatabase/cardatabase.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardatabaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
  //help me call my sidemenu component
  
    
})
export class AppComponent {
  title = 'axiCars';

}
