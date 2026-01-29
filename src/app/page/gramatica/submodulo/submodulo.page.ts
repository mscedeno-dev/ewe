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
    descripcion:
      'Aprende a identificar y clasificar palabras que nombran seres, objetos, lugares, ideas y sentimientos.',
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
        explain: '“Valentía” nombra una cualidad o idea, no un objeto tangible.',
      },
      {
        q: '¿Cuál es un sustantivo propio?',
        options: ['ciudad', 'Ecuador', 'libro', 'profesor'],
        answerIndex: 1,
        explain: '“Ecuador” nombra de forma particular un país.',
      },
    ],
  },

  verbos: {
    id: 'verbos',
    titulo: 'Verbos',
    descripcion:
      'Domina la palabra que expresa acciones, estados y procesos, y aprende a reconocer tiempo, modo y persona.',
    icon: 'extension-puzzle-outline',
    color: '#ec4899',
    teoria: [
      'El verbo expresa acción (correr), estado (ser/estar) o proceso (crecer).',
      'Se conjuga y cambia según persona (yo/tú/él), número (singular/plural), tiempo (presente/pasado/futuro) y modo (indicativo/subjuntivo/imperativo).',
      'El verbo es el núcleo del predicado: organiza la información de la oración.',
    ],
    claves: [
      'Tiempos básicos: presente (estudio), pasado (estudié/estudiaba), futuro (estudiaré).',
      'Modos: indicativo (hechos), subjuntivo (deseos/posibilidad), imperativo (órdenes).',
      'Perífrasis verbal: combinación para expresar aspecto (voy a estudiar, tengo que estudiar).',
    ],
    ejemplos: [
      { titulo: 'Acción, estado y proceso', items: ['Acción: escribir, saltar', 'Estado: ser, estar, parecer', 'Proceso: mejorar, crecer'] },
      {
        titulo: 'En oraciones',
        items: [
          'Yo estudio todos los días. (presente, 1ra persona)',
          'Ellos estudiarán mañana. (futuro, 3ra persona plural)',
          'Ojalá estudies con constancia. (subjuntivo)',
        ],
      },
    ],
    actividad: {
      objetivo: 'Identificar tiempo verbal y persona.',
      instrucciones: 'Lee cada frase y revisa la solución.',
      frases: [
        { texto: 'Nosotros aprendemos rápido.', solucion: 'presente, 1ra persona plural' },
        { texto: 'Tú estudiarás mañana.', solucion: 'futuro, 2da persona singular' },
        { texto: 'Ellos estudiaron ayer.', solucion: 'pasado, 3ra persona plural' },
      ],
    },
    quiz: [
      {
        q: '¿En qué modo está “Ojalá llegues temprano”?',
        options: ['Indicativo', 'Subjuntivo', 'Imperativo', 'Infinitivo'],
        answerIndex: 1,
        explain: 'Expresa deseo/posibilidad; por eso es subjuntivo.',
      },
      {
        q: '¿Cuál es una perífrasis verbal?',
        options: ['estudié', 'estudiar', 'voy a estudiar', 'estudio'],
        answerIndex: 2,
        explain: '“Voy a estudiar” combina dos verbos para expresar futuro cercano/intención.',
      },
    ],
  },

  adjetivos: {
    id: 'adjetivos',
    titulo: 'Adjetivos',
    descripcion:
      'Aprende cómo describen al sustantivo y cómo concuerdan en género y número, además de los grados del adjetivo.',
    icon: 'color-palette-outline',
    color: '#10b981',
    teoria: [
      'El adjetivo califica o determina al sustantivo: aporta una característica (alto, interesante) o lo precisa (este, aquel).',
      'Concuerda con el sustantivo en género y número: “niño aplicado / niña aplicada / niños aplicados”.',
      'Puede ir antes o después del sustantivo; a veces cambia matiz: “gran profesor” vs “profesor grande”.',
    ],
    claves: [
      'Grados: positivo (rápido), comparativo (más rápido que), superlativo (rapidísimo / el más rápido).',
      'Adjetivos calificativos: describen cualidades (claro, difícil).',
      'Adjetivos demostrativos/posesivos: determinan (este libro, mi cuaderno).',
    ],
    ejemplos: [
      { titulo: 'Concordancia', items: ['Tema complejo / temas complejos', 'Regla clara / reglas claras'] },
      { titulo: 'Grados del adjetivo', items: ['Positivo: útil', 'Comparativo: más útil que', 'Superlativo: muy útil / utilísimo'] },
    ],
    actividad: {
      objetivo: 'Aplicar concordancia y reconocer el grado.',
      instrucciones: 'Observa cada frase y compara con la solución.',
      frases: [
        { texto: 'Las reglas ___ (claro).', solucion: 'claras (femenino plural)' },
        { texto: 'Este ejercicio es ___ que el anterior. (difícil)', solucion: 'más difícil (comparativo)' },
        { texto: 'Fue un resultado ___. (excelente)', solucion: 'excelentísimo / muy excelente (superlativo)' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál opción muestra concordancia correcta?',
        options: ['La normas claras', 'Las norma claro', 'Las normas claras', 'Los normas claros'],
        answerIndex: 2,
        explain: '“Normas” es femenino plural; el adjetivo debe ser “claras”.',
      },
      {
        q: '¿Qué grado es “el más rápido”?',
        options: ['Positivo', 'Comparativo', 'Superlativo', 'Neutro'],
        answerIndex: 2,
        explain: '“El más…” indica el máximo dentro de un conjunto: superlativo.',
      },
    ],
  },

  articulos: {
    id: 'articulos',
    titulo: 'Artículos',
    descripcion:
      'Distingue artículos definidos e indefinidos y aprende cómo acompañan al sustantivo para precisar el significado.',
    icon: 'document-text-outline',
    color: '#f59e0b',
    teoria: [
      'El artículo acompaña al sustantivo y ayuda a determinarlo.',
      'Definidos: el, la, los, las (hablan de algo conocido o específico).',
      'Indefinidos: un, una, unos, unas (hablan de algo no específico o nuevo en el contexto).',
    ],
    claves: [
      'Definido: “La tarea” (se entiende cuál). Indefinido: “Una tarea” (cualquiera).',
      'Contracciones: a + el = al, de + el = del.',
      'Evita confundir artículo con pronombre: “él” (pronombre) ≠ “el” (artículo).',
    ],
    ejemplos: [
      { titulo: 'Definidos vs indefinidos', items: ['El cuaderno (específico)', 'Un cuaderno (cualquiera)'] },
      { titulo: 'Contracciones', items: ['Voy al parque.', 'Vengo del colegio.'] },
    ],
    actividad: {
      objetivo: 'Elegir el artículo adecuado según contexto.',
      instrucciones: 'Lee y compara con la solución.',
      frases: [
        { texto: 'Necesito ___ lápiz (cualquiera).', solucion: 'un' },
        { texto: 'Trae ___ libro que te presté (específico).', solucion: 'el' },
        { texto: 'Salimos ___ recreo.', solucion: 'al (a + el)' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál es un artículo indefinido?',
        options: ['el', 'las', 'unos', 'la'],
        answerIndex: 2,
        explain: '“Unos” introduce algo no específico o por primera vez.',
      },
      {
        q: '¿Cuál es la contracción correcta de “de + el”?',
        options: ['del', 'de el', 'd’el', 'deel'],
        answerIndex: 0,
        explain: 'La forma normativa es “del”.',
      },
    ],
  },

  pronombres: {
    id: 'pronombres',
    titulo: 'Pronombres',
    descripcion: 'Aprende cómo sustituyen al sustantivo para evitar repeticiones y hacer el texto más fluido.',
    icon: 'chatbubbles-outline',
    color: '#8b5cf6',
    teoria: [
      'El pronombre sustituye a un sustantivo o lo señala sin nombrarlo directamente.',
      'Personales: yo, tú, él/ella, nosotros, ustedes, ellos.',
      'También existen demostrativos (este, ese), posesivos (mío, tuyo), relativos (que, quien) e indefinidos (alguien, nada).',
    ],
    claves: [
      'Evitan repeticiones: “María llegó. Ella estaba cansada.”',
      'Cuidado con la tilde: “él” (pronombre) vs “el” (artículo).',
      'Pronombres relativos conectan ideas: “El libro que compré…”',
    ],
    ejemplos: [
      { titulo: 'Pronombres personales', items: ['Yo estudio', 'Ellos practican', 'Nosotros aprendemos'] },
      { titulo: 'Relativos e indefinidos', items: ['La tarea que hice', 'Alguien llamó', 'Nada es imposible'] },
    ],
    actividad: {
      objetivo: 'Reemplazar sustantivos por pronombres correctamente.',
      instrucciones: 'Lee y compara la sustitución sugerida.',
      frases: [
        { texto: 'Juan estudia. Juan aprobará.', solucion: 'Juan estudia. Él aprobará.' },
        { texto: 'María y Ana llegaron. María y Ana se sentaron.', solucion: 'María y Ana llegaron. Ellas se sentaron.' },
        { texto: 'El cuaderno está aquí. El cuaderno es nuevo.', solucion: 'El cuaderno está aquí. Este es nuevo.' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál opción es un pronombre relativo?',
        options: ['mi', 'que', 'la', 'un'],
        answerIndex: 1,
        explain: '“Que” conecta una oración con un antecedente: “El libro que compré…”.',
      },
      {
        q: '¿Cuál frase usa correctamente “él” y “el”?',
        options: [
          'El llegó tarde y él cuaderno se perdió.',
          'Él llegó tarde y el cuaderno se perdió.',
          'Él llegó tarde y él cuaderno se perdió.',
          'El llegó tarde y el cuaderno se perdió.',
        ],
        answerIndex: 1,
        explain: '“Él” pronombre lleva tilde. “El” artículo no lleva tilde.',
      },
    ],
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
      chevronBackOutline,
      layersOutline,
      homeOutline,
      extensionPuzzleOutline,
      colorPaletteOutline,
      chatbubblesOutline,
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

      this.recalcModuleProgress();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // Header: ir a Home
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
    localStorage.setItem(`done_gramatica_${this.id}`, '1');
    this.recalcModuleProgress();
    localStorage.setItem('progress_gramatica', String(this.moduleProgress));
  }

  private recalcModuleProgress() {
    const ids: GramaticaId[] = ['sustantivos', 'verbos', 'adjetivos', 'articulos', 'pronombres'];
    const doneCount = ids.filter((x) => localStorage.getItem(`done_gramatica_${x}`) === '1').length;
    this.moduleProgress = Math.round((doneCount / ids.length) * 100);
    localStorage.setItem('progress_gramatica', String(this.moduleProgress));
  }

  irA(id: GramaticaId) {
    this.router.navigate(['/gramatica', id]);
  }
}
