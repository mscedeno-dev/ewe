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
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  documentTextOutline,
  createOutline,
  helpCircleOutline,
  homeOutline,
  checkmarkDoneOutline,
  checkboxOutline,
  refreshOutline,
  ribbonOutline,
  sparklesOutline,
  thumbsUpOutline,
} from 'ionicons/icons';

/* IDs EXACTOS de tus cards */
type RedaccionId =
  | 'oracion-simple'
  | 'oracion-compuesta'
  | 'parrafo'
  | 'coherencia'
  | 'cohesion';

interface QuizQuestion {
  q: string;
  options: string[];
  answerIndex: number;
  explain: string;
}

interface SubmoduloContent {
  id: RedaccionId;
  titulo: string;
  descripcion: string;

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

/* ===========================
   CONTENIDO DE REDACCIÓN
   =========================== */
const REDACCION: Record<RedaccionId, SubmoduloContent> = {
  'oracion-simple': {
    id: 'oracion-simple',
    titulo: 'Oración simple',
    descripcion: 'Expresa una sola idea o acción principal.',
    teoria: [
      'Tiene un solo verbo conjugado.',
      'Comunica una idea completa y clara.',
    ],
    claves: [
      'Un solo sujeto y un solo predicado.',
      'No tiene nexos que unan proposiciones.',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplos',
        items: [
          'El estudiante estudia.',
          'María lee un libro.',
          'La clase terminó.',
        ],
      },
    ],
    actividad: {
      objetivo: 'Reconocer oraciones simples.',
      instrucciones: 'Observa el verbo principal.',
      frases: [
        { texto: 'Juan corre rápido.', solucion: 'Es simple: un solo verbo (corre).' },
        { texto: 'El profesor explica la lección.', solucion: 'Es simple: explica.' },
        { texto: 'Ana y Luis caminan.', solucion: 'Es simple: caminan.' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál es una oración simple?',
        options: [
          'Estudio y trabajo.',
          'Voy al colegio.',
          'Cuando llegué, estudié.',
          'Aunque llueve, salgo.',
        ],
        answerIndex: 1,
        explain: 'Tiene un solo verbo conjugado.',
      },
    ],
  },

  'oracion-compuesta': {
    id: 'oracion-compuesta',
    titulo: 'Oración compuesta',
    descripcion: 'Tiene dos o más proposiciones relacionadas.',
    teoria: [
      'Contiene dos o más verbos conjugados.',
      'Las proposiciones se unen con nexos.',
    ],
    claves: [
      'Nexos comunes: y, o, pero, porque, aunque.',
      'Puede ser coordinada o subordinada.',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplos',
        items: [
          'Estudio y trabajo.',
          'No salí porque llovía.',
          'Aunque estaba cansado, terminé.',
        ],
      },
    ],
    actividad: {
      objetivo: 'Identificar oraciones compuestas.',
      instrucciones: 'Busca más de un verbo.',
      frases: [
        { texto: 'Llegué y me senté.', solucion: 'Compuesta: llegué / senté.' },
        { texto: 'No fui porque estaba enfermo.', solucion: 'Compuesta: fui / estaba.' },
        { texto: 'Estudia cuando puede.', solucion: 'Compuesta: estudia / puede.' },
      ],
    },
    quiz: [
      {
        q: 'Una oración compuesta se caracteriza por…',
        options: [
          'un solo verbo',
          'no tener sujeto',
          'tener dos o más verbos',
          'no tener sentido',
        ],
        answerIndex: 2,
        explain: 'La clave es la cantidad de verbos.',
      },
    ],
  },

