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
selectedFile: any;

fileName: string = '';
filePreview: string | ArrayBuffer | null = null;

ngOnInit() {
  console.log('test',this.fileData)
}

  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
   
    this.fileData = event.target.files[0];


    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;

      // Create a file preview
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }






  
}
