import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.scss',
})
export class DriverProfileComponent implements OnInit {
  route = inject(ActivatedRoute);
  driverService = inject(DriverService);

  driverId: string | null = null;
  driver: any = null;

  ngOnInit() {
    this.driverId = this.route.snapshot.paramMap.get('id');
    if (this.driverId) {
      this.driverService.getDriverById(this.driverId).subscribe((driver) => {
        this.driver = driver;
      });
    }
  }
}
