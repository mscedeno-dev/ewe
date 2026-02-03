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
  createOutline,
  documentTextOutline,
  helpCircleOutline,
  homeOutline,
  refreshOutline,
  ribbonOutline,
  sparklesOutline,
  thumbsUpOutline,
  barChartOutline,
  listOutline,
  trendingUpOutline,
} from 'ionicons/icons';
import { Subscription } from 'rxjs';

/** IDs = los 5 submódulos de tu UI (sin espacios) */
type CompresionId =
  | 'idea-principal'
  | 'ideas-secundarias'
  | 'inferencias'
  | 'tipos-de-texto'
  | 'resumen';

interface QuizQuestion {
  q: string;
  options: string[];
  answerIndex: number;
  explain: string;
}

interface SubmoduloContent {
  id: CompresionId;
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

const COMPRESION: Record<CompresionId, SubmoduloContent> = {
  'idea-principal': {
    id: 'idea-principal',
    titulo: 'Idea principal',
    descripcion: 'Identifica la idea central: de qué trata el texto en general.',
    icon: 'sparkles-outline',
    color: '#0ea5e9',
    teoria: [
      'La idea principal resume el mensaje central del texto.',
      'No es un detalle: es lo más importante que el autor quiere comunicar.',
      'Suele responder: ¿de qué trata el texto? ¿qué quiere enseñar o informar?',
    ],
    claves: [
      'Lee título + primera y última oración (te dan pista).',
      'Busca la idea que engloba a las demás (no un ejemplo).',
      'Si una frase se puede aplicar a todo el texto, probablemente es la principal.',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo (mini texto)',
        items: [
          'Texto: “Dormir bien mejora la concentración y la memoria. Además, reduce el estrés.”',
          'Idea principal: “Dormir bien mejora el rendimiento y el bienestar.”',
        ],
      },
    ],
    actividad: {
      objetivo: 'Diferenciar idea principal vs detalles.',
      instrucciones: 'Lee la frase y mira cuál opción sería la idea principal.',
      frases: [
        {
          texto: '“El reciclaje reduce la basura, ahorra recursos y protege el ambiente.”',
          solucion: 'Idea principal: “El reciclaje beneficia al ambiente y a los recursos.”',
        },
        {
          texto: '“La lectura amplía vocabulario, mejora comprensión y fortalece la escritura.”',
          solucion: 'Idea principal: “La lectura mejora habilidades de lenguaje.”',
        },
        {
          texto: '“Hacer ejercicio fortalece el corazón y mejora el ánimo.”',
          solucion: 'Idea principal: “El ejercicio mejora la salud física y mental.”',
        },
      ],
    },
    quiz: [
      {
        q: 'La idea principal es…',
        options: [
          'un ejemplo del texto',
          'un detalle pequeño',
          'el mensaje central del texto',
          'una palabra difícil',
        ],
        answerIndex: 2,
        explain: 'La idea principal es el mensaje global más importante.',
      },
      {
        q: '¿Cuál opción suele ayudar a encontrar la idea principal?',
        options: [
          'leer solo el medio del texto',
          'leer título y cierre',
          'mirar solo ejemplos',
          'ignorar la introducción',
        ],
        answerIndex: 1,
        explain: 'Título + primera/última parte suelen dar la clave del tema.',
      },
    ],
  },

