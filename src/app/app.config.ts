import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';

import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

registerLocaleData(en);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCod8srJUW-4TYEkWl4exgk9drc3kovJSc',
  authDomain: 'citypass-cb00b.firebaseapp.com',
  projectId: 'citypass-cb00b',
  storageBucket: 'citypass-cb00b.firebasestorage.app',
  messagingSenderId: '132111396267',
  appId: '1:132111396267:web:4d2bd86ad403620b5bf6ee',
};

const firebaseApp = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6Le2wmotAAAAAMiMu23EqO77WkrILRZ5-FeDAdFo'),
  isTokenAutoRefreshEnabled: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideNzDateFnsAdapter(),
    {
      provide: 'FIREBASE_APP',
      useValue: firebaseApp,
    },
  ],
};
