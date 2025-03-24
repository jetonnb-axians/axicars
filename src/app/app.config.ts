import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyBTLUuBpp1MzwsgGcuqa5FZmTsSvc8l_3I",
  authDomain: "axicars-cb652.firebaseapp.com",
  projectId: "axicars-cb652",
  storageBucket: "axicars-cb652.firebasestorage.app",
  messagingSenderId: "458494084953",
  appId: "1:458494084953:web:567e79f438235bfb18ae48"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideHttpClient(),
     importProvidersFrom([
      // provideFirebaseApp(() => initializeApp(firebaseConfig)),
      // provideAuth(() => getAuth())
     ])
    ]
};
