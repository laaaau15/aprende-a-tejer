// Catálogo de puntos de dos agujas. Cada punto tiene una versión "flat"
// (tejido en plano, ida y vuelta) y, cuando aplica, "circular" (en redondo).
export const STITCHES = [
  {
    id: 'punto-derecho',
    name: 'Punto derecho',
    aliases: ['knit', 'punto del derecho'],
    category: 'basico',
    difficulty: 1,
    texture: 'Lisa por delante, forma "uves".',
    workedFlat: true,
    workedCircular: true,
    swatch: ['KKKKKK', 'KKKKKK', 'KKKKKK'],
    summary: 'El punto más básico. Es la base de casi todo lo demás.',
    whatFor: 'Punto jersey, punto bobo, y como base de aumentos/disminuciones.',
    lookLike: 'Pequeñas "uves" apiladas, como una V repetida.',
    prerequisites: ['montar-puntos'],
    multipleOf: 1,
    steps: [
      { title: 'Hilo detrás', text: 'Con el hilo detrás de la labor, inserta la aguja derecha en el punto de delante hacia atrás.' },
      { title: 'Envuelve el hilo', text: 'Pasa el hilo por delante de la aguja derecha, de abajo a arriba.' },
      { title: 'Saca el lazo', text: 'Con la punta de la aguja derecha, tira del hilo hacia ti, a través del punto.' },
      { title: 'Suelta el punto viejo', text: 'Deja caer el punto original de la aguja izquierda. Ya tienes un punto derecho nuevo en la aguja derecha.' }
    ],
    flat: { title: 'En plano', rows: ['Vuelta 1 (derecho): teje todos los puntos en derecho.', 'Vuelta 2 (revés): teje todos los puntos en derecho (esto forma el punto jersey si alternas con revés, o punto bobo si repites solo derecho).'] },
    circular: { title: 'En redondo', rows: ['Todas las vueltas: teje todos los puntos en derecho (forma automáticamente el punto jersey).'] },
    commonMistakes: [
      { title: 'Puntos muy prietos', cause: 'Tensar demasiado el hilo al envolver.', fix: 'Deja que la aguja izquierda haga de "molde": no aprietes el punto contra ella.' }
    ],
    projects: [{ emoji: '🧣', label: 'Bufanda de punto bobo', why: 'Solo necesitas este punto.' }],
    detail: 'full'
  },
  {
    id: 'punto-reves',
    name: 'Punto revés',
    aliases: ['purl'],
    category: 'basico',
    difficulty: 1,
    texture: 'Forma "granitos" horizontales.',
    workedFlat: true,
    workedCircular: true,
    swatch: ['PPPPPP', 'PPPPPP'],
    summary: 'El "opuesto" del punto derecho. Combinados dan lugar a casi todos los puntos de fantasía.',
    whatFor: 'Punto jersey (cara de atrás), punto elástico, punto arroz.',
    lookLike: 'Ondulaciones horizontales, como granos de arroz en fila.',
    prerequisites: ['punto-derecho'],
    multipleOf: 1,
    steps: [
      { title: 'Hilo delante', text: 'Con el hilo delante de la labor, inserta la aguja derecha en el punto de delante hacia adelante.' },
      { title: 'Envuelve el hilo', text: 'Pasa el hilo alrededor de la aguja derecha, de arriba a abajo.' },
      { title: 'Saca el lazo', text: 'Empuja la punta de la aguja derecha hacia atrás, a través del punto, arrastrando el hilo nuevo.' },
      { title: 'Suelta el punto viejo', text: 'Deja caer el punto original de la aguja izquierda.' }
    ],
    flat: { title: 'En plano', rows: ['Vuelta 1: teje todos los puntos en revés.'] },
    circular: { title: 'En redondo', rows: ['Todas las vueltas en revés: da la cara "revés" del punto jersey por fuera.'] },
    commonMistakes: [
      { title: 'Confundir con el derecho', cause: 'La posición del hilo (delante/detrás) es la clave.', fix: 'Antes de cada punto, comprueba dónde está el hilo.' }
    ],
    projects: [],
    detail: 'full'
  },
  {
    id: 'punto-bobo',
    name: 'Punto bobo',
    aliases: ['garter stitch'],
    category: 'basico',
    difficulty: 1,
    texture: 'Ondulada por ambas caras, muy elástica y que no se enrolla.',
    workedFlat: true,
    workedCircular: true,
    swatch: ['KKKKKK', 'KKKKKK', 'KKKKKK', 'KKKKKK'],
    summary: 'Se teje solo con punto derecho, vuelta tras vuelta.',
    whatFor: 'Bordes que no se enrollan, mantas, bufandas para principiantes.',
    lookLike: 'Crestas horizontales iguales por ambas caras.',
    prerequisites: ['punto-derecho'],
    multipleOf: 1,
    steps: [],
    flat: { title: 'En plano', rows: ['Todas las vueltas: teje todos los puntos en derecho.'] },
    circular: { title: 'En redondo', rows: ['Vuelta 1: todo derecho.', 'Vuelta 2: todo revés.', 'Repite estas 2 vueltas (en redondo hay que alternar para conseguir el mismo efecto que en plano).'] },
    commonMistakes: [],
    projects: [{ emoji: '🧣', label: 'Bufanda fácil', why: 'Un único punto, ideal para empezar.' }],
    detail: 'full'
  },
  {
    id: 'punto-jersey',
    name: 'Punto jersey',
    aliases: ['stockinette', 'punto de media'],
    category: 'basico',
    difficulty: 1,
    texture: 'Lisa por delante ("uves"), granulada por detrás.',
    workedFlat: true,
    workedCircular: true,
    swatch: ['KKKKKK', 'PPPPPP', 'KKKKKK', 'PPPPPP'],
    summary: 'El punto "liso" clásico: alterna una vuelta derecho y una vuelta revés.',
    whatFor: 'Jerséis, gorros, la mayoría de prendas.',
    lookLike: 'Cara lisa con "uves"; los bordes tienden a enrollarse si no se rematan.',
    prerequisites: ['punto-derecho', 'punto-reves'],
    multipleOf: 1,
    steps: [],
    flat: { title: 'En plano', rows: ['Vuelta 1 (derecho): todo derecho.', 'Vuelta 2 (revés): todo revés.', 'Repite estas 2 vueltas.'] },
    circular: { title: 'En redondo', rows: ['Todas las vueltas: todo derecho (¡en redondo no hace falta alternar!).'] },
    commonMistakes: [
      { title: 'Los bordes se enrollan', cause: 'Es normal en punto jersey plano.', fix: 'Añade un borde de varios puntos en punto bobo a cada lado.' }
    ],
    projects: [],
    detail: 'full'
  },
  { id: 'jersey-reves', name: 'Jersey revés', aliases: ['reverse stockinette'], category: 'basico', difficulty: 1, workedFlat: true, workedCircular: true, summary: 'El punto jersey visto por su cara "revés", usado como cara buena.', prerequisites: ['punto-jersey'], detail: 'basic' },
  { id: 'elastico-1x1', name: 'Punto elástico 1x1', aliases: ['rib 1x1', 'canalé'], category: 'basico', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'Alterna 1 derecho, 1 revés. Muy elástico, ideal para puños y cuellos.', multipleOf: 2, prerequisites: ['punto-derecho', 'punto-reves'], detail: 'full',
    steps: [], flat: { title: 'En plano', rows: ['Todas las vueltas: *1 derecho, 1 revés*, repite hasta el final (alineando siempre derecho sobre derecho).'] },
    circular: { title: 'En redondo', rows: ['Todas las vueltas: *1 derecho, 1 revés*, repite alrededor.'] }, commonMistakes: [], projects: [] },
  { id: 'elastico-2x2', name: 'Punto elástico 2x2', aliases: ['rib 2x2'], category: 'basico', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'Alterna 2 derechos, 2 reveses. El más usado en puños y gorros.', multipleOf: 4, prerequisites: ['elastico-1x1'], detail: 'full',
    steps: [], flat: { title: 'En plano', rows: ['Todas las vueltas: *2 derecho, 2 revés*, repite hasta el final.'] },
    circular: { title: 'En redondo', rows: ['Todas las vueltas: *2 derecho, 2 revés*, repite alrededor.'] }, commonMistakes: [], projects: [] },
  { id: 'punto-arroz', name: 'Punto arroz', aliases: ['seed stitch', 'moss stitch (US)'], category: 'intermedio', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'Alterna derecho/revés y en la vuelta siguiente los invierte, creando textura de granitos.', multipleOf: 2, prerequisites: ['punto-derecho', 'punto-reves'], detail: 'full',
    steps: [], flat: { title: 'En plano', rows: ['Vuelta 1: *1 derecho, 1 revés*, repite.', 'Vuelta 2: teje el punto contrario al que muestra la labor (derecho sobre revés y viceversa).'] }, circular: { title: 'En redondo', rows: ['Vuelta 1: *1 derecho, 1 revés*.', 'Vuelta 2: *1 revés, 1 derecho* (se invierte respecto a la vuelta 1).'] }, commonMistakes: [], projects: [] },
  { id: 'falso-arroz', name: 'Falso punto arroz', category: 'intermedio', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'Parecido al punto arroz pero más fácil de memorizar en plano.', multipleOf: 2, prerequisites: ['punto-arroz'], detail: 'basic' },
  { id: 'punto-musgo', name: 'Punto musgo', category: 'intermedio', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'Variante del punto arroz tejida en bloques de 2 vueltas iguales.', multipleOf: 2, prerequisites: ['punto-arroz'], detail: 'basic' },
  { id: 'punto-ingles', name: 'Punto inglés', category: 'intermedio', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'Combina elástico y jersey para un acabado grueso y cálido.', multipleOf: 4, prerequisites: ['elastico-1x1'], detail: 'basic' },
  { id: 'punto-brioche', name: 'Punto brioche', category: 'avanzado', difficulty: 4, workedFlat: true, workedCircular: true, summary: 'Punto muy mullido de doble grosor, tejido normalmente con dos colores.', multipleOf: 2, prerequisites: ['punto-jersey', 'aumentos'], detail: 'basic' },
  { id: 'arroz-doble', name: 'Arroz doble', category: 'intermedio', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'Bloques de punto arroz de 2x2 para más textura.', multipleOf: 4, prerequisites: ['punto-arroz'], detail: 'basic' },
  { id: 'punto-semilla', name: 'Punto semilla', category: 'intermedio', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'Otro nombre regional para variantes del punto arroz.', multipleOf: 2, prerequisites: ['punto-arroz'], detail: 'basic' },
  { id: 'punto-espiga', name: 'Punto espiga', category: 'avanzado', difficulty: 3, workedFlat: true, workedCircular: false, summary: 'Textura en zigzag que imita una espiga de trigo.', multipleOf: 4, prerequisites: ['punto-jersey'], detail: 'basic' },
  { id: 'punto-retorcido', name: 'Punto retorcido', category: 'intermedio', difficulty: 2, workedFlat: true, workedCircular: true, summary: 'El punto derecho tejido por el hilo trasero, más apretado y definido.', multipleOf: 1, prerequisites: ['punto-derecho'], detail: 'basic' },
  { id: 'punto-cesta', name: 'Punto cesta', category: 'intermedio', difficulty: 3, workedFlat: true, workedCircular: true, summary: 'Bloques de derecho y revés que simulan un tejido de mimbre.', multipleOf: 8, prerequisites: ['punto-jersey'], detail: 'basic' },
  { id: 'trenzas', name: 'Trenzas', category: 'avanzado', difficulty: 3, workedFlat: true, workedCircular: true, summary: 'Cruces de puntos con ayuda de una aguja auxiliar (o sin ella) para formar trenzas en relieve.', multipleOf: 6, prerequisites: ['punto-jersey'], detail: 'basic' },
  { id: 'calados', name: 'Calados', category: 'avanzado', difficulty: 3, workedFlat: true, workedCircular: true, summary: 'Combina hebras (yarn overs) y disminuciones para crear agujeros decorativos.', multipleOf: 2, prerequisites: ['aumentos', 'disminuciones'], detail: 'basic' },
  { id: 'encajes', name: 'Encajes', category: 'avanzado', difficulty: 4, workedFlat: true, workedCircular: false, summary: 'Calados más elaborados, a menudo con repeticiones grandes y cartas de punto.', multipleOf: 8, prerequisites: ['calados'], detail: 'basic' },
  { id: 'jacquard', name: 'Jacquard', category: 'avanzado', difficulty: 4, workedFlat: true, workedCircular: true, summary: 'Dibujos con varios colores llevando los hilos no usados por detrás (stranded knitting).', multipleOf: 1, prerequisites: ['cambiar-color'], detail: 'basic' },
  { id: 'fair-isle', name: 'Fair Isle', category: 'avanzado', difficulty: 4, workedFlat: true, workedCircular: true, summary: 'Variante tradicional del jacquard con máximo 2 colores por vuelta.', multipleOf: 1, prerequisites: ['jacquard'], detail: 'basic' },
  { id: 'intarsia', name: 'Intarsia', category: 'avanzado', difficulty: 4, workedFlat: true, workedCircular: false, summary: 'Bloques de color grandes, cada uno con su propio ovillo, sin llevar hebras por detrás.', multipleOf: 1, prerequisites: ['cambiar-color'], detail: 'basic' },
  { id: 'texturizados', name: 'Puntos texturizados', category: 'avanzado', difficulty: 3, workedFlat: true, workedCircular: true, summary: 'Combinaciones de nudos, racimos (bobbles) y relieve.', multipleOf: 4, prerequisites: ['punto-jersey'], detail: 'basic' },
  { id: 'vueltas-cortas', name: 'Vueltas cortas (short rows)', category: 'avanzado', difficulty: 3, workedFlat: true, workedCircular: true, summary: 'Técnica para dar forma (talones, hombros) tejiendo solo parte de la vuelta.', multipleOf: 1, prerequisites: ['punto-jersey'], detail: 'basic' },
  { id: 'brioche-avanzado', name: 'Brioche avanzado', category: 'avanzado', difficulty: 4, workedFlat: true, workedCircular: true, summary: 'Brioche con aumentos, disminuciones y varios colores.', multipleOf: 2, prerequisites: ['punto-brioche'], detail: 'basic' }
]

