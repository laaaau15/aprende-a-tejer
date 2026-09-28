// Cuánta lana (en gramos) suele necesitarse para cada tipo de prenda,
// en una talla adulta media. Es una aproximación deliberadamente basada en
// GRAMOS y no en metros: la cantidad de gramos que necesita una prenda es
// bastante estable independientemente del grosor del hilo (un hilo grueso
// usa más metros por punto pero necesitas menos puntos, y viceversa), así
// que es el criterio más fiable para saber "¿me llega esta lana?" antes de
// haber decidido tensión ni patrón exacto.
export const GARMENTS = [
  {
    id: 'complemento',
    label: 'Complemento pequeño',
    emoji: '🎀',
    examples: 'diadema, posavasos, llavero…',
    gramsRange: [20, 80],
    techniques: ['agujas', 'ganchillo']
  },
  {
    id: 'guantes',
    label: 'Guantes o mitones',
    emoji: '🧤',
    examples: 'par de guantes o mitones',
    gramsRange: [50, 100],
    techniques: ['agujas', 'ganchillo']
  },
  {
    id: 'calcetines',
    label: 'Calcetines',
    emoji: '🧦',
    examples: 'par de calcetines',
    gramsRange: [100, 150],
    techniques: ['agujas']
  },
  {
    id: 'gorro',
    label: 'Gorro',
    emoji: '🧢',
    examples: 'gorro básico o slouchy',
    gramsRange: [100, 150],
    techniques: ['agujas', 'ganchillo']
  },
  {
    id: 'cuello',
    label: 'Cuello / snood',
    emoji: '⭕',
    examples: 'cuello circular o snood',
    gramsRange: [150, 250],
    techniques: ['agujas', 'ganchillo']
  },
  {
    id: 'bufanda',
    label: 'Bufanda',
    emoji: '🧣',
    examples: 'bufanda estándar (20x150cm aprox.)',
    gramsRange: [200, 350],
    techniques: ['agujas', 'ganchillo']
  },
  {
    id: 'jersey',
    label: 'Jersey',
    emoji: '👕',
    examples: 'jersey adulto (varía mucho según talla)',
    gramsRange: [350, 900],
    techniques: ['agujas', 'ganchillo']
  }
]

export function findGarment(id) {
  return GARMENTS.find((g) => g.id === id)
}

// Clasifica cuánto "sobra" o "falta" para un proyecto dado, según los
// gramos totales de lana disponibles.
export function feasibilityFor(totalGrams, garment) {
  const [min, max] = garment.gramsRange
  if (totalGrams >= max) return { status: 'holgado', label: 'Te sobra de sobra', pct: 100 }
  if (totalGrams >= min) return { status: 'justo', label: 'Te llega, puede ir justo', pct: Math.round((totalGrams / max) * 100) }
  return { status: 'no-llega', label: 'Probablemente no te llegue', pct: Math.round((totalGrams / min) * 100) }
}
