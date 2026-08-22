import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, Eyebrow, Badge, SectionTitle } from '../../components/ui'

const why = [
  { key: 'americanCurriculum', descKey: 'americanCurriculumDesc', accent: '#12183B', icon: '📘' },
  { key: 'centurySkills', descKey: 'centurySkillsDesc', accent: '#C9A227', icon: '🧭' },
  { key: 'inclusiveCommunity', descKey: 'inclusiveCommunityDesc', accent: '#0F7A78', icon: '🤝' },
]

const news = [
  { titleKey: 'newsWelcome', date: 'Aug 18', tone: 'bad', statusKey: 'statusNew' },
  { titleKey: 'newsPtc', date: 'Aug 17', tone: 'info', statusKey: 'statusEvent' },
  { titleKey: 'newsFair', date: 'Aug 14', tone: 'ok', statusKey: 'statusOpen' },
]

export default function Home() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-8">
      <div className="grid sm:grid-cols-3 gap-4">
        {why.map((w) => (
          <Card key={w.key} accent={w.accent}>
            <Eyebrow>{t('whySjas')}</Eyebrow>
            <div className="text-xl mb-2">{w.icon}</div>
            <h3 className="font-display text-base text-ink-900 mb-1.5">{t(w.key)}</h3>
            <p className="text-[13px] text-ink-500 leading-relaxed">{t(w.descKey)}</p>
          </Card>
        ))}
      </div>

      <Card>
        <SectionTitle>{t('latestNews')}</SectionTitle>
        <div className="flex flex-col gap-2.5">
          {news.map((n) => (
            <div key={n.titleKey} className="flex items-center justify-between gap-3 p-3 bg-parchment-100 rounded-lg">
              <div>
                <div className="text-sm font-medium text-ink-900">{t(n.titleKey)}</div>
                <div className="text-[11px] text-ink-300 mt-0.5">{n.date}, 2026</div>
              </div>
              <Badge tone={n.tone}>{t(n.statusKey)}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>{t('upcomingEvents')}</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 bg-parchment-100 rounded-lg">
            <div className="text-[11px] text-ink-300">Sep 2 · 18:00</div>
            <div className="text-sm font-medium text-ink-900 mt-1">{t('backToSchoolNight')}</div>
            <div className="text-[12px] text-ink-500 mt-0.5">{t('auditorium')}</div>
          </div>
          <div className="p-4 bg-parchment-100 rounded-lg">
            <div className="text-[11px] text-ink-300">Oct 15 · 09:00</div>
            <div className="text-sm font-medium text-ink-900 mt-1">{t('scienceFair')}</div>
            <div className="text-[12px] text-ink-500 mt-0.5">{t('scienceBuilding')}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
