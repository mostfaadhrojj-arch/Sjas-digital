import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card } from '../../components/ui'

const activities = [
  { icon: '🎵', key: 'music', descKey: 'musicDesc' },
  { icon: '🤸', key: 'gymnastics', descKey: 'gymnasticsDesc' },
  { icon: '🎨', key: 'artCraft', descKey: 'artCraftDesc' },
  { icon: '⚽', key: 'sports', descKey: 'sportsDesc' },
  { icon: '🧠', key: 'weeklyValues', descKey: 'weeklyValuesDesc' },
  { icon: '🤖', key: 'stemRobotics', descKey: 'stemRoboticsDesc' },
]

export default function Life() {
  const { t } = useLanguage()
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {activities.map((a) => (
        <Card key={a.key}>
          <div className="text-2xl mb-2">{a.icon}</div>
          <h3 className="font-display text-[15px] text-ink-900 mb-1.5">{t(a.key)}</h3>
          <p className="text-[13px] text-ink-500 leading-relaxed">{t(a.descKey)}</p>
        </Card>
      ))}
    </div>
  )
}
