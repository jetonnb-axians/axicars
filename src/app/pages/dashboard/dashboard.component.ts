import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { inject, Injectable } from "@angular/core";
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authService = inject(AuthService);

  
}
