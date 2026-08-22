import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext(null)

function resolve(dict, key) {
  // supports dotted paths like "nav.home" or "days.Mon"
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('sjas-lang') || 'en')

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    localStorage.setItem('sjas-lang', lang)
  }, [lang])

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), [])

  const t = useCallback(
    (key) => {
      const dict = translations[lang] || translations.en
      const val = resolve(dict, key)
      if (val !== undefined) return val
      return resolve(translations.en, key) ?? key
    },
    [lang]
  )

  const value = useMemo(() => ({ lang, isRTL: lang === 'ar', toggleLang, t }), [lang, toggleLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
