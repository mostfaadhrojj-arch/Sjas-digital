import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

const navItems = [
  { to: '/', label: 'nav.home', end: true },
  { to: '/about', label: 'nav.about' },
  { to: '/programs', label: 'nav.programs' },
  { to: '/admissions', label: 'nav.admissions' },
  { to: '/life', label: 'nav.life' },
  { to: '/contact', label: 'nav.contact' },
]

export default function PublicPortal() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-ink-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 1px, transparent 40px)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-24 text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-11 h-11 rounded-xl bg-brass text-ink-900 font-display font-semibold flex items-center justify-center text-lg">
              SJ
            </div>
            <div className="text-start">
              <div className="text-sm font-semibold">{t('schoolName')}</div>
              <div className="text-[11px] text-white/60">{t('heroEyebrow')}</div>
            </div>
          </div>
          <h1
            className="font-display text-3xl sm:text-4xl leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t('heroTitle') }}
          />
          <p className="text-white/75 text-[15px] leading-relaxed max-w-xl mx-auto mb-8">{t('heroSub')}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate('/admissions')}
              className="bg-brass text-ink-900 font-medium text-sm px-6 py-3 rounded-lg hover:bg-brass-300 transition-colors"
            >
              {t('applyNow')}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white/10 border border-white/25 text-white font-medium text-sm px-6 py-3 rounded-lg hover:bg-white/15 transition-colors"
            >
              {t('bookVisit')}
            </button>
          </div>
        </div>
      </div>

      {/* Stat strip, overlapping the hero */}
      <div className="max-w-5xl mx-auto px-5 -mt-10 relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-ink-100 rounded-xl2 overflow-hidden shadow-ledger">
        {[
          ['500+', 'statsStudents'],
          ['42', 'statsTeachers'],
          ['20', 'statsClasses'],
          ['20', 'statsYears'],
        ].map(([val, key]) => (
          <div key={key} className="bg-white text-center py-6">
            <div className="font-display text-2xl text-ink-900">{val}</div>
            <div className="text-[11px] text-ink-300 mt-1">{t(key)}</div>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="flex gap-1 mb-8 flex-wrap bg-white border border-ink-100 rounded-full p-1 w-fit mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-ink-900 text-white' : 'text-ink-500 hover:text-ink-900'
                }`
              }
            >
              {t(item.label)}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  )
}
