// car.interface.ts
import { DocumentData } from '@angular/fire/firestore';

export interface Car extends DocumentData {
  id?: string;
  carPng?: string | ArrayBuffer | null;
  carModel: string;
  plateNumber: string;
  driversName: string;
  fuel: string;
  km: string;
  lastInspection: string;
  nextInspection: string;
  status: string;
  driverPng?: string;
  showDropdown?: boolean;
}
