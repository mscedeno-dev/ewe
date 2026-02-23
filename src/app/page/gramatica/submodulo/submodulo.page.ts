import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  checkboxOutline,
  checkmarkDoneOutline,
  chevronBackOutline,
  createOutline,
  documentTextOutline,
  helpCircleOutline,
  homeOutline,
  layersOutline,
  refreshOutline,
  ribbonOutline,
  sparklesOutline,
  thumbsUpOutline,
  extensionPuzzleOutline,
  colorPaletteOutline,
  chatbubblesOutline,
  menuOutline,
  flashOutline,
  schoolOutline,
  pencilOutline,
  shapesOutline,
  libraryOutline,
  checkmarkCircle,
  arrowForwardCircleOutline,
  informationCircleOutline,
  eyeOutline,
  closeCircle,
} from 'ionicons/icons';
import { Subscription } from 'rxjs';

type GramaticaId = 'sustantivos' | 'verbos' | 'adjetivos' | 'articulos' | 'pronombres';

interface QuizQuestion {
  q: string;
  options: string[];
  answerIndex: number;
  explain: string;
}

interface SubmoduloContent {
  id: GramaticaId;
  titulo: string;
  descripcion: string;
  icon: string;
  color: string;
  teoria: string[];
  claves: string[];
  ejemplos: { titulo: string; items: string[] }[];
  actividad: {
    objetivo: string;
    instrucciones: string;
    frases: { texto: string; solucion: string }[];
  };
  quiz: QuizQuestion[];
}

const GRAMATICA: Record<GramaticaId, SubmoduloContent> = {
  sustantivos: {
    id: 'sustantivos',
    titulo: 'Sustantivos',
    descripcion: 'Aprende a identificar y clasificar palabras que nombran seres, objetos, lugares, ideas y sentimientos.',
    icon: 'layers-outline',
    color: '#6366f1',
    teoria: [
      'El sustantivo es una palabra que nombra personas, animales, cosas, lugares, ideas o sentimientos.',
      'Puede funcionar como núcleo del sujeto o del complemento en una oración.',
      'Se clasifica por su significado (común/propio, concreto/abstracto) y por su forma (individual/colectivo).',
    ],
    claves: [
      'Propios: nombran de forma particular (Cuenca, María). Comunes: nombran en general (ciudad, estudiante).',
      'Concretos: se perciben con sentidos (mesa, perro). Abstractos: ideas o cualidades (amor, justicia).',
      'Colectivos: nombran un conjunto (manada, alumnado). Individuales: uno solo (oveja, alumno).',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplos rápidos',
        items: ['Persona: docente, estudiante, Sofía', 'Lugar: Ecuador, aula, parque', 'Idea: libertad, paciencia, talento'],
      },
      {
        titulo: 'En oraciones',
        items: [
          'El estudiante entregó la tarea. (sustantivo: estudiante, tarea)',
          'Cuenca tiene arquitectura colonial. (sustantivo propio: Cuenca)',
          'La honestidad es un valor. (abstracto: honestidad)',
        ],
      },
    ],
    actividad: {
      objetivo: 'Distinguir sustantivos comunes, propios, concretos y abstractos.',
      instrucciones: 'Lee cada frase y verifica la solución para comparar tu respuesta.',
      frases: [
        { texto: 'María estudia en Cuenca.', solucion: 'María (propio), Cuenca (propio)' },
        { texto: 'La amistad fortalece relaciones.', solucion: 'amistad (abstracto), relaciones (común)' },
        { texto: 'El perro duerme en la casa.', solucion: 'perro (concreto), casa (concreto)' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál opción contiene un sustantivo abstracto?',
        options: ['Mesa', 'Valentía', 'Perro', 'Cuaderno'],
        answerIndex: 1,
        explain: '"Valentía" nombra una cualidad o idea, no un objeto tangible.',
      },
      {
        q: '¿Cuál es un sustantivo propio?',
        options: ['ciudad', 'Ecuador', 'libro', 'profesor'],
        answerIndex: 1,
        explain: '"Ecuador" nombra de forma particular un país.',
      },
    ],
  },

  verbos: {
    id: 'verbos',
    titulo: 'Verbos',
    descripcion: 'Domina la palabra que expresa acciones, estados y procesos.',
    icon: 'flash-outline',
    color: '#ec4899',
    teoria: [
      'El verbo expresa acción (correr), estado (ser/estar) o proceso (crecer).',
      'Se conjuga y cambia según persona, número, tiempo y modo.',
    ],
    claves: [
      'Tiempos básicos: presente, pasado, futuro.',
      'Modos: indicativo, subjuntivo, imperativo.',
    ],
    ejemplos: [
      { titulo: 'Ejemplos', items: ['Acción: escribir', 'Estado: estar', 'Proceso: crecer'] },
    ],
    actividad: {
      objetivo: 'Identificar tiempo verbal.',
      instrucciones: 'Lee cada frase.',
      frases: [{ texto: 'Yo estudio.', solucion: 'presente' }],
    },
    quiz: [],
  },

  adjetivos: {
    id: 'adjetivos',
    titulo: 'Adjetivos',
    descripcion: 'Aprende cómo describen al sustantivo.',
    icon: 'color-palette-outline',
    color: '#10b981',
    teoria: ['El adjetivo califica o determina al sustantivo.'],
    claves: ['Concuerda en género y número.'],
    ejemplos: [{ titulo: 'Ejemplos', items: ['Alto, baja, grandes'] }],
    actividad: {
      objetivo: 'Aplicar concordancia.',
      instrucciones: 'Lee cada frase.',
      frases: [{ texto: 'Casa grande.', solucion: 'concordancia correcta' }],
    },
    quiz: [],
  },

  articulos: {
    id: 'articulos',
    titulo: 'Artículos',
    descripcion: 'Distingue artículos definidos e indefinidos.',
    icon: 'extension-puzzle-outline',
    color: '#f59e0b',
    teoria: ['El artículo acompaña al sustantivo.'],
    claves: ['Definidos: el, la. Indefinidos: un, una.'],
    ejemplos: [{ titulo: 'Ejemplos', items: ['El libro, una casa'] }],
    actividad: {
      objetivo: 'Elegir el artículo.',
      instrucciones: 'Completa.',
      frases: [{ texto: '___ libro', solucion: 'El' }],
    },
    quiz: [],
  },

  pronombres: {
    id: 'pronombres',
    titulo: 'Pronombres',
    descripcion: 'Aprende cómo sustituyen al sustantivo.',
    icon: 'chatbubbles-outline',
    color: '#8b5cf6',
    teoria: ['El pronombre sustituye a un sustantivo.'],
    claves: ['Personales: yo, tú, él.'],
    ejemplos: [{ titulo: 'Ejemplos', items: ['Yo, tú, él'] }],
    actividad: {
      objetivo: 'Reemplazar sustantivos.',
      instrucciones: 'Sustituye.',
      frases: [{ texto: 'Juan estudia.', solucion: 'Él estudia.' }],
    },
    quiz: [],
  },
};

