import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, SectionTitle, ProgressBar } from '../../components/ui'

const children = [
  { name: 'Omar Khalil', grade: 'Grade 5A', pct: 96, present: 134, absent: 4, late: 2, color: '#12183B' },
  { name: 'Laila Hassan', grade: 'Grade 7B', pct: 98, present: 137, absent: 2, late: 1, color: '#0F7A78' },
]

export default function Attendance() {
  const { t } = useLanguage()
  return (
    <div>
      <SectionTitle>{t('attendanceTitle')}</SectionTitle>
      <div className="flex flex-col gap-4">
        {children.map((c) => (
          <Card key={c.name}>
            <h3 className="font-display text-[15px] text-ink-900 mb-3">{c.name} · {c.grade}</h3>
            <div className="flex items-center gap-5 mb-3">
              <div className="font-display text-3xl text-ink-900">{c.pct}%</div>
              <div className="text-[13px] text-ink-500 leading-relaxed">
                {t('present')} {c.present} {t('days')}<br />
                {t('absent')} {c.absent} {t('days')}<br />
                {t('lateLabel')} {c.late} {c.late === 1 ? t('day') : t('days')}
              </div>
            </div>
            <ProgressBar value={c.pct} color={c.color} />
          </Card>
        ))}
      </div>
    </div>
  )
}
