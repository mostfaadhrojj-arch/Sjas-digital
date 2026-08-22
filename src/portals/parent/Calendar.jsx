import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getCalendarEvents } from '../../services/dataService'
import { Card, SectionTitle, Badge } from '../../components/ui'

export default function CalendarPage() {
  const { t } = useLanguage()
  const { data: events, loading } = useAsyncData(getCalendarEvents, [])
  return (
    <div>
      <SectionTitle>{t('schoolCalendar')}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-2.5">
          {events.map((e, i) => (
            <Card key={i}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-ink-900">{e.title}</div>
                  <div className="text-[12px] text-ink-300 mt-0.5">{e.date} · {e.time}</div>
                </div>
                <Badge tone="info">{t('upcoming')}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
