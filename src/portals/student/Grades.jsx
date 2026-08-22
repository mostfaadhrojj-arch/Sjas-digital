import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getGrades } from '../../services/dataService'
import { Card, SectionTitle, ProgressBar } from '../../components/ui'

const rows = [
  ['q1', '#12183B'], ['q2', '#B5502F'], ['midterm', '#0F7A78'], ['final', '#C9A227'],
]
const labelKey = { q1: 'quiz1', q2: 'quiz2', midterm: 'midterm', final: 'finalExam' }

export default function Grades() {
  const { t } = useLanguage()
  const { data: grades, loading } = useAsyncData(getGrades, [])

  return (
    <div>
      <SectionTitle>{t('myGradesTitle')}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-3">
          {grades.map((g) => (
            <Card key={g.subject}>
              <div className="flex justify-between items-center mb-3">
                <div className="font-display text-[15px] text-ink-900">{t(`subjects.${g.subject}`)}</div>
                <div className="font-display text-xl text-ink-900">{g.final}%</div>
              </div>
              <div className="flex flex-col gap-2">
                {rows.map(([field, color]) => (
                  <div key={field}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-ink-500">{t(labelKey[field])}</span>
                      <span className="text-ink-900 font-medium">{g[field]}%</span>
                    </div>
                    <ProgressBar value={g[field]} color={color} />
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
