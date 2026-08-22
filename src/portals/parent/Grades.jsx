import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getGrades } from '../../services/dataService'
import { Card, SectionTitle, ProgressBar } from '../../components/ui'

const children = [
  { name: 'Omar Khalil', grade: 'Grade 5A', color: '#12183B', boost: 0 },
  { name: 'Laila Hassan', grade: 'Grade 7B', color: '#0F7A78', boost: 4 },
]

export default function Grades() {
  const { t } = useLanguage()
  const { data: grades, loading } = useAsyncData(getGrades, [])

  return (
    <div>
      <SectionTitle>{t('academicProgress')}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-4">
          {children.map((c) => (
            <Card key={c.name}>
              <h3 className="font-display text-[15px] text-ink-900 mb-3">{c.name} · {c.grade}</h3>
              <div className="flex flex-col gap-2.5">
                {grades.map((g) => {
                  const val = Math.min(100, g.final + c.boost)
                  return (
                    <div key={g.subject}>
                      <div className="flex justify-between text-[13px] mb-1">
                        <span className="text-ink-500">{t(`subjects.${g.subject}`)}</span>
                        <span className="text-ink-900 font-medium">{val}%</span>
                      </div>
                      <ProgressBar value={val} color={c.color} />
                    </div>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
