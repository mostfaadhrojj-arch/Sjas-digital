import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, StatCard, SectionTitle, Badge } from '../../components/ui'

const schedule = [
  { subject: 'Math', room: 'A-201', time: '8:00 - 8:45' },
  { subject: 'English', room: 'A-201', time: '8:50 - 9:35' },
  { subject: 'Science', room: 'Lab-1', time: '9:40 - 10:25' },
]
const recentGrades = [
  { subject: 'Mathematics', item: 'quiz', score: '92/100' },
  { subject: 'English', item: 'essay', score: '88/100' },
  { subject: 'Science', item: 'lab', score: '95/100' },
]

export default function Dashboard() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle>{t('studentDashboard')}</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard eyebrow={t('attendance')} value="96%" trend={t('excellent')} accent="#12183B" />
        <StatCard eyebrow={t('gpa')} value="3.8" trend={t('top10')} accent="#0F7A78" />
        <StatCard eyebrow={t('pendingHW')} value="3" trend={t('dueSoon')} trendTone="warn" accent="#C9A227" />
        <StatCard eyebrow={t('upcomingExams')} value="2" trend={t('nextExam')} accent="#B5502F" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-display text-base text-ink-900 mb-3">{t('todaysSchedule')}</h3>
          <div className="flex flex-col gap-2">
            {schedule.map((s) => (
              <div key={s.subject} className="flex justify-between p-2.5 bg-parchment-100 rounded-lg text-sm">
                <span><strong className="text-ink-900">{t(`subjects.${s.subject}`)}</strong> · {s.room}</span>
                <span className="text-ink-300">{s.time}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-display text-base text-ink-900 mb-3">{t('recentGrades')}</h3>
          <div className="flex flex-col gap-2">
            {recentGrades.map((g) => (
              <div key={g.subject} className="flex justify-between items-center p-2.5 bg-parchment-100 rounded-lg text-sm">
                <span><strong className="text-ink-900">{t(`subjects.${g.subject}`)} {t(g.item)}</strong></span>
                <Badge tone="ok">{g.score}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
