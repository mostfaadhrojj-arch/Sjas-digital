import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getFees, sendWhatsAppReminder } from '../../services/dataService'
import { Card, SectionTitle, StatCard, Badge, Button, Table, Tr, Td } from '../../components/ui'

const statusTone = { s: 'ok', d: 'bad', paid: 'ok', unpaid: 'bad' }
const statusKey = { s: 'paidStatus', d: 'unpaid', paid: 'paidStatus', unpaid: 'unpaid' }
const unpaidStatuses = new Set(['d', 'unpaid'])

export default function Fees() {
  const { t } = useLanguage()
  const { data: rows, loading } = useAsyncData(getFees, [])
  const [sendingIndex, setSendingIndex] = useState(null)
  const [feedback, setFeedback] = useState({}) // index -> 'sent' | error message

  async function handleSendReminder(f, i) {
    setSendingIndex(i)
    setFeedback((fb) => ({ ...fb, [i]: null }))
    const message = `${t('schoolName')}: ${t('feeReminder')} ${f.student} — ${t('balance')} E£${f.balance.toLocaleString()} (${f.type}).`
    const { error } = await sendWhatsAppReminder(f.parent_phone, message)
    setSendingIndex(null)
    setFeedback((fb) => ({ ...fb, [i]: error ? error.message : 'sent' }))
  }

  return (
    <div>
      <SectionTitle>{t('fees')}</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <StatCard eyebrow={t('totalDue')} value="E£2.45M" accent="#12183B" />
        <StatCard eyebrow={t('collected')} value="E£1.82M" accent="#0F7A78" trend="" />
        <StatCard eyebrow={t('outstanding')} value="E£630K" accent="#B5502F" />
      </div>
      <Card>
        {!loading && (
          <Table columns={[t('student'), t('feeType'), t('amount'), t('paid'), t('balance'), t('status'), t('action')]}>
            {rows.map((f, i) => (
              <Tr key={i}>
                <Td>{f.student}</Td>
                <Td>{f.type}</Td>
                <Td>E£{f.amount.toLocaleString()}</Td>
                <Td>E£{f.paid.toLocaleString()}</Td>
                <Td>E£{f.balance.toLocaleString()}</Td>
                <Td><Badge tone={statusTone[f.status]}>{t(statusKey[f.status])}</Badge></Td>
                <Td>
                  {unpaidStatuses.has(f.status) && (
                    <div className="flex flex-col gap-1 items-start">
                      <Button
                        className="!px-3 !py-1 text-xs"
                        disabled={sendingIndex === i}
                        onClick={() => handleSendReminder(f, i)}
                      >
                        {sendingIndex === i ? '…' : '📱 ' + t('sendReminder')}
                      </Button>
                      {feedback[i] === 'sent' && <span className="text-[11px] text-ok">{t('reminderSent')}</span>}
                      {feedback[i] && feedback[i] !== 'sent' && (
                        <span className="text-[11px] text-bad">{feedback[i]}</span>
                      )}
                    </div>
                  )}
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Card>
    </div>
  )
}