  parrafo: {
    id: 'parrafo',
    titulo: 'Párrafo',
    descripcion: 'Conjunto de oraciones que desarrollan una idea.',
    teoria: [
      'Un párrafo trata una sola idea principal.',
      'Las oraciones se relacionan entre sí.',
    ],
    claves: [
      'Idea principal + ideas secundarias.',
      'Cambio de idea = nuevo párrafo.',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo',
        items: [
          'La lectura es importante. Ayuda a mejorar la comprensión y el vocabulario.',
        ],
      },
    ],
    actividad: {
      objetivo: 'Reconocer la idea principal.',
      instrucciones: 'Identifica de qué trata el texto.',
      frases: [
        {
          texto: 'El estudio es importante. Permite aprender y mejorar.',
          solucion: 'La idea principal es la importancia del estudio.',
        },
      ],
    },
    quiz: [
      {
        q: 'Un párrafo debe tener…',
        options: [
          'muchas ideas sin orden',
          'una idea principal',
          'solo ejemplos',
          'solo una oración',
        ],
        answerIndex: 1,
        explain: 'El párrafo se centra en una idea.',
      },
    ],
  },

  coherencia: {
    id: 'coherencia',
    titulo: 'Coherencia',
    descripcion: 'Relación lógica entre las ideas del texto.',
    teoria: [
      'Un texto coherente tiene sentido global.',
      'Las ideas no se contradicen.',
    ],
    claves: [
      'Mantener el mismo tema.',
      'Orden lógico de ideas.',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo',
        items: [
          'Estudié mucho. Por eso aprobé el examen.',
        ],
      },
    ],
    actividad: {
      objetivo: 'Detectar incoherencias.',
      instrucciones: 'Observa si las ideas se relacionan.',
      frases: [
        {
          texto: 'Me gusta estudiar. Ayer llovió. El examen fue difícil.',
          solucion: 'No es coherente: ideas sin relación.',
        },
      ],
    },
    quiz: [
      {
        q: 'La coherencia se refiere a…',
        options: [
          'usar signos',
          'tener sentido lógico',
          'usar mayúsculas',
          'hacer textos largos',
        ],
        answerIndex: 1,
        explain: 'La coherencia da sentido al texto.',
      },
    ],
  },

  cohesion: {
    id: 'cohesion',
    titulo: 'Cohesión',
    descripcion: 'Uso de conectores y enlaces entre oraciones.',
    teoria: [
      'La cohesión une las ideas.',
      'Se logra con conectores y pronombres.',
    ],
    claves: [
      'Conectores: porque, además, sin embargo.',
      'Evita repeticiones innecesarias.',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo',
        items: [
          'Estudié, por eso aprobé.',
        ],
      },
    ],
    actividad: {
      objetivo: 'Usar conectores correctamente.',
      instrucciones: 'Observa la relación entre ideas.',
      frases: [
        {
          texto: 'No estudié. Aprobé.',
          solucion: 'No estudié; sin embargo, aprobé.',
        },
      ],
    },
    quiz: [
      {
        q: 'La cohesión se logra usando…',
        options: [
          'solo puntos',
          'conectores',
          'ideas sin orden',
          'letras mayúsculas',
        ],
        answerIndex: 1,
        explain: 'Los conectores enlazan ideas.',
      },
    ],
  },
};

/* ===========================
   COMPONENTE
   =========================== */
@Component({
  selector: 'app-redaccion-submodulo',
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
export class RedaccionSubmoduloPage implements OnInit, OnDestroy {
  private sub?: Subscription;

  id!: RedaccionId;
  data!: SubmoduloContent;

  revealed: Record<number, boolean> = {};
  answers: Record<number, number> = {};
  score = 0;
  submitted = false;
  moduleProgress = 0;

  constructor(private route: ActivatedRoute, private router: Router) {
    addIcons({
      bookOutline,
      documentTextOutline,
      createOutline,
      helpCircleOutline,
      homeOutline,
      checkmarkDoneOutline,
      checkboxOutline,
      refreshOutline,
      ribbonOutline,
      sparklesOutline,
      thumbsUpOutline,
    });
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((pm) => {
      this.id = (pm.get('id') || 'oracion-simple') as RedaccionId;
      this.data = REDACCION[this.id];
      this.recalcModuleProgress();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  irHome() {
    this.router.navigateByUrl('/home');
  }

  toggleSolucion(i: number) {
    this.revealed[i] = !this.revealed[i];
  }

  selectAnswer(qIndex: number, optIndex: number) {
    this.answers[qIndex] = optIndex;
  }

  submitQuiz() {
    this.score = this.data.quiz.filter(
      (q, i) => this.answers[i] === q.answerIndex
    ).length;
    this.submitted = true;
  }

  resetQuiz() {
    this.answers = {};
    this.score = 0;
    this.submitted = false;
  }

  marcarCompletado() {
    localStorage.setItem(`done_redaccion_${this.id}`, '1');
    this.recalcModuleProgress();
  }

  private recalcModuleProgress() {
    const ids: RedaccionId[] = [
      'oracion-simple',
      'oracion-compuesta',
      'parrafo',
      'coherencia',
      'cohesion',
    ];
    const done = ids.filter(
      (x) => localStorage.getItem(`done_redaccion_${x}`) === '1'
    ).length;
    this.moduleProgress = Math.round((done / ids.length) * 100);
  }
  // Métodos helper para evitar errores de TypeScript
  getQuizLength(): number {
    return this.data?.quiz?.length || 0;
  }

  getScorePercentage(): number {
    const total = this.getQuizLength();
    if (total === 0) return 0;
    return Math.round((this.score / total) * 100);
  }

  hasQuiz(): boolean {
    return this.data?.quiz && this.data.quiz.length > 0;
  }
}
