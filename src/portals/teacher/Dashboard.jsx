import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, StatCard, SectionTitle, Badge } from '../../components/ui'

const todaysClasses = [
  { cls: 'Grade 5A', subject: 'Mathematics', time: '8:00 - 8:45' },
  { cls: 'Grade 7B', subject: 'Mathematics', time: '9:40 - 10:25' },
  { cls: 'Grade 11A', subject: 'Mathematics', time: '11:20 - 12:05' },
]
const submissions = [
  { name: 'Omar Khalil', item: 'Fractions WS', tone: 'ok', key: 'submitted' },
  { name: 'Laila Hassan', item: 'Essay Draft', tone: 'warn', key: 'late' },
  { name: 'Youssef Ibrahim', item: 'Lab Report', tone: 'ok', key: 'submitted' },
]

export default function Dashboard() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle>{t('teacherDashboard')}</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard eyebrow={t('myClasses')} value="3" accent="#12183B" />
        <StatCard eyebrow={t('numStudents')} value="72" accent="#0F7A78" />
        <StatCard eyebrow={t('pendingHW')} value="4" accent="#C9A227" trendTone="warn" />
        <StatCard eyebrow={t('upcomingExams')} value="2" accent="#B5502F" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-display text-base text-ink-900 mb-3">{t('todaysClasses')}</h3>
          <div className="flex flex-col gap-2">
            {todaysClasses.map((c) => (
              <div key={c.cls} className="flex justify-between p-2.5 bg-parchment-100 rounded-lg text-sm">
                <span><strong className="text-ink-900">{c.cls}</strong> · {t(`subjects.${c.subject}`)}</span>
                <span className="text-ink-300">{c.time}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-display text-base text-ink-900 mb-3">{t('recentSubmissions')}</h3>
          <div className="flex flex-col gap-2">
            {submissions.map((s) => (
              <div key={s.name} className="flex justify-between items-center p-2.5 bg-parchment-100 rounded-lg text-sm">
                <span><strong className="text-ink-900">{s.name}</strong> · {s.item}</span>
                <Badge tone={s.tone}>{t(s.key)}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
