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

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private firestore: Firestore) {}

  addCar(car: any): Promise<any> {
    const carRef = collection(this.firestore, 'cars');
    return addDoc(carRef, car);
  }

  updateCar(carId: string, updatedData: any): Promise<void> {
    const carDocRef = doc(this.firestore, `cars/${carId}`);
    return updateDoc(carDocRef, updatedData);
  }

  getCars(): Observable<any[]> {
    const carRef = collection(this.firestore, 'cars');
    return collectionData(carRef, { idField: 'id' }) as Observable<any[]>;
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
