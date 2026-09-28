// Currículo de punto a dos agujas, organizado en 5 niveles progresivos.
export const LEVELS = [
  {
    id: 'nivel-1',
    name: 'Primera vez con agujas',
    emoji: '🌱',
    blurb: 'Lo básico para no perderte: cómo coger las agujas, montar puntos y hacer tus dos primeros puntos.',
    lessons: [
      { id: 'sujetar-agujas', title: 'Cómo sujetar las agujas', ref: '1.1', to: '/aprender/tecnica/sujetar-agujas', emoji: '🤲' },
      { id: 'sujetar-hilo', title: 'Cómo sujetar el hilo', ref: '1.2', to: '/aprender/tecnica/sujetar-hilo', emoji: '🧶' },
      { id: 'montar-puntos', title: 'Montar los primeros puntos', ref: '1.3', to: '/aprender/tecnica/montar-puntos', emoji: '➕' },
      { id: 'punto-derecho', title: 'Punto derecho', ref: '1.4', to: '/puntos/punto-derecho', emoji: '🟩' },
      { id: 'punto-reves', title: 'Punto revés', ref: '1.5', to: '/puntos/punto-reves', emoji: '🟦' }
    ]
  },
  {
    id: 'nivel-2',
    name: 'Ya controlo lo básico',
    emoji: '🌿',
    blurb: 'Combina derecho y revés para crear tus primeras texturas.',
    lessons: [
      { id: 'punto-bobo', title: 'Punto bobo', ref: '2.1', to: '/puntos/punto-bobo', emoji: '🟨' },
      { id: 'punto-jersey', title: 'Punto jersey', ref: '2.2', to: '/puntos/punto-jersey', emoji: '🟧' },
      { id: 'elastico', title: 'Punto elástico 1x1 y 2x2', ref: '2.3', to: '/puntos/elastico-2x2', emoji: '〰️' },
      { id: 'arroz', title: 'Punto arroz', ref: '2.4', to: '/puntos/punto-arroz', emoji: '🍚' },
      { id: 'cerrar-puntos', title: 'Cerrar puntos', ref: '2.5', to: '/aprender/tecnica/cerrar-puntos', emoji: '🔚' }
    ]
  },
  {
    id: 'nivel-3',
    name: 'Empiezo a hacer cosas',
    emoji: '🌸',
    blurb: 'Da forma a tu labor: aumentos, disminuciones y tu primer proyecto.',
    lessons: [
      { id: 'aumentos', title: 'Aumentos', ref: '3.1', to: '/aprender/tecnica/aumentos', emoji: '↗️' },
      { id: 'disminuciones', title: 'Disminuciones', ref: '3.2', to: '/aprender/tecnica/disminuciones', emoji: '↘️' },
      { id: 'cambiar-color', title: 'Cambiar de color', ref: '3.3', to: '/aprender/tecnica/cambiar-color', emoji: '🎨' },
      { id: 'leer-patrones', title: 'Leer patrones', ref: '3.4', to: '/aprender/tecnica/leer-patrones', emoji: '📖' },
      { id: 'gorro-basico', title: 'Proyecto: gorro básico', ref: '3.5', to: '/aprender/proyecto/gorro-basico', emoji: '🧢' }
    ]
  },
  {
    id: 'nivel-4',
    name: 'Agujas circulares',
    emoji: '⭕',
    blurb: 'Da el salto a tejer en redondo, sin costuras.',
    lessons: [
      { id: 'trabajar-circular', title: 'Trabajar en redondo', ref: '4.1', to: '/aprender/tecnica/trabajar-circular', emoji: '🔄' },
      { id: 'marcadores', title: 'Usar marcadores de punto', ref: '4.2', to: '/aprender/tecnica/marcadores', emoji: '📍' },
      { id: 'magic-loop', title: 'Magic loop', ref: '4.3', to: '/aprender/tecnica/magic-loop', emoji: '➰' },
      { id: 'gorro-disminuciones', title: 'Gorro con disminuciones en corona', ref: '4.4', to: '/aprender/proyecto/gorro-disminuciones', emoji: '🎩' },
      { id: 'cuello-circular', title: 'Proyecto: cuello circular', ref: '4.5', to: '/aprender/proyecto/cuello-circular', emoji: '🧣' }
    ]
  },
  {
    id: 'nivel-5',
    name: 'Me estoy viniendo arriba 😂',
    emoji: '🚀',
    blurb: 'Técnicas avanzadas para labores con más carácter.',
    lessons: [
      { id: 'trenzas', title: 'Trenzas', ref: '5.1', to: '/puntos/trenzas', emoji: '🧬' },
      { id: 'calados', title: 'Calados', ref: '5.2', to: '/puntos/calados', emoji: '🕸️' },
      { id: 'brioche', title: 'Punto brioche', ref: '5.3', to: '/puntos/punto-brioche', emoji: '🍞' },
      { id: 'jacquard', title: 'Jacquard', ref: '5.4', to: '/puntos/jacquard', emoji: '🟥' },
      { id: 'fair-isle', title: 'Fair Isle', ref: '5.5', to: '/puntos/fair-isle', emoji: '🏔️' },
      { id: 'proyecto-complejo', title: 'Proyecto: jersey sencillo', ref: '5.6', to: '/aprender/proyecto/jersey-sencillo', emoji: '👕' }
    ]
  }
]

// Ruta corta sugerida en la home ("¿Por dónde empiezo?")
export const QUICK_START = [
  'sujetar-agujas',
  'sujetar-hilo',
  'montar-puntos',
  'punto-derecho',
  'punto-reves',
  'punto-bobo',
  'punto-jersey',
  'elastico',
  'aumentos',
  'cerrar-puntos'
]

export function findLesson(id) {
  for (const level of LEVELS) {
    const lesson = level.lessons.find((l) => l.id === id)
    if (lesson) return { ...lesson, level }
  }
  return null
}
