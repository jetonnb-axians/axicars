import { Injectable, signal } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc, // <--- Import deleteDoc
} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs'; // <--- Import Observable if you haven't already

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private firestore: Firestore) {}

  // Keep your signal if needed, but getCars already provides an observable
  // carInfo = signal<any[]>([]);

  addCar(car: any): Promise<any> {
    // Specify return type if possible
    const carRef = collection(this.firestore, 'cars');
    return addDoc(carRef, car);
  }

  updateCar(carId: string, updatedData: any): Promise<void> {
    // Specify return type
    const carDocRef = doc(this.firestore, `cars/${carId}`); // Use carDocRef convention
    return updateDoc(carDocRef, updatedData);
  }

  getCars(): Observable<any[]> {
    // Specify return type
    const carRef = collection(this.firestore, 'cars');
    // Ensure you are returning the observable directly
    return collectionData(carRef, { idField: 'id' }) as Observable<any[]>;
  }

  // --- NEW METHOD ---
  deleteCar(carId: string): Promise<void> {
    // Specify return type
    const carDocRef = doc(this.firestore, `cars/${carId}`); // Get the document reference
    return deleteDoc(carDocRef); // Use the deleteDoc function
  }
  // --- END NEW METHOD ---
}