export function findStitch(id) {
  return STITCHES.find((s) => s.id === id)
}

// --- Diccionario de abreviaturas de ganchillo: español / US / UK ----------
// La terminología US y UK nombra puntos distintos con la misma palabra
// (p. ej. "double crochet" no es el mismo punto en US que en UK), una de
// las causas más comunes de errores al seguir un patrón en inglés.
export const CROCHET_US_UK = [
  { es: 'Cadeneta', esAbbr: 'cad', us: 'Chain', usAbbr: 'ch', uk: 'Chain', ukAbbr: 'ch', note: 'Igual en ambos.' },
  { es: 'Punto raso / enano', esAbbr: 'pr', us: 'Slip stitch', usAbbr: 'sl st', uk: 'Slip stitch', ukAbbr: 'sl st', note: 'Igual en ambos.' },
  { es: 'Punto bajo', esAbbr: 'pb', us: 'Single crochet', usAbbr: 'sc', uk: 'Double crochet', ukAbbr: 'dc', note: '⚠️ US "sc" = UK "dc". ¡Mismo punto, nombre distinto!' },
  { es: 'Medio punto alto', esAbbr: 'mpa', us: 'Half double crochet', usAbbr: 'hdc', uk: 'Half treble', ukAbbr: 'htr', note: '' },
  { es: 'Punto alto', esAbbr: 'pa', us: 'Double crochet', usAbbr: 'dc', uk: 'Treble crochet', ukAbbr: 'tr', note: '⚠️ US "dc" = UK "tr". La confusión más famosa del ganchillo.' },
  { es: 'Punto alto doble', esAbbr: 'pad', us: 'Treble crochet', usAbbr: 'tr', uk: 'Double treble', ukAbbr: 'dtr', note: '' },
  { es: 'Punto alto triple', esAbbr: 'pat', us: 'Double treble', usAbbr: 'dtr', uk: 'Triple treble', ukAbbr: 'trtr', note: '' }
]
