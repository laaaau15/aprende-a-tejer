import React from 'react'

// Ilustraciones de la textura de cada punto, dibujadas como patrón SVG
// tileable. No son fotografías (no podemos alojar fotos de terceros de forma
// fiable), pero representan con precisión la estructura real de cada punto:
// las "uves" del derecho, los granitos del revés, las columnas del elástico, etc.
export const PALETTES = {
  yarn: { bg: '#FBF6EE', line: '#A83F2E', accent: '#D9705F' },
  sage: { bg: '#F1F6F1', line: '#3F5F45', accent: '#7FA285' },
  honey: { bg: '#FCF3E3', line: '#8C5E14', accent: '#E3A857' }
}

function KnitV({ id, color }) {
  return (
    <pattern id={id} width="16" height="14" patternUnits="userSpaceOnUse">
      <path d="M0 14 L8 2 L16 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </pattern>
  )
}

function PurlBump({ id, color }) {
  return (
    <pattern id={id} width="16" height="10" patternUnits="userSpaceOnUse">
      <path d="M0 5 Q4 -2 8 5 T16 5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </pattern>
  )
}

function Rib({ id, color, width = 2 }) {
  return (
    <pattern id={id} width={16 * width} height="14" patternUnits="userSpaceOnUse">
      {Array.from({ length: width }).map((_, i) => (
        <path key={i} d={`M${i * 16} 14 L${i * 16 + 8} 2 L${i * 16 + 16} 14`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={i % 2 === 0 ? 1 : 0.4} />
      ))}
    </pattern>
  )
}

function Seed({ id, color }) {
  return (
    <pattern id={id} width="32" height="28" patternUnits="userSpaceOnUse">
      <path d="M0 14 L8 2 L16 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 28 Q20 21 24 28 T32 28" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M16 14 L24 2 L32 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M0 28 Q4 21 8 28 T16 28" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </pattern>
  )
}

function Cable({ id, color, accent }) {
  return (
    <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M4 0 C4 8, 20 8, 20 16 M20 0 C20 8, 4 8, 4 16" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 16 L4 24 M20 16 L20 24" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" />
    </pattern>
  )
}

function Lace({ id, color }) {
  return (
    <pattern id={id} width="24" height="20" patternUnits="userSpaceOnUse">
      <path d="M0 20 L6 8 L12 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="18" cy="10" r="3.5" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M12 20 L18 8 L24 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </pattern>
  )
}

function CrochetSc({ id, color }) {
  return (
    <pattern id={id} width="14" height="12" patternUnits="userSpaceOnUse">
      <path d="M1 10 Q7 2 13 10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="7" y1="6" x2="7" y2="12" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </pattern>
  )
}

function CrochetDc({ id, color }) {
  return (
    <pattern id={id} width="16" height="18" patternUnits="userSpaceOnUse">
      <path d="M2 16 Q8 2 14 16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="4" x2="8" y2="16" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </pattern>
  )
}

export const KIND_RENDER = {
  knit: KnitV,
  purl: PurlBump,
  rib1x1: (p) => <Rib {...p} width={2} />,
  rib2x2: (p) => <Rib {...p} width={4} />,
  seed: Seed,
  cable: Cable,
  lace: Lace,
  sc: CrochetSc,
  dc: CrochetDc
}

export function StitchSwatch({ kind = 'knit', tone = 'yarn', className = 'h-32 w-full rounded-xl' }) {
  const id = `swatch-${kind}-${tone}`
  const palette = PALETTES[tone] ?? PALETTES.yarn
  const Renderer = KIND_RENDER[kind] ?? KnitV

  return (
    <svg className={className} role="img" aria-label={`Vista previa del punto (${kind})`}>
      <defs>{Renderer({ id, color: palette.line, accent: palette.accent })}</defs>
      <rect width="100%" height="100%" fill={palette.bg} />
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
