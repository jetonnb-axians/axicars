import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @ViewChild('modal') modal!: ElementRef;
  @Output() carAddedEvent = new EventEmitter<any>();
  @Output() carUpdatedEvent = new EventEmitter<any>();
  @Input() carToEdit: any = null;

  fileData: File | null = null;
  fileName: string = '';
  filePreview: string | ArrayBuffer | null = null;
  isEditMode: boolean = false;

  carForm!: FormGroup;
  formBuilder = inject(FormBuilder);

  constructor(private fb: FormBuilder, private carService: CarService) {
    this.carForm = this.fb.group({
      carPng: [this.filePreview],
      carModel: [''],
      plateNumber: [''],
      driversName: [''],
      fuel: [''],
      km: [''],
      lastInspection: [''],
      nextInspection: [''],
      status: [''],
      driverPng: ['icons/driver.png'],
      id: [''],
    });
  }

  ngOnInit() {}

  openModal(car?: any) {
    console.log('Editing car:', car);
    this.isEditMode = !!car;
    this.carToEdit = car;
    if (car) {
      this.filePreview = car.carpng || null;
      this.fileName = car.carpng ? 'Current image' : '';

      this.carForm.patchValue({
        carModel: car.carModel,
        plateNumber: car.plateNumber,
        driversName: car.driversName,
        fuel: car.fuel,
        km: car.km,
        lastInspection: car.lastInspection,
        nextInspection: car.nextInspection,
        status: car.status,
        driverPng: car.driverPng || 'icons/driver.png',
        id: car.id,
      });
      // filePreview is already set above
      // fileName is already set above
    } else {
      this.resetForm();
    }

    this.modal.nativeElement.style.display = 'block';
  }
  closeModal() {
    this.modal.nativeElement.style.display = 'none';
    this.resetForm();
    this.isEditMode = false;
    this.carToEdit = null;
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileData = input.files[0];
      this.fileName = this.fileData.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
        this.carForm.patchValue({ carPng: this.filePreview });
      };
      reader.readAsDataURL(this.fileData);
    }
  }

  removeFile() {
    this.fileData = null;
    this.filePreview = null;
    this.fileName = '';
    this.carForm.patchValue({ carPng: null });
  }

  resetForm() {
    this.fileData = null;
    this.filePreview = null;
    this.fileName = '';
    this.carForm.reset();
    this.carForm.patchValue({ driverPng: 'icons/driver.png' });
  }

  addCar() {
    if (this.carForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const formData = {
      ...this.carForm.value,
      carPng: this.filePreview || this.carToEdit?.carpng,
    };
    formData.id == null ? 1 : formData.id;
    console.log(formData);

    if (this.isEditMode && formData.id) {
      console.log('inside this isEditMode');
      const id = formData.id;
      delete formData.id;
      this.carService
        .updateCar(id, formData)
        .then(() => {
          this.carUpdatedEvent.emit({ ...formData, id });
          this.closeModal();
        })
        .catch((err) => {
          console.error('Update failed', err);
        });
    } else {
      console.log('inside else');
      this.carService
        .addCar(formData)
        .then((docRef) => {
          this.carAddedEvent.emit({ ...formData, id: docRef.id });
          this.closeModal();
        })
        .catch((err) => {
          console.error('Add failed', err);
        });
    }
  }
}
