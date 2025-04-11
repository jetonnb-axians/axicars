import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { CollectionReference, DocumentData, getDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class CarService {
  private carCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.carCollection = collection(this.firestore, 'cars');
    console.log('thisss', this.carCollection);
  }

  addCar(car: any) {
    return addDoc(this.carCollection, car);
  }

  getCars() {
    return collectionData(this.carCollection);
  }
}
