import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyB6FgatJzChLU2dHmOLn71wGGSmlM643cw',
  authDomain: 'easymenu-c8782.firebaseapp.com',
  projectId: 'easymenu-c8782',
  storageBucket: 'easymenu-c8782.firebasestorage.app',
  messagingSenderId: '887383173076',
  appId: '1:887383173076:web:8383e856b3f013a1985841',
};

const app = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => app),
    provideFirestore(() => getFirestore(app)),
  ],
};
