import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, SectionTitle, Badge } from '../../components/ui'

const myClasses = [
  { subject: 'Mathematics', teacher: 'Dr. Sarah Mitchell', room: 'A-201' },
  { subject: 'English', teacher: 'Mr. James Wilson', room: 'A-201' },
  { subject: 'Science', teacher: 'Ms. Amina Farouk', room: 'Lab-1' },
  { subject: 'Arabic', teacher: 'Mr. Tarek El-Sayed', room: 'A-201' },
  { subject: 'Social Studies', teacher: 'Ms. Rania Hossam', room: 'A-201' },
]

export default function MyClasses() {
  const { t } = useLanguage()
  return (
    <div>
      <SectionTitle>{t('myClassesTitle')}</SectionTitle>
      <div className="flex flex-col gap-2.5">
        {myClasses.map((c) => (
          <Card key={c.subject}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-display text-[15px] text-ink-900">{t(`subjects.${c.subject}`)}</div>
                <div className="text-[12px] text-ink-300 mt-0.5">{c.teacher} · {c.room}</div>
              </div>
              <Badge tone="ok">{t('active')}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
