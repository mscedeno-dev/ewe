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
  textOutline, gitBranchOutline, documentsOutline,
  linkOutline, swapVerticalOutline
} from 'ionicons/icons';

interface Submodulo {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

@Component({
  selector: 'app-redaccion',
  templateUrl: './redaccion.page.html',
  styleUrls: ['./redaccion.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonContent, IonSplitPane, IonMenu, IonList,
    IonItem, IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect
  ]
})
export class RedaccionPage implements OnInit {

  categorias = [
    { title: 'Gramática',    icon: 'book',            color: '#4ade80', active: false, route: '/gramatica' },
    { title: 'Ortografía',   icon: 'pencil',          color: '#4ade80', active: false, route: '/ortografia' },
    { title: 'Puntuación',   icon: 'shapes-outline',  color: '#facc15', active: false, route: '/puntuacion' },
    { title: 'Redacción',    icon: 'document-text',   color: '#facc15', active: true,  route: '/redaccion' },
    { title: 'Comprensión',  icon: 'library',         color: '#f87171', active: false, route: '/compresion' },
    { title: 'Lecciones',    icon: 'school',          color: '#818cf8', active: false, route: '/lecciones' },
    { title: 'Dashboard',    icon: 'home',            color: '#fb923c', active: false, route: '/' },
  ];

  submodulos: Submodulo[] = [
    { id: 'oracion-simple',    nombre: 'Oración simple',    icono: 'text-outline',         color: '#6366f1' },
    { id: 'oracion-compuesta', nombre: 'Oración compuesta', icono: 'git-branch-outline',   color: '#ec4899' },
    { id: 'parrafo',           nombre: 'Párrafo',           icono: 'documents-outline',    color: '#10b981' },
    { id: 'coherencia',        nombre: 'Coherencia',        icono: 'link-outline',         color: '#f59e0b' },
    { id: 'cohesion',          nombre: 'Cohesión',          icono: 'swap-vertical-outline',color: '#8b5cf6' },
  ];

  constructor(private router: Router) {
    addIcons({
      book, pencil, documentText, library, school, home,
      searchOutline, shapesOutline,
      textOutline, gitBranchOutline, documentsOutline,
      linkOutline, swapVerticalOutline
    });
  }

  ngOnInit() {}

  navegarASubmodulo(id: string) {
    this.router.navigate(['/redaccion', id]);
  }

  seleccionarCategoria(cat: any) {
    this.categorias.forEach(c => c.active = false);
    cat.active = true;

    if (cat.route) {
      this.router.navigateByUrl(cat.route);
    }
  }
}
