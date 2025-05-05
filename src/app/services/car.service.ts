import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  async addCar(car: any): Promise<any> {
    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('Not logged in');
    const carRef = collection(this.firestore, 'cars');
    return addDoc(carRef, { ...car, userId: user.uid });
  }

  updateCar(carId: string, updatedData: any): Promise<void> {
    const carDocRef = doc(this.firestore, `cars/${carId}`);
    return updateDoc(carDocRef, updatedData);
  }

  getCars(): Observable<any[]> {
    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('Not logged in');

    const carRef = collection(this.firestore, 'cars');
    const userCarsQuery = query(carRef, where('userId', '==', user.uid));
    return collectionData(userCarsQuery, { idField: 'id' }) as Observable<
      any[]
    >;
  }

  deleteCar(carId: string): Promise<void> {
    const carDocRef = doc(this.firestore, `cars/${carId}`);
    return deleteDoc(carDocRef);
  }

  getCarById(id: string): Observable<any> {
    const carDocRef = doc(this.firestore, `cars/${id}`);
    return docData(carDocRef, { idField: 'id' }) as Observable<any>;
  }
}
