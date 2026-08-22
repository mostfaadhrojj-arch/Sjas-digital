import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getHomework, getClasses, createHomework } from '../../services/dataService'
import { Card, SectionTitle, Button, Badge } from '../../components/ui'
import Modal from '../../components/Modal'

const tone = { s: 'ok', d: 'bad', submitted: 'ok', due: 'bad', scheduled: 'warn' }
const label = { s: 'submitted', d: 'dueSoon', submitted: 'submitted', due: 'dueSoon', scheduled: 'scheduled' }
const emptyForm = { title: '', class_id: '', due_date: '' }

export default function HomeworkPage() {
  const { t } = useLanguage()
  const [reloadKey, setReloadKey] = useState(0)
  const { data: rows, loading } = useAsyncData(getHomework, [reloadKey])
  const { data: classes } = useAsyncData(getClasses, [])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function openModal() {
    setForm({ ...emptyForm, class_id: classes?.[0]?.id || '' })
    setError(null)
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const { error: err } = await createHomework({
      title: form.title,
      class_id: form.class_id || null,
      due_date: form.due_date,
      status: 'scheduled',
      submitted_count: 0,
      total_count: 0,
    })
    setSaving(false)
    if (err) {
      setError(err.message)
      return
    }
    setModalOpen(false)
    setReloadKey((k) => k + 1)
  }

  return (
    <div>
      <SectionTitle action={<Button variant="primary" onClick={openModal}>{t('create')}</Button>}>{t('homework')}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-2.5">
          {rows.map((w, i) => (
            <Card key={i}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="text-sm font-medium text-ink-900">{w.title}</div>
                  <div className="text-[12px] text-ink-300 mt-1">
                    {w.class} · {t('due')} {w.due} · {w.submitted}/{w.total} {t('submitted').toLowerCase()}
                  </div>
                </div>
                <Badge tone={tone[w.status]}>{t(label[w.status])}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('addHomeworkTitle')}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label={t('titleLabel')} value={form.title} onChange={(v) => update('title', v)} required placeholder="Math: Fractions Worksheet" />
          <div>
            <label className="text-xs text-ink-300 mb-1 block">{t('className')}</label>
            <select value={form.class_id} onChange={(e) => update('class_id', e.target.value)}
              className="w-full border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-brass">
              {(classes || []).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <Field label={t('due')} type="date" value={form.due_date} onChange={(v) => update('due_date', v)} required />
          {error && <div className="p-2.5 rounded-lg bg-bad/10 text-bad text-xs">{error}</div>}
          <div className="flex gap-2 justify-end mt-2">
            <Button type="button" onClick={() => setModalOpen(false)}>{t('cancel')}</Button>
            <Button type="submit" variant="primary" disabled={saving}>{saving ? '…' : t('save')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function Field({ label, onChange, ...props }) {
  return (
    <div>
      <label className="text-xs text-ink-300 mb-1 block">{label}</label>
      <input
        {...props}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-brass"
      />
    </div>
  )
}
