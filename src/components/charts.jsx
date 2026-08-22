import React from 'react'

// Deliberately dependency-free: two small SVG charts styled to match the
// ledger aesthetic (hairline strokes, brass accent points) rather than a
// generic charting-library look.

export function Sparkline({ points = [], color = '#0F7A78', height = 90 }) {
  if (!points.length) return null
  const w = 400
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const stepX = w / (points.length - 1 || 1)
  const coords = points.map((p, i) => [i * stepX, height - ((p - min) / range) * (height - 20) - 10])
  const path = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const area = `${path} L${w},${height} L0,${height} Z`

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkFill)" stroke="none" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={color} />
      ))}
    </svg>
  )
}

export function BarChart({ data = [], height = 140 }) {
  if (!data.length) return null
  const max = Math.max(...data.map((d) => d.value)) || 1
  const barW = 26
  const gap = 14
  const w = data.length * (barW + gap)
  return (
    <svg viewBox={`0 0 ${w} ${height + 24}`} className="w-full" style={{ height: height + 24 }}>
      {data.map((d, i) => {
        const h = (d.value / max) * height
        const x = i * (barW + gap) + gap / 2
        return (
          <g key={d.label}>
            <rect x={x} y={height - h} width={barW} height={h} rx="4" fill={d.color} />
            <text x={x + barW / 2} y={height + 16} fontSize="10" fill="#7A81B5" textAnchor="middle">
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function RadialStat({ value, size = 84, color = '#C9A227', label }) {
  const r = size / 2 - 6
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEEFF6" strokeWidth="6" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text x="50%" y="52%" textAnchor="middle" fontSize="16" fontWeight="600" fill="#12183B">{value}%</text>
      </svg>
      {label && <span className="text-[11px] text-ink-300">{label}</span>}
    </div>
  )
}
