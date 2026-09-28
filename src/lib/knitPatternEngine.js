// Motor de patrones para AGUJAS (punto a dos agujas / circulares), en
// paralelo al motor de ganchillo: misma filosofía (siempre a partir de una
// muestra real de tensión), pero con la mecánica propia de tejer con agujas
// (montar puntos, tejer en redondo con agujas circulares, menguar la
// corona del gorro con "2 puntos juntos").

function round(n) {
  return Math.round(n)
}
function roundToMultiple(n, multiple) {
  return Math.max(multiple, Math.round(n / multiple) * multiple)
}
function stPerCm(gauge) {
  return gauge.stPer10cm / 10
}
function rowsPerCm(gauge) {
  return gauge.rowsPer10cm / 10
}

// --- GORRO (de abajo a arriba, en redondo con agujas circulares) ----------
// 1) Se montan los puntos y se teje un puño elástico 2x2.
// 2) Cuerpo en punto jersey (todo derecho en redondo) hasta la altura deseada.
// 3) Corona: menguas repartidas en 8 puntos, cada vez con menos puntos entre
//    mengua y mengua, hasta quedar ~8 puntos que se rematan con hebra.
export function generateHatPatternKnit({ gauge, headCircumferenceCm, negativeEasePct = 6, heightCm, ribCm = 5 }) {
  const spc = stPerCm(gauge)
  const rpc = rowsPerCm(gauge)

  const targetCircumference = headCircumferenceCm * (1 - negativeEasePct / 100)
  const castOn = roundToMultiple(targetCircumference * spc, 8)

  const ribRounds = Math.max(round(ribCm * rpc), 4)

  const markers = 8
  let segment = castOn / markers - 1 // puntos entre menguas al principio
  const decreaseSteps = []
  let current = castOn
  let interleavePlain = true

  while (current > markers * 1.5 && segment >= 0) {
    const segText = segment > 0 ? `${segment} pts, ` : ''
    decreaseSteps.push({ type: 'decrease', text: `*${segText}2 puntos juntos* — repite ${markers} veces. (${current - markers} pts)` })
    current -= markers
    if (segment > 1) {
      decreaseSteps.push({ type: 'plain', text: 'Teje una vuelta entera del derecho, sin menguar.' })
    }
    segment -= 1
  }

  const crownRadiusCm = targetCircumference / (2 * Math.PI)
  const bodyHeight = Math.max(heightCm - crownRadiusCm - ribCm, 2)
  const bodyRounds = Math.max(round(bodyHeight * rpc), 1)

  return {
    type: 'gorro',
    summary: {
      castOn,
      targetCircumferenceCm: +targetCircumference.toFixed(1),
      totalHeightCm: +(ribCm + bodyHeight + crownRadiusCm).toFixed(1)
    },
    sections: [
      { title: 'Puño', text: `Monta ${castOn} puntos y únelos en redondo (vigila que no queden retorcidos). Teje ${ribRounds} vueltas de elástico 2x2 (*2 derecho, 2 revés*).` },
      { title: 'Cuerpo', text: `Cambia a punto jersey (todo derecho en redondo) y teje ${bodyRounds} vueltas, hasta que el gorro mida la altura deseada menos la corona.` },
      { title: 'Corona (menguas)', text: 'Coloca 8 marcadores repartidos a partes iguales. Alterna las siguientes vueltas:', steps: decreaseSteps },
      { title: 'Remate', text: `Cuando queden ${Math.max(current, 8)} puntos, corta el hilo dejando ~20cm, pásalo con una aguja lanera por los puntos restantes, tira fuerte y remata por dentro.` }
    ]
  }
}

// --- BUFANDA (tejida en plano) ---------------------------------------------
export function generateScarfPatternKnit({ gauge, widthCm, lengthCm }) {
  const spc = stPerCm(gauge)
  const rpc = rowsPerCm(gauge)
  const castOn = round(widthCm * spc) + 4 // +4 puntos de borde en bobo para que no se enrolle
  const rows = round(lengthCm * rpc)

  return {
    type: 'bufanda',
    summary: { castOn, rows, estimatedWidthCm: +((castOn - 4) / spc).toFixed(1), estimatedLengthCm: +(rows / rpc).toFixed(1) },
    sections: [
      { title: 'Montaje', text: `Monta ${castOn} puntos.` },
      { title: 'Borde', text: 'Teje 4 vueltas enteras en punto bobo (todo derecho) para que el borde no se enrolle.' },
      { title: 'Cuerpo', text: `Teje los 2 puntos de cada borde siempre en derecho (para un canto ordenado) y los del medio en punto jersey (derecho por la cara, revés por la vuelta). Repite hasta llevar ${rows} vueltas en total.` },
      { title: 'Remate', text: 'Teje 4 vueltas más en punto bobo y cierra todos los puntos.' }
    ]
  }
}

// --- CUELLO / SNOOD (tubo en redondo) --------------------------------------
export function generateCowlPatternKnit({ gauge, circumferenceCm, heightCm }) {
  const spc = stPerCm(gauge)
  const rpc = rowsPerCm(gauge)
  const castOn = roundToMultiple(circumferenceCm * spc, 4)
  const rounds = round(heightCm * rpc)

  return {
    type: 'cuello',
    summary: { castOn, rounds, estimatedCircumferenceCm: +(castOn / spc).toFixed(1), estimatedHeightCm: +(rounds / rpc).toFixed(1) },
    sections: [
      { title: 'Montaje', text: `Monta ${castOn} puntos y únelos en redondo sin que queden retorcidos.` },
      { title: 'Cuerpo', text: `Teje en elástico 2x2 (*2 derecho, 2 revés*) durante ${rounds} vueltas — así el cuello queda elástico por ambos lados.` },
      { title: 'Remate', text: 'Cierra los puntos con elasticidad (por ejemplo, cerrado con aguja tapicera o el método "sewn bind off") para que no apriete al ponértelo.' }
    ]
  }
}
