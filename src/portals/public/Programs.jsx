import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card } from '../../components/ui'

const programs = [
  { icon: '🎨', key: 'kgTitle', descKey: 'kgDesc' },
  { icon: '📚', key: 'elementaryTitle', descKey: 'elementaryDesc' },
  { icon: '🔬', key: 'middleTitle', descKey: 'middleDesc' },
  { icon: '🎓', key: 'highTitle', descKey: 'highDesc' },
]

export default function Programs() {
  const { t } = useLanguage()
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {programs.map((p) => (
        <Card key={p.key}>
          <div className="text-2xl mb-2">{p.icon}</div>
          <h3 className="font-display text-base text-ink-900 mb-1.5">{t(p.key)}</h3>
          <p className="text-[13px] text-ink-500 leading-relaxed">{t(p.descKey)}</p>
        </Card>
      ))}
    </div>
  )
}
