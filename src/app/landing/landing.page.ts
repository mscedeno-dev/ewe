import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate que la ruta sea correcta
import {
  IonContent,
  IonButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonInput,
  IonSearchbar,
  IonAvatar,
  IonProgressBar,
  IonMenu,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  AlertController,
  ToastController,
  MenuController,
  IonSpinner // Agregado para feedback visual
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  sparkles, rocket, bookOutline, pencilOutline, documentTextOutline,
  speedometerOutline, trophyOutline, flashOutline, phonePortraitOutline,
  documentOutline, personAdd, close, logInOutline, personAddOutline,
  mailOutline, lockClosedOutline, personOutline, school, menuOutline,
  arrowForward, gridOutline, rocketOutline, timeOutline, star,
  shapesOutline, libraryOutline, closeOutline, chevronDown, logIn,
  personCircleOutline, logOutOutline, barChartOutline, checkmarkDoneOutline,
  searchOutline, homeOutline, settingsOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonInput,
    IonSearchbar,
    IonAvatar,
    IonProgressBar,
    IonMenu,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner
  ],
})
export class LandingPage implements OnInit {
  // Estado de autenticación
  isAuthenticated = false;
  isLoading = false; // Para mostrar spinner en los botones

  // Datos del usuario
  userName = 'Usuario';
  userEmail = '';

  // Modal de autenticación
  showAuthModal = false;
  authMode: 'login' | 'register' = 'login';
  mobileMenuOpen = false;
  sidebarOpen = false;

  // Forms
  loginData = {
    email: '',
    password: '',
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Stats del dashboard
  overallProgress = 0;
  completedModules = 0;
  searchQuery = '';

  // Módulos
  modulos = [
    {
      id: 'gramatica',
      titulo: 'Gramática',
      descripcion: 'Domina las estructuras fundamentales',
      nivel: 'Básico',
      lecciones: 5,
      icon: 'book-outline',
      color: '#10b981',
      progress: 75,
      route: '/gramatica',
    },
    {
      id: 'ortografia',
      titulo: 'Ortografía',
      descripcion: 'Reglas de acentuación y escritura',
      nivel: 'Básico',
      lecciones: 5,
      icon: 'pencil-outline',
      color: '#3b82f6',
      progress: 60,
      route: '/ortografia',
    },
    {
      id: 'puntuacion',
      titulo: 'Puntuación',
      descripcion: 'Uso correcto de signos',
      nivel: 'Intermedio',
      lecciones: 5,
      icon: 'shapes-outline',
      color: '#f59e0b',
      progress: 0,
      route: '/puntuacion',
    },
    {
      id: 'redaccion',
      titulo: 'Redacción',
      descripcion: 'Mejora tu estilo al escribir',
      nivel: 'Intermedio',
      lecciones: 5,
      icon: 'document-text-outline',
      color: '#f97316',
      progress: 90,
      route: '/redaccion',
    },
    {
      id: 'compresion',
      titulo: 'Comprensión',
      descripcion: 'Análisis de textos',
      nivel: 'Avanzado',
      lecciones: 5,
      icon: 'library-outline',
      color: '#ef4444',
      progress: 0,
      route: '/compresion',
    },
    {
      id: 'lecciones',
      titulo: 'Lecciones Finales',
      descripcion: 'Pon a prueba lo aprendido',
      nivel: 'Evaluación',
      lecciones: 10,
      icon: 'school',
      color: '#8b5cf6',
      progress: 0,
      route: '/lecciones',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService, // Inyectamos el servicio real
    private toastController: ToastController,
    private menuController: MenuController
  ) {
    addIcons({
      sparkles, rocket, bookOutline, pencilOutline, documentTextOutline,
      speedometerOutline, trophyOutline, flashOutline, phonePortraitOutline,
      documentOutline, personAdd, close, logInOutline, personAddOutline,
      mailOutline, lockClosedOutline, personOutline, school, menuOutline,
      arrowForward, gridOutline, rocketOutline, timeOutline, star,
      shapesOutline, libraryOutline, closeOutline, chevronDown, logIn,
      personCircleOutline, logOutOutline, barChartOutline, checkmarkDoneOutline,
      searchOutline, homeOutline, settingsOutline,
    });
  }

  ngOnInit() {
    // 1. Escuchar el estado de Firebase en tiempo real
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.userEmail = user.email || '';
        // Firebase Auth básico no guarda el nombre al registrarse inmediatamente,
        // usamos el nombre del formulario si está disponible, o la parte del correo.
        this.userName = user.displayName || this.userEmail.split('@')[0];
        this.calculateProgress();
      } else {
        this.isAuthenticated = false;
        this.userName = 'Invitado';
      }
    });

