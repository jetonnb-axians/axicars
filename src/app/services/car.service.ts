import { Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private firestore: Firestore) {}

  carInfo = signal<any[]>([]);

  addCar(car: any) {
    const carRef = collection(this.firestore, 'cars');
    return addDoc(carRef, car);
  }

  updateCar(carId: string, updatedData: any) {
    const carDoc = doc(this.firestore, `cars/${carId}`);
    return updateDoc(carDoc, updatedData);
  }

  getCars() {
    const carRef = collection(this.firestore, 'cars');
    return collectionData(carRef, { idField: 'id' });
  }
}
