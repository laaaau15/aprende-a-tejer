import React from 'react'
import Layout from './components/Layout'
import { Switch } from './router'
import Home from './pages/Home'
import { PuntosList, PuntoDetail } from './pages/Puntos'
import { AprenderHub, LessonDetail } from './pages/Aprender'
import GanchilloHub from './pages/Ganchillo'
import GanchilloCrear from './pages/GanchilloCrear'
import AgujasCrear from './pages/AgujasCrear'
import Diccionario from './pages/Diccionario'
import MiLana from './pages/MiLana'
import Contador from './pages/Contador'
import Favoritos from './pages/Favoritos'
import Buscar from './pages/Buscar'
import Rescate from './pages/Rescate'
import NotFound from './pages/NotFound'

const routes = [
  ['/', Home],
  ['/puntos', PuntosList],
  ['/puntos/:id', PuntoDetail],
  ['/aprender', AprenderHub],
  ['/aprender/tecnica/:id', LessonDetail],
  ['/aprender/proyecto/:id', LessonDetail],
  ['/ganchillo', GanchilloHub],
  ['/ganchillo/crear', GanchilloCrear],
  ['/agujas/crear', AgujasCrear],
  ['/diccionario', Diccionario],
  ['/mi-lana', MiLana],
  ['/contador', Contador],
  ['/aprender/calculadora', Contador],
  ['/favoritos', Favoritos],
  ['/buscar', Buscar],
  ['/rescate', Rescate],
  ['*', NotFound]
]

export default function App() {
  return (
    <Layout>
      <Switch routes={routes} />
    </Layout>
  )
}
