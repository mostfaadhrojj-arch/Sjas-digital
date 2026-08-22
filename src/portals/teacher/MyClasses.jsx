import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, SectionTitle, Button } from '../../components/ui'

const myClasses = [
  { name: 'Grade 5 - Section A', students: 24, room: 'A-201' },
  { name: 'Grade 7 - Section B', students: 26, room: 'B-105' },
  { name: 'Grade 11 - Section A', students: 25, room: 'C-205' },
]

export default function MyClasses() {
  const { t } = useLanguage()
  return (
    <div>
      <SectionTitle>{t('myClassesTitle')}</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-4">
        {myClasses.map((c) => (
          <Card key={c.name}>
            <div className="font-display text-[15px] text-ink-900 mb-1.5">{c.name}</div>
            <div className="text-[13px] text-ink-500 mb-4">{c.students} {t('statsStudents')} · Room {c.room}</div>
            <div className="flex gap-2">
              <Button className="!text-xs !px-2.5 !py-1.5">{t('attendanceGrade')}</Button>
              <Button className="!text-xs !px-2.5 !py-1.5">{t('gradebook')}</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
