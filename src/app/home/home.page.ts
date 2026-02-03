import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import {
  school,
  refreshOutline,
  statsChartOutline,
  checkmarkDoneOutline,
  flashOutline,
  analyticsOutline,
  searchOutline,
  rocketOutline,
  informationCircleOutline,
  gridOutline,
  bookOutline,
  pencilOutline,
  shapesOutline,
  documentTextOutline,
  libraryOutline,
  trendingUpOutline,
  timeOutline,
  starOutline,
} from 'ionicons/icons';

type ModuloId =
  | 'gramatica'
  | 'ortografia'
  | 'puntuacion'
  | 'redaccion'
  | 'compresion'
  | 'lecciones';

interface ModuloCard {
  id: ModuloId;
  titulo: string;
  nivel: string;
  subs: number;
  route: string;
  theme: string;
  icon: string;
  porcentaje: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonIcon, IonProgressBar],
})
export class HomePage implements OnInit {
  busqueda = '';
  userName = 'Usuario';
  greeting = 'Buenos días';

  modulos: ModuloCard[] = [
    { 
      id: 'gramatica', 
      titulo: 'Gramática', 
      nivel: 'Nivel básico', 
      subs: 5, 
      route: '/gramatica', 
      theme: 'theme-green', 
      icon: 'book-outline', 
      porcentaje: 0 
    },
    { 
      id: 'ortografia', 
      titulo: 'Ortografía', 
      nivel: 'Nivel básico', 
      subs: 5, 
      route: '/ortografia', 
      theme: 'theme-green', 
      icon: 'pencil-outline', 
      porcentaje: 0 
    },
    { 
      id: 'puntuacion', 
      titulo: 'Puntuación', 
      nivel: 'Nivel intermedio', 
      subs: 5, 
      route: '/puntuacion', 
      theme: 'theme-amber', 
      icon: 'shapes-outline', 
      porcentaje: 0 
    },
    { 
      id: 'redaccion', 
      titulo: 'Redacción', 
      nivel: 'Nivel intermedio', 
      subs: 5, 
      route: '/redaccion', 
      theme: 'theme-amber', 
      icon: 'document-text-outline', 
      porcentaje: 0 
    },
    { 
      id: 'compresion', 
      titulo: 'Comprensión', 
      nivel: 'Nivel avanzado', 
      subs: 5, 
      route: '/compresion', 
      theme: 'theme-red', 
      icon: 'library-outline', 
      porcentaje: 0 
    },
    { 
      id: 'lecciones', 
      titulo: 'Lecciones', 
      nivel: 'Evaluación final', 
      subs: 0, 
      route: '/lecciones', 
      theme: 'theme-indigo', 
      icon: 'school', 
      porcentaje: 0 
    },
  ];

  modulosFiltrados: ModuloCard[] = [];

  progresoGeneral = 0;
  modulosCompletados = 0;
  racha = 0; // días consecutivos
  tiempoEstudio = 0; // minutos totales

  ringBackground = 'conic-gradient(#e2e8f0 0deg, #e2e8f0 360deg)';

  constructor(private router: Router) {
    addIcons({
      school,
      refreshOutline,
      statsChartOutline,
      checkmarkDoneOutline,
      flashOutline,
      analyticsOutline,
      searchOutline,
      rocketOutline,
      informationCircleOutline,
      gridOutline,
      bookOutline,
      pencilOutline,
      shapesOutline,
      documentTextOutline,
      libraryOutline,
      trendingUpOutline,
      timeOutline,
      starOutline,
    });
  }

  ngOnInit() {
    this.loadUserData();
    this.setGreeting();
    this.recalcular();
    this.modulosFiltrados = [...this.modulos];
  }

  ionViewWillEnter() {
    this.recalcular();
    this.filtrar();
  }

  loadUserData() {
    const name = localStorage.getItem('userName');
    if (name) {
      this.userName = name.split(' ')[0]; // Solo primer nombre
    }

    // Cargar estadísticas (simuladas por ahora)
    const savedRacha = localStorage.getItem('racha');
    const savedTiempo = localStorage.getItem('tiempoEstudio');
    
    if (savedRacha) this.racha = parseInt(savedRacha);
    if (savedTiempo) this.tiempoEstudio = parseInt(savedTiempo);
  }

  setGreeting() {
    const hora = new Date().getHours();
    if (hora < 12) {
      this.greeting = '¡Buenos días';
    } else if (hora < 19) {
      this.greeting = '¡Buenas tardes';
    } else {
      this.greeting = '¡Buenas noches';
    }
  }

  filtrar() {
    const q = this.busqueda.trim().toLowerCase();
    this.modulosFiltrados = this.modulos.filter(
      (m) => m.titulo.toLowerCase().includes(q) || m.nivel.toLowerCase().includes(q)
    );
  }

  ir(route: string) {
    this.router.navigateByUrl(route);
  }

  resetearProgreso() {
    if (confirm('¿Estás seguro de que quieres resetear todo tu progreso?')) {
      // Limpiar solo el progreso, no la autenticación
      const modulosIds: ModuloId[] = ['gramatica', 'ortografia', 'puntuacion', 'redaccion', 'compresion', 'lecciones'];
      modulosIds.forEach(id => {
        localStorage.removeItem(`progress_${id}`);
      });
      
      this.recalcular();
      this.filtrar();
    }
  }

  private recalcular() {
    this.modulos = this.modulos.map((m) => {
      const val = Number(localStorage.getItem(`progress_${m.id}`) ?? '0');
      return { ...m, porcentaje: isNaN(val) ? 0 : Math.max(0, Math.min(100, val)) };
    });

    const total = this.modulos.reduce((acc, m) => acc + m.porcentaje, 0);
    this.progresoGeneral = Math.round(total / this.modulos.length);

    this.modulosCompletados = this.modulos.filter((m) => m.porcentaje >= 100).length;

    const deg = Math.round((this.progresoGeneral / 100) * 360);
    this.ringBackground = `conic-gradient(#667eea 0deg, #667eea ${deg}deg, #e2e8f0 ${deg}deg, #e2e8f0 360deg)`;

    this.modulosFiltrados = [...this.modulos];
  }
}
