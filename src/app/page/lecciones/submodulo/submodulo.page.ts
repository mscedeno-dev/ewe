import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  IonBackButton, IonButton, IonButtons, IonContent,
  IonHeader, IonIcon, IonProgressBar, IonTitle, IonToolbar,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import {
  bookOutline, documentTextOutline, createOutline, helpCircleOutline,
  homeOutline, checkmarkDoneOutline, checkmarkCircle, checkmarkOutline,
  closeCircle, refreshOutline, sparklesOutline, menuOutline, pencilOutline,
  libraryOutline, schoolOutline, shapesOutline, informationCircleOutline,
  trophyOutline,
} from 'ionicons/icons';

type LeccionId =
  | 'gramatica'
  | 'ortografia'
  | 'puntuacion'
  | 'redaccion'
  | 'compresion'
  | 'examen-final';

type Question =
  | {
      id: string;
      type: 'single';
      prompt: string;
      options: string[];
      answer: number;
      explain: string;
    }
  | {
      id: string;
      type: 'multiple';
      prompt: string;
      options: string[];
      answers: number[];
      explain: string;
    }
  | {
      id: string;
      type: 'match';
      prompt: string;
      left: string[];
      right: string[];
      matches: Record<number, number>;
      explain: string;
    };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function arraysEqualAsSet(a: number[] = [], b: number[] = []): boolean {
  const aa = [...a].sort((x, y) => x - y);
  const bb = [...b].sort((x, y) => x - y);
  return JSON.stringify(aa) === JSON.stringify(bb);
}

