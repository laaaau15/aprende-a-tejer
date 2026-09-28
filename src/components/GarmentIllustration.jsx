import React from 'react'
import { PALETTES, KIND_RENDER } from './StitchSwatch'

// Silueta simplificada de cada prenda, usada como "máscara" (clipPath) para
// rellenarla con la textura del punto elegido: así se ve, de un vistazo,
// cómo quedaría esa prenda tejida con ese punto.
const SILHOUETTES = {
  gorro: (
    <path d="M50 8 C24 8 8 28 8 54 L8 66 C8 70 11 72 15 72 L85 72 C89 72 92 70 92 66 L92 54 C92 28 76 8 50 8 Z M8 66 L92 66 L92 76 C92 80 89 82 85 82 L15 82 C11 82 8 80 8 76 Z" />
  ),
  bufanda: (
    <path d="M6 40 C6 34 11 30 17 30 L83 30 C89 30 94 34 94 40 C94 46 89 50 83 50 L30 50 L30 88 C30 93 26 96 22 96 C18 96 14 93 14 88 L14 50 C9 49 6 45 6 40 Z" />
  ),
  cuello: (
    <path d="M50 6 A44 44 0 1 1 49.9 6 Z M50 30 A20 20 0 1 0 50.1 30 Z" fillRule="evenodd" clipRule="evenodd" />
  ),
  guantes: (
    <path d="M30 96 L30 46 C30 40 34 36 40 36 C43 36 45 38 46 41 L46 20 C46 15 50 11 55 11 C60 11 64 15 64 20 L64 44 L66 44 C71 44 75 48 75 53 L75 96 Z M46 41 L46 50" />
  ),
  calcetines: (
    <path d="M32 4 L68 4 L68 52 C68 52 90 60 90 78 C90 90 78 96 62 96 L40 96 C33 96 28 91 28 84 L28 4 Z" />
  ),
  complemento: (
    <path d="M50 12 A38 38 0 1 1 49.9 12 Z M50 30 A20 20 0 1 0 50.1 30 Z" fillRule="evenodd" clipRule="evenodd" />
  ),
  jersey: (
    <path d="M35 6 L65 6 L78 18 L94 32 L82 46 L72 38 L72 96 L28 96 L28 38 L18 46 L6 32 L22 18 Z" />
  )
}

export function GarmentIllustration({ garment = 'gorro', kind = 'knit', tone = 'yarn', className = 'w-full h-40' }) {
  const id = `garment-${garment}-${kind}-${tone}`
  const palette = PALETTES[tone] ?? PALETTES.yarn
  const Renderer = KIND_RENDER[kind]
  const silhouette = SILHOUETTES[garment] ?? SILHOUETTES.gorro

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={`Ilustración de ${garment} tejido con este punto`}>
      <defs>
        {Renderer ? Renderer({ id: `${id}-pattern`, color: palette.line, accent: palette.accent }) : null}
        <clipPath id={`${id}-clip`}>{silhouette}</clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="0" width="100" height="100" fill={palette.bg} />
        {Renderer ? <rect x="0" y="0" width="100" height="100" fill={`url(#${id}-pattern)`} /> : null}
      </g>
      <g fill="none" stroke={palette.line} strokeWidth="1.5" opacity="0.35">
        {silhouette}
      </g>
    </svg>
  )
}
