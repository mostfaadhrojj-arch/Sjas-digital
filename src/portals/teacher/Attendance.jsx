import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, SectionTitle, Badge, Button, Table, Tr, Td } from '../../components/ui'

const roster = [
  { name: 'Omar Khalil', status: 's', note: '-' },
  { name: 'Sara Mostafa', status: 's', note: '-' },
  { name: 'Karim Fathy', status: 'd', note: 'Sick' },
  { name: 'Hana Sherif', status: 'w', note: 'Traffic' },
  { name: 'Youssef Nabil', status: 's', note: '-' },
]
const tone = { s: 'ok', d: 'bad', w: 'warn' }
const label = { s: 'paidStatus', d: 'unpaid', w: 'underReview' }

export default function Attendance() {
  const { t } = useLanguage()
  const [cls, setCls] = useState('Grade 5A')

  return (
    <div>
      <SectionTitle>{t('attendanceGrade')} — {cls}</SectionTitle>
      <Card>
        <div className="flex gap-2.5 mb-4">
          <select value={cls} onChange={(e) => setCls(e.target.value)} className="max-w-[160px] border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none">
            <option>Grade 5A</option><option>Grade 7B</option><option>Grade 11A</option>
          </select>
          <input type="date" defaultValue="2026-08-18" className="max-w-[160px] border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none" />
        </div>
        <Table columns={['#', t('student'), t('status'), t('notes'), t('action')]}>
          {roster.map((r, i) => (
            <Tr key={r.name}>
              <Td>{i + 1}</Td>
              <Td className="font-medium text-ink-900">{r.name}</Td>
              <Td><Badge tone={tone[r.status]}>{t(label[r.status])}</Badge></Td>
              <Td>{r.note}</Td>
              <Td><Button className="!px-3 !py-1 text-xs">{t('edit')}</Button></Td>
            </Tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
