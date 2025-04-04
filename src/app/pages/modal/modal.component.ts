import { Component, OnInit, ViewChild, ElementRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'

})
export class ModalComponent {
  @ViewChild('modal') modal!: ElementRef;

  fileData: File | null = null;
  fileName: string = '';
  filePreview: string | ArrayBuffer | null = null;

  ngOnInit() {
    console.log('test', this.fileData);
  }

  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
    this.resetForm(); // Reset everything when closing the modal
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
    this.removeFile(); // Clear selected file data

    // Reset all input fields inside the modal
    const inputs = this.modal.nativeElement.querySelectorAll('input, select');
    inputs.forEach((input: HTMLElement) => {
      if (input instanceof HTMLInputElement) {
        if (input.type === 'text' || input.type === 'date' || input.type === 'file') {
          input.value = ''; // Clear text, date, and file inputs
        }
      } else if (input instanceof HTMLSelectElement) {
        input.selectedIndex = 0; // Reset dropdowns
      }
    });
  }
}
