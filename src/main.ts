import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 1. IMPORTACIONES DE FIREBASE
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// 2. TUS CREDENCIALES CORRECTAS (Proyecto Academia de la Lengua)
const firebaseConfig = {
  apiKey: "AIzaSyCMW3YdwiZB9KjF6EES3XXS4GZ1cGvj9sU",
  authDomain: "proyecto-academia-de-la-lengua.firebaseapp.com",
  projectId: "proyecto-academia-de-la-lengua",
  storageBucket: "proyecto-academia-de-la-lengua.firebasestorage.app",
  messagingSenderId: "131612659949",
  appId: "1:131612659949:web:74a6c42bdd51e71532fce4"
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    
    // Mantenemos tu configuración de Router con Precarga
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // 3. INICIALIZAR FIREBASE CON TUS DATOS
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), // Agregado para la base de datos
  ],
});