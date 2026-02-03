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
} from 'ionicons/icons';
import { Subscription } from 'rxjs';

/** IDs de Puntuación (los que van en la URL /puntuacion/:id) */
type PuntuacionId = 'punto' | 'coma' | 'puntoYComa' | 'dosPuntos' | 'signos';

interface QuizQuestion {
  q: string;
  options: string[];
  answerIndex: number;
  explain: string;
}

interface SubmoduloContent {
  id: PuntuacionId;
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

const PUNTUACION: Record<PuntuacionId, SubmoduloContent> = {
  punto: {
    id: 'punto',
    titulo: 'Punto (.)',
    descripcion: 'Aprende cuándo usar punto y seguido, punto y aparte y punto final.',
    icon: 'document-text-outline',
    color: '#10b981',
    teoria: [
      'El punto indica una pausa mayor y el cierre de una idea.',
      'Punto y seguido: separa oraciones dentro del mismo párrafo.',
      'Punto y aparte: separa párrafos distintos (cambio de idea).',
      'Punto final: cierra el texto.',
    ],
    claves: [
      'No se escribe punto después de ¿? ni ¡!',
      'Después de punto se escribe con mayúscula.',
      'Evita oraciones demasiado largas; el punto ayuda a dar claridad.',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplos',
        items: [
          'Punto y seguido: “Estudio hoy. Mañana repaso.”',
          'Punto y aparte: “Terminó la clase. (nuevo párrafo) Empezó la práctica.”',
          'Punto final: “Ese fue el resumen.”',
        ],
      },
    ],
    actividad: {
      objetivo: 'Identificar el tipo de punto correcto.',
      instrucciones: 'Lee la frase y revisa cómo quedaría con la puntuación adecuada.',
      frases: [
        { texto: 'Hoy estudié gramática mañana estudiaré ortografía', solucion: 'Hoy estudié gramática. Mañana estudiaré ortografía.' },
        { texto: 'Terminamos el tema ahora iniciamos otro', solucion: 'Terminamos el tema. Ahora iniciamos otro.' },
        { texto: 'Esta es la conclusión del texto', solucion: 'Esta es la conclusión del texto.' },
      ],
    },
    quiz: [
      {
        q: 'El punto y seguido se usa para…',
        options: ['cerrar el texto', 'separar párrafos', 'separar oraciones en un mismo párrafo', 'reemplazar la coma'],
        answerIndex: 2,
        explain: 'Punto y seguido: oraciones distintas dentro del mismo párrafo.',
      },
      {
        q: 'Después de un punto, generalmente se escribe…',
        options: ['en minúscula', 'en mayúscula', 'sin espacio', 'con coma'],
        answerIndex: 1,
        explain: 'La norma indica que tras el punto inicia mayúscula.',
      },
    ],
  },

