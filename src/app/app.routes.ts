import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'gramatica',
    loadComponent: () => import('./page/gramatica/gramatica.page').then( m => m.GramaticaPage)
  },
  {
    path: 'ortografia',
    loadComponent: () => import('./page/ortografia/ortografia.page').then( m => m.OrtografiaPage)
  },
  {
    path: 'puntuacion',
    loadComponent: () => import('./page/puntuacion/puntuacion.page').then( m => m.PuntuacionPage)
  },
  {
    path: 'redaccion',
    loadComponent: () => import('./page/redaccion/redaccion.page').then( m => m.RedaccionPage)
  },
  {
    path: 'compresion',
    loadComponent: () => import('./page/compresion/compresion.page').then( m => m.CompresionPage)
  },
  {
    path: 'lecciones',
    loadComponent: () => import('./page/lecciones/lecciones.page').then( m => m.LeccionesPage)
  },

];
