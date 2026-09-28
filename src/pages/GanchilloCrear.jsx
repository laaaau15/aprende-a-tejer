import React, { useMemo, useState } from 'react'
import { PageHeader, TipCard } from '../components/ui'
import { addPattern } from '../store'
import { navigate } from '../router'
import {
  gaugeFromCounts,
  generateHatPattern,
  generateScarfPattern,
  generateCowlPattern,
  buildGaugeWarning
} from '../lib/yarnPatternEngine'
import { YARN_WEIGHTS, estimateGaugeFromCategory, weightCategoryFromMeters } from '../data/yarnWeights'

const PROJECTS = [
  { id: 'gorro', label: 'Gorro', emoji: '🧢' },
  { id: 'bufanda', label: 'Bufanda', emoji: '🧣' },
  { id: 'cuello', label: 'Cuello / snood', emoji: '⭕' }
]

function GaugeModePicker({ mode, setMode }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => setMode('preciso')}
        className={`card text-left ${mode === 'preciso' ? 'ring-2 ring-sage-dark' : ''}`}
      >
        <div className="font-bold">🎯 Muestra real (recomendado)</div>
        <p className="text-sm text-plum/70 mt-1">
          Tejes un cuadrado de 10x10cm con tu hilo y tu ganchillo, cuentas los puntos y las vueltas,
          y el patrón se calcula sobre <strong>tu tensión real</strong>. Es la única forma de que el
          resultado sea 100% fiable a tu forma de tejer.
        </p>
      </button>
      <button
        type="button"
        onClick={() => setMode('estimado')}
        className={`card text-left ${mode === 'estimado' ? 'ring-2 ring-yarn-dark' : ''}`}
      >
        <div className="font-bold">⚡ Estimado por grosor de hilo</div>
        <p className="text-sm text-plum/70 mt-1">
          Más rápido: solo indicas el grosor de tu hilo. Usamos una tensión típica de ese grosor,
          pero <strong>no es tu tensión real</strong> — puede que tengas que ajustar el patrón sobre la marcha.
        </p>
      </button>
    </div>
  )
}

