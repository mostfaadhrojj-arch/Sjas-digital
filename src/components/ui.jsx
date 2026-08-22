import React from 'react'

// Shared, low-level presentational primitives used across every portal.
// Keeping these in one file keeps the "ledger" signature (thin brass rule,
// small-caps eyebrow, serif numerals) consistent everywhere it appears.

export function Card({ children, className = '', accent, ...rest }) {
  return (
    <div
      className={`bg-white rounded-xl2 border border-ink-100 shadow-ledger p-5 ${className}`}
      style={accent ? { borderInlineStartWidth: 3, borderInlineStartColor: accent } : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Eyebrow({ children }) {
  return (
    <div className="text-[11px] tracking-[0.14em] uppercase text-ink-300 font-semibold mb-1">
      {children}
    </div>
  )
}

export function StatCard({ eyebrow, value, trend, trendTone = 'ok', accent = '#12183B' }) {
  const toneClass = { ok: 'text-ok', warn: 'text-warn', bad: 'text-bad', muted: 'text-ink-300' }[trendTone]
  return (
    <Card accent={accent} className="relative overflow-hidden">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="font-display text-3xl text-ink-900">{value}</div>
      {trend && <div className={`text-xs mt-1 font-medium ${toneClass}`}>{trend}</div>}
      <div className="absolute -right-3 -bottom-3 w-16 h-16 rounded-full opacity-[0.06]" style={{ background: accent }} />
    </Card>
  )
}

const badgeTone = {
  s: 'bg-ok/10 text-ok',
  ok: 'bg-ok/10 text-ok',
  w: 'bg-warn/10 text-warn',
  warn: 'bg-warn/10 text-warn',
  d: 'bg-bad/10 text-bad',
  bad: 'bg-bad/10 text-bad',
  i: 'bg-teal/10 text-teal-700',
  info: 'bg-teal/10 text-teal-700',
  u: 'bg-teal/10 text-teal-700',
  c: 'bg-ok/10 text-ok',
}

export function Badge({ tone = 'i', children }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-semibold ${badgeTone[tone] || badgeTone.i}`}>
      {children}
    </span>
  )
}

export function Button({ children, variant = 'ghost', className = '', ...rest }) {
  const base = 'inline-flex items-center gap-1.5 rounded-lg text-sm font-medium px-4 py-2 transition-colors'
  const variants = {
    ghost: 'bg-white border border-ink-100 text-ink-900 hover:bg-parchment-100',
    primary: 'bg-ink-900 text-white hover:bg-ink-700',
    gold: 'bg-brass text-ink-900 hover:bg-brass-300',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function ProgressBar({ value, color = '#12183B' }) {
  return (
    <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
    </div>
  )
}

export function Table({ columns, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-ink-100">
            {columns.map((c) => (
              <th key={c} className="text-start text-[11px] uppercase tracking-wide text-ink-300 font-semibold pb-2 whitespace-nowrap px-2 first:ps-0">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Tr({ children }) {
  return <tr className="border-b border-ink-100 last:border-0 hover:bg-parchment-100/60">{children}</tr>
}
export function Td({ children, className = '' }) {
  return <td className={`py-3 px-2 first:ps-0 align-middle ${className}`}>{children}</td>
}

export function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-display text-xl text-ink-900">{children}</h2>
      {action}
    </div>
  )
}

export function EmptyState({ label }) {
  return <div className="text-sm text-ink-300 text-center py-10">{label}</div>
}
