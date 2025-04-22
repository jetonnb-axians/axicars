// src/app/services/driver.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private firestore: Firestore) {}

  addDriver(driver: any) {
    const driverRef = collection(this.firestore, 'drivers');
    return addDoc(driverRef, driver);
  }

  getDrivers(): Observable<any[]> {
    const driverRef = collection(this.firestore, 'drivers');
    return collectionData(driverRef, { idField: 'id' }) as Observable<any[]>;
  }
}
