import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, SectionTitle, Button } from '../../components/ui'

const children = [
  { name: 'Omar Khalil', grade: 'Grade 5A', attendance: '96%', gpa: '3.8', hw: 2, exams: 1, accent: '#12183B' },
  { name: 'Laila Hassan', grade: 'Grade 7B', attendance: '98%', gpa: '3.9', hw: 1, exams: 1, accent: '#0F7A78' },
]

export default function Dashboard() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle>{t('parentDashboard')}</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        {children.map((c) => (
          <Card key={c.name} accent={c.accent}>
            <div className="text-[12px] text-ink-300 mb-3">{c.name} · {c.grade}</div>
            <div className="grid grid-cols-2 gap-3">
              <div><div className="text-[11px] text-ink-300">{t('attendance')}</div><div className="font-display text-lg text-ink-900">{c.attendance}</div></div>
              <div><div className="text-[11px] text-ink-300">{t('gpa')}</div><div className="font-display text-lg text-ink-900">{c.gpa}</div></div>
              <div><div className="text-[11px] text-ink-300">{t('pendingHW')}</div><div className="font-display text-lg text-ink-900">{c.hw}</div></div>
              <div><div className="text-[11px] text-ink-300">{t('upcomingExams')}</div><div className="font-display text-lg text-ink-900">{c.exams}</div></div>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-display text-base text-ink-900 mb-3">{t('quickActions')}</h3>
          <div className="flex flex-col gap-2">
            <Button className="justify-center">{t('payFees')}</Button>
            <Button className="justify-center">{t('messageTeacher')}</Button>
            <Button className="justify-center">{t('bookMeeting')}</Button>
            <Button className="justify-center">{t('downloadReport')}</Button>
          </div>
        </Card>
        <Card>
          <h3 className="font-display text-base text-ink-900 mb-3">{t('recentNotifications')}</h3>
          <div className="flex flex-col gap-2">
            <div className="p-2.5 bg-parchment-100 rounded-lg text-sm"><strong>{t('feeReminder')}</strong> {t('term1Due')}</div>
            <div className="p-2.5 bg-parchment-100 rounded-lg text-sm"><strong>{t('eventNotif')}</strong> {t('backToSchoolEvent')}</div>
            <div className="p-2.5 bg-parchment-100 rounded-lg text-sm"><strong>{t('gradeUpdate')}</strong> {t('omarsMath')}</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
