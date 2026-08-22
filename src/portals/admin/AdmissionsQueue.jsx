import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getAdmissionsQueue } from '../../services/dataService'
import { Card, SectionTitle, Badge, Button, Table, Tr, Td } from '../../components/ui'

const statusTone = { s: 'ok', w: 'warn', d: 'bad', i: 'info', submitted: 'info', interview: 'warn', waitlisted: 'warn', declined: 'bad', enrolled: 'ok' }
const statusKey = { s: 'paidStatus', w: 'underReview', d: 'unpaid', i: 'interview', submitted: 'submitted', interview: 'interview', waitlisted: 'underReview', declined: 'declined', enrolled: 'enrolled' }

export default function AdmissionsQueue() {
  const { t } = useLanguage()
  const { data: rows, loading } = useAsyncData(getAdmissionsQueue, [])

  return (
    <div>
      <SectionTitle>{t('admissions')}</SectionTitle>
      <Card>
        <div className="flex gap-2.5 mb-4">
          <input placeholder={t('search')} className="max-w-xs border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-brass" />
          <select className="max-w-[160px] border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none">
            <option>{t('allStatus')}</option>
          </select>
        </div>
        {!loading && (
          <Table columns={[t('student'), t('grade'), t('parent'), t('date'), t('status'), t('action')]}>
            {rows.map((r) => (
              <Tr key={r.name}>
                <Td className="font-medium text-ink-900">{r.name}</Td>
                <Td>{r.grade}</Td>
                <Td>{r.parent}</Td>
                <Td>{r.date}</Td>
                <Td><Badge tone={statusTone[r.status]}>{t(statusKey[r.status])}</Badge></Td>
                <Td><Button className="!px-3 !py-1 text-xs">{r.status === 's' ? t('enroll') : t('review')}</Button></Td>
              </Tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  )
}
