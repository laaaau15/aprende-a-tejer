import React from 'react'
import { NavCard, PageHeader } from '../components/ui'

export default function GanchilloHub() {
  return (
    <div>
      <PageHeader title="Ganchillo" emoji="🪡" subtitle="Puntos, técnicas avanzadas y tu patrón hecho a medida." />
      <div className="grid sm:grid-cols-2 gap-3">
        <NavCard to="/mi-lana" emoji="🧶" title="¿Qué puedo hacer con mi lana?" text="Dinos cuánta tienes y descubre qué prendas te da, con aguja/ganchillo y ovillos recomendados." />
        <NavCard to="/ganchillo/crear" emoji="🧮" title="Patrón para mi hilo" text="Genera un gorro, bufanda o cuello a partir de tu tensión real, medida con una muestra." />
        <NavCard to="/diccionario" emoji="📚" title="Abreviaturas US/UK" text="Consulta la tabla de equivalencias antes de seguir un patrón en inglés." />
      </div>
    </div>
  )
}
