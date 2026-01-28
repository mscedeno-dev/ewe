import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonSplitPane, IonMenu, IonList, IonItem,
  IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  book, pencil, documentText, library, school, home,
  searchOutline, shapesOutline,
  bookmarkOutline, listOutline, analyticsOutline,
  readerOutline, documentOutline
} from 'ionicons/icons';

interface Submodulo {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

@Component({
  selector: 'app-compresion',
  templateUrl: './compresion.page.html',
  styleUrls: ['./compresion.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonSplitPane, IonMenu, IonList,
    IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect
  ]
})
export class CompresionPage implements OnInit {

  categorias = [
    { title: 'Gramática',    icon: 'book',            color: '#4ade80', active: false, route: '/gramatica' },
    { title: 'Ortografía',   icon: 'pencil',          color: '#4ade80', active: false, route: '/ortografia' },
    { title: 'Puntuación',   icon: 'shapes-outline',  color: '#facc15', active: false, route: '/puntuacion' },
    { title: 'Redacción',    icon: 'document-text',   color: '#facc15', active: false, route: '/redaccion' },
    { title: 'Comprensión',  icon: 'library',         color: '#f87171', active: true,  route: '/compresion' },
    { title: 'Lecciones',    icon: 'school',          color: '#818cf8', active: false, route: '/lecciones' },
    { title: 'Dashboard',    icon: 'home',            color: '#fb923c', active: false, route: '/' },
  ];

  submodulos: Submodulo[] = [
    { id: 'idea-principal',     nombre: 'Idea principal',     icono: 'bookmark-outline',  color: '#6366f1' },
    { id: 'ideas-secundarias',  nombre: 'Ideas secundarias',  icono: 'list-outline',      color: '#ec4899' },
    { id: 'inferencias',        nombre: 'Inferencias',        icono: 'analytics-outline', color: '#10b981' },
    { id: 'tipo-texto',         nombre: 'Tipos de texto',     icono: 'reader-outline',    color: '#f59e0b' },
    { id: 'resumen',            nombre: 'Resumen',            icono: 'document-outline',  color: '#8b5cf6' },
  ];

  constructor(private router: Router) {
    addIcons({
      book, pencil, documentText, library, school, home,
      searchOutline, shapesOutline,
      bookmarkOutline, listOutline, analyticsOutline,
      readerOutline, documentOutline
    });
  }

  ngOnInit() {}

  navegarASubmodulo(id: string) {
    this.router.navigate(['/compresion', id]);
  }

  seleccionarCategoria(cat: any) {
    this.categorias.forEach(c => c.active = false);
    cat.active = true;

    if (cat.route) {
      this.router.navigateByUrl(cat.route);
    }
  }
}
