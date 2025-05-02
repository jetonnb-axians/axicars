import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DriverService } from '../../services/driver.service';
import { ViewChild } from '@angular/core';
import { AddDriverModalComponent } from '..//drivers/add-driver-modal/add-driver-modal.component';

@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [CommonModule, AddDriverModalComponent],
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.scss',
})
export class DriverProfileComponent implements OnInit {
  route = inject(ActivatedRoute);

  @ViewChild(AddDriverModalComponent) editModal!: AddDriverModalComponent;

  driverService = inject(DriverService);

  driverId: string | null = null;
  driver: any = null;

  activeTab: 'km' | 'damage' = 'km';

  setTab(tab: 'km' | 'damage') {
    this.activeTab = tab;
  }

  openEditModal() {
    if (this.driver) {
      this.editModal.openModal(this.driver);
    }
  }

  handleDriverUpdated(updatedDriver: any) {
    // Optionally refresh driver data
    this.driver = updatedDriver;
  }

  ngOnInit() {
    this.driverId = this.route.snapshot.paramMap.get('id');
    if (this.driverId) {
      this.driverService.getDriverById(this.driverId).subscribe((driver) => {
        this.driver = driver;
      });
    }
  }
}
