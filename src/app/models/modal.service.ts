import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  currentModal: 'km' | 'maintenance' | 'damage' | null = null;

  open(tab: string) {
    if (tab === 'KM Report') {
      this.currentModal = 'km';
    } else if (tab === 'Maintenance History') {
      this.currentModal = 'maintenance';
    } else if (tab === 'Damage Report') {
      this.currentModal = 'damage';
    }
  }

  close() {
    this.currentModal = null;
  }
}
