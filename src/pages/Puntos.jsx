import React, { useState } from 'react'
import { Link } from '../router'
import { PageHeader, DifficultyStars, FavoriteButton, LearnedToggle, Collapsible, TipCard } from '../components/ui'
import { STITCHES, findStitch } from '../data/stitches'

const CATEGORY_LABEL = { basico: 'Básico', intermedio: 'Intermedio', avanzado: 'Avanzado' }

export function PuntosList() {
  const [filter, setFilter] = useState('todos')
  const list = filter === 'todos' ? STITCHES : STITCHES.filter((s) => s.category === filter)

  return (
    <div>
      <PageHeader title="Catálogo de puntos" emoji="🧶" subtitle="Todos los puntos de dos agujas, de básico a avanzado." />
      <div className="flex gap-2 mb-6 flex-wrap">
        {['todos', 'basico', 'intermedio', 'avanzado'].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={filter === c ? 'chip bg-yarn-dark text-white' : 'chip'}
          >
            {c === 'todos' ? 'Todos' : CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((s) => (
          <Link key={s.id} to={`/puntos/${s.id}`} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-bold">{s.name}</span>
              <DifficultyStars n={s.difficulty} />
            </div>
            <p className="text-sm text-plum/70 mt-1">{s.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function PuntoDetail({ params }) {
  const stitch = findStitch(params.id)
  if (!stitch) return <div className="p-8 text-center">No encontramos ese punto.</div>

  return (
    <div>
      <PageHeader title={stitch.name} emoji="🧶" backTo="/puntos" subtitle={stitch.summary} />
      <div className="flex gap-2 mb-6">
        <FavoriteButton kind="stitch" id={stitch.id} />
        <LearnedToggle learnKey={stitch.id} />
      </div>

      {stitch.prerequisites?.length ? (
        <TipCard tone="sky" emoji="📌">
          Conviene saber antes: {stitch.prerequisites.map((p, i) => (
            <span key={p}>
              {i > 0 ? ', ' : ' '}
              <Link className="underline" to={`/puntos/${p}`}>{findStitch(p)?.name ?? p}</Link>
            </span>
          ))}
        </TipCard>
      ) : null}

      {stitch.detail === 'full' ? (
        <div className="mt-6 space-y-4">
          {stitch.lookLike ? (
            <Collapsible title="¿Cómo se ve?" emoji="👀" defaultOpen>
              <p>{stitch.lookLike}</p>
            </Collapsible>
          ) : null}
          {stitch.steps?.length ? (
            <Collapsible title="Paso a paso" emoji="🪜" defaultOpen>
              <ol className="space-y-3">
                {stitch.steps.map((step, i) => (
                  <li key={i}>
                    <span className="font-bold">{i + 1}. {step.title}</span>
                    <p className="text-sm text-plum/70">{step.text}</p>
                  </li>
                ))}
              </ol>
            </Collapsible>
          ) : null}
          {stitch.flat ? (
            <Collapsible title={stitch.flat.title} emoji="↔️">
              <ul className="list-disc list-inside space-y-1 text-sm">
                {stitch.flat.rows.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </Collapsible>
          ) : null}
          {stitch.circular ? (
            <Collapsible title={stitch.circular.title} emoji="⭕">
              <ul className="list-disc list-inside space-y-1 text-sm">
                {stitch.circular.rows.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </Collapsible>
          ) : null}
          {stitch.commonMistakes?.length ? (
            <Collapsible title="Errores comunes" emoji="⚠️">
              <ul className="space-y-2 text-sm">
                {stitch.commonMistakes.map((m, i) => (
                  <li key={i}><strong>{m.title}:</strong> {m.cause} → {m.fix}</li>
                ))}
              </ul>
            </Collapsible>
          ) : null}
        </div>
      ) : (
        <TipCard tone="honey" emoji="🚧">
          Esta ficha está en versión básica por ahora. ¿Quieres que la ampliemos con el paso a paso completo?
        </TipCard>
      )}
    </div>
  )
}
