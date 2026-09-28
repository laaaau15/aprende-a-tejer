import React, { useMemo, useState } from 'react'
import { PageHeader, TipCard } from '../components/ui'
import { Link, navigate } from '../router'
import { analyzeYarn } from '../lib/yarnAdvisor'
import { addYarn } from '../store'

const STATUS_STYLE = {
  holgado: 'bg-sage/20 text-sage-dark border-sage',
  justo: 'bg-honey/20 text-honey-dark border-honey',
  'no-llega': 'bg-yarn/15 text-yarn-dark border-yarn'
}

export default function MiLana() {
  const [totalGrams, setTotalGrams] = useState(200)
  const [metersPer100g, setMetersPer100g] = useState(180)
  const [skeinGrams, setSkeinGrams] = useState(100)
  const [technique, setTechnique] = useState('todas')
  const [yarnName, setYarnName] = useState('')
  const [saved, setSaved] = useState(false)

  const result = useMemo(
    () => analyzeYarn({ totalGrams: Number(totalGrams), metersPer100g: Number(metersPer100g), techniqueFilter: technique, skeinGrams: Number(skeinGrams) }),
    [totalGrams, metersPer100g, technique, skeinGrams]
  )

  function handleSaveYarn() {
    addYarn({ id: `yarn-${Date.now()}`, name: yarnName || `Hilo ${result.category.name}`, totalGrams: Number(totalGrams), metersPer100g: Number(metersPer100g) })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div>
      <PageHeader
        title="¿Qué puedo hacer con mi lana?"
        emoji="🧶"
        subtitle="Dinos cuánta lana tienes y qué pone en la etiqueta: te decimos qué te da para tejer, con qué aguja o ganchillo, y cuántos ovillos necesitas."
      />

      <div className="card space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="text-sm font-semibold">
            Nombre del hilo (opcional)
            <input className="field mt-1" value={yarnName} onChange={(e) => setYarnName(e.target.value)} placeholder="Ej. Katia Merino" />
          </label>
          <label className="text-sm font-semibold">
            Gramos totales que tienes
            <input type="number" className="field mt-1" value={totalGrams} onChange={(e) => setTotalGrams(e.target.value)} />
          </label>
          <label className="text-sm font-semibold">
            Metros por cada 100g (etiqueta del ovillo)
            <input type="number" className="field mt-1" value={metersPer100g} onChange={(e) => setMetersPer100g(e.target.value)} />
          </label>
          <label className="text-sm font-semibold">
            Gramos de cada ovillo
            <input type="number" className="field mt-1" value={skeinGrams} onChange={(e) => setSkeinGrams(e.target.value)} />
          </label>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            ['todas', 'Cualquier técnica'],
            ['agujas', '🧶 Agujas'],
            ['ganchillo', '🪡 Ganchillo']
          ].map(([id, label]) => (
            <button key={id} type="button" onClick={() => setTechnique(id)} className={technique === id ? 'chip bg-yarn-dark text-white' : 'chip'}>
              {label}
            </button>
          ))}
        </div>
        <button className="btn-soft" onClick={handleSaveYarn}>{saved ? '✅ Guardado' : '💾 Guardar este hilo'}</button>
      </div>

      <TipCard tone="sky" emoji="📏">
        Tienes en total <strong>~{result.totalMeters}m</strong>, de la categoría <strong>{result.category.name}</strong>.
        Aguja recomendada: <strong>{result.needleMm[0]}–{result.needleMm[1]}mm</strong> ·
        Ganchillo recomendado: <strong>{result.hookMm[0]}–{result.hookMm[1]}mm</strong>.
      </TipCard>

      <h2 className="font-display text-xl font-semibold mt-8 mb-3">Con esta lana puedes hacer…</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {result.garments.map((g) => (
          <div key={g.id} className={`card border-2 ${STATUS_STYLE[g.feasibility.status]}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold">{g.emoji} {g.label}</span>
              <span className="text-xs font-semibold">{g.feasibility.label}</span>
            </div>
            <p className="text-xs text-plum/60 mt-1">{g.examples}</p>
            <p className="text-sm mt-2">
              Necesita aprox. <strong>{g.gramsNeeded}g</strong>
              {g.skeinsNeeded ? <> → <strong>{g.skeinsNeeded} ovillo{g.skeinsNeeded > 1 ? 's' : ''}</strong> de {skeinGrams}g</> : null}
            </p>
            {g.feasibility.status !== 'no-llega' && technique !== 'todas' ? (
              <button
                className="btn-primary mt-3 text-xs"
                onClick={() => navigate(technique === 'ganchillo' && ['gorro', 'bufanda', 'cuello'].includes(g.id) ? '/ganchillo/crear' : '/aprender')}
              >
                Ir al patrón →
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <TipCard tone="honey" emoji="🧵" >
        Para que el patrón final sea 100% fiable a tu tensión, el siguiente paso siempre es tejer una muestra de
        10x10cm con la aguja/ganchillo recomendado y pasar los puntos y vueltas reales al{' '}
        <Link className="underline" to="/ganchillo/crear">generador de patrón</Link>.
      </TipCard>
    </div>
  )
}
