import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonSplitPane, IonMenu, IonList, IonItem,
  IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  book, pencil, documentText, library, school, home,
  searchOutline, layersOutline, extensionPuzzleOutline,
  colorPaletteOutline, chatbubblesOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-gramatica',
  standalone: true,
  templateUrl: './gramatica.page.html',
  styleUrls: ['./gramatica.page.scss'],
  imports: [
    CommonModule, IonContent, IonSplitPane, IonMenu, IonList,
    IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect
  ]
})
export class GramaticaPage {

  categorias = [
    { title: 'Gramática', icon: 'book', color: '#4ade80', ruta: '/gramatica', active: true },
    { title: 'Ortografía', icon: 'pencil', color: '#4ade80', ruta: '/ortografia', active: false },
    { title: 'Puntuación', icon: 'shapes-outline', color: '#facc15', ruta: '/puntuacion', active: false },
    { title: 'Redacción', icon: 'document-text', color: '#facc15', ruta: '/redaccion', active: false },
    { title: 'Comprensión', icon: 'library', color: '#f87171', ruta: '/comprension', active: false },
    { title: 'Lecciones', icon: 'school', color: '#818cf8', ruta: '/lecciones', active: false },
    { title: 'Dashboard', icon: 'home', color: '#fb923c', ruta: '/', active: false }
  ];

  submodulos = [
    { id: 'sustantivos', nombre: 'Sustantivos', icon: 'layers-outline', color: '#6366f1' },
    { id: 'verbos', nombre: 'Verbos', icon: 'extension-puzzle-outline', color: '#ec4899' },
    { id: 'adjetivos', nombre: 'Adjetivos', icon: 'color-palette-outline', color: '#10b981' },
    { id: 'articulos', nombre: 'Artículos', icon: 'document-text', color: '#f59e0b' },
    { id: 'pronombres', nombre: 'Pronombres', icon: 'chatbubbles-outline', color: '#8b5cf6' }
  ];

  constructor(private router: Router) {
    addIcons({
      book, pencil, documentText, library, school, home,
      searchOutline, layersOutline, extensionPuzzleOutline,
      colorPaletteOutline, chatbubblesOutline
    });
  }

  navegarSubmodulo(id: string) {
    this.router.navigate(['/gramatica', id]);
  }

  irModulo(ruta: string) {
    this.router.navigate([ruta]);
  }
  
}
