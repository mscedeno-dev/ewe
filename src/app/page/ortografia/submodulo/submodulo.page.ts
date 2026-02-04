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
  textOutline,

  alertCircleOutline,
  colorWandOutline,
  languageOutline,
} from 'ionicons/icons';
import { Subscription } from 'rxjs';

type OrtografiaId = 'acentuacion' | 'bV' | 'h' | 'gJ' | 'mayusculas';

interface QuizQuestion {
  q: string;
  options: string[];
  answerIndex: number;
  explain: string;
}

interface SubmoduloContent {
  id: OrtografiaId;
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

const ORTOGRAFIA: Record<OrtografiaId, SubmoduloContent> = {
  acentuacion: {
    id: 'acentuacion',
    titulo: 'Acentuación',
    descripcion: 'Aprende a tildar correctamente según la sílaba tónica y el tipo de palabra.',
    icon: 'language-outline',
    color: '#10b981',
    teoria: [
      'La tilde (´) marca la sílaba tónica cuando la regla lo exige.',
      'Agudas: tónica en la última sílaba. Llevan tilde si terminan en n, s o vocal.',
      'Graves (llanas): tónica en la penúltima. Llevan tilde si NO terminan en n, s o vocal.',
      'Esdrújulas y sobresdrújulas: siempre llevan tilde.',
    ],
    claves: [
      'Aguda: can-ción, so-fá, co-mer.',
      'Grave: ár-bol, lá-piz, fá-cil.',
      'Esdrújula: mú-si-ca, te-lé-fo-no, pá-ja-ro.',
      'Diptongo/hiato puede cambiar la tilde: país (hiato), aire (diptongo).',
    ],
    ejemplos: [
      {
        titulo: 'Ejemplos por tipo',
        items: [
          'Agudas: canción, compás, café.',
          'Graves: árbol, lápiz, césped.',
          'Esdrújulas: lógico, rápido, público.',
        ],
      },
      {
        titulo: 'Hiato y diptongo',
        items: [
          'Hiato con tilde: país, raíz, baúl.',
          'Diptongo sin tilde extra: aire, causa, limpio.',
        ],
      },
    ],
    actividad: {
      objetivo: 'Aplicar reglas de tilde en palabras comunes.',
      instrucciones: 'Corrige mentalmente y revisa la solución.',
      frases: [
        { texto: 'El arbol tiene muchas hojas.', solucion: 'árbol (grave terminada en consonante distinta de n/s)' },
        { texto: 'Mañana tomare cafe en la tarde.', solucion: 'tomaré (aguda termina en vocal), café (aguda termina en vocal)' },
        { texto: 'El pais tiene una gran diversidad.', solucion: 'país (hiato: a-ís)' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál palabra es esdrújula y debe llevar tilde?',
        options: ['rapido', 'cafe', 'reloj', 'papel'],
        answerIndex: 0,
        explain: '“rápido” es esdrújula y siempre lleva tilde.',
      },
      {
        q: 'Una palabra aguda lleva tilde si termina en…',
        options: ['cualquier consonante', 'n, s o vocal', 'r o l', 'm o p'],
        answerIndex: 1,
        explain: 'Regla: agudas con tilde si terminan en n, s o vocal.',
      },
    ],
  },

  bV: {
    id: 'bV',
    titulo: 'Uso de B y V',
    descripcion: 'Diferencia palabras con b y v mediante reglas y patrones frecuentes.',
    icon: 'spellcheck-outline',
    color: '#6366f1',
    teoria: [
      'B y V representan sonidos similares en la mayoría de variantes del español, por eso se confunden.',
      'Aprender reglas, familias de palabras y excepciones ayuda a escribir correctamente.',
    ],
    claves: [
      'Se escribe B: después de m (también, cambio).',
      'Se escribe B en -aba/-abas/-ábamos (cantaba, jugábamos) excepto “iba”.',
      'Se escribe V: en adjetivos terminados en -ivo/-iva (activo, creativa), con excepciones: “árabe”, “esclavo”.',
      'Se escribe V: en palabras con prefijos vice-, villa-, eva- (vicepresidente, Villavicencio, evaluar).',
    ],
    ejemplos: [
      {
        titulo: 'Patrones frecuentes',
        items: [
          'B: también, cambio, enviar → (ojo: enviar lleva v).',
          'V: vivir, volver, ventana, suave.',
        ],
      },
      {
        titulo: 'Familias de palabras',
        items: [
          'b: amable → amabilidad',
          'v: lluvia → llovizna',
        ],
      },
    ],
    actividad: {
      objetivo: 'Reconocer la grafía correcta según regla o familia.',
      instrucciones: 'Completa mentalmente y revisa la solución.',
      frases: [
        { texto: 'Ca__io de planes a última hora.', solucion: 'cambio (b después de m)' },
        { texto: 'Ella estu__o muy acti__a hoy.', solucion: 'estuvo (v), activa (v: -iva)' },
        { texto: 'Nosotros juga__amos en el recreo.', solucion: 'jugábamos (b: -ábamos)' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál palabra está escrita correctamente?',
        options: ['tubieron', 'estubimos', 'estuvimos', 'tuvoimos'],
        answerIndex: 2,
        explain: '“estuvimos” va con v (verbo estar).',
      },
      {
        q: 'La terminación “-ábamos” se escribe con…',
        options: ['v', 'b', 'h', 'j'],
        answerIndex: 1,
        explain: '“-ábamos” va con B: cantábamos, jugábamos.',
      },
    ],
  },

  h: {
    id: 'h',
    titulo: 'Uso de H',
    descripcion: 'Aprende cuándo se escribe h y cómo evitar errores comunes.',
    icon: 'text-outline',
    color: '#f59e0b',
    teoria: [
      'La H es muda, pero se conserva por etimología y reglas ortográficas.',
      'Muchas palabras cambian totalmente de significado si se omite: hecho / echo.',
    ],
    claves: [
      'Llevan H: palabras con “hie-” (hielo, hierro), “hue-” (huevo, hueso), “hum-” (humano, humedad).',
      'Llevan H: formas del verbo haber (he, has, ha, hemos, habían).',
      'No llevan H: “a ver” (mirar) ≠ “haber” (verbo).',
      'Diferencia clave: hecho (realizado) vs echo (tirar).',
    ],
    ejemplos: [
      { titulo: 'Pares frecuentes', items: ['hecho / echo', 'a ver / haber', 'hola / ola'] },
      {
        titulo: 'En oraciones',
        items: [
          'He terminado la tarea. (haber)',
          'Echo la basura. (echar)',
          'Vamos a ver la clase. (a ver)',
        ],
      },
    ],
    actividad: {
      objetivo: 'Usar correctamente h según contexto.',
      instrucciones: 'Identifica la opción correcta y compara.',
      frases: [
        { texto: '___ hecho la actividad. (haber)', solucion: 'He' },
        { texto: '___ la pelota al aire. (echar)', solucion: 'Echo' },
        { texto: 'Vamos ___ si entendimos. (mirar)', solucion: 'a ver' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál oración es correcta?',
        options: ['A ver terminado', 'He terminado', 'E terminado', 'Eh terminado'],
        answerIndex: 1,
        explain: 'La forma correcta del verbo haber es “He terminado”.',
      },
      {
        q: 'Selecciona el uso correcto:',
        options: ['Echo la tarea (realizado)', 'Hecho la basura (tirar)', 'He hecho la tarea', 'Aver si vienes'],
        answerIndex: 2,
        explain: '“He hecho” = haber + participio. “Echo” es del verbo echar.',
      },
    ],
  },

  gJ: {
    id: 'gJ',
    titulo: 'Uso de G y J',
    descripcion: 'Aprende reglas para escribir g/j en sonidos fuertes y suaves.',
    icon: 'color-wand-outline',
    color: '#ef4444',
    teoria: [
      'G puede sonar suave (ge/gi = como “j”) o fuerte (ga/go/gu).',
      'J mantiene el sonido fuerte (ja/jo/ju) y también en je/ji.',
    ],
    claves: [
      'Se escribe G: “ge/gi” (gente, girar) y “gue/gui” (guerra, guitarra) con u muda.',
      'Se escribe J: en palabras terminadas en -aje (viaje, paisaje) y -jería (relojería).',
      'Excepción típica: “tejido” va con j (tejer).',
      'Ojo: “gerencia”, “gestión” van con g.',
    ],
    ejemplos: [
      { titulo: 'Con G', items: ['gente, girar, guitarra, guerra'] },
      { titulo: 'Con J', items: ['viaje, lenguaje, relojería, trabajar'] },
    ],
    actividad: {
      objetivo: 'Aplicar reglas g/j en palabras frecuentes.',
      instrucciones: 'Completa y revisa la solución.',
      frases: [
        { texto: 'El len__uaje es importante.', solucion: 'lenguaje (j: -aje)' },
        { texto: 'La __ente llegó temprano.', solucion: 'gente (ge)' },
        { texto: 'Tocó la __uitarra.', solucion: 'guitarra (gui)' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál palabra debe escribirse con J?',
        options: ['gente', 'gestión', 'viaje', 'girar'],
        answerIndex: 2,
        explain: '“viaje” termina en -aje, se escribe con j.',
      },
      {
        q: '“guerra” se escribe con “gue” porque…',
        options: ['la u suena', 'la u es muda y mantiene el sonido g fuerte', 'es excepción sin regla', 'va con j en realidad'],
        answerIndex: 1,
        explain: 'En “gue” la u es muda y permite mantener el sonido fuerte de la g.',
      },
    ],
  },

  mayusculas: {
    id: 'mayusculas',
    titulo: 'Mayúsculas',
    descripcion: 'Aprende cuándo usar mayúscula para escribir con formalidad y precisión.',
    icon: 'alert-circle-outline',
    color: '#8b5cf6',
    teoria: [
      'Las mayúsculas se usan por norma en inicios de texto, después de punto y en nombres propios.',
      'No se deben usar “por estética” en textos formales; se aplican según regla.',
    ],
    claves: [
      'Se escribe con mayúscula: inicio de oración, nombres propios (María, Ecuador), instituciones (Universidad de Cuenca).',
      'Días y meses van en minúscula: lunes, enero (salvo inicio de oración).',
      'Títulos de obras: solo mayúscula inicial si no son nombres propios (Cien años de soledad).',
      'Siglas: ONU, UCuenca (según convención).',
    ],
    ejemplos: [
      { titulo: 'Correcto', items: ['Hoy estudiamos Ortografía.', 'Marcelo vive en Cuenca.', 'La Universidad de Cuenca es reconocida.'] },
      { titulo: 'Incorrecto', items: ['Hoy Estudiamos Ortografía (no va por énfasis).', 'En Enero iremos… (enero va minúscula).'] },
    ],
    actividad: {
      objetivo: 'Aplicar mayúsculas donde corresponde.',
      instrucciones: 'Revisa y compara con la solución.',
      frases: [
        { texto: 'el lunes viajamos a cuenca.', solucion: 'El lunes viajamos a Cuenca.' },
        { texto: 'estudio en la universidad de cuenca.', solucion: 'Estudio en la Universidad de Cuenca.' },
        { texto: 'en enero inicio clases.', solucion: 'En enero inicio clases.' },
      ],
    },
    quiz: [
      {
        q: '¿Cuál oración está correctamente escrita?',
        options: [
          'En Enero inicio clases.',
          'en enero Inicio clases.',
          'En enero inicio clases.',
          'En enero Inicio Clases.',
        ],
        answerIndex: 2,
        explain: 'Mes en minúscula y solo mayúscula inicial al empezar la oración.',
      },
      {
        q: '¿Qué se escribe siempre con mayúscula?',
        options: ['lunes', 'enero', 'Ecuador', 'primavera'],
        answerIndex: 2,
        explain: '“Ecuador” es nombre propio.',
      },
    ],
  },
};

@Component({
  selector: 'app-ortografia-submodulo',
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
export class OrtografiaSubmoduloPage implements OnInit, OnDestroy {
  private sub?: Subscription;

  id!: OrtografiaId;
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
      textOutline,
      
      alertCircleOutline,
      colorWandOutline,
      languageOutline,
    });
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((pm) => {
      const raw = (pm.get('id') || 'acentuacion') as OrtografiaId;
      this.id = raw;
      this.data = ORTOGRAFIA[this.id] ?? ORTOGRAFIA.acentuacion;

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
    localStorage.setItem(`done_ortografia_${this.id}`, '1');
    this.recalcModuleProgress();
    localStorage.setItem('progress_ortografia', String(this.moduleProgress));
  }

  private recalcModuleProgress() {
    const ids: OrtografiaId[] = ['acentuacion', 'bV', 'h', 'gJ', 'mayusculas'];
    const doneCount = ids.filter((x) => localStorage.getItem(`done_ortografia_${x}`) === '1').length;
    this.moduleProgress = Math.round((doneCount / ids.length) * 100);
    localStorage.setItem('progress_ortografia', String(this.moduleProgress));
  }

  irA(id: OrtografiaId) {
    this.router.navigate(['/ortografia', id]);
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
