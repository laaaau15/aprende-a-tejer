import React from 'react'
import { Link } from '../router'
import { PageHeader, ProgressBar, LearnedToggle } from '../components/ui'
import { useStore } from '../store'
import { LEVELS, findLesson } from '../data/lessons'

export function AprenderHub() {
  const state = useStore()
  return (
    <div>
      <PageHeader title="Aprender" emoji="🎓" subtitle="Un recorrido guiado, nivel a nivel." />
      <div className="space-y-4">
        {LEVELS.map((level) => {
          const done = level.lessons.filter((l) => state.learned[l.id]).length
          return (
            <div key={level.id} className="card">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">{level.emoji} {level.name}</h2>
                <span className="text-sm text-plum/60">{done}/{level.lessons.length}</span>
              </div>
              <p className="text-sm text-plum/70 mt-1">{level.blurb}</p>
              <ProgressBar value={(done / level.lessons.length) * 100} />
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {level.lessons.map((l) => (
                  <li key={l.id}>
                    <Link to={l.to} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${state.learned[l.id] ? 'bg-sage/15' : 'hover:bg-oat/60'}`}>
                      <span>{l.emoji}</span>
                      <span className="flex-1">{l.title}</span>
                      {state.learned[l.id] ? '✅' : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Ficha genérica para lecciones de técnica (montar puntos, aumentos, etc.)
// que no tienen su propia página de punto.
export function LessonDetail({ params }) {
  const lesson = findLesson(params.id)
  if (!lesson) return <div className="p-8 text-center">No encontramos esa lección.</div>
  return (
    <div>
      <PageHeader title={lesson.title} emoji={lesson.emoji} backTo="/aprender" subtitle={`Nivel: ${lesson.level.name}`} />
      <LearnedToggle learnKey={lesson.id} />
      <div className="card mt-6">
        <p className="text-plum/70">
          Contenido detallado de esta técnica próximamente. Mientras tanto, márcala como aprendida
          cuando la domines para seguir tu progreso.
        </p>
      </div>
    </div>
  )
}
