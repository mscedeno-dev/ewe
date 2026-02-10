// src/app/services/firebase.config.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCMW3YdwiZB9KjF6EES3XXS4GZ1cGvj9sU",
  authDomain: "proyecto-academia-de-la-lengua.firebaseapp.com",
  projectId: "proyecto-academia-de-la-lengua",
  storageBucket: "proyecto-academia-de-la-lengua.firebasestorage.app",
  messagingSenderId: "131612659949",
  appId: "1:131612659949:web:74a6c42bdd51e71532fce4"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);