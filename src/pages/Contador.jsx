import React, { useState } from 'react'
import { PageHeader, TipCard } from '../components/ui'
import { useWakeLock, vibrate } from '../hooks/useWakeLock'

export default function Contador() {
  const [rounds, setRounds] = useState(0)
  const [stitches, setStitches] = useState(0)
  const wakeLock = useWakeLock()

  function bump(setter, delta) {
    vibrate(delta > 0 ? 15 : [10, 30, 10])
    setter((v) => Math.max(0, v + delta))
  }

  return (
    <div>
      <PageHeader title="Contador de vueltas y puntos" emoji="🔢" subtitle="Para no perder la cuenta mientras tejes." />

      {wakeLock.supported ? (
        <TipCard tone="sage" emoji={wakeLock.active ? '📵' : '🔆'}>
          {wakeLock.active
            ? 'La pantalla se mantendrá encendida mientras tejes.'
            : 'Activa esto para que la pantalla no se apague mientras cuentas.'}
          <button
            type="button"
            className="btn-soft ml-3"
            onClick={() => (wakeLock.active ? wakeLock.release() : wakeLock.request())}
          >
            {wakeLock.active ? 'Desactivar' : 'Mantener pantalla encendida'}
          </button>
        </TipCard>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="card text-center">
          <h2 className="font-bold mb-2">Vueltas</h2>
          <div className="text-5xl font-display font-semibold my-4">{rounds}</div>
          <div className="flex justify-center gap-3">
            <button className="btn-soft text-xl w-14 h-14" onClick={() => bump(setRounds, -1)}>−</button>
            <button className="btn-primary text-xl w-14 h-14" onClick={() => bump(setRounds, 1)}>+</button>
          </div>
          <button className="btn-ghost mt-3 text-sm" onClick={() => setRounds(0)}>Reiniciar</button>
        </div>

        <div className="card text-center">
          <h2 className="font-bold mb-2">Puntos</h2>
          <div className="text-5xl font-display font-semibold my-4">{stitches}</div>
          <div className="flex justify-center gap-3">
            <button className="btn-soft text-xl w-14 h-14" onClick={() => bump(setStitches, -1)}>−</button>
            <button className="btn-primary text-xl w-14 h-14" onClick={() => bump(setStitches, 1)}>+</button>
          </div>
          <button className="btn-ghost mt-3 text-sm" onClick={() => setStitches(0)}>Reiniciar</button>
        </div>
      </div>
    </div>
  )
}
