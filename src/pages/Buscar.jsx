import React, { useState } from 'react'
import { PageHeader } from '../components/ui'
import { Link, useQuery } from '../router'
import { STITCHES } from '../data/stitches'
import { LEVELS } from '../data/lessons'

export default function Buscar() {
  const query = useQuery()
  const [q, setQ] = useState(query.q ?? '')
  const needle = q.trim().toLowerCase()

  const stitchResults = needle ? STITCHES.filter((s) => s.name.toLowerCase().includes(needle) || s.aliases?.some((a) => a.toLowerCase().includes(needle))) : []
  const lessonResults = needle
    ? LEVELS.flatMap((l) => l.lessons).filter((l) => l.title.toLowerCase().includes(needle))
    : []

  return (
    <div>
      <PageHeader title="Buscar" emoji="🔎" />
      <input className="field mb-6" placeholder="Busca un punto o una técnica…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />

      {needle && stitchResults.length === 0 && lessonResults.length === 0 ? (
        <p className="text-plum/60">No hemos encontrado nada para "{q}".</p>
      ) : null}

      {stitchResults.length > 0 ? (
        <section className="mb-6">
          <h2 className="font-bold mb-2">Puntos</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {stitchResults.map((s) => (
              <Link key={s.id} to={`/puntos/${s.id}`} className="card">{s.name}</Link>
            ))}
          </div>
        </section>
      ) : null}

      {lessonResults.length > 0 ? (
        <section>
          <h2 className="font-bold mb-2">Lecciones</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {lessonResults.map((l) => (
              <Link key={l.id} to={l.to} className="card">{l.emoji} {l.title}</Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
