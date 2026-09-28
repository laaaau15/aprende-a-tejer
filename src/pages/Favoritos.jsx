import React, { useRef } from 'react'
import { PageHeader, TipCard } from '../components/ui'
import { Link } from '../router'
import { useStore, removePattern, removeYarn, exportStateAsJSON, importStateFromJSON } from '../store'
import { findStitch } from '../data/stitches'

export default function Favoritos() {
  const state = useStore()
  const fileRef = useRef(null)

  function handleExport() {
    const blob = new Blob([exportStateAsJSON()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'aprende-a-tejer-datos.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importStateFromJSON(reader.result)
      } catch {
        alert('El archivo no parece un backup válido.')
      }
    }
    reader.readAsText(file)
  }

  const favStitches = state.favorites.stitch.map(findStitch).filter(Boolean)

  return (
    <div className="space-y-8">
      <PageHeader title="Guardados" emoji="❤️" subtitle="Tus puntos favoritos y los patrones que has generado." />

      <section>
        <h2 className="font-display text-xl font-semibold mb-3">🪡 Patrones de ganchillo generados</h2>
        {state.patterns.length === 0 ? (
          <TipCard tone="sky" emoji="🧶">Todavía no has guardado ningún patrón. <Link className="underline" to="/ganchillo/crear">Crea uno aquí</Link>.</TipCard>
        ) : (
          <ul className="space-y-2">
            {state.patterns.map((p) => (
              <li key={p.id} className="card flex items-center justify-between">
                <span>
                  <strong className="capitalize">{p.project}</strong>{' '}
                  <span className="text-plum/60 text-sm">
                    ({p.mode === 'preciso' ? 'muestra real' : 'estimado'}, {new Date(p.createdAt).toLocaleDateString()})
                  </span>
                </span>
                <button className="btn-ghost text-sm" onClick={() => removePattern(p.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold mb-3">🧶 Puntos favoritos</h2>
        {favStitches.length === 0 ? (
          <TipCard tone="sky" emoji="🧶">Marca puntos como favoritos desde su ficha para verlos aquí.</TipCard>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {favStitches.map((s) => (
              <Link key={s.id} to={`/puntos/${s.id}`} className="card">
                <span className="font-bold">{s.name}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold mb-3">🧺 Mi lana</h2>
        {state.yarns.length === 0 ? (
          <p className="text-sm text-plum/60">Aún no has guardado hilos.</p>
        ) : (
          <ul className="space-y-2">
            {state.yarns.map((y) => (
              <li key={y.id} className="card flex items-center justify-between">
                <span>{y.name}</span>
                <button className="btn-ghost text-sm" onClick={() => removeYarn(y.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2 className="font-display text-xl font-semibold mb-2">💾 Copia de seguridad</h2>
        <p className="text-sm text-plum/70 mb-3">
          Todo se guarda en este dispositivo. Exporta un archivo para no perder tu progreso si cambias de móvil
          o borras el navegador.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button className="btn-primary" onClick={handleExport}>⬇️ Exportar mis datos</button>
          <button className="btn-soft" onClick={() => fileRef.current?.click()}>⬆️ Importar</button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
        </div>
      </section>
    </div>
  )
}
