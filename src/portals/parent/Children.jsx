import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, SectionTitle, Badge } from '../../components/ui'

const children = [
  { name: 'Omar Khalil', grade: 'Grade 5A', id: 'STU-001', initials: 'OK', color: '#12183B', attendance: '96%', gpa: '3.8', teacher: 'Dr. Mitchell' },
  { name: 'Laila Hassan', grade: 'Grade 7B', id: 'STU-002', initials: 'LH', color: '#0F7A78', attendance: '98%', gpa: '3.9', teacher: 'Mr. Wilson' },
]

export default function Children() {
  const { t } = useLanguage()
  return (
    <div>
      <SectionTitle>{t('childrenTitle')}</SectionTitle>
      <div className="flex flex-col gap-4">
        {children.map((c) => (
          <Card key={c.id}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg" style={{ background: c.color }}>
                  {c.initials}
                </div>
                <div>
                  <div className="font-display text-base text-ink-900">{c.name}</div>
                  <div className="text-[12px] text-ink-300">{c.grade} · ID: {c.id}</div>
                </div>
              </div>
              <Badge tone="ok">{t('active')}</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label={t('attendance')} value={c.attendance} />
              <Stat label={t('gpa')} value={c.gpa} />
              <Stat label={t('behavior')} value={t('excellent')} />
              <Stat label={t('teacher')} value={c.teacher} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="p-3 bg-parchment-100 rounded-lg text-center">
      <div className="text-[11px] text-ink-300">{label}</div>
      <div className="text-sm font-medium text-ink-900 mt-1">{value}</div>
    </div>
  )
}
