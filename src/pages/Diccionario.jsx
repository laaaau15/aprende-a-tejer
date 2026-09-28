import React, { useState } from 'react'
import { PageHeader, TipCard } from '../components/ui'
import { CROCHET_US_UK } from '../data/stitches'

export default function Diccionario() {
  const [q, setQ] = useState('')
  const filtered = CROCHET_US_UK.filter((row) =>
    [row.es, row.us, row.uk].some((v) => v.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div>
      <PageHeader title="Diccionario de ganchillo" emoji="📚" subtitle="Español, US y UK: mismo hilo, nombres distintos." />
      <TipCard tone="honey" emoji="⚠️">
        El punto que en EE.UU. se llama <strong>"double crochet" (dc)</strong> no es el mismo que en Reino Unido:
        allí "double crochet" es nuestro punto bajo. Antes de seguir un patrón en inglés, comprueba siempre si usa
        términos US o UK.
      </TipCard>
      <input className="field mt-4 mb-4" placeholder="Buscar punto…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-oat">
              <th className="py-2 pr-3">Español</th>
              <th className="py-2 pr-3">US</th>
              <th className="py-2 pr-3">UK</th>
              <th className="py-2">Nota</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.es} className="border-b border-oat/60">
                <td className="py-2 pr-3 font-semibold">{row.es} <span className="text-plum/50">({row.esAbbr})</span></td>
                <td className="py-2 pr-3">{row.us} <span className="text-plum/50">({row.usAbbr})</span></td>
                <td className="py-2 pr-3">{row.uk} <span className="text-plum/50">({row.ukAbbr})</span></td>
                <td className="py-2 text-plum/70">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