  coma: {
    id: 'coma',
    titulo: 'Coma (,)',
    descripcion: 'Aprende a usar la coma en enumeraciones, vocativos y aclaraciones.',
    icon: 'sparkles-outline',
    color: '#6366f1',
    teoria: [
      'La coma marca una pausa breve dentro de la oración.',
      'Se usa para separar elementos, aclaraciones o llamar a alguien (vocativo).',
    ],
    claves: [
      'Enumeración: “Compré pan, leche y queso.”',
      'Vocativo: “María, ven acá.”',
      'Aclaración: “Juan, mi amigo, llegó tarde.”',
      'Antes de “pero”: “Quise ir, pero no pude.”',
    ],
    ejemplos: [
      { titulo: 'Enumeración', items: ['Traje cuadernos, lápices, borrador y regla.'] },
      { titulo: 'Vocativo', items: ['Profe, ya terminé la tarea.'] },
      { titulo: 'Aclaración', items: ['El examen, que fue difícil, terminó temprano.'] },
    ],
    actividad: {
      objetivo: 'Colocar comas donde corresponda.',
      instrucciones: 'Observa dónde va la pausa correcta.',
      frases: [
        { texto: 'Pedro ven un momento', solucion: 'Pedro, ven un momento. (vocativo)' },
        { texto: 'Compré manzanas peras uvas y plátanos', solucion: 'Compré manzanas, peras, uvas y plátanos.' },
        { texto: 'Quería salir pero estaba lloviendo', solucion: 'Quería salir, pero estaba lloviendo.' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál opción usa coma vocativa correctamente?',
        options: ['María ven acá', 'María, ven acá', 'María ven, acá', 'María ven acá,'],
        answerIndex: 1,
        explain: 'La coma vocativa separa el nombre de la acción: “María, ven acá”.',
      },
      {
        q: 'La coma en “Juan, mi amigo, llegó” indica…',
        options: ['enumeración', 'vocativo', 'aclaración', 'punto y aparte'],
        answerIndex: 2,
        explain: '“mi amigo” es una aclaración entre comas.',
      },
    ],
  },

  puntoYComa: {
    id: 'puntoYComa',
    titulo: 'Punto y coma (;)',
    descripcion: 'Aprende a separar ideas relacionadas y enumeraciones complejas.',
    icon: 'ribbon-outline',
    color: '#f59e0b',
    teoria: [
      'El punto y coma indica una pausa intermedia entre coma y punto.',
      'Se usa cuando las ideas están relacionadas, pero son más largas o complejas.',
    ],
    claves: [
      'Separa oraciones largas: “Estudié toda la tarde; aun así me faltó practicar.”',
      'En enumeraciones complejas: “Invité a Ana, mi prima; Carlos, mi vecino; y Luis, mi amigo.”',
      'Suele aparecer antes de conectores: “sin embargo”, “por tanto”.',
    ],
    ejemplos: [
      { titulo: 'Oraciones relacionadas', items: ['Quería viajar; no tenía dinero.'] },
      { titulo: 'Enumeración compleja', items: ['Traje pan, que compré ayer; leche, que estaba en oferta; y queso artesanal.'] },
    ],
    actividad: {
      objetivo: 'Usar punto y coma en contextos correctos.',
      instrucciones: 'Mira cómo se separan ideas sin cortar totalmente el hilo.',
      frases: [
        { texto: 'Estudié mucho sin embargo me faltó tiempo', solucion: 'Estudié mucho; sin embargo, me faltó tiempo.' },
        { texto: 'Traje cuadernos para matemáticas libros para historia hojas para biología', solucion: 'Traje cuadernos para matemáticas; libros para historia; hojas para biología.' },
        { texto: 'Quise ir a clases no pude por la lluvia', solucion: 'Quise ir a clases; no pude por la lluvia.' },
      ],
    },
    quiz: [
      {
        q: 'El punto y coma se usa principalmente para…',
        options: ['reemplazar el punto final siempre', 'separar ideas relacionadas con pausa intermedia', 'separar sílabas', 'hacer preguntas'],
        answerIndex: 1,
        explain: 'Es una pausa intermedia cuando las ideas están relacionadas.',
      },
      {
        q: '¿En qué caso es más recomendable usar punto y coma?',
        options: ['Enumeración simple', 'Oración corta', 'Enumeración compleja con comas internas', 'Después de signos ¿?'],
        answerIndex: 2,
        explain: 'Si hay comas dentro de cada elemento, el punto y coma ayuda a separar mejor.',
      },
    ],
  },

  dosPuntos: {
    id: 'dosPuntos',
    titulo: 'Dos puntos (:)',
    descripcion: 'Aprende a introducir listas, explicaciones y citas.',
    icon: 'create-outline',
    color: '#ef4444',
    teoria: [
      'Los dos puntos anuncian lo que viene: una explicación, una enumeración o una cita.',
      'No se usa mayúscula después de dos puntos salvo caso de cita o nombre propio.',
    ],
    claves: [
      'Enumeración: “Necesitas: cuaderno, lápiz y borrador.”',
      'Explicación: “Solo pido esto: responsabilidad.”',
      'Cita: “El profe dijo: “Estudien para mañana”.”',
    ],
    ejemplos: [
      { titulo: 'Enumeración', items: ['Traje: pan, leche, queso.'] },
      { titulo: 'Explicación', items: ['Tenía un objetivo: aprobar el examen.'] },
    ],
    actividad: {
      objetivo: 'Usar dos puntos como “anuncio”.',
      instrucciones: 'Revisa cómo introducen información.',
      frases: [
        { texto: 'Necesitas traer cuaderno lápiz y borrador', solucion: 'Necesitas traer: cuaderno, lápiz y borrador.' },
        { texto: 'Solo hay una regla estudiar', solucion: 'Solo hay una regla: estudiar.' },
        { texto: 'El profesor dijo estudien más', solucion: 'El profesor dijo: “Estudien más”.' },
      ],
    },
    quiz: [
      {
        q: 'Los dos puntos se usan para…',
        options: ['cerrar párrafos', 'introducir lo que sigue (lista/explicación/cita)', 'reemplazar la coma', 'negar oraciones'],
        answerIndex: 1,
        explain: 'Sirven para anunciar una enumeración, explicación o cita.',
      },
      {
        q: '¿Cuál es un uso correcto?',
        options: ['Traje: pan y leche', 'Traje pan: y leche', 'Traje pan y: leche', 'Traje pan y leche:'],
        answerIndex: 0,
        explain: '“Traje: pan y leche” está bien si introduce enumeración.',
      },
    ],
  },

  signos: {
    id: 'signos',
    titulo: '¿? y ¡!',
    descripcion: 'Aprende a usar signos de interrogación y exclamación correctamente.',
    icon: 'help-circle-outline',
    color: '#8b5cf6',
    teoria: [
      'En español se usan signos de apertura y cierre: ¿? y ¡!.',
      'Se colocan solo en el fragmento interrogativo/exclamativo si es parte de una oración más larga.',
    ],
    claves: [
      'Correcto: “¿Cómo estás?” / “¡Qué bien!”',
      'Dentro de una oración: “Si vienes, ¿me avisas?”',
      'No se duplican: evita “¿¿??” en textos formales.',
    ],
    ejemplos: [
      { titulo: 'Preguntas', items: ['¿Qué hora es?', '¿Dónde queda la U?'] },
      { titulo: 'Exclamaciones', items: ['¡Excelente trabajo!', '¡Cuidado!'] },
    ],
    actividad: {
      objetivo: 'Colocar signos de apertura y cierre.',
      instrucciones: 'Corrige las frases y revisa la solución.',
      frases: [
        { texto: 'Como te fue hoy?', solucion: '¿Cómo te fue hoy?' },
        { texto: 'Que lindo dia!', solucion: '¡Qué lindo día!' },
        { texto: 'Si vienes me avisas?', solucion: 'Si vienes, ¿me avisas?' },
      ],
    },
    quiz: [
      {
        q: 'En español, los signos de interrogación deben…',
        options: ['solo cerrar', 'solo abrir', 'abrir y cerrar', 'reemplazar el punto'],
        answerIndex: 2,
        explain: 'Regla del español: siempre apertura y cierre.',
      },
      {
        q: '¿Cuál opción está correcta?',
        options: ['Como estas?', '¿Como estas?', '¿Cómo estás?', '¿Cómo estas'],
        answerIndex: 2,
        explain: 'Debe llevar apertura/cierre y tildes: “¿Cómo estás?”',
      },
    ],
  },
};

@Component({
  selector: 'app-puntuacion-submodulo',
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
export class PuntuacionSubmoduloPage implements OnInit, OnDestroy {
  private sub?: Subscription;

  id!: PuntuacionId;
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
    });
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((pm) => {
      const raw = (pm.get('id') || 'punto') as PuntuacionId;
      this.id = raw;
      this.data = PUNTUACION[this.id] ?? PUNTUACION.punto;

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
    localStorage.setItem(`done_puntuacion_${this.id}`, '1');
    this.recalcModuleProgress();
    localStorage.setItem('progress_puntuacion', String(this.moduleProgress));
  }

  private recalcModuleProgress() {
    const ids: PuntuacionId[] = ['punto', 'coma', 'puntoYComa', 'dosPuntos', 'signos'];
    const doneCount = ids.filter((x) => localStorage.getItem(`done_puntuacion_${x}`) === '1').length;
    this.moduleProgress = Math.round((doneCount / ids.length) * 100);
    localStorage.setItem('progress_puntuacion', String(this.moduleProgress));
  }

  irA(id: PuntuacionId) {
    this.router.navigate(['/puntuacion', id]); ;
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