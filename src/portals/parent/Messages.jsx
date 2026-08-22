import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getMessages } from '../../services/dataService'
import { Card, SectionTitle, Badge } from '../../components/ui'

export default function Messages() {
  const { t } = useLanguage()
  const { data: rows, loading } = useAsyncData(getMessages, [])
  return (
    <div>
      <SectionTitle>{t('messages')}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-2.5">
          {rows.map((m, i) => (
            <Card key={i}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="text-sm font-medium text-ink-900">{m.subject}</div>
                  <div className="text-[12px] text-ink-300 mt-0.5">{t('from')} {m.from} · {m.date}, 2026</div>
                </div>
                <Badge tone={m.read ? 'ok' : 'warn'}>{m.read ? t('read') : t('unread')}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
