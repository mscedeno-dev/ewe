import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonSplitPane, IonMenu, IonList, IonItem,
  IonIcon, IonLabel, IonGrid, IonRow, IonCol,
  IonRippleEffect, IonChip, IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  book, pencil, documentText, library, school, home,
  searchOutline, shapesOutline,
  ribbonOutline, shuffleOutline, infiniteOutline,
  trophyOutline, clipboardOutline
} from 'ionicons/icons';

interface ItemLeccion {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.page.html',
  styleUrls: ['./lecciones.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonSplitPane, IonMenu, IonList, IonItem,
    IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect,
    IonChip, IonButton
  ]
})
export class LeccionesPage implements OnInit {

  categorias = [
    { title: 'Gramática',    icon: 'book',            color: '#4ade80', active: false, route: '/gramatica' },
    { title: 'Ortografía',   icon: 'pencil',          color: '#4ade80', active: false, route: '/ortografia' },
    { title: 'Puntuación',   icon: 'shapes-outline',  color: '#facc15', active: false, route: '/puntuacion' },
    { title: 'Redacción',    icon: 'document-text',   color: '#facc15', active: false, route: '/redaccion' },
    { title: 'Comprensión',  icon: 'library',         color: '#f87171', active: false, route: '/compresion' },
    { title: 'Lecciones',    icon: 'school',          color: '#818cf8', active: true,  route: '/lecciones' },
    { title: 'Dashboard',    icon: 'home',            color: '#fb923c', active: false, route: '/' },
  ];

  lecciones: ItemLeccion[] = [
    { id: 'gramatica',   nombre: 'Lección de Gramática',   icono: 'book',          color: '#6366f1' },
    { id: 'ortografia',  nombre: 'Lección de Ortografía',  icono: 'pencil',        color: '#ec4899' },
    { id: 'puntuacion',  nombre: 'Lección de Puntuación',  icono: 'shapes-outline',color: '#10b981' },
    { id: 'redaccion',   nombre: 'Lección de Redacción',   icono: 'document-text', color: '#f59e0b' },
    { id: 'compresion',  nombre: 'Lección de Comprensión', icono: 'library',       color: '#8b5cf6' },
  ];

  constructor(private router: Router) {
    addIcons({
      book, pencil, documentText, library, school, home,
      searchOutline, shapesOutline,
      ribbonOutline, shuffleOutline, infiniteOutline,
      trophyOutline, clipboardOutline
    });
  }

  ngOnInit() {}

  seleccionarCategoria(cat: any) {
    this.categorias.forEach(c => c.active = false);
    cat.active = true;
    if (cat.route) this.router.navigateByUrl(cat.route);
  }

  abrirLeccion(id: string) {
    // Aquí vamos a crear después las páginas:
    // /lecciones/:id  (por ejemplo /lecciones/gramatica)
    this.router.navigate(['/lecciones', id]);
  }

  abrirExamenFinal() {
    // Página de examen final
    this.router.navigate(['/lecciones', 'examen-final']);
  }
}
