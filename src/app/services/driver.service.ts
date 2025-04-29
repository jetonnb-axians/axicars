import { Injectable } from '@angular/core';
import {
  doc,
  deleteDoc,
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private firestore: Firestore) {}

  async updateDriver(driverId: string, newDriverData: any): Promise<void> {
    const driverDocRef = doc(this.firestore, 'drivers', driverId);
    await updateDoc(driverDocRef, newDriverData);
  }

  addDriver(driver: any) {
    const driverRef = collection(this.firestore, 'drivers');
    return addDoc(driverRef, driver);
  }

  getDrivers(): Observable<any[]> {
    const driverRef = collection(this.firestore, 'drivers');
    return collectionData(driverRef, { idField: 'id' }) as Observable<any[]>;
  }

  deleteDriver(driverId: string) {
    const driverDocRef = doc(this.firestore, `drivers/${driverId}`);
    return deleteDoc(driverDocRef);
  }
  getDriverById(id: string) {
    const driverDoc = doc(this.firestore, `drivers/${id}`);
    return docData(driverDoc, { idField: 'id' });
  }
}