  'ideas-secundarias': {
    id: 'ideas-secundarias',
    titulo: 'Ideas secundarias',
    descripcion: 'Reconoce datos que apoyan la idea principal: ejemplos, causas, consecuencias.',
    icon: 'list-outline',
    color: '#22c55e',
    teoria: [
      'Las ideas secundarias explican, amplían o justifican la idea principal.',
      'Pueden ser ejemplos, datos, razones, comparaciones o consecuencias.',
    ],
    claves: [
      'Si eliminas una idea secundaria, el texto sigue entendible (solo pierde detalle).',
      'Busca palabras como: por ejemplo, además, también, porque, debido a.',
      'Pregunta: ¿esta idea apoya a la principal o es el centro?',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo',
        items: [
          'Idea principal: “El ejercicio es bueno.”',
          'Secundarias: “Mejora el corazón”, “ayuda a controlar el estrés”, “aumenta energía”.',
        ],
      },
    ],
    actividad: {
      objetivo: 'Detectar cuál idea es secundaria.',
      instrucciones: 'Observa qué frase funciona como apoyo y no como tema central.',
      frases: [
        {
          texto: '“Comer frutas ayuda a la salud. Por ejemplo, aportan vitaminas y fibra.”',
          solucion: 'Secundaria: “aportan vitaminas y fibra” (ejemplo/soporte).',
        },
        {
          texto: '“La contaminación afecta la salud. Puede causar alergias y problemas respiratorios.”',
          solucion: 'Secundaria: “causar alergias…” (consecuencia).',
        },
        {
          texto: '“La lectura es importante. También mejora la escritura.”',
          solucion: 'Secundaria: “mejora la escritura” (apoya la idea central).',
        },
      ],
    },
    quiz: [
      {
        q: 'Las ideas secundarias sirven para…',
        options: [
          'cambiar de tema',
          'apoyar y explicar la idea principal',
          'hacer el texto más confuso',
          'repetir la idea principal igual',
        ],
        answerIndex: 1,
        explain: 'Secundarias = soporte (ejemplos, razones, datos).',
      },
      {
        q: '¿Cuál es una idea secundaria?',
        options: [
          '“El ejercicio mejora la salud” (tema)',
          '“El texto trata sobre deporte” (tema)',
          '“Ayuda a reducir el estrés” (apoyo)',
          '“El ejercicio” (palabra suelta)',
        ],
        answerIndex: 2,
        explain: '“Ayuda a reducir el estrés” es un apoyo específico.',
      },
    ],
  },

  inferencias: {
    id: 'inferencias',
    titulo: 'Inferencias',
    descripcion: 'Saca conclusiones a partir de pistas del texto (sin que lo diga literal).',
    icon: 'trending-up-outline',
    color: '#a855f7',
    teoria: [
      'Inferir es deducir información no explícita usando pistas del texto.',
      'Se apoya en conocimientos previos + lo que el autor sugiere.',
    ],
    claves: [
      'Busca señales: emociones, acciones, consecuencias, contexto.',
      'Evita inventar: tu inferencia debe estar respaldada por el texto.',
      'Preguntas típicas: ¿qué quiso decir?, ¿qué pasará después?, ¿cómo se siente?',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo',
        items: [
          'Texto: “Luis salió sin paraguas. Minutos después llegó empapado.”',
          'Inferencia: “Estaba lloviendo” (no lo dice literal, pero se deduce).',
        ],
      },
    ],
    actividad: {
      objetivo: 'Inferir con pistas claras.',
      instrucciones: 'Lee y deduce lo más probable.',
      frases: [
        {
          texto: '“Ana bostezaba y miraba el reloj cada minuto.”',
          solucion: 'Inferencia: Ana está cansada o aburrida y quiere que pase el tiempo.',
        },
        {
          texto: '“Pedro guardó el cuaderno y sonrió al ver su calificación.”',
          solucion: 'Inferencia: Le fue bien o está satisfecho con su nota.',
        },
        {
          texto: '“El suelo estaba mojado y había charcos en la calle.”',
          solucion: 'Inferencia: Llovió hace poco.',
        },
      ],
    },
    quiz: [
      {
        q: 'Inferir significa…',
        options: [
          'copiar una frase',
          'deducir algo con pistas del texto',
          'cambiar palabras por sinónimos',
          'leer en voz alta',
        ],
        answerIndex: 1,
        explain: 'Inferir = deducir lo que no está escrito literal.',
      },
      {
        q: 'Texto: “Llegó con ojeras y se quedó dormido en clase.” ¿Qué se infiere?',
        options: ['Está enfermo', 'No durmió bien', 'Ganó un premio', 'Comió demasiado'],
        answerIndex: 1,
        explain: 'Ojeras + dormirse sugieren falta de sueño.',
      },
    ],
  },

  'tipos-de-texto': {
    id: 'tipos-de-texto',
    titulo: 'Tipos de texto',
    descripcion: 'Reconoce si un texto es narrativo, informativo, argumentativo, instructivo, etc.',
    icon: 'document-text-outline',
    color: '#f59e0b',
    teoria: [
      'Los textos se clasifican según su intención comunicativa.',
      'Identificar el tipo ayuda a comprender mejor (qué busca el autor).',
    ],
    claves: [
      'Narrativo: cuenta hechos (personajes, tiempo, lugar).',
      'Informativo: explica datos o conceptos (objetivo).',
      'Argumentativo: busca convencer (opinión + razones).',
      'Instructivo: da pasos (primero, luego, finalmente).',
    ],
    ejemplos: [
      {
        titulo: 'Pistas rápidas',
        items: [
          '“Había una vez…” → narrativo.',
          '“Según el estudio…” → informativo.',
          '“Considero que…” → argumentativo.',
          '“Paso 1 / Paso 2” → instructivo.',
        ],
      },
    ],
    actividad: {
      objetivo: 'Clasificar por intención.',
      instrucciones: 'Lee y decide el tipo.',
      frases: [
        {
          texto: '“Primero enciende la computadora, luego abre el programa.”',
          solucion: 'Instructivo (da pasos).',
        },
        {
          texto: '“La fotosíntesis es el proceso por el cual…”',
          solucion: 'Informativo (explica un concepto).',
        },
        {
          texto: '“Pienso que reciclar es necesario porque…”',
          solucion: 'Argumentativo (opina y da razones).',
        },
      ],
    },
    quiz: [
      {
        q: 'Un texto que cuenta una historia es…',
        options: ['informativo', 'narrativo', 'instructivo', 'descriptivo'],
        answerIndex: 1,
        explain: 'Narrativo = historia, hechos, personajes.',
      },
      {
        q: '“Paso 1, paso 2…” corresponde a un texto…',
        options: ['argumentativo', 'narrativo', 'instructivo', 'poético'],
        answerIndex: 2,
        explain: 'Instructivo = pasos o instrucciones.',
      },
    ],
  },

  resumen: {
    id: 'resumen',
    titulo: 'Resumen',
    descripcion: 'Extrae lo esencial del texto (idea principal + claves) en menos palabras.',
    icon: 'ribbon-outline',
    color: '#ef4444',
    teoria: [
      'Un resumen reduce el texto manteniendo lo más importante.',
      'Debe ser claro, breve y con tus palabras (sin copiar literal).',
    ],
    claves: [
      'Subraya idea principal + 2 o 3 ideas clave.',
      'Elimina ejemplos, repeticiones y detalles secundarios.',
      'Reescribe con tus palabras manteniendo orden lógico.',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplo',
        items: [
          'Texto: “El ejercicio mejora la salud, reduce estrés y aumenta energía.”',
          'Resumen: “El ejercicio mejora la salud y el bienestar.”',
        ],
      },
    ],
    actividad: {
      objetivo: 'Resumir sin perder lo esencial.',
      instrucciones: 'Mira cómo se reduce manteniendo sentido.',
      frases: [
        {
          texto: '“Dormir bien mejora la memoria y la concentración, por eso ayuda en el estudio.”',
          solucion: 'Resumen: Dormir bien mejora la concentración y ayuda a estudiar.',
        },
        {
          texto: '“La contaminación del aire afecta la salud y causa enfermedades respiratorias.”',
          solucion: 'Resumen: La contaminación del aire afecta la salud.',
        },
        {
          texto: '“Leer amplía vocabulario, mejora comprensión y fortalece la escritura.”',
          solucion: 'Resumen: Leer mejora habilidades del lenguaje.',
        },
      ],
    },
    quiz: [
      {
        q: 'Un buen resumen debe…',
        options: [
          'ser más largo que el texto',
          'copiar el texto literal',
          'mantener lo esencial con menos palabras',
          'meter ejemplos nuevos',
        ],
        answerIndex: 2,
        explain: 'Resumen = esencial + breve + claro.',
      },
      {
        q: 'Al resumir se eliminan principalmente…',
        options: ['ideas principales', 'detalles secundarios', 'el tema', 'el sentido'],
        answerIndex: 1,
        explain: 'Se quitan detalles y ejemplos; se mantiene lo central.',
      },
    ],
  },
};

