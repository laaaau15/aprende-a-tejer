import React, { useState } from 'react'
import { Link, navigate } from '../router'
import { NavCard, ProgressBar } from '../components/ui'
import { useStore } from '../store'
import { QUICK_START, findLesson } from '../data/lessons'

export default function Home() {
  const state = useStore()
  const [q, setQ] = useState('')

  const doneCount = QUICK_START.filter((id) => state.learned[id]).length
  const progressPct = (doneCount / QUICK_START.length) * 100

  return (
    <div className="space-y-10">
      <section className="text-center py-8">
        <h1 className="text-4xl font-display font-semibold">Aprende a tejer desde cero 🧶</h1>
        <p className="mt-3 text-plum/70 max-w-xl mx-auto">
          Tu guía visual para aprender punto a dos agujas, agujas circulares y ganchillo, paso a paso y sin liarte.
        </p>

        <form
          className="mt-6 max-w-md mx-auto flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            navigate(`/buscar?q=${encodeURIComponent(q)}`)
          }}
        >
          <input
            className="field"
            placeholder="Busca un punto, una técnica…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn-primary" type="submit">🔎 Buscar</button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link to="/aprender" className="btn-soft">🌱 Soy principiante</Link>
          <Link to="/puntos" className="btn-soft">🧶 Explorar puntos</Link>
          <Link to="/aprender/tecnica/trabajar-circular" className="btn-soft">⭕ Aprender agujas circulares</Link>
          <Link to="/favoritos" className="btn-soft">🧺 Ver proyectos</Link>
          <Link to="/patron" className="btn-soft">📄 Tengo un patrón</Link>
          <Link to="/rescate" className="btn-soft">He liado algo 😭</Link>
        </div>

        <Link to="/ganchillo/crear" className="btn-primary inline-flex mt-4">
          🪡 Ganchillo: puntos avanzados y patrón para mi hilo
        </Link>
      </section>

      <section className="card">
        <h2 className="text-xl font-display font-semibold mb-3">¿Por dónde empiezo?</h2>
        <ProgressBar value={progressPct} label="Progreso de la ruta rápida" />
        <ol className="mt-4 space-y-2">
          {QUICK_START.map((id, i) => {
            const lesson = findLesson(id)
            const done = !!state.learned[id]
            if (!lesson) return null
            return (
              <li key={id}>
                <Link
                  to={lesson.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 ${done ? 'bg-sage/15' : 'hover:bg-oat/60'}`}
                >
                  <span className="w-6 text-center font-bold text-plum/50">{i + 1}</span>
                  <span className="text-xl">{lesson.emoji}</span>
                  <span className="flex-1">{lesson.title}</span>
                  {done ? <span>✅</span> : null}
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-display font-semibold mb-3">Tu profesora de punto virtual</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <NavCard to="/patron" emoji="📄" title="Explícame este patrón" text="Traduce las abreviaturas de un patrón a instrucciones claras." />
          <NavCard to="/rescate" emoji="🆘" title="Rescatar un punto" text="Se te ha caído un punto o se ha escapado: te ayudo a arreglarlo." />
          <NavCard to="/analizar" emoji="📷" title="¿Qué estoy haciendo mal?" text="Sube una foto de tu labor y te digo qué está pasando." />
          <NavCard to="/que-tejer" emoji="🎁" title="No sé qué tejer" text="Te propongo proyectos según tu nivel y el tiempo que tengas." />
          <NavCard to="/aprender/calculadora" emoji="🧮" title="Calculadora de puntos" text="Calcula cuántos puntos montar según tu muestra." />
          <NavCard to="/diccionario" emoji="📚" title="Diccionario de punto" text="Abreviaturas, símbolos y equivalencias US/UK." />
          <NavCard to="/ganchillo/crear" emoji="🪡" title="Patrón de ganchillo para mi hilo" text="Tu hilo + cuello, bufanda o gorro = patrón paso a paso." />
        </div>
      </section>
    </div>
  )
}
