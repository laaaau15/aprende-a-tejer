// Vídeos tutoriales curados (reales, de canales de YouTube en español)
// para acompañar cada punto/técnica. La clave es el id del punto o de la lección.
export const VIDEOS = {
  'sujetar-agujas': { title: 'Tejido de dos agujas para principiantes', channel: 'Tejido Creativa', videoId: 'UgHsW72LrcA' },
  'sujetar-hilo': { title: 'Tejido de dos agujas para principiantes', channel: 'Tejido Creativa', videoId: 'UgHsW72LrcA' },
  'montar-puntos': { title: '5 maneras de montar puntos', channel: 'Soy Woolly', videoId: '0RQdKGJJurk' },
  'punto-derecho': { title: 'Punto derecho estilo inglés', channel: 'Soy Woolly', videoId: 'os4wjh3Xj_0' },
  'punto-reves': { title: 'Tejido de dos agujas para principiantes (derecho y revés)', channel: 'Tejido Creativa', videoId: 'UgHsW72LrcA' },
  'punto-bobo': { title: 'Aprende cómo tejer punto bobo, musgo o Santa Clara', channel: 'Soy Woolly', videoId: '1QRSQmMih_s' },
  'punto-jersey': { title: 'Cómo tejer punto jersey o punto liso paso a paso', channel: 'Patronarte', videoId: 'pqPqD7HOdOI' },
  'elastico-1x1': { title: 'Punto elástico 1x1 y 2x2 realizado con dos agujas', channel: 'Soy Woolly', videoId: 'IG2D6XEhGNk' },
  'elastico-2x2': { title: 'Punto elástico 1x1 y 2x2 realizado con dos agujas', channel: 'Soy Woolly', videoId: 'IG2D6XEhGNk' },
  'cerrar-puntos': { title: '4 formas de cerrar los puntos a dos agujas', channel: 'Labores y Punto', videoId: 'opoh7Uub7MI' },
  'punto-bajo': { title: 'Curso básico de crochet — Clase 2: Punto bajo', channel: 'Crochet para principiantes', videoId: 'vKX4wyTh3pY' },
  'punto-alto': { title: 'Curso básico de crochet — Clase 3: Punto alto', channel: 'Crochet para principiantes', videoId: 'fppVmG-oWoE' },
  'cadeneta': { title: 'Curso básico de crochet — Clase 1: Nudo deslizado y cadenas', channel: 'Crochet para principiantes', videoId: 'l9cFvtXH5Bo' }
}

export function findVideo(id) {
  return VIDEOS[id] ?? null
}
