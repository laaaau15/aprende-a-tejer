import React, { useState } from 'react'
import { PageHeader, TipCard } from '../components/ui'
import { Link } from '../router'
import { TROUBLESHOOTING } from '../data/troubleshooting'

export default function Rescate() {
  const [open, setOpen] = useState(null)
  return (
    <div>
      <PageHeader title="Estoy atascada 😭" emoji="🆘" subtitle="Elige lo que te está pasando y te ayudamos a resolverlo." />
      <div className="grid sm:grid-cols-2 gap-3">
        {TROUBLESHOOTING.map((t) => (
          <button key={t.id} onClick={() => setOpen(t.id === open ? null : t.id)} className="card text-left">
            <span className="font-bold">{t.emoji} {t.title}</span>
            {open === t.id ? (
              <div className="mt-2 text-sm text-plum/70 space-y-2">
                <p><strong>Por qué pasa:</strong> {t.cause}</p>
                <p><strong>Cómo arreglarlo:</strong> {t.fix}</p>
                {t.tool === 'contador' ? (
                  <TipCard tone="sky" emoji="🔢">
                    <Link className="underline" to="/contador">Usa el contador de puntos</Link> para no volver a perderte.
                  </TipCard>
                ) : null}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  )
}