    this.loadModulesProgress();
  }

  loadModulesProgress() {
    // Mantenemos el progreso en localStorage por ahora (esto podría ir a Firestore luego)
    this.modulos.forEach(modulo => {
      const progressKey = `progress_${modulo.id}`;
      const savedProgress = localStorage.getItem(progressKey);
      if (savedProgress) {
        modulo.progress = parseInt(savedProgress, 10);
      }
    });
    this.calculateProgress();
  }

  calculateProgress() {
    const total = this.modulos.reduce((sum, m) => sum + m.progress, 0);
    this.overallProgress = Math.round(total / this.modulos.length);
    this.completedModules = this.modulos.filter(m => m.progress === 100).length;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.menuController.toggle();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  showAuth(mode: 'login' | 'register') {
    this.authMode = mode;
    this.showAuthModal = true;
    this.mobileMenuOpen = false;
  }

  closeAuth() {
    this.showAuthModal = false;
    this.resetForms();
  }

  switchAuth(mode: 'login' | 'register') {
    this.authMode = mode;
    this.resetForms();
  }

  resetForms() {
    this.loginData = { email: '', password: '' };
    this.registerData = { name: '', email: '', password: '', confirmPassword: '' };
    this.isLoading = false;
  }

  // --- LÓGICA DE LOGIN CON FIREBASE ---
  async handleLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      await this.showToast('Por favor completa todos los campos', 'warning');
      return;
    }

    this.isLoading = true;

    try {
      // Llamada real a Firebase
      await this.authService.login(this.loginData.email, this.loginData.password);
      
      await this.showToast('¡Bienvenido de nuevo!', 'success');
      this.closeAuth();
      // No hace falta recargar, el observable en ngOnInit actualizará la vista
    } catch (error: any) {
      console.error(error);
      const msg = this.mapFirebaseError(error.code);
      await this.showToast(msg, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  // --- LÓGICA DE REGISTRO CON FIREBASE ---
  async handleRegister() {
    if (!this.registerData.email || !this.registerData.password || !this.registerData.confirmPassword) {
      await this.showToast('Completa todos los campos obligatorios', 'warning');
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      await this.showToast('Las contraseñas no coinciden', 'warning');
      return;
    }

    if (this.registerData.password.length < 6) {
      await this.showToast('La contraseña debe tener al menos 6 caracteres', 'warning');
      return;
    }

    this.isLoading = true;

    try {
      // Llamada real a Firebase
      await this.authService.register(this.registerData.email, this.registerData.password);
      
      // Opcional: Aquí podrías llamar a updateProfile para guardar el registerData.name
      
      await this.showToast('¡Cuenta creada con éxito!', 'success');
      this.closeAuth();
    } catch (error: any) {
      console.error(error);
      const msg = this.mapFirebaseError(error.code);
      await this.showToast(msg, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  // --- LÓGICA DE LOGOUT CON FIREBASE ---
  async logout() {
    try {
      await this.authService.logout();
      await this.showToast('Sesión cerrada', 'primary');
      this.sidebarOpen = false;
      this.scrollToTop();
    } catch (error) {
      console.error(error);
    }
  }

  goToModule(modulo: any) {
    if (!this.isAuthenticated) {
      this.showToast('Debes iniciar sesión para acceder al contenido', 'warning');
      this.showAuth('login'); // Redirige al login en vez de register
      return;
    }
    this.router.navigateByUrl(modulo.route);
  }

  goToSettings() {
    this.showToast('Configuración - Próximamente', 'primary');
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger' | 'primary' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      buttons: [{ text: '✕', role: 'cancel' }],
    });
    await toast.present();
  }

  // Traductor de errores de Firebase
  private mapFirebaseError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado.';
      case 'auth/invalid-email':
        return 'El correo no es válido.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil.';
      default:
        return 'Ocurrió un error inesperado.';
    }
  }

  get filteredModulos() {
    if (!this.searchQuery) return this.modulos;
    return this.modulos.filter(m => 
      m.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}