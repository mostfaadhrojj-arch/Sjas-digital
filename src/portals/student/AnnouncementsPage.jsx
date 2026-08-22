import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getAnnouncements } from '../../services/dataService'
import { Card, SectionTitle, Badge } from '../../components/ui'

const tone = { d: 'bad', i: 'info', urgent: 'bad', info: 'info' }
const label = { d: 'statusNew', i: 'statusEvent', urgent: 'statusNew', info: 'statusEvent' }

export default function AnnouncementsPage() {
  const { t } = useLanguage()
  const { data: rows, loading } = useAsyncData(getAnnouncements, [])
  return (
    <div>
      <SectionTitle>{t('announcements')}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-2.5">
          {rows.map((a, i) => (
            <Card key={i}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="text-sm font-medium text-ink-900">{a.title}</div>
                  <div className="text-[11px] text-ink-300 mt-1">{t('to')} {a.audience === 'All' ? t('all') : a.audience} · {a.date ? `${a.date}, 2026` : a.published_at}</div>
                </div>
                <Badge tone={tone[a.priority]}>{t(label[a.priority])}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
