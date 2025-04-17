import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-driver-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-driver-modal.component.html',
  styleUrl: './add-driver-modal.component.scss',
})
export class AddDriverModalComponent {
  @ViewChild('modal') modal!: ElementRef;

  fileData: File | null = null;
  fileName: string = '';
  filePreview: string | ArrayBuffer | null = null;

  driverForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  openModal() {
    console.log('Opening modal...');
    this.modal.nativeElement.style.display = 'block';
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
