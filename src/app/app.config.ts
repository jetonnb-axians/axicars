// app.config.ts
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // Add this

const firebaseConfig = {
  apiKey: 'AIzaSyAWloYkL32zXQ09Io2tHnxcyvk0VRCtGsk',
  authDomain: 'axicars-d49dd.firebaseapp.com',
  projectId: 'axicars-d49dd',
  storageBucket: 'axicars-d49dd.appspot.com', // Fixed this line
  messagingSenderId: '912196126101',
  appId: '1:912196126101:web:7fa680d4178f9022fae29c',
  measurementId: 'G-F68BTX5V0M',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), // Add this line
  ],
};
