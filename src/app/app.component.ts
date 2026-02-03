import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonRouterOutlet,
  IonMenu,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
} from '@ionic/angular/standalone';
import { filter } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  homeOutline,
  bookOutline,
  pencilOutline,
  shapesOutline,
  documentTextOutline,
  libraryOutline,
  schoolOutline,
  menuOutline,
  personCircleOutline,
  logOutOutline,
  settingsOutline,
  statsChartOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonRouterOutlet,
    IonMenu,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
  ],
})
export class AppComponent {
  pageTitle = 'Piensa';
  showBack = false;
  showTopbar = false; // ← IMPORTANTE: Empezar en false
  isLandingPage = true;
  userName = 'Usuario';
  userEmail = 'usuario@email.com';

  menuItems = [
    { title: 'Dashboard', icon: 'home-outline', route: '/dashboard' },
    { title: 'Gramática', icon: 'book-outline', route: '/gramatica' },
    { title: 'Ortografía', icon: 'pencil-outline', route: '/ortografia' },
    { title: 'Puntuación', icon: 'shapes-outline', route: '/puntuacion' },
    { title: 'Redacción', icon: 'document-text-outline', route: '/redaccion' },
    { title: 'Comprensión', icon: 'library-outline', route: '/compresion' },
    { title: 'Lecciones', icon: 'school-outline', route: '/lecciones' },
  ];

  constructor(private router: Router) {
    addIcons({
      chevronBackOutline,
      homeOutline,
      bookOutline,
      pencilOutline,
      shapesOutline,
      documentTextOutline,
      libraryOutline,
      schoolOutline,
      menuOutline,
      personCircleOutline,
      logOutOutline,
      settingsOutline,
      statsChartOutline,
    });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = e.urlAfterRedirects;

        // SOLUCIÓN DEFINITIVA: Verificar si estamos en landing
        this.isLandingPage = (url === '/' || url === '');
        this.showTopbar = !this.isLandingPage;

        // Mostrar botón back solo si NO es dashboard ni landing
        this.showBack = !url.startsWith('/dashboard') && !this.isLandingPage;

        // Título por ruta
        this.pageTitle = this.getTitleFromUrl(url);
        
        // Log para debug (puedes quitarlo después)
        console.log('URL:', url, '| isLanding:', this.isLandingPage, '| showTopbar:', this.showTopbar);
      });

    // Cargar datos del usuario desde localStorage
    this.loadUserData();
  }

  loadUserData() {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    
    if (name) this.userName = name;
    if (email) this.userEmail = email;
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }

  goBack() {
    if (!this.showBack) return;
    window.history.back();
  }

  logout() {
    // Limpiar autenticación
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    // Redirigir a landing
    this.router.navigateByUrl('/');
  }

  private getTitleFromUrl(url: string): string {
    const clean = url.split('?')[0].split('#')[0];

    if (clean === '/' || clean === '') return 'Piensa';
    if (clean.startsWith('/dashboard')) return 'Dashboard';
    if (clean.startsWith('/gramatica')) return 'Gramática';
    if (clean.startsWith('/ortografia')) return 'Ortografía';
    if (clean.startsWith('/puntuacion')) return 'Puntuación';
    if (clean.startsWith('/redaccion')) return 'Redacción';
    if (clean.startsWith('/compresion')) return 'Comprensión';
    if (clean.startsWith('/lecciones')) return 'Lecciones';

    return 'Piensa';
  }
}
