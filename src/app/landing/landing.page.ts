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
  gridOutline,
  rocketOutline,
  timeOutline,
  star,
  shapesOutline,
  libraryOutline,
  closeOutline,
  chevronDown,
  logIn,
  personCircleOutline,
  logOutOutline,
  barChartOutline,
  checkmarkDoneOutline,
  searchOutline,
  homeOutline,
  settingsOutline,
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
  ],
})
export class LandingPage implements OnInit {
  // Estado de autenticación
  isAuthenticated = false;
  
  // Datos del usuario
  userName = 'Usuario';
  userEmail = 'usuario@email.com';
  
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
    this.checkAuth();
    this.loadModulesProgress();
  }
  // AGREGAR ESTE MÉTODO COMPLETO
loadModulesProgress() {
  // Leer progreso desde localStorage
  this.modulos.forEach(modulo => {
    const progressKey = `progress_${modulo.id}`;
    const savedProgress = localStorage.getItem(progressKey);
    if (savedProgress) {
      modulo.progress = parseInt(savedProgress, 10);
    }
  });
  
  // Recalcular stats generales
  this.calculateProgress();
}

  checkAuth() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (this.isAuthenticated) {
      this.userName = localStorage.getItem('userName') || 'Usuario';
      this.userEmail = localStorage.getItem('userEmail') || 'usuario@email.com';
      this.calculateProgress();
    }
  }

  calculateProgress() {
    // Calcular progreso general
    const total = this.modulos.reduce((sum, m) => sum + m.progress, 0);
    this.overallProgress = Math.round(total / this.modulos.length);
    
    // Contar módulos completados
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
  }

  async handleLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      await this.showToast('Por favor completa todos los campos', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.loginData.email)) {
      await this.showToast('Por favor ingresa un email válido', 'warning');
      return;
    }

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', this.loginData.email);
    localStorage.setItem('userName', this.loginData.email.split('@')[0]);

    await this.showToast('¡Bienvenido!', 'success');
    this.closeAuth();
    
    // Recargar página para mostrar dashboard
    this.checkAuth();
  }

  async handleRegister() {
    if (!this.registerData.name || !this.registerData.email || 
        !this.registerData.password || !this.registerData.confirmPassword) {
      await this.showToast('Por favor completa todos los campos', 'warning');
      return;
    }

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

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', this.registerData.name);
    localStorage.setItem('userEmail', this.registerData.email);

    await this.showToast('¡Cuenta creada! Bienvenido 🎉', 'success');
    this.closeAuth();
    
    // Recargar página para mostrar dashboard
    this.checkAuth();
  }

  async logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    await this.showToast('Sesión cerrada', 'success');
    this.isAuthenticated = false;
    this.sidebarOpen = false;
    this.scrollToTop();
  }

  goToModule(modulo: any) {
    if (!this.isAuthenticated) {
      this.showAuth('register');
      return;
    }
    
    this.router.navigateByUrl(modulo.route);
  }

  goToSettings() {
    // Implementar settings
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

  get filteredModulos() {
    if (!this.searchQuery) return this.modulos;
    
    return this.modulos.filter(m => 
      m.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
