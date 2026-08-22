import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getAttendanceTrend, getGradeDistribution } from '../../services/dataService'
import { Card, StatCard, SectionTitle } from '../../components/ui'
import { Sparkline, BarChart } from '../../components/charts'

export default function Dashboard() {
  const { t } = useLanguage()
  const { data: trend } = useAsyncData(getAttendanceTrend, [])
  const { data: dist } = useAsyncData(getGradeDistribution, [])

  const activity = [
    { key: 'newAdmission', name: 'Youssef Ahmed', agoKey: 'ago2m' },
    { key: 'attendanceMarked', name: 'Grade 5A', suffixKey: 'marked', agoKey: 'ago15m' },
    { key: 'paymentReceived', name: 'E£18,000', suffixKey: 'received', agoKey: 'ago1h' },
    { key: 'newAnn', name: 'Welcome Back', agoKey: 'ago3h' },
  ]

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle>{t('adminDashboard')}</SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard eyebrow={t('totalStudents')} value="500" trend={t('yoy')} accent="#12183B" />
        <StatCard eyebrow={t('totalTeachers')} value="42" trend={t('newTeachers')} accent="#0F7A78" />
        <StatCard eyebrow={t('attendance')} value="96.4%" trend={t('attendanceRate')} accent="#C9A227" />
        <StatCard eyebrow={t('pendingAdm')} value="18" trend={t('todayPending')} trendTone="warn" accent="#B5502F" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <h3 className="font-display text-base text-ink-900 mb-3">{t('attendanceTrend')}</h3>
          {trend && <Sparkline points={trend} />}
        </Card>
        <Card>
          <h3 className="font-display text-base text-ink-900 mb-3">{t('gradeDistribution')}</h3>
          {dist && <BarChart data={dist} />}
        </Card>
      </div>

      <Card>
        <h3 className="font-display text-base text-ink-900 mb-3">{t('recentActivity')}</h3>
        <div className="flex flex-col gap-2">
          {activity.map((a, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 bg-parchment-100 rounded-lg text-sm">
              <span>
                {t(a.key)} <strong className="text-ink-900">{a.name}</strong>{a.suffixKey ? ` ${t(a.suffixKey)}` : ''}
              </span>
              <span className="text-[11px] text-ink-300">{t(a.agoKey)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
