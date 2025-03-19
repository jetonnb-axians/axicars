import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidemenuComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
  //help me call my sidemenu component
  
    
})
export class AppComponent {
  title = 'axiCars';

}
