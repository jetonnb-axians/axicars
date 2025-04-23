import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DriverService } from '..//..//..//services/driver.service';
@Component({
  selector: 'app-add-driver-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-driver-modal.component.html',
  styleUrl: './add-driver-modal.component.scss',
})
export class AddDriverModalComponent {
  @ViewChild('modal') modal!: ElementRef;
  @Output() driverAdded = new EventEmitter<any>();

  private editingDriverId: string | null = null;

  fileData: File | null = null;
  fileName: string = '';
  filePreview: string | ArrayBuffer | null = null;

  driverForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  driverService = inject(DriverService);

  async onSubmit() {
    if (!this.driverForm.valid) return;

    const newDriver = {
      driversName: `${this.driverForm.value.firstName} ${this.driverForm.value.lastName}`,
      phoneNumber: this.driverForm.value.phoneNumber,
      emailAddress: this.driverForm.value.emailAddress,
      carModel: 'Peugeot 208 2021',
      plateNumber: '01-120-RKS',
      driverpng: this.filePreview || 'icons/driver.png',
      status: 'All drivers',
      showDropdown: false,
    };

    try {
      if (this.editingDriverId) {
        await this.driverService.updateDriver(this.editingDriverId, newDriver);
      } else {
        await this.driverService.addDriver(newDriver);
      }

      this.driverAdded.emit(newDriver);
      this.closeModal();
    } catch (error) {
      console.error('Error submitting driver:', error);
    }
  }

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      emailAddress: [''],
    });
  }

  openEdit(driverObject: any | null) {
    this.openModal();

    if (driverObject) {
      this.driverForm.patchValue(driverObject);
      this.filePreview = driverObject.driverPng || 'icons/driver.png';
      this.fileName = 'Uploaded';
    } else {
      this.resetForm();
    }
  }

  openModal(driver?: any) {
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = 'block';

    if (!this.driverForm) {
      this.driverForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        phoneNumber: [''],
        emailAddress: [''],
      });
    }

    if (driver) {
      const [firstName, lastName] = driver.driversName.split(' ');

      this.driverForm.patchValue({
        firstName,
        lastName,
        phoneNumber: driver.phoneNumber,
        emailAddress: driver.emailAddress,
      });

      this.filePreview = driver.driverpng;
      this.fileName = driver.driversName;
      this.editingDriverId = driver.id;
    } else {
      this.editingDriverId = null;
    }
  }
  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  removeFile() {
    this.fileData = null;
    this.filePreview = null;
    this.fileName = '';
    this.driverForm.patchValue({ driverPng: null });
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileData = input.files[0];
      this.fileName = this.fileData.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
        this.driverForm.patchValue({ driverPng: this.filePreview });
      };
      reader.readAsDataURL(this.fileData);
    }
  }

  resetForm() {
    this.fileData = null;
    this.filePreview = null;
    this.fileName = '';
    this.driverForm.reset();
    this.driverForm.patchValue({ driverPng: 'icons/driver.png' });
  }
}
