import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
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
} from 'ionicons/icons';

type ModuloId = 'gramatica' | 'ortografia' | 'puntuacion' | 'redaccion' | 'comprension' | 'lecciones';

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
  imports: [CommonModule, FormsModule, IonContent, IonButton, IonIcon],
})
export class HomePage implements OnInit {
  busqueda = '';

  modulos: ModuloCard[] = [
    { id: 'gramatica',   titulo: 'Gramática',   nivel: 'Nivel fácil',   subs: 5, route: '/gramatica',   theme: 'theme-green',  icon: 'book-outline',          porcentaje: 0 },
    { id: 'ortografia',  titulo: 'Ortografía',  nivel: 'Nivel fácil',   subs: 5, route: '/ortografia',  theme: 'theme-green',  icon: 'pencil-outline',        porcentaje: 0 },
    { id: 'puntuacion',  titulo: 'Puntuación',  nivel: 'Nivel medio',   subs: 5, route: '/puntuacion',  theme: 'theme-amber',  icon: 'shapes-outline',        porcentaje: 0 },
    { id: 'redaccion',   titulo: 'Redacción',   nivel: 'Nivel medio',   subs: 5, route: '/redaccion',   theme: 'theme-amber',  icon: 'document-text-outline', porcentaje: 0 },
    { id: 'comprension', titulo: 'Comprensión', nivel: 'Nivel difícil', subs: 5, route: '/comprension', theme: 'theme-red',    icon: 'library-outline',       porcentaje: 0 },
    { id: 'lecciones',   titulo: 'Lecciones',   nivel: 'Módulo final',  subs: 0, route: '/lecciones',   theme: 'theme-indigo', icon: 'school',                porcentaje: 0 },
  ];

  modulosFiltrados: ModuloCard[] = [];

  progresoGeneral = 0;
  modulosCompletados = 0;

  ringBackground = 'conic-gradient(#e2e8f0 0deg, #e2e8f0 360deg)';

  constructor(private router: Router) {
    // ✅ REGISTRO COMPLETO DE ICONOS (esto arregla que no se vean)
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
    });
  }

  ngOnInit() {
    this.recalcular();
    this.modulosFiltrados = [...this.modulos];
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
    localStorage.clear();
    this.recalcular();
    this.filtrar();
  }

  private recalcular() {
    // ✅ Lee el progreso por módulo desde localStorage
    // Usa: progress_gramatica, progress_ortografia, etc. (0..100)
    this.modulos = this.modulos.map((m) => {
      const val = Number(localStorage.getItem(`progress_${m.id}`) ?? '0');
      return { ...m, porcentaje: isNaN(val) ? 0 : Math.max(0, Math.min(100, val)) };
    });

    const total = this.modulos.reduce((acc, m) => acc + m.porcentaje, 0);
    this.progresoGeneral = Math.round(total / this.modulos.length);

    this.modulosCompletados = this.modulos.filter((m) => m.porcentaje >= 100).length;

    const deg = Math.round((this.progresoGeneral / 100) * 360);
    this.ringBackground = `conic-gradient(#4f46e5 0deg, #4f46e5 ${deg}deg, #e2e8f0 ${deg}deg, #e2e8f0 360deg)`;

    this.modulosFiltrados = [...this.modulos];
  }
}
