import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, ROLES } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

const avatarLabel = { public: 'GU', admin: 'AD', teacher: 'TM', student: 'ST', parent: 'PT' }

export default function Navbar() {
  const { role, setRole } = useAuth()
  const { t, toggleLang } = useLanguage()
  const navigate = useNavigate()

  function selectRole(r) {
    setRole(r)
    navigate(r === 'public' ? '/' : `/${r}`)
  }

  return (
    <header className="sticky top-0 z-50 bg-parchment/90 backdrop-blur border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <button className="flex items-center gap-3 shrink-0" onClick={() => selectRole('public')}>
          <div className="w-9 h-9 rounded-lg bg-ink-900 text-brass font-display font-semibold flex items-center justify-center text-sm">
            SJ
          </div>
          <div className="text-start hidden sm:block">
            <div className="text-sm font-semibold text-ink-900 leading-none">{t('appName')}</div>
            <div className="text-[11px] text-ink-300 mt-0.5">{t('schoolName')}</div>
          </div>
        </button>

        <nav className="flex items-center gap-1 bg-white border border-ink-100 rounded-full p-1 overflow-x-auto no-scrollbar">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => selectRole(r)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                role === r ? 'bg-ink-900 text-white' : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {t(`roles.${r}`)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleLang}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-ink-100 bg-white hover:bg-parchment-100"
          >
            {t('langBtn')}
          </button>
          <div className="w-8 h-8 rounded-full bg-ink-100 text-ink-700 text-xs font-semibold flex items-center justify-center">
            {avatarLabel[role]}
          </div>
        </div>
      </div>
    </header>
  )
}