const Q_GRAMATICA: Question[] = [
  { id: 'g1', type: 'single', prompt: '¿Cuál es un sustantivo?', options: ['rápido', 'mesa', 'correr', 'muy'], answer: 1, explain: '"mesa" nombra una cosa: sustantivo.' },
  { id: 'g2', type: 'single', prompt: '¿Cuál es un verbo?', options: ['azul', 'leer', 'lápiz', 'feliz'], answer: 1, explain: '"leer" es acción: verbo.' },
  { id: 'g3', type: 'single', prompt: '¿Cuál es un adjetivo?', options: ['cantar', 'casa', 'hermoso', 'ayer'], answer: 2, explain: '"hermoso" describe: adjetivo.' },
  { id: 'g4', type: 'multiple', prompt: 'Selecciona los verbos:', options: ['saltar', 'libro', 'vivir', 'verde'], answers: [0, 2], explain: '"saltar" y "vivir" son acciones.' },
  { id: 'g5', type: 'multiple', prompt: 'Selecciona los sustantivos:', options: ['perro', 'correr', 'cuaderno', 'rápidamente'], answers: [0, 2], explain: '"perro" y "cuaderno" nombran cosas.' },
  { id: 'g6', type: 'single', prompt: 'En "Los niños juegan", ¿cuál es el verbo?', options: ['Los', 'niños', 'juegan', 'ninguno'], answer: 2, explain: 'La acción es "juegan".' },
  { id: 'g7', type: 'single', prompt: '¿Qué palabra es un artículo?', options: ['la', 'bonito', 'correr', 'ayer'], answer: 0, explain: '"la" es artículo.' },
  { id: 'g8', type: 'multiple', prompt: 'Selecciona los adjetivos:', options: ['alto', 'mesa', 'triste', 'comer'], answers: [0, 2], explain: '"alto" y "triste" describen.' },
  {
    id: 'g9', type: 'match', prompt: 'Une palabra con su clase:',
    left: ['correr', 'mesa', 'bonito'], right: ['Verbo', 'Sustantivo', 'Adjetivo'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'correr=verbo, mesa=sustantivo, bonito=adjetivo.',
  },
  {
    id: 'g10', type: 'match', prompt: 'Une la oración con su tipo:',
    left: ['¿Vienes mañana?', '¡Qué alegría!', 'Juan estudia.'],
    right: ['Interrogativa', 'Exclamativa', 'Enunciativa'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'Pregunta=interrogativa, emoción=exclamativa, afirmación=enunciativa.',
  },
];

const Q_ORTOGRAFIA: Question[] = [
  { id: 'o1', type: 'single', prompt: '¿Cuál palabra está bien tildada?', options: ['arbol', 'lápiz', 'cafe', 'rapido'], answer: 1, explain: '"lápiz" lleva tilde por ser grave que no termina en n/s/vocal.' },
  { id: 'o2', type: 'single', prompt: 'Selecciona la forma correcta:', options: ['Hecho la basura', 'Echo la basura', 'Ehco la basura', 'Eho la basura'], answer: 1, explain: '"Echo" = del verbo echar.' },
  { id: 'o3', type: 'single', prompt: '¿Cuál es correcta?', options: ['tubo (de estar)', 'tuvo (de tener)', 'tubó', 'tuvoo'], answer: 1, explain: '"tuvo" es del verbo tener.' },
  { id: 'o4', type: 'single', prompt: '¿Cuál palabra lleva "h"?', options: ['uevo', 'umano', 'huevo', 'acer'], answer: 2, explain: '"huevo" lleva h.' },
  { id: 'o5', type: 'multiple', prompt: 'Selecciona palabras con tilde:', options: ['país', 'cancion', 'rápido', 'arbol'], answers: [0, 2], explain: 'país (hiato), rápido (esdrújula).' },
  { id: 'o6', type: 'multiple', prompt: 'Selecciona palabras con "v":', options: ['estuvimos', 'cantaba', 'vivir', 'también'], answers: [0, 2], explain: 'estuvimos y vivir van con v.' },
  { id: 'o7', type: 'single', prompt: '¿Cuál es correcta?', options: ['a ver', 'haber (mirar)', 'haver', 'aver'], answer: 0, explain: '"a ver" = mirar.' },
  {
    id: 'o8', type: 'match', prompt: 'Une la palabra con su regla:',
    left: ['jugábamos', 'cambio', 'viaje'],
    right: ['-ábamos va con B', 'después de m va B', 'termina en -aje va con J'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'jugábamos (b), cambio (mb), viaje (j).',
  },
  {
    id: 'o9', type: 'match', prompt: 'Une el par correcto:',
    left: ['hecho', 'echo', 'hola'], right: ['realizado', 'tirar', 'saludo'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'hecho=realizado, echo=tirar, hola=saludo.',
  },
  { id: 'o10', type: 'single', prompt: '¿Qué tipo de palabra siempre lleva tilde?', options: ['aguda', 'grave', 'esdrújula', 'monosílaba'], answer: 2, explain: 'Las esdrújulas siempre llevan tilde.' },
];

const Q_PUNTUACION: Question[] = [
  { id: 'p1', type: 'single', prompt: '¿Qué signo se usa para cerrar una pregunta?', options: ['.', '¿', '?', '¡'], answer: 2, explain: 'Se cierra con "?".' },
  { id: 'p2', type: 'single', prompt: 'La coma se usa para…', options: ['unir ideas sin pausa', 'separar elementos en una lista', 'cerrar un texto', 'poner títulos'], answer: 1, explain: 'La coma separa elementos o incisos.' },
  { id: 'p3', type: 'single', prompt: '¿Cuál oración está bien puntuada?', options: ['Hola como estas?', 'Hola, ¿cómo estás?', 'Hola ¿como estas.', 'Hola ¿cómo estas?'], answer: 1, explain: 'Coma + tildes + signos correctos.' },
  { id: 'p4', type: 'multiple', prompt: 'Selecciona oraciones que necesitan coma:', options: ['Juan, ven aquí.', 'Me gusta leer', 'Sí, claro.', 'El perro corre'], answers: [0, 2], explain: 'Vocativo y "sí" afirmativo suelen ir con coma.' },
  { id: 'p5', type: 'single', prompt: 'El punto y coma (;) se usa para…', options: ['separar ideas relacionadas', 'cerrar pregunta', 'separar sílabas', 'poner comillas'], answer: 0, explain: 'Sirve para separar ideas relacionadas o listas complejas.' },
  { id: 'p6', type: 'single', prompt: '¿Cuál usa comillas correctamente?', options: ['Él dijo "hola".', 'Él dijo, hola.', 'Él dijo: hola.', 'Él dijo (hola).'], answer: 0, explain: 'Comillas para citas textuales.' },
  { id: 'p7', type: 'multiple', prompt: 'Selecciona signos de apertura:', options: ['¿', '?', '¡', '!'], answers: [0, 2], explain: 'Apertura: ¿ y ¡.' },
  {
    id: 'p8', type: 'match', prompt: 'Une el signo con su función:',
    left: [',', '.', ':'], right: ['Pausa breve', 'Cierra enunciado', 'Introduce lista/explicación'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'Coma=pausa breve, punto=cierra, dos puntos=introduce.',
  },
  {
    id: 'p9', type: 'match', prompt: 'Une el ejemplo con el signo:',
    left: ['¡Qué emoción', 'Lista: pan, leche', '¿Vienes mañana'],
    right: ['¡!', ':', '¿?'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'Exclamación, dos puntos, interrogación.',
  },
  { id: 'p10', type: 'single', prompt: 'Los paréntesis ( ) se usan para…', options: ['gritar', 'aclarar información', 'cerrar texto', 'separar sujeto'], answer: 1, explain: 'Sirven para aclaraciones o datos extra.' },
];

const Q_REDACCION: Question[] = [
  { id: 'r1', type: 'single', prompt: 'La coherencia es…', options: ['usar comas', 'que el texto tenga sentido global', 'usar palabras difíciles', 'repetir ideas'], answer: 1, explain: 'Coherencia = sentido global.' },
  { id: 'r2', type: 'single', prompt: 'La cohesión se logra con…', options: ['conectores y referencias', 'solo mayúsculas', 'solo puntos', 'solo títulos'], answer: 0, explain: 'Con conectores, pronombres, etc.' },
  { id: 'r3', type: 'single', prompt: '¿Qué conector indica causa?', options: ['sin embargo', 'porque', 'luego', 'además'], answer: 1, explain: '"porque" expresa causa.' },
  { id: 'r4', type: 'multiple', prompt: 'Selecciona conectores de contraste:', options: ['sin embargo', 'además', 'pero', 'por ejemplo'], answers: [0, 2], explain: 'Contraste: sin embargo / pero.' },
  { id: 'r5', type: 'single', prompt: 'Un párrafo debe tener…', options: ['una idea principal', 'solo ejemplos', 'solo títulos', 'cero conectores'], answer: 0, explain: 'Un párrafo gira en torno a una idea principal.' },
  { id: 'r6', type: 'multiple', prompt: 'Selecciona recursos para cohesión:', options: ['pronombres', 'conectores', 'cambiar de tema', 'repetición excesiva'], answers: [0, 1], explain: 'Pronombres y conectores ayudan a cohesión.' },
  { id: 'r7', type: 'single', prompt: '¿Qué mejora la claridad?', options: ['oraciones muy largas', 'ideas ordenadas', 'cambiar sujeto cada frase', 'omitir puntuación'], answer: 1, explain: 'Orden y claridad.' },
  {
    id: 'r8', type: 'match', prompt: 'Une el conector con su función:',
    left: ['por ejemplo', 'sin embargo', 'por eso'], right: ['Ejemplificar', 'Contrastar', 'Consecuencia'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'Ejemplo/contraste/consecuencia.',
  },
  {
    id: 'r9', type: 'match', prompt: 'Une el tipo de oración con su ejemplo:',
    left: ['Simple', 'Compuesta'], right: ['Juan estudia.', 'Juan estudia y María lee.'],
    matches: { 0: 0, 1: 1 }, explain: 'Simple=un verbo principal. Compuesta=dos proposiciones.',
  },
  { id: 'r10', type: 'single', prompt: '¿Qué es un resumen?', options: ['copiar todo', 'reducir manteniendo lo esencial', 'inventar datos', 'cambiar el tema'], answer: 1, explain: 'Resumen = esencial en menos palabras.' },
];

const Q_COMPRESION: Question[] = [
  { id: 'c1', type: 'single', prompt: 'La idea principal es…', options: ['un detalle', 'el mensaje central', 'una palabra rara', 'una cita'], answer: 1, explain: 'Idea principal = mensaje central.' },
  { id: 'c2', type: 'single', prompt: 'Las ideas secundarias…', options: ['cambian el tema', 'apoyan la idea principal', 'no sirven', 'son títulos'], answer: 1, explain: 'Secundarias apoyan y amplían.' },
  { id: 'c3', type: 'single', prompt: 'Inferir significa…', options: ['copiar', 'deducir con pistas', 'leer rápido', 'subrayar'], answer: 1, explain: 'Inferir = deducir lo no explícito.' },
  { id: 'c4', type: 'multiple', prompt: 'Selecciona tipos de texto:', options: ['narrativo', 'instructivo', 'azul', 'argumentativo'], answers: [0, 1, 3], explain: 'Narrativo, instructivo y argumentativo son tipos.' },
  { id: 'c5', type: 'single', prompt: 'Un texto instructivo se reconoce por…', options: ['personajes', 'pasos/indicaciones', 'opiniones', 'rimas'], answer: 1, explain: 'Instructivo = pasos.' },
  { id: 'c6', type: 'multiple', prompt: 'Selecciona acciones para resumir:', options: ['subrayar idea principal', 'meter detalles nuevos', 'eliminar ejemplos', 'copiar todo'], answers: [0, 2], explain: 'Resumen: esencial sin ejemplos ni inventos.' },
  { id: 'c7', type: 'single', prompt: 'Si un texto busca convencer, es…', options: ['informativo', 'argumentativo', 'descriptivo', 'poético'], answer: 1, explain: 'Argumentativo busca convencer.' },
  {
    id: 'c8', type: 'match', prompt: 'Une tipo de texto con pista:',
    left: ['Narrativo', 'Argumentativo', 'Instructivo'], right: ['Cuenta hechos', 'Da razones/opinión', 'Da pasos'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'Narrativo=hechos, argumentativo=razones, instructivo=pasos.',
  },
  {
    id: 'c9', type: 'match', prompt: 'Une concepto con definición:',
    left: ['Idea principal', 'Inferencia', 'Resumen'],
    right: ['Mensaje central', 'Deducción por pistas', 'Esencial en menos palabras'],
    matches: { 0: 0, 1: 1, 2: 2 }, explain: 'Principal=central, inferencia=deducción, resumen=esencial.',
  },
  { id: 'c10', type: 'single', prompt: 'Un buen resumen debe…', options: ['ser más largo', 'mantener lo esencial', 'copiar literal', 'inventar'], answer: 1, explain: 'Resumen = esencial.' },
];

function bankByLesson(id: LeccionId): Question[] {
  if (id === 'gramatica') return Q_GRAMATICA;
  if (id === 'ortografia') return Q_ORTOGRAFIA;
  if (id === 'puntuacion') return Q_PUNTUACION;
  if (id === 'redaccion') return Q_REDACCION;
  if (id === 'compresion') return Q_COMPRESION;
  return [...Q_GRAMATICA, ...Q_ORTOGRAFIA, ...Q_PUNTUACION, ...Q_REDACCION, ...Q_COMPRESION];
}

@Component({
  selector: 'app-lecciones-submodulo',
  standalone: true,
  templateUrl: './submodulo.page.html',
  styleUrls: ['./submodulo.page.scss'],
  imports: [
    CommonModule, RouterModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonButton, IonIcon, IonProgressBar,
  ],
})
export class LeccionesSubmoduloPage implements OnInit, OnDestroy {
  private sub?: Subscription;

  id!: LeccionId;
  titulo = '';
  descripcion = '';

  questions: Question[] = [];
  submitted = false;
  score = 0;

  singleAnswers: Record<number, number> = {};
  multipleAnswers: Record<number, number[]> = {};
  matchAnswers: Record<number, Record<number, number>> = {};

  sidebarOpen = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    addIcons({
      bookOutline, documentTextOutline, createOutline, helpCircleOutline,
      homeOutline, checkmarkDoneOutline, checkmarkCircle, checkmarkOutline,
      closeCircle, refreshOutline, sparklesOutline, menuOutline, pencilOutline,
      libraryOutline, schoolOutline, shapesOutline, informationCircleOutline,
      trophyOutline,
    });
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((pm) => {
      this.id = (pm.get('id') || 'gramatica') as LeccionId;

      const meta: Record<LeccionId, { t: string; d: string }> = {
        gramatica: { t: 'Lección de Gramática', d: 'Practica con preguntas variadas (10 del banco).' },
        ortografia: { t: 'Lección de Ortografía', d: 'Practica con preguntas variadas (10 del banco).' },
        puntuacion: { t: 'Lección de Puntuación', d: 'Practica con preguntas variadas (10 del banco).' },
        redaccion: { t: 'Lección de Redacción', d: 'Practica con preguntas variadas (10 del banco).' },
        compresion: { t: 'Lección de Comprensión', d: 'Practica con preguntas variadas (10 del banco).' },
        'examen-final': { t: 'Examen Final', d: 'Mezcla preguntas de todos los módulos (orden aleatorio).' },
      };

      this.titulo = meta[this.id].t;
      this.descripcion = meta[this.id].d;
      this.generar();
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  irHome() { this.router.navigateByUrl('/'); }

  generar() {
    this.submitted = false;
    this.score = 0;
    this.singleAnswers = {};
    this.multipleAnswers = {};
    this.matchAnswers = {};

    const bank = bankByLesson(this.id);
    const n = this.id === 'examen-final' ? 20 : 10;
    this.questions = shuffle(bank).slice(0, Math.min(n, bank.length));

    this.questions = this.questions.map((q) => {
      if (q.type !== 'match') return q;
      const rightShuffled = shuffle(q.right);
      const mapOldToNew: Record<number, number> = {};
      q.right.forEach((val, idx) => { mapOldToNew[idx] = rightShuffled.indexOf(val); });
      const newMatches: Record<number, number> = {};
      Object.keys(q.matches).forEach((k) => {
        const leftIndex = Number(k);
        newMatches[leftIndex] = mapOldToNew[q.matches[leftIndex]];
      });
      return { ...q, right: rightShuffled, matches: newMatches };
    });
  }

  toggleMultiple(qi: number, oi: number, checked: boolean) {
    const arr = this.multipleAnswers[qi] ? [...this.multipleAnswers[qi]] : [];
    if (checked) { if (!arr.includes(oi)) arr.push(oi); }
    else { const idx = arr.indexOf(oi); if (idx >= 0) arr.splice(idx, 1); }
    this.multipleAnswers[qi] = arr;
  }

  setMatch(qi: number, li: number, ri: number) {
    const obj = this.matchAnswers[qi] ? { ...this.matchAnswers[qi] } : {};
    obj[li] = ri;
    this.matchAnswers[qi] = obj;
  }

  submit() {
    let s = 0;
    this.questions.forEach((q, qi) => {
      if (q.type === 'single' && this.singleAnswers[qi] === q.answer) s++;
      if (q.type === 'multiple' && arraysEqualAsSet(this.multipleAnswers[qi] ?? [], q.answers)) s++;
      if (q.type === 'match') {
        const chosen = this.matchAnswers[qi] ?? {};
        const ok = Object.keys(q.matches).length === Object.keys(chosen).length &&
          Object.keys(q.matches).every((k) => chosen[Number(k)] === q.matches[Number(k)]);
        if (ok) s++;
      }
    });
    this.score = s;
    this.submitted = true;
  }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

  irA(id: LeccionId) { this.router.navigate(['/lecciones', id]); }

  goToModule(moduleName: string) { this.router.navigate([`/${moduleName}`]); }
}