function PreciseGaugeForm({ gauge, setGauge }) {
  const [stitches, setStitches] = useState(gauge?.stitches ?? 14)
  const [rows, setRows] = useState(gauge?.rows ?? 16)
  const [swatchSize, setSwatchSize] = useState(gauge?.swatchSizeCm ?? 10)
  const [hookMm, setHookMm] = useState(gauge?.hookMm ?? 4)

  React.useEffect(() => {
    const g = gaugeFromCounts({ stitches: Number(stitches), rows: Number(rows), swatchSizeCm: Number(swatchSize) })
    setGauge({ ...g, stitches: Number(stitches), rows: Number(rows), swatchSizeCm: Number(swatchSize), hookMm: Number(hookMm) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stitches, rows, swatchSize, hookMm])

  return (
    <div className="card space-y-4">
      <ol className="text-sm text-plum/70 list-decimal list-inside space-y-1">
        <li>Teje un cuadrado en punto bajo (o el punto que vayas a usar) de al menos 12x12cm, con tu hilo y tu ganchillo.</li>
        <li>Déjalo reposar un momento y mídelo sin estirarlo.</li>
        <li>Marca un cuadrado interior de {swatchSize}x{swatchSize}cm (para evitar los bordes) y cuenta los puntos y vueltas dentro.</li>
      </ol>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm font-semibold">
          Puntos en {swatchSize}cm
          <input type="number" min="1" className="field mt-1" value={stitches} onChange={(e) => setStitches(e.target.value)} />
        </label>
        <label className="text-sm font-semibold">
          Vueltas en {swatchSize}cm
          <input type="number" min="1" className="field mt-1" value={rows} onChange={(e) => setRows(e.target.value)} />
        </label>
        <label className="text-sm font-semibold">
          Tamaño de la muestra medida (cm)
          <input type="number" min="5" className="field mt-1" value={swatchSize} onChange={(e) => setSwatchSize(e.target.value)} />
        </label>
        <label className="text-sm font-semibold">
          Ganchillo usado (mm)
          <input type="number" step="0.25" min="1" className="field mt-1" value={hookMm} onChange={(e) => setHookMm(e.target.value)} />
        </label>
      </div>
      {gauge ? (
        <TipCard tone="sage" emoji="✅">
          Tu tensión real: <strong>{gauge.stPer10cm} puntos</strong> y <strong>{gauge.rowsPer10cm} vueltas</strong> cada 10cm.
        </TipCard>
      ) : null}
    </div>
  )
}

function EstimatedGaugeForm({ gauge, setGauge }) {
  const [inputType, setInputType] = useState('categoria')
  const [category, setCategory] = useState(4)
  const [meters, setMeters] = useState(180)

  React.useEffect(() => {
    const cat = inputType === 'categoria' ? category : weightCategoryFromMeters(Number(meters)).category
    const est = estimateGaugeFromCategory(cat)
    setGauge({
      stPer10cm: est.stPer10cm,
      rowsPer10cm: est.rowsPer10cm,
      hookMm: est.hookMm,
      category: cat,
      estimate: est
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputType, category, meters])

  return (
    <div className="card space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setInputType('categoria')} className={inputType === 'categoria' ? 'chip bg-yarn-dark text-white' : 'chip'}>Por categoría</button>
        <button type="button" onClick={() => setInputType('metros')} className={inputType === 'metros' ? 'chip bg-yarn-dark text-white' : 'chip'}>Por metros/100g</button>
      </div>
      {inputType === 'categoria' ? (
        <label className="text-sm font-semibold block">
          Grosor del hilo
          <select className="field mt-1" value={category} onChange={(e) => setCategory(Number(e.target.value))}>
            {YARN_WEIGHTS.map((w) => (
              <option key={w.category} value={w.category}>{w.category} — {w.name}</option>
            ))}
          </select>
        </label>
      ) : (
        <label className="text-sm font-semibold block">
          Metros por cada 100g del ovillo (lo pone en la etiqueta)
          <input type="number" min="1" className="field mt-1" value={meters} onChange={(e) => setMeters(e.target.value)} />
        </label>
      )}
      {gauge ? (
        <TipCard tone="honey" emoji="⚡">
          Tensión típica estimada: <strong>~{gauge.stPer10cm} puntos</strong> y <strong>~{gauge.rowsPer10cm} vueltas</strong> cada 10cm,
          con un ganchillo de ~{gauge.hookMm}mm ({gauge.estimate.weight.name}).
        </TipCard>
      ) : null}
    </div>
  )
}

function ResultHat({ result }) {
  return (
    <div className="space-y-3">
      <TipCard tone="sky" emoji="📐">
        Contorno objetivo: {result.summary.targetCircumferenceCm}cm · {result.summary.targetStitches} puntos en el cuerpo ·
        altura estimada final: {result.summary.estimatedHeightCm}cm en {result.summary.totalRounds} vueltas.
      </TipCard>
      <ol className="space-y-2">
        {result.rounds.map((r, i) => (
          <li key={i} className="text-sm">
            <strong>Vuelta {r.n}:</strong> {r.text}
          </li>
        ))}
      </ol>
    </div>
  )
}

function ResultFlat({ result }) {
  return (
    <div className="space-y-3">
      <TipCard tone="sky" emoji="📐">
        {result.type === 'bufanda'
          ? `Medidas estimadas: ${result.summary.estimatedWidthCm}cm x ${result.summary.estimatedLengthCm}cm.`
          : `Medidas estimadas: contorno ${result.summary.estimatedCircumferenceCm}cm x altura ${result.summary.estimatedHeightCm}cm.`}
      </TipCard>
      <ol className="space-y-2">
        {result.steps.map((s, i) => (
          <li key={i} className="text-sm"><strong>{s.n === 0 ? 'Base:' : `Vueltas ${s.n}:`}</strong> {s.text}</li>
        ))}
      </ol>
    </div>
  )
}

export default function GanchilloCrear() {
  const [mode, setMode] = useState('preciso')
  const [gauge, setGauge] = useState(null)
  const [project, setProject] = useState('gorro')

  const [headCircumference, setHeadCircumference] = useState(56)
  const [hatHeight, setHatHeight] = useState(20)
  const [scarfWidth, setScarfWidth] = useState(20)
  const [scarfLength, setScarfLength] = useState(150)
  const [cowlCircumference, setCowlCircumference] = useState(60)
  const [cowlHeight, setCowlHeight] = useState(24)
  const [saved, setSaved] = useState(false)

  const result = useMemo(() => {
    if (!gauge) return null
    if (project === 'gorro') {
      return generateHatPattern({ gauge, headCircumferenceCm: Number(headCircumference), heightCm: Number(hatHeight) })
    }
    if (project === 'bufanda') {
      return generateScarfPattern({ gauge, widthCm: Number(scarfWidth), lengthCm: Number(scarfLength) })
    }
    return generateCowlPattern({ gauge, circumferenceCm: Number(cowlCircumference), heightCm: Number(cowlHeight) })
  }, [gauge, project, headCircumference, hatHeight, scarfWidth, scarfLength, cowlCircumference, cowlHeight])

  const warning = buildGaugeWarning(mode)

  function handleSave() {
    if (!result) return
    addPattern({
      id: `${project}-${Date.now()}`,
      project,
      mode,
      gauge,
      result,
      createdAt: Date.now()
    })
    setSaved(true)
    setTimeout(() => navigate('/favoritos'), 600)
  }

  return (
    <div>
      <PageHeader
        title="Patrón de ganchillo para mi hilo"
        emoji="🪡"
        backTo="/ganchillo"
        subtitle="Elige cómo calcular tu tensión: con una muestra real (100% fiable) o con una estimación rápida por grosor de hilo."
      />

      <div className="space-y-6">
        <GaugeModePicker mode={mode} setMode={setMode} />

        {mode === 'preciso' ? (
          <PreciseGaugeForm gauge={gauge} setGauge={setGauge} />
        ) : (
          <EstimatedGaugeForm gauge={gauge} setGauge={setGauge} />
        )}

        <div className="card space-y-4">
          <div className="flex gap-2 flex-wrap">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProject(p.id)}
                className={project === p.id ? 'chip bg-yarn-dark text-white' : 'chip'}
              >
                {p.emoji} {p.label}
              </button>
            ))}
          </div>

          {project === 'gorro' ? (
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm font-semibold">
                Contorno de cabeza (cm)
                <input type="number" className="field mt-1" value={headCircumference} onChange={(e) => setHeadCircumference(e.target.value)} />
              </label>
              <label className="text-sm font-semibold">
                Altura deseada del gorro (cm)
                <input type="number" className="field mt-1" value={hatHeight} onChange={(e) => setHatHeight(e.target.value)} />
              </label>
            </div>
          ) : null}

          {project === 'bufanda' ? (
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm font-semibold">
                Ancho (cm)
                <input type="number" className="field mt-1" value={scarfWidth} onChange={(e) => setScarfWidth(e.target.value)} />
              </label>
              <label className="text-sm font-semibold">
                Largo (cm)
                <input type="number" className="field mt-1" value={scarfLength} onChange={(e) => setScarfLength(e.target.value)} />
              </label>
            </div>
          ) : null}

          {project === 'cuello' ? (
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm font-semibold">
                Contorno (cm)
                <input type="number" className="field mt-1" value={cowlCircumference} onChange={(e) => setCowlCircumference(e.target.value)} />
              </label>
              <label className="text-sm font-semibold">
                Altura (cm)
                <input type="number" className="field mt-1" value={cowlHeight} onChange={(e) => setCowlHeight(e.target.value)} />
              </label>
            </div>
          ) : null}
        </div>

        {warning ? <TipCard tone="honey" emoji="⚠️">{warning}</TipCard> : null}

        {result ? (
          <div className="card">
            <h2 className="font-display text-xl font-semibold mb-3">Tu patrón</h2>
            {project === 'gorro' ? <ResultHat result={result} /> : <ResultFlat result={result} />}
            <button type="button" className="btn-primary mt-4" onClick={handleSave}>
              {saved ? '✅ Guardado' : '💾 Guardar este patrón'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
