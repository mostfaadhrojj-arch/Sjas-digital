import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getFees } from '../../services/dataService'
import { Card, SectionTitle, StatCard, Badge, Button, Table, Tr, Td } from '../../components/ui'

const statusTone = { s: 'ok', d: 'bad', paid: 'ok', unpaid: 'bad' }
const statusKey = { s: 'paidStatus', d: 'unpaid', paid: 'paidStatus', unpaid: 'unpaid' }

export default function Fees() {
  const { t } = useLanguage()
  const { data: rows, loading } = useAsyncData(getFees, [])
  return (
    <div>
      <SectionTitle action={<Button variant="gold">{t('payFees')}</Button>}>{t('feesInvoices')}</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <StatCard eyebrow={t('totalDueFees')} value="E£34,000" accent="#12183B" />
        <StatCard eyebrow={t('totalPaid')} value="E£30,000" accent="#0F7A78" />
        <StatCard eyebrow={t('balance')} value="E£4,000" accent="#B5502F" />
      </div>
      <Card>
        {!loading && (
          <Table columns={[t('student'), t('feeType'), t('amount'), t('paid'), t('balance'), t('status')]}>
            {rows.map((f, i) => (
              <Tr key={i}>
                <Td>{f.student}</Td>
                <Td>{f.type}</Td>
                <Td>E£{f.amount.toLocaleString()}</Td>
                <Td>E£{f.paid.toLocaleString()}</Td>
                <Td>E£{f.balance.toLocaleString()}</Td>
                <Td><Badge tone={statusTone[f.status]}>{t(statusKey[f.status])}</Badge></Td>
              </Tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  )
}
