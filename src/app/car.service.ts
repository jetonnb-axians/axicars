import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Car {
  make: string;
  model: string;
  year: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private firestore: Firestore = inject(Firestore); // Initialize Firestore here
  private carsCollection = collection(this.firestore, 'cars');

  constructor() {}

  addCar(car: Car) {
    return addDoc(this.carsCollection, car);
  }

  getCars(): Observable<Car[]> {
    return collectionData(this.carsCollection, { idField: 'id' }) as Observable<
      Car[]
    >;
  }
}
