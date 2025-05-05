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
import { AuthService } from './auth.service';
import { query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  async updateDriver(driverId: string, newDriverData: any): Promise<void> {
    const driverDocRef = doc(this.firestore, 'drivers', driverId);
    await updateDoc(driverDocRef, newDriverData);
  }

  async addDriver(driver: any): Promise<any> {
    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('Not logged in');
    const driverRef = collection(this.firestore, 'drivers');
    return addDoc(driverRef, { ...driver, userId: user.uid });
  }

  getDrivers(): Observable<any[]> {
    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('Not logged in');

    const driverRef = collection(this.firestore, 'drivers');
    const userDriversQuery = query(driverRef, where('userId', '==', user.uid));
    return collectionData(userDriversQuery, { idField: 'id' }) as Observable<
      any[]
    >;
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
