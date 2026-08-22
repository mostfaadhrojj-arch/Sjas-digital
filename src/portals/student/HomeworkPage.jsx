import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getHomework } from '../../services/dataService'
import { Card, SectionTitle, Badge } from '../../components/ui'

const tone = { s: 'ok', d: 'bad', submitted: 'ok', due: 'bad', scheduled: 'warn' }
const label = { s: 'submitted', d: 'dueSoon', submitted: 'submitted', due: 'dueSoon', scheduled: 'scheduled' }

export default function HomeworkPage() {
  const { t } = useLanguage()
  const { data: rows, loading } = useAsyncData(getHomework, [])
  return (
    <div>
      <SectionTitle>{t('myHomework')}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-2.5">
          {rows.map((w, i) => (
            <Card key={i}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="text-sm font-medium text-ink-900">{w.title}</div>
                  <div className="text-[12px] text-ink-300 mt-1">{w.class} · {t('due')} {w.due}</div>
                </div>
                <Badge tone={tone[w.status]}>{t(label[w.status])}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
