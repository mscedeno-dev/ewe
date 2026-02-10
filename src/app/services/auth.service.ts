import { Injectable, inject } from '@angular/core';
import { Auth, authState, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // --- ESTA ES LA PARTE QUE TE FALTA O DA ERROR ---
  // Debe retornar un Observable<User | null>
  get authState$(): Observable<User | null> {
    return authState(this.auth);
  }

  // ... resto de tus métodos (login, register, etc.)
  register(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  logout() {
    return signOut(this.auth);
  }
}