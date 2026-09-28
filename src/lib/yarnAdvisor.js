import { weightCategoryFromMeters, YARN_WEIGHTS } from '../data/yarnWeights'
import { GARMENTS, feasibilityFor } from '../data/garmentYardage'

function mid(range) {
  return +((range[0] + range[1]) / 2).toFixed(2)
}

// A partir de lo que hay en la etiqueta del ovillo (gramos totales que
// tienes y metros por cada 100g), calcula:
//  - la categoría de grosor del hilo y la aguja/ganchillo recomendados
//  - qué prendas te da razonablemente para hacer
//  - cuántos ovillos necesitarías para la prenda elegida
export function analyzeYarn({ totalGrams, metersPer100g, techniqueFilter = 'todas', skeinGrams }) {
  const category = weightCategoryFromMeters(metersPer100g)
  const totalMeters = (totalGrams / 100) * metersPer100g

  const garments = GARMENTS.filter((g) => techniqueFilter === 'todas' || g.techniques.includes(techniqueFilter)).map(
    (g) => ({ ...g, feasibility: feasibilityFor(totalGrams, g) })
  )

  const withOvillos = garments.map((g) => {
    const gramsNeeded = mid(g.gramsRange)
    const skeins = skeinGrams ? Math.ceil(gramsNeeded / skeinGrams) : null
    return { ...g, gramsNeeded, skeinsNeeded: skeins }
  })

  return {
    category,
    totalMeters: +totalMeters.toFixed(0),
    needleMm: category.needleMm,
    hookMm: category.hookMm,
    garments: withOvillos
  }
}

export function ovillosFor(gramsNeeded, skeinGrams) {
  if (!skeinGrams) return null
  return Math.ceil(gramsNeeded / skeinGrams)
}
