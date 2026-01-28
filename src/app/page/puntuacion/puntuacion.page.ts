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
  ellipseOutline, radioButtonOffOutline, removeOutline,
  addOutline, helpCircleOutline
} from 'ionicons/icons';

interface Submodulo {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.page.html',
  styleUrls: ['./puntuacion.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonSplitPane, IonMenu, IonList,
    IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect
  ]
})
export class PuntuacionPage implements OnInit {

  categorias = [
    { title: 'Gramática',    icon: 'book',            color: '#4ade80', active: false, route: '/gramatica' },
    { title: 'Ortografía',   icon: 'pencil',          color: '#4ade80', active: false, route: '/ortografia' },
    { title: 'Puntuación',   icon: 'shapes-outline',  color: '#facc15', active: true,  route: '/puntuacion' },
    { title: 'Redacción',    icon: 'document-text',   color: '#facc15', active: false, route: '/redaccion' },
    { title: 'Comprensión',  icon: 'library',         color: '#f87171', active: false, route: '/compresion' },
    { title: 'Lecciones',    icon: 'school',          color: '#818cf8', active: false, route: '/lecciones' },
    { title: 'Dashboard',    icon: 'home',            color: '#fb923c', active: false, route: '/' },
  ];

  submodulos: Submodulo[] = [
    { id: 'punto',          nombre: 'Punto',        icono: 'ellipse-outline',            color: '#6366f1' },
    { id: 'coma',           nombre: 'Coma',         icono: 'radio-button-off-outline',  color: '#ec4899' },
    { id: 'punto-y-coma',   nombre: 'Punto y coma', icono: 'remove-outline',            color: '#10b981' },
    { id: 'dos-puntos',     nombre: 'Dos puntos',   icono: 'add-outline',               color: '#f59e0b' },
    { id: 'signos',         nombre: 'Signos',       icono: 'help-circle-outline',       color: '#8b5cf6' },
  ];

  constructor(private router: Router) {
    addIcons({
      book, pencil, documentText, library, school, home,
      searchOutline, shapesOutline,
      ellipseOutline, radioButtonOffOutline, removeOutline,
      addOutline, helpCircleOutline
    });
  }

  ngOnInit() {}

  navegarASubmodulo(id: string) {
    this.router.navigate(['/puntuacion', id]);
  }

  seleccionarCategoria(cat: any) {
    this.categorias.forEach(c => c.active = false);
    cat.active = true;

    if (cat.route) {
      this.router.navigateByUrl(cat.route);
    }
  }
}
