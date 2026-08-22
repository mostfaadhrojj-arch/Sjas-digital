import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card } from '../../components/ui'

const infoRows = ['founded', 'locationLabel', 'curriculumLabel', 'classSize', 'affiliation', 'tuition']
const infoVals = { founded: '2004–2005', locationLabel: 'locationVal', curriculumLabel: 'curriculumVal', classSize: null, affiliation: 'affiliationVal', tuition: null }

export default function About() {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <h2 className="font-display text-xl text-ink-900 mb-3">{t('aboutTitle')}</h2>
        <p className="text-[14px] text-ink-500 leading-relaxed mb-5">{t('aboutDesc')}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-parchment-100 rounded-lg">
            <div className="text-[11px] text-ink-300 mb-1">{t('vision')}</div>
            <div className="text-sm text-ink-900">{t('visionText')}</div>
          </div>
          <div className="p-4 bg-parchment-100 rounded-lg">
            <div className="text-[11px] text-ink-300 mb-1">{t('mission')}</div>
            <div className="text-sm text-ink-900">{t('missionText')}</div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-base text-ink-900 mb-3">{t('schoolInfo')}</h3>
        <div className="grid sm:grid-cols-2 gap-x-8">
          {infoRows.map((key) => (
            <div key={key} className="flex justify-between py-2.5 border-b border-ink-100 text-sm">
              <span className="text-ink-300">{t(key)}</span>
              <span className="text-ink-900 font-medium">
                {key === 'founded' ? '2004–2005' : key === 'classSize' ? `25 ${t('statsStudents')}` : key === 'tuition' ? 'E£54,000+' : t(infoVals[key])}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
