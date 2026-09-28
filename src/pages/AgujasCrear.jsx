import React, { useMemo, useState } from 'react'
import { PageHeader, TipCard } from '../components/ui'
import { StitchSwatch } from '../components/StitchSwatch'
import { GarmentIllustration } from '../components/GarmentIllustration'
import { addPattern } from '../store'
import { navigate, useQuery } from '../router'
import { gaugeFromCounts } from '../lib/yarnPatternEngine'
import { generateHatPatternKnit, generateScarfPatternKnit, generateCowlPatternKnit } from '../lib/knitPatternEngine'

const PROJECTS = [
  { id: 'gorro', label: 'Gorro', emoji: '🧢' },
  { id: 'bufanda', label: 'Bufanda', emoji: '🧣' },
  { id: 'cuello', label: 'Cuello / snood', emoji: '⭕' }
]

function PreciseGaugeForm({ gauge, setGauge }) {
  const [stitches, setStitches] = useState(gauge?.stitches ?? 18)
  const [rows, setRows] = useState(gauge?.rows ?? 24)
  const [swatchSize, setSwatchSize] = useState(gauge?.swatchSizeCm ?? 10)
  const [needleMm, setNeedleMm] = useState(gauge?.needleMm ?? 4.5)

  React.useEffect(() => {
    const g = gaugeFromCounts({ stitches: Number(stitches), rows: Number(rows), swatchSizeCm: Number(swatchSize) })
    setGauge({ ...g, stitches: Number(stitches), rows: Number(rows), swatchSizeCm: Number(swatchSize), needleMm: Number(needleMm) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stitches, rows, swatchSize, needleMm])

  return (
    <div className="card space-y-4">
      <div className="flex gap-4 items-center">
        <StitchSwatch kind="knit" tone="sage" className="h-20 w-20 rounded-lg shrink-0" />
        <ol className="text-sm text-plum/70 list-decimal list-inside space-y-1">
          <li>Teje una muestra en punto jersey de al menos 12x12cm, con tu hilo y tus agujas.</li>
          <li>Bloquéala (o déjala reposar) y mídela sin estirarla.</li>
          <li>Marca un cuadrado interior de {swatchSize}x{swatchSize}cm y cuenta puntos y vueltas dentro.</li>
        </ol>
      </div>
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
          Agujas usadas (mm)
          <input type="number" step="0.25" min="1" className="field mt-1" value={needleMm} onChange={(e) => setNeedleMm(e.target.value)} />
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

function ResultSections({ result }) {
  return (
    <div className="space-y-4">
      <TipCard tone="sky" emoji="📐">
        {result.type === 'gorro'
          ? `Monta ${result.summary.castOn} puntos · contorno ${result.summary.targetCircumferenceCm}cm · altura total ${result.summary.totalHeightCm}cm.`
          : result.type === 'bufanda'
          ? `Monta ${result.summary.castOn} puntos · medidas estimadas ${result.summary.estimatedWidthCm}cm x ${result.summary.estimatedLengthCm}cm.`
          : `Monta ${result.summary.castOn} puntos · contorno ${result.summary.estimatedCircumferenceCm}cm x altura ${result.summary.estimatedHeightCm}cm.`}
      </TipCard>
      {result.sections.map((sec, i) => (
        <div key={i}>
          <h3 className="font-bold mb-1">{sec.title}</h3>
          {sec.text ? <p className="text-sm text-plum/80">{sec.text}</p> : null}
          {sec.steps ? (
            <ol className="mt-2 space-y-1">
              {sec.steps.map((s, j) => (
                <li key={j} className="text-sm">— {s.text}</li>
              ))}
            </ol>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default function AgujasCrear() {
  const query = useQuery()
  const [gauge, setGauge] = useState(null)
  const [project, setProject] = useState(PROJECTS.some((p) => p.id === query.project) ? query.project : 'gorro')

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
      return generateHatPatternKnit({ gauge, headCircumferenceCm: Number(headCircumference), heightCm: Number(hatHeight) })
    }
    if (project === 'bufanda') {
      return generateScarfPatternKnit({ gauge, widthCm: Number(scarfWidth), lengthCm: Number(scarfLength) })
    }
    return generateCowlPatternKnit({ gauge, circumferenceCm: Number(cowlCircumference), heightCm: Number(cowlHeight) })
  }, [gauge, project, headCircumference, hatHeight, scarfWidth, scarfLength, cowlCircumference, cowlHeight])

  function handleSave() {
    if (!result) return
    addPattern({ id: `${project}-agujas-${Date.now()}`, project, technique: 'agujas', mode: 'preciso', gauge, result, createdAt: Date.now() })
    setSaved(true)
    setTimeout(() => navigate('/favoritos'), 600)
  }

  return (
    <div>
      <PageHeader
        title="Patrón a dos agujas para mi hilo"
        emoji="🧶"
        backTo="/aprender"
        subtitle="Igual que en ganchillo: para que el patrón sea 100% fiable, se calcula siempre a partir de una muestra real de tensión."
      />

      <div className="space-y-6">
        <PreciseGaugeForm gauge={gauge} setGauge={setGauge} />

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

        {result ? (
          <div className="card">
            <h2 className="font-display text-xl font-semibold mb-3">Tu patrón</h2>
            <GarmentIllustration garment={project} kind="knit" tone="sage" className="w-full h-40 mb-4" />
            <ResultSections result={result} />
            <button type="button" className="btn-primary mt-4" onClick={handleSave}>
              {saved ? '✅ Guardado' : '💾 Guardar este patrón'}
            </button>
          </div>
        ) : (
          <TipCard tone="honey" emoji="🧵">
            Rellena tu muestra real arriba (puntos y vueltas en 10cm) para generar el patrón.
          </TipCard>
        )}
      </div>
    </div>
  )
}
