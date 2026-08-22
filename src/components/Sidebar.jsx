import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

// `items`: [{ to, icon, labelKey }]
export default function Sidebar({ roleLabelKey, items }) {
  const { t } = useLanguage()
  return (
    <aside className="w-52 shrink-0 border-e border-ink-100 bg-white/60 p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-ink-300 font-semibold px-3 pb-2">
        {t(roleLabelKey)}
      </div>
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-ink-900 text-white font-medium' : 'text-ink-500 hover:bg-parchment-100 hover:text-ink-900'
              }`
            }
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span>{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
