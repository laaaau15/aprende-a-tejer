import React from 'react'
import { Link } from '../router'

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-display font-semibold mb-3">🧶 Se te ha escapado un punto…</h1>
      <p className="text-plum/70 mb-6">No encontramos esta página.</p>
      <Link to="/" className="btn-primary">Volver al inicio</Link>
    </div>
  )
}
