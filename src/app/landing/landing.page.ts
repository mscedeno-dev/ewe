import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  sparkles,
  rocket,
  bookOutline,
  pencilOutline,
  documentTextOutline,
  speedometerOutline,
  trophyOutline,
  flashOutline,
  phonePortraitOutline,
  documentOutline,
  personAdd,
  close,
  logInOutline,
  personAddOutline,
  mailOutline,
  lockClosedOutline,
  personOutline,
  school,
  menuOutline,
  arrowForward,
  arrowForwardOutline,
  gridOutline,
  rocketOutline,
  timeOutline,
  star,
  shapesOutline,
  libraryOutline,
  closeOutline,
  chevronDown,
  logIn,
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
  ],
})
export class LandingPage implements OnInit {
  showAuthModal = false;
  authMode: 'login' | 'register' = 'login';
  mobileMenuOpen = false;

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

  modulosDestacados = [
    {
      titulo: 'Gramática',
      descripcion: 'Domina las estructuras fundamentales del idioma español',
      nivel: 'Básico',
      lecciones: 5,
      icon: 'book-outline',
      theme: 'theme-green',
    },
    {
      titulo: 'Ortografía',
      descripcion: 'Aprende las reglas de acentuación y escritura correcta',
      nivel: 'Básico',
      lecciones: 5,
      icon: 'pencil-outline',
      theme: 'theme-green',
    },
    {
      titulo: 'Puntuación',
      descripcion: 'Usa correctamente los signos de puntuación',
      nivel: 'Intermedio',
      lecciones: 5,
      icon: 'shapes-outline',
      theme: 'theme-amber',
    },
    {
      titulo: 'Redacción',
      descripcion: 'Mejora tu estilo y coherencia al escribir',
      nivel: 'Intermedio',
      lecciones: 5,
      icon: 'document-text-outline',
      theme: 'theme-amber',
    },
    {
      titulo: 'Comprensión',
      descripcion: 'Desarrolla tu capacidad de análisis de textos',
      nivel: 'Avanzado',
      lecciones: 5,
      icon: 'library-outline',
      theme: 'theme-red',
    },
    {
      titulo: 'Lecciones Finales',
      descripcion: 'Pon a prueba todo lo aprendido',
      nivel: 'Evaluación',
      lecciones: 10,
      icon: 'school',
      theme: 'theme-indigo',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      sparkles,
      rocket,
      bookOutline,
      pencilOutline,
      documentTextOutline,
      speedometerOutline,
      trophyOutline,
      flashOutline,
      phonePortraitOutline,
      documentOutline,
      personAdd,
      close,
      logInOutline,
      personAddOutline,
      mailOutline,
      lockClosedOutline,
      personOutline,
      school,
      menuOutline,
      arrowForward,
      arrowForwardOutline,
      gridOutline,
      rocketOutline,
      timeOutline,
      star,
      shapesOutline,
      libraryOutline,
      closeOutline,
      chevronDown,
      logIn,
    });
  }

  ngOnInit() {
    // Verificar si ya está autenticado
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuth) {
      // Si ya está autenticado, redirigir al dashboard
      this.router.navigateByUrl('/dashboard');
    }
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
  }

  async handleLogin() {
    // Validación básica
    if (!this.loginData.email || !this.loginData.password) {
      await this.showToast('Por favor completa todos los campos', 'warning');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.loginData.email)) {
      await this.showToast('Por favor ingresa un email válido', 'warning');
      return;
    }

    // Simular autenticación
    console.log('Login:', this.loginData);
    
    // Guardar estado de autenticación
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', this.loginData.email);

    // Mostrar mensaje de éxito
    await this.showToast('¡Bienvenido! Iniciando sesión...', 'success');

    // Redirigir al dashboard
    this.closeAuth();
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 500);
  }

  async handleRegister() {
    // Validaciones
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password ||
      !this.registerData.confirmPassword
    ) {
      await this.showToast('Por favor completa todos los campos', 'warning');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email)) {
      await this.showToast('Por favor ingresa un email válido', 'warning');
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

    // Simular registro
    console.log('Register:', this.registerData);

    // Guardar estado de autenticación
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', this.registerData.name);
    localStorage.setItem('userEmail', this.registerData.email);

    // Mostrar mensaje de éxito
    await this.showToast('¡Cuenta creada! Bienvenido a Piensa 🎉', 'success');

    // Redirigir al dashboard
    this.closeAuth();
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 500);
  }

  async showAuthForModule() {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuth) {
      // Si ya está autenticado, ir al dashboard
      this.router.navigateByUrl('/dashboard');
    } else {
      // Si no está autenticado, mostrar modal de registro
      const alert = await this.alertController.create({
        header: '¡Regístrate para empezar!',
        message: 'Crea una cuenta gratis para acceder a todos los módulos de aprendizaje',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Registrarme',
            handler: () => {
              this.showAuth('register');
            },
          },
        ],
      });

      await alert.present();
    }
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      buttons: [
        {
          text: '✕',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }
}
