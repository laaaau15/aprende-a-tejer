import React from 'react'
import { NavCard, PageHeader } from '../components/ui'

export default function GanchilloHub() {
  return (
    <div>
      <PageHeader title="Ganchillo" emoji="🪡" subtitle="Puntos, técnicas avanzadas y tu patrón hecho a medida." />
      <div className="grid sm:grid-cols-2 gap-3">
        <NavCard to="/ganchillo/crear" emoji="🧮" title="Patrón para mi hilo" text="Genera un gorro, bufanda o cuello a partir de tu tensión real (o una estimación por grosor)." />
        <NavCard to="/diccionario" emoji="📚" title="Abreviaturas US/UK" text="Consulta la tabla de equivalencias antes de seguir un patrón en inglés." />
      </div>
    </div>
  )
}
