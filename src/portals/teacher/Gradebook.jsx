import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, SectionTitle, Table, Tr, Td } from '../../components/ui'

const rows = [
  ['Omar Khalil', 92, 88, 90, 95, 92],
  ['Sara Mostafa', 85, 90, 88, 92, 89],
  ['Karim Fathy', 78, 82, 80, 85, 81],
  ['Hana Sherif', 95, 96, 94, 98, 96],
  ['Youssef Nabil', 88, 85, 87, 90, 88],
]

export default function Gradebook() {
  const { t } = useLanguage()
  return (
    <div>
      <SectionTitle>{t('gradebook')} — Grade 5A · {t('subjects.Mathematics')}</SectionTitle>
      <Card>
        <Table columns={['#', t('student'), t('q1'), t('q2'), t('mid'), t('proj'), t('final')]}>
          {rows.map((r, i) => (
            <Tr key={r[0]}>
              <Td>{i + 1}</Td>
              <Td className="font-medium text-ink-900">{r[0]}</Td>
              <Td>{r[1]}</Td><Td>{r[2]}</Td><Td>{r[3]}</Td><Td>{r[4]}</Td>
              <Td className="font-semibold">{r[5]}</Td>
            </Tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
