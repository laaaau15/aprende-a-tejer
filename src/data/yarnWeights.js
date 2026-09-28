// Tabla basada en el "Standard Yarn Weight System" del Craft Yarn Council
// (categorías 0-7), con equivalencias aproximadas de metros por 100g.
// Se usa SOLO en el modo "estimado" del generador de patrones: da una
// densidad de puntos típica para ese grosor de hilo, no la tensión real
// de quien teje. Por eso el motor de patrones avisa siempre de que el
// modo "muestra real" es el único 100% fiable.
export const YARN_WEIGHTS = [
  {
    category: 0,
    name: 'Lace (hilo de encaje)',
    metersPer100g: [800, 1600],
    hookMm: [1.5, 2.25],
    scPer10cm: [32, 42]
  },
  {
    category: 1,
    name: 'Fino / Superfino (calcetín, fingering, bebé)',
    metersPer100g: [400, 800],
    hookMm: [2.25, 3.5],
    scPer10cm: [27, 32]
  },
  {
    category: 2,
    name: 'Fino (sport, bebé grueso)',
    metersPer100g: [300, 400],
    hookMm: [3.5, 4.5],
    scPer10cm: [22, 26]
  },
  {
    category: 3,
    name: 'Ligero (DK, worsted ligero)',
    metersPer100g: [200, 300],
    hookMm: [4.5, 5.5],
    scPer10cm: [16, 20]
  },
  {
    category: 4,
    name: 'Medio (worsted, aran)',
    metersPer100g: [150, 200],
    hookMm: [5.5, 6.5],
    scPer10cm: [12, 17]
  },
  {
    category: 5,
    name: 'Grueso (chunky, bulky)',
    metersPer100g: [100, 150],
    hookMm: [6.5, 9],
    scPer10cm: [8, 11]
  },
  {
    category: 6,
    name: 'Muy grueso (super bulky)',
    metersPer100g: [50, 100],
    hookMm: [9, 15],
    scPer10cm: [5, 9]
  },
  {
    category: 7,
    name: 'Jumbo',
    metersPer100g: [0, 50],
    hookMm: [15, 25],
    scPer10cm: [3, 6]
  }
]

// Deduce la categoría CYC a partir de metros por 100g.
export function weightCategoryFromMeters(metersPer100g) {
  const found = YARN_WEIGHTS.find(
    (w) => metersPer100g >= w.metersPer100g[0] && metersPer100g < w.metersPer100g[1]
  )
  return found ?? (metersPer100g >= 1600 ? YARN_WEIGHTS[0] : YARN_WEIGHTS[YARN_WEIGHTS.length - 1])
}

function mid(range) {
  return (range[0] + range[1]) / 2
}

// Estima puntos y vueltas por 10cm en punto bajo a partir de una categoría CYC.
// Devuelve SIEMPRE un rango + un valor central, para dejar claro que es una
// aproximación y no una tensión medida.
export function estimateGaugeFromCategory(category) {
  const w = YARN_WEIGHTS.find((x) => x.category === category) ?? YARN_WEIGHTS[4]
  const stMid = mid(w.scPer10cm)
  // En punto bajo las vueltas suelen ser algo más "bajas" que los puntos:
  // aproximación habitual usada por diseñadoras, nunca exacta.
  const rowMid = +(stMid * 0.85).toFixed(1)
  return {
    stPer10cmRange: w.scPer10cm,
    stPer10cm: stMid,
    rowsPer10cm: rowMid,
    hookMm: mid(w.hookMm),
    hookMmRange: w.hookMm,
    weight: w
  }
}
