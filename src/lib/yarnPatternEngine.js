// Motor de generación de patrones de ganchillo a partir de una TENSIÓN
// (puntos y vueltas por 10x10cm), no solo del grosor del hilo.
//
// Por qué: dos personas con el mismo hilo y el mismo punto pueden tejer
// con tensiones distintas según lo prietas o sueltas que tejan y la aguja
// que elijan. Un patrón calculado solo a partir del grosor/metraje del
// ovillo puede quedar grande o pequeño. Por eso este motor siempre trabaja
// en última instancia sobre puntos/vueltas reales por 10cm:
//  - Modo "preciso": la persona teje una muestra real y mide su tensión.
//  - Modo "estimado": partimos de la categoría de grosor del hilo (CYC) y
//    usamos una tensión típica de esa categoría, dejando muy claro que es
//    una aproximación y recomendando confirmar con una muestra.
//
// Todas las medidas se manejan en centímetros.

function round(n) {
  return Math.round(n)
}

function roundToMultiple(n, multiple) {
  return Math.max(multiple, Math.round(n / multiple) * multiple)
}

export function gaugeFromCounts({ stitches, rows, swatchSizeCm = 10 }) {
  const factor = 10 / swatchSizeCm
  return {
    stPer10cm: +(stitches * factor).toFixed(2),
    rowsPer10cm: +(rows * factor).toFixed(2)
  }
}

function stPerCm(gauge) {
  return gauge.stPer10cm / 10
}
function rowsPerCm(gauge) {
  return gauge.rowsPer10cm / 10
}

// --- GORRO (top-down, en redondo, espiral con marcador) -------------------
//
// Corona clásica de ganchillo (incremento de 6 puntos por vuelta):
//  V1: 6 pb en anillo mágico (6)
//  V2: 2pb en cada punto (12)
//  Vn (n>=2): se repite 6 veces [ (n-2) pb, 2pb en el siguiente punto ] -> 6n puntos
// Cuando el nº de puntos de la corona alcanza el contorno objetivo, se
// sigue en redondo sin aumentos hasta la altura deseada.
export function generateHatPattern({ gauge, headCircumferenceCm, negativeEasePct = 8, heightCm, brimRounds = 3 }) {
  const spc = stPerCm(gauge)
  const rpc = rowsPerCm(gauge)

  const targetCircumference = headCircumferenceCm * (1 - negativeEasePct / 100)
  let targetStitches = roundToMultiple(targetCircumference * spc, 6)
  targetStitches = Math.max(targetStitches, 36)
  const increaseRounds = targetStitches / 6

  const rounds = []
  rounds.push({ n: 1, stitches: 6, text: '6 puntos bajos (pb) dentro de un anillo mágico. Cierra el anillo tirando del cabo. (6 pts)' })
  for (let n = 2; n <= increaseRounds; n++) {
    const seg = n - 2
    const total = 6 * n
    const segText = seg === 0 ? '' : `${seg} pb, `
    rounds.push({
      n,
      stitches: total,
      text: `*${segText}2pb en el siguiente punto* — repite 6 veces. (${total} pts)`
    })
  }

  // Altura que aporta la corona una vez colocada en la cabeza: aprox. su radio.
  const crownRadiusCm = targetCircumference / (2 * Math.PI)
  const remainingHeight = Math.max(heightCm - crownRadiusCm, 2)
  const bodyRounds = Math.max(round(remainingHeight * rpc) - brimRounds, 1)

  rounds.push({
    n: `${increaseRounds + 1}–${increaseRounds + bodyRounds}`,
    stitches: targetStitches,
    text: `1 pb en cada punto alrededor, sin aumentos. Repite esta vuelta ${bodyRounds} veces (cuerpo del gorro). (${targetStitches} pts)`
  })

  if (brimRounds > 0) {
    rounds.push({
      n: `${increaseRounds + bodyRounds + 1}–${increaseRounds + bodyRounds + brimRounds}`,
      stitches: targetStitches,
      text: `Ala/remate: ${brimRounds} vueltas de pb tomando solo la hebra trasera de cada punto (da elasticidad al borde). (${targetStitches} pts)`
    })
  }

  const totalRounds = increaseRounds + bodyRounds + brimRounds

  return {
    type: 'gorro',
    summary: {
      targetStitches,
      targetCircumferenceCm: +targetCircumference.toFixed(1),
      crownRadiusCm: +crownRadiusCm.toFixed(1),
      totalRounds,
      estimatedHeightCm: +(crownRadiusCm + remainingHeight).toFixed(1)
    },
    rounds
  }
}

// --- BUFANDA (rectángulo tejido en vueltas de ida y vuelta) ---------------
export function generateScarfPattern({ gauge, widthCm, lengthCm, stitchRepeat = 1 }) {
  const spc = stPerCm(gauge)
  const rpc = rowsPerCm(gauge)
  let stitches = round(widthCm * spc)
  if (stitchRepeat > 1) stitches = roundToMultiple(stitches, stitchRepeat)
  const rows = round(lengthCm * rpc)

  return {
    type: 'bufanda',
    summary: {
      stitches,
      rows,
      estimatedWidthCm: +(stitches / spc).toFixed(1),
      estimatedLengthCm: +(rows / rpc).toFixed(1)
    },
    steps: [
      { n: 0, text: `Cadeneta base de ${stitches + 1} puntos (${stitches} puntos + 1 de altura).` },
      { n: '1–' + rows, text: `Teje ${rows} vueltas de ida y vuelta sobre esos ${stitches} puntos con el punto elegido, girando la labor al final de cada vuelta.` }
    ]
  }
}

// --- CUELLO / SNOOD (tubo tejido en redondo) -------------------------------
export function generateCowlPattern({ gauge, circumferenceCm, heightCm, stitchRepeat = 1 }) {
  const spc = stPerCm(gauge)
  const rpc = rowsPerCm(gauge)
  let stitches = round(circumferenceCm * spc)
  if (stitchRepeat > 1) stitches = roundToMultiple(stitches, stitchRepeat)
  const rounds = round(heightCm * rpc)

  return {
    type: 'cuello',
    summary: {
      stitches,
      rounds,
      estimatedCircumferenceCm: +(stitches / spc).toFixed(1),
      estimatedHeightCm: +(rounds / rpc).toFixed(1)
    },
    steps: [
      { n: 0, text: `Cadeneta de ${stitches} puntos y únela con un punto raso formando un aro (vigila que no quede retorcida).` },
      { n: '1–' + rounds, text: `Teje ${rounds} vueltas en redondo sin aumentos ni disminuciones.` }
    ]
  }
}

export function buildGaugeWarning(mode) {
  if (mode === 'preciso') return null
  return 'Este patrón usa una tensión TÍPICA para el grosor de hilo indicado, no tu tensión real. Puede variar. Para un patrón 100% fiable, teje una muestra de 10x10cm, cuenta tus puntos y vueltas reales, y pásalos al modo "muestra real".'
}
