import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    IonApp,
    IonContent,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  constructor() {
    // App component simplificado
    // Ya NO maneja navbar ni sidebar
    // Todo se maneja en landing page
  }
}