@Component({
  selector: 'app-gramatica-submodulo',
  standalone: true,
  templateUrl: './submodulo.page.html',
  styleUrls: ['./submodulo.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonProgressBar,
  ],
})
export class GramaticaSubmoduloPage implements OnInit, OnDestroy {
  private sub?: Subscription;

  id!: GramaticaId;
  data!: SubmoduloContent;

  revealed: Record<number, boolean> = {};
  answers: Record<number, number> = {};
  score = 0;
  submitted = false;

  moduleProgress = 0;
  
  // Propiedades para sidebar
  sidebarOpen = false;
  Math = Math;
  String = String;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({
      bookOutline,
      documentTextOutline,
      createOutline,
      helpCircleOutline,
      checkmarkDoneOutline,
      checkboxOutline,
      refreshOutline,
      thumbsUpOutline,
      ribbonOutline,
      sparklesOutline,
      chevronBackOutline,
      layersOutline,
      homeOutline,
      extensionPuzzleOutline,
      colorPaletteOutline,
      chatbubblesOutline,
      menuOutline,
      flashOutline,
      schoolOutline,
      pencilOutline,
      shapesOutline,
      libraryOutline,
      checkmarkCircle,
      arrowForwardCircleOutline,
      informationCircleOutline,
      eyeOutline,
      closeCircle,
    });
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((pm) => {
      const raw = (pm.get('id') || 'sustantivos') as GramaticaId;
      this.id = raw;
      this.data = GRAMATICA[this.id] ?? GRAMATICA.sustantivos;

      this.revealed = {};
      this.answers = {};
      this.score = 0;
      this.submitted = false;

      // Calcular progreso simple
      const ids: GramaticaId[] = ['sustantivos', 'verbos', 'adjetivos', 'articulos', 'pronombres'];
      const doneCount = ids.filter((x) => localStorage.getItem(`done_gramatica_${x}`) === '1').length;
      this.moduleProgress = Math.round((doneCount / ids.length) * 100);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  irHome() {
    this.router.navigateByUrl('/');
  }

  toggleSolucion(i: number) {
    this.revealed[i] = !this.revealed[i];
  }

  selectAnswer(qIndex: number, optIndex: number) {
    this.answers[qIndex] = optIndex;
  }

  submitQuiz() {
    let s = 0;
    this.data.quiz.forEach((q, i) => {
      if (this.answers[i] === q.answerIndex) s++;
    });
    this.score = s;
    this.submitted = true;
  }

  resetQuiz() {
    this.answers = {};
    this.score = 0;
    this.submitted = false;
  }

  marcarCompletado() {
    console.log('✅ Marcando completado:', this.id);
    localStorage.setItem(`done_gramatica_${this.id}`, '1');
    
    // Recalcular progreso
    const ids: GramaticaId[] = ['sustantivos', 'verbos', 'adjetivos', 'articulos', 'pronombres'];
    const doneCount = ids.filter((x) => localStorage.getItem(`done_gramatica_${x}`) === '1').length;
    this.moduleProgress = Math.round((doneCount / ids.length) * 100);
    
    alert('¡Submódulo marcado como completado!');
  }

  irA(id: GramaticaId) {
    this.router.navigate(['/gramatica', id]);
  }

  // Métodos para sidebar
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  isCompleted(subId: string): boolean {
    return localStorage.getItem(`done_gramatica_${subId}`) === '1';
  }

  getAllIds(): GramaticaId[] {
    return ['sustantivos', 'verbos', 'adjetivos', 'articulos', 'pronombres'];
  }

  getIconForId(subId: string): string {
    const icons: Record<string, string> = {
      sustantivos: 'layers-outline',
      verbos: 'flash-outline',
      adjetivos: 'color-palette-outline',
      articulos: 'extension-puzzle-outline',
      pronombres: 'chatbubbles-outline',
    };
    return icons[subId] || 'book-outline';
  }

  getTitleForId(subId: string): string {
    const titles: Record<string, string> = {
      sustantivos: 'Sustantivos',
      verbos: 'Verbos',
      adjetivos: 'Adjetivos',
      articulos: 'Artículos',
      pronombres: 'Pronombres',
    };
    return titles[subId] || subId;
  }

  goToModule(moduleName: string) {
    this.router.navigate([`/${moduleName}`]);
  }

  getQuizLength(): number {
    return this.data?.quiz?.length || 0;
  }

  hasQuiz(): boolean {
    return this.data?.quiz && this.data.quiz.length > 0;
  }
}