@Component({
  selector: 'app-compresion-submodulo',
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
export class CompresionSubmoduloPage implements OnInit, OnDestroy {
  private sub?: Subscription;

  id!: CompresionId;
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
      checkmarkDoneOutline,
      checkboxOutline,
      refreshOutline,
      thumbsUpOutline,
      ribbonOutline,
      sparklesOutline,
      homeOutline,
      barChartOutline,
      listOutline,
      trendingUpOutline,
    });
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((pm) => {
      const raw = (pm.get('id') || 'idea-principal') as CompresionId;
      this.id = raw;
      this.data = COMPRESION[this.id] ?? COMPRESION['idea-principal'];

      this.revealed = {};
      this.answers = {};
      this.score = 0;
      this.submitted = false;

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
    localStorage.setItem(`done_compresion_${this.id}`, '1');
    this.recalcModuleProgress();
    localStorage.setItem('progress_compresion', String(this.moduleProgress));
  }

  private recalcModuleProgress() {
    const ids: CompresionId[] = [
      'idea-principal',
      'ideas-secundarias',
      'inferencias',
      'tipos-de-texto',
      'resumen',
    ];
    const doneCount = ids.filter((x) => localStorage.getItem(`done_compresion_${x}`) === '1').length;
    this.moduleProgress = Math.round((doneCount / ids.length) * 100);
    localStorage.setItem('progress_compresion', String(this.moduleProgress));
  }

  irA(id: CompresionId) {
    this.router.navigate(['/compresion', id]);
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
