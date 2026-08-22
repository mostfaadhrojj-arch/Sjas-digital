import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getAnnouncements, createAnnouncement } from '../../services/dataService'
import { Card, SectionTitle, Button, Badge } from '../../components/ui'
import Modal from '../../components/Modal'

const tone = { d: 'bad', i: 'info', urgent: 'bad', info: 'info' }
const label = { d: 'statusNew', i: 'statusEvent', urgent: 'statusNew', info: 'statusEvent' }
const today = () => new Date().toISOString().slice(0, 10)
const emptyForm = { title: '', audience: 'All', priority: 'info', published_at: today() }

export default function Announcements() {
  const { t } = useLanguage()
  const [reloadKey, setReloadKey] = useState(0)
  const { data: rows, loading } = useAsyncData(getAnnouncements, [reloadKey])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function openModal() {
    setForm(emptyForm)
    setError(null)
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const { error: err } = await createAnnouncement(form)
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
      <SectionTitle action={<Button variant="primary" onClick={openModal}>{t('newAnn')}</Button>}>{t('announcements')}</SectionTitle>
      {!loading && (
        <div className="flex flex-col gap-2.5">
          {rows.map((a, i) => (
            <Card key={i}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="text-sm font-medium text-ink-900">{a.title}</div>
                  <div className="text-[11px] text-ink-300 mt-1">
                    {a.audience === 'All' ? t('all') : a.audience} · {a.date || a.published_at}
                  </div>
                </div>
                <Badge tone={tone[a.priority]}>{t(label[a.priority])}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('addAnnouncementTitle')}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label={t('titleLabel')} value={form.title} onChange={(v) => update('title', v)} required />
          <div>
            <label className="text-xs text-ink-300 mb-1 block">{t('to')}</label>
            <select value={form.audience} onChange={(e) => update('audience', e.target.value)}
              className="w-full border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-brass">
              <option value="All">{t('all')}</option>
              <option value="Parents">{t('parent')}</option>
              <option value="Students">{t('student')}</option>
              <option value="Teachers">{t('teacher')}</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-ink-300 mb-1 block">{t('status')}</label>
            <select value={form.priority} onChange={(e) => update('priority', e.target.value)}
              className="w-full border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-brass">
              <option value="info">{t('priorityInfo')}</option>
              <option value="urgent">{t('priorityUrgent')}</option>
            </select>
          </div>
          <Field label={t('date')} type="date" value={form.published_at} onChange={(v) => update('published_at', v)} required />
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
