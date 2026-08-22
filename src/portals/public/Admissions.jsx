import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, Button } from '../../components/ui'
import { submitAdmissionApplication } from '../../services/dataService'

const steps = ['step1', 'step2', 'step3', 'step4', 'step5']

export default function Admissions() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ parentName: '', parentEmail: '', parentPhone: '', studentName: '', dob: '', grade: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    const { error } = await submitAdmissionApplication(form)
    setSubmitting(false)
    if (error) {
      console.error('[Admissions] submit failed:', error.message)
      setSubmitError(error.message)
      return
    }
    setSubmitted(true)
  }

  return (
    <Card>
      <h2 className="font-display text-xl text-ink-900 mb-2">{t('admissionsTitle')}</h2>
      <p className="text-[14px] text-ink-500 mb-6">{t('admissionsDesc')}</p>

      <div className="flex gap-1.5 mb-8 flex-wrap">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 min-w-[100px] text-center p-3 bg-parchment-100 rounded-lg">
            <div className="font-display text-lg text-ink-900">{i + 1}</div>
            <div className="text-[11px] text-ink-300 mt-1">{t(s)}</div>
          </div>
        ))}
      </div>

      <h3 className="font-display text-base text-ink-900 mb-3">{t('onlineApp')}</h3>
      {submitted ? (
        <div className="p-4 rounded-lg bg-ok/10 text-ok text-sm font-medium">
          ✓ {t('submitApp')} — {form.studentName || t('studentName')}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
          <input required placeholder={t('parentName')} value={form.parentName} onChange={(e) => update('parentName', e.target.value)}
            className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
          <input required type="email" placeholder={t('parentEmail')} value={form.parentEmail} onChange={(e) => update('parentEmail', e.target.value)}
            className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
          <input required placeholder={t('parentPhone')} value={form.parentPhone} onChange={(e) => update('parentPhone', e.target.value)}
            className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
          <input required placeholder={t('studentName')} value={form.studentName} onChange={(e) => update('studentName', e.target.value)}
            className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
          <input required type="date" aria-label={t('dob')} value={form.dob} onChange={(e) => update('dob', e.target.value)}
            className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
          <select required value={form.grade} onChange={(e) => update('grade', e.target.value)}
            className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass">
            <option value="">{t('selectGrade')}</option>
            <option>KG1</option><option>KG2</option><option>Grade 1-5</option><option>Grade 6-8</option><option>Grade 9-12</option>
          </select>
          {submitError && (
            <div className="sm:col-span-2 p-3 rounded-lg bg-bad/10 text-bad text-sm">
              {t('submitErrorPrefix')} {submitError}
            </div>
          )}
          <div className="sm:col-span-2 mt-1">
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? '…' : t('submitApp')}
            </Button>
          </div>
        </form>
      )}
    </Card>
  )
}
