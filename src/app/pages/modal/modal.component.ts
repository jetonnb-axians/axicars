import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @ViewChild('modal') modal!: ElementRef;
  @Output() carAddedEvent = new EventEmitter<any>();

  fileData: File | null = null;
  fileName: string = '';
  filePreview: string | ArrayBuffer | null = null;

  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
    this.resetForm();
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileData = input.files[0];
      this.fileName = this.fileData.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(this.fileData);
    }
  }

  removeFile() {
    this.fileData = null;
    this.filePreview = null;
    this.fileName = '';
  }

  resetForm() {
    this.removeFile();
    const inputs = this.modal.nativeElement.querySelectorAll('input, select');
    inputs.forEach((input: HTMLElement) => {
      if (input instanceof HTMLInputElement) {
        input.value = '';
      } else if (input instanceof HTMLSelectElement) {
        input.selectedIndex = 0;
      }
    });
  }

  addCar() {
    const model = (
      this.modal.nativeElement.querySelector('#model') as HTMLInputElement
    )?.value;
    const plateNumber = (
      this.modal.nativeElement.querySelector('#platenumber') as HTMLInputElement
    )?.value;
    const driver = (
      this.modal.nativeElement.querySelector('#driver') as HTMLSelectElement
    )?.value;
    const fuel = (
      this.modal.nativeElement.querySelector('#fuel') as HTMLInputElement
    )?.value;
    const km = (
      this.modal.nativeElement.querySelector('#km') as HTMLInputElement
    )?.value;
    const lastInspection = (
      this.modal.nativeElement.querySelector(
        '#lastinspection'
      ) as HTMLInputElement
    )?.value;
    const nextInspection = (
      this.modal.nativeElement.querySelector(
        '#nextinspection'
      ) as HTMLInputElement
    )?.value;
    const status = (
      this.modal.nativeElement.querySelector('#status') as HTMLSelectElement
    )?.value;

    if (!model || !plateNumber || !driver || !status) {
      alert('Please fill all required fields');
      return;
    }

    const newCar = {
      carModel: model,
      plateNumber: plateNumber,
      driversName: driver,
      fuel,
      km,
      lastInspection,
      nextInspection,
      status,
      carpng: this.filePreview,
      driverpng: 'icons/driver.png',
    };

    this.carAddedEvent.emit(newCar);
    this.closeModal();
  }
}
