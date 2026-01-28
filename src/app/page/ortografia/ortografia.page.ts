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
  textOutline, swapHorizontalOutline, gitCompareOutline,
  constructOutline, arrowUpOutline
} from 'ionicons/icons';

interface Submodulo {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

@Component({
  selector: 'app-ortografia',
  templateUrl: './ortografia.page.html',
  styleUrls: ['./ortografia.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonSplitPane, IonMenu, IonList,
    IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect
  ]
})
export class OrtografiaPage implements OnInit {

  categorias = [
    { title: 'Gramática',    icon: 'book',            color: '#4ade80', active: false, route: '/gramatica' },
    { title: 'Ortografía',   icon: 'pencil',          color: '#4ade80', active: true,  route: '/ortografia' },
    { title: 'Puntuación',   icon: 'shapes-outline',  color: '#facc15', active: false, route: '/puntuacion' },
    { title: 'Redacción',    icon: 'document-text',   color: '#facc15', active: false, route: '/redaccion' },
    { title: 'Comprensión',  icon: 'library',         color: '#f87171', active: false, route: '/compresion' },
    { title: 'Lecciones',    icon: 'school',          color: '#818cf8', active: false, route: '/lecciones' },
    { title: 'Dashboard',    icon: 'home',            color: '#fb923c', active: false, route: '/' },
  ];

  submodulos: Submodulo[] = [
    { id: 'acentuacion', nombre: 'Acentuación',  icono: 'text-outline',            color: '#6366f1' },
    { id: 'b-v',         nombre: 'Uso de B y V', icono: 'swap-horizontal-outline', color: '#ec4899' },
    { id: 'c-s-z',       nombre: 'Uso de C, S y Z', icono: 'git-compare-outline',  color: '#10b981' },
    { id: 'g-j',         nombre: 'Uso de G y J', icono: 'construct-outline',       color: '#f59e0b' },
    { id: 'mayusculas',  nombre: 'Mayúsculas',   icono: 'arrow-up-outline',        color: '#8b5cf6' },
  ];

  constructor(private router: Router) {
    addIcons({
      book, pencil, documentText, library, school, home,
      searchOutline, shapesOutline,
      textOutline, swapHorizontalOutline, gitCompareOutline,
      constructOutline, arrowUpOutline
    });
  }

  ngOnInit() {}

  navegarASubmodulo(id: string) {
    this.router.navigate(['/ortografia', id]);
  }

  seleccionarCategoria(cat: any) {
    this.categorias.forEach(c => c.active = false);
    cat.active = true;

    if (cat.route) {
      this.router.navigateByUrl(cat.route);
    }
  }
}
