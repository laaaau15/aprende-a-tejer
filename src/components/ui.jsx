import React, { useState } from 'react'
import { useStore, toggleFavorite, toggleLearned } from '../store'
import { Link } from '../router'

export function DifficultyStars({ n = 1 }) {
  return <span aria-label={`Dificultad ${n} de 4`}>{'★'.repeat(n)}{'☆'.repeat(4 - n)}</span>
}

export function PageHeader({ title, subtitle, emoji, backTo }) {
  return (
    <header className="mb-6">
      {backTo ? (
        <Link to={backTo} className="text-sm text-plum/60 hover:text-yarn-dark">← Volver</Link>
      ) : null}
      <div className="flex items-center gap-3 mt-1">
        {emoji ? (
          <span className="w-11 h-11 shrink-0 rounded-2xl bg-white shadow-sm border border-oat flex items-center justify-center text-2xl">
            {emoji}
          </span>
        ) : null}
        <h1 className="text-3xl font-display font-semibold">{title}</h1>
      </div>
      {subtitle ? <p className="text-plum/70 mt-2">{subtitle}</p> : null}
    </header>
  )
}

export function FavoriteButton({ kind, id, label = 'Guardar' }) {
  const state = useStore()
  const active = state.favorites[kind]?.includes(id)
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(kind, id)}
      className={active ? 'btn-primary' : 'btn-soft'}
      aria-pressed={active}
    >
      {active ? '❤️' : '🤍'} {label}
    </button>
  )
}

export function LearnedToggle({ learnKey, label = 'Ya lo he aprendido' }) {
  const state = useStore()
  const done = !!state.learned[learnKey]
  return (
    <button
      type="button"
      onClick={() => toggleLearned(learnKey)}
      className={done ? 'btn-sage' : 'btn-soft'}
      aria-pressed={done}
    >
      {done ? '✅' : '⬜️'} {label}
    </button>
  )
}

export function ProgressBar({ value, label, tone = 'yarn' }) {
  const barColor = tone === 'sage' ? 'bg-sage-dark' : tone === 'honey' ? 'bg-honey-dark' : 'bg-yarn-dark'
  return (
    <div>
      {label ? <div className="flex justify-between text-xs font-semibold text-plum/70 mb-1"><span>{label}</span><span>{Math.round(value)}%</span></div> : null}
      <div className="h-2 rounded-full bg-oat overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  )
}

export function Collapsible({ title, emoji, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="card-soft">
      <button type="button" className="w-full flex items-center justify-between font-bold text-left" onClick={() => setOpen((o) => !o)}>
        <span>{emoji ? `${emoji} ` : ''}{title}</span>
        <span className="text-plum/50">{open ? '−' : '+'}</span>
      </button>
      {open ? <div className="mt-3">{children}</div> : null}
    </div>
  )
}

const TIP_TONES = {
  honey: 'bg-honey/20 border-honey text-honey-dark',
  sage: 'bg-sage/20 border-sage text-sage-dark',
  yarn: 'bg-yarn/15 border-yarn text-yarn-dark',
  sky: 'bg-sky/20 border-sky text-sky-dark'
}

export function TipCard({ tone = 'honey', emoji = '💡', children }) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${TIP_TONES[tone] ?? TIP_TONES.honey}`}>
      {emoji} {children}
    </div>
  )
}

export function NavCard({ to, emoji, title, text }) {
  return (
    <Link to={to} className="card flex items-start gap-3 hover:shadow-md hover:-translate-y-0.5 transition-transform">
      <span className="text-2xl">{emoji}</span>
      <span>
        <span className="block font-bold">{title}</span>
        <span className="block text-sm text-plum/70">{text}</span>
      </span>
    </Link>
  )
}
