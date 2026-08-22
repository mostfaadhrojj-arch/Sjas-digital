import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getClasses } from '../../services/dataService'
import { Card, SectionTitle, Badge } from '../../components/ui'

export default function Classes() {
  const { t } = useLanguage()
  const { data: classes, loading } = useAsyncData(getClasses, [])

  return (
    <div>
      <SectionTitle>{t('classes')}</SectionTitle>
      {!loading && (
        <div className="grid sm:grid-cols-2 gap-4">
          {classes.map((c) => (
            <Card key={c.name}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-display text-[15px] text-ink-900">{c.name}</div>
                  <div className="text-[11px] text-ink-300">{t('building')} {c.room}</div>
                </div>
                <Badge tone="ok">{t('active')}</Badge>
              </div>
              <div className="flex gap-5 text-[13px] text-ink-500">
                <span>👩‍🏫 {c.teacher}</span>
                <span>🎓 {c.students} {t('statsStudents')}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
