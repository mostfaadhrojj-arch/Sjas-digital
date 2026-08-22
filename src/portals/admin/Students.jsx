import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getStudents, createStudent } from '../../services/dataService'
import { Card, SectionTitle, Button, Table, Tr, Td } from '../../components/ui'
import Modal from '../../components/Modal'

const emptyForm = { id: '', name: '', grade: '', gender: 'male', parent_name: '', parent_phone: '', attendance: '', gpa: '' }

export default function Students() {
  const { t } = useLanguage()
  const [reloadKey, setReloadKey] = useState(0)
  const { data: students, loading } = useAsyncData(getStudents, [reloadKey])
  const [q, setQ] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const filtered = (students || []).filter((s) => s.name.toLowerCase().includes(q.toLowerCase()))

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function openModal() {
    const nextNum = (students?.length || 0) + 1
    setForm({ ...emptyForm, id: `STU-${String(nextNum).padStart(3, '0')}` })
    setError(null)
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const { error: err } = await createStudent({
      id: form.id,
      name: form.name,
      grade: form.grade,
      gender: form.gender,
      parent_name: form.parent_name,
      parent_phone: form.parent_phone || null,
      attendance: form.attendance ? Number(form.attendance) : 0,
      gpa: form.gpa ? Number(form.gpa) : 0,
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
      <SectionTitle action={<Button variant="primary" onClick={openModal}>{t('add')}</Button>}>{t('students')}</SectionTitle>
      <Card>
        <div className="flex gap-2.5 mb-4">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search')}
            className="max-w-xs border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-brass" />
          <select className="max-w-[160px] border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none">
            <option>{t('allGrades')}</option>
          </select>
        </div>
        {loading ? (
          <div className="text-sm text-ink-300 py-6">…</div>
        ) : (
          <Table columns={[t('nameId'), t('id'), t('grade'), t('gender'), t('attendance'), t('action')]}>
            {filtered.map((s) => (
              <Tr key={s.id}>
                <Td>
                  <div className="font-medium text-ink-900">{s.name}</div>
                  <div className="text-[11px] text-ink-300">{s.parent_name ?? s.parent}</div>
                </Td>
                <Td>{s.id}</Td>
                <Td>{s.grade}</Td>
                <Td>{t(s.gender)}</Td>
                <Td>{s.attendance}%</Td>
                <Td><Button className="!px-3 !py-1 text-xs">{t('view')}</Button></Td>
              </Tr>
            ))}
          </Table>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('addStudentTitle')}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label={t('id')} value={form.id} onChange={(v) => update('id', v)} required />
          <Field label={t('studentName')} value={form.name} onChange={(v) => update('name', v)} required />
          <Field label={t('grade')} value={form.grade} onChange={(v) => update('grade', v)} required placeholder="Grade 5A" />
          <div>
            <label className="text-xs text-ink-300 mb-1 block">{t('gender')}</label>
            <select value={form.gender} onChange={(e) => update('gender', e.target.value)}
              className="w-full border border-ink-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-brass">
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
            </select>
          </div>
          <Field label={t('parent')} value={form.parent_name} onChange={(v) => update('parent_name', v)} required />
          <Field label={t('parentPhone')} value={form.parent_phone} onChange={(v) => update('parent_phone', v)} placeholder="+201xxxxxxxxx" />
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('attendance')} type="number" value={form.attendance} onChange={(v) => update('attendance', v)} placeholder="96" />
            <Field label={t('gpa')} type="number" step="0.1" value={form.gpa} onChange={(v) => update('gpa', v)} placeholder="3.8" />
          </div>
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
