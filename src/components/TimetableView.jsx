import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAsyncData } from '../hooks/useAsyncData'
import { getTimetable } from '../services/dataService'
import { Card, SectionTitle } from './ui'

export default function TimetableView({ titleKey = 'weeklyTimetable' }) {
  const { t } = useLanguage()
  const { data: days, loading } = useAsyncData(getTimetable, [])

  return (
    <div>
      <SectionTitle>{t(titleKey)}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-3">
          {days.map((d) => (
            <Card key={d.day}>
              <div className="font-display text-[15px] text-ink-900 mb-2.5">{t(`daysOfWeek.${d.day}`)}</div>
              <div className="flex flex-col gap-1.5">
                {d.periods.map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-parchment-100 rounded-lg text-sm">
                    <span>
                      <strong className="text-ink-900">{p.subject === 'Break' ? t('break') : t(`subjects.${p.subject}`)}</strong>
                      {p.room !== '-' && <span className="text-ink-300"> · {p.room}</span>}
                    </span>
                    <span className="text-ink-300 text-xs">{p.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
