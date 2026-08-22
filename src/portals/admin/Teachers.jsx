import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getTeachers, createTeacher } from '../../services/dataService'
import { Card, SectionTitle, Button, Table, Tr, Td } from '../../components/ui'
import Modal from '../../components/Modal'

const emptyForm = { name: '', subject: '', email: '' }

export default function Teachers() {
  const { t } = useLanguage()
  const [reloadKey, setReloadKey] = useState(0)
  const { data: teachers, loading } = useAsyncData(getTeachers, [reloadKey])
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
    const { error: err } = await createTeacher(form)
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
      <SectionTitle action={<Button variant="primary" onClick={openModal}>{t('add')}</Button>}>{t('teachers')}</SectionTitle>
      <Card>
        {loading ? <div className="text-sm text-ink-300 py-6">…</div> : (
          <Table columns={[t('nameId'), t('numSubject'), t('numClasses'), t('numStudents'), t('email')]}>
            {teachers.map((tc) => {
              const subjKey = `subjects.${tc.subject}`
              const translated = t(subjKey)
              const subjLabel = translated === subjKey ? tc.subject : translated
              return (
                <Tr key={tc.name}>
                  <Td className="font-medium text-ink-900">{tc.name}</Td>
                  <Td>{subjLabel}</Td>
                  <Td>{tc.classes}</Td>
                  <Td>{tc.students}</Td>
                  <Td className="text-[12px] text-ink-500">{tc.email || `${tc.name.split(' ').pop().toLowerCase()}@sjas.edu.eg`}</Td>
                </Tr>
              )
            })}
          </Table>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t('addTeacherTitle')}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label={t('name')} value={form.name} onChange={(v) => update('name', v)} required />
          <Field label={t('numSubject')} value={form.subject} onChange={(v) => update('subject', v)} required placeholder="Mathematics" />
          <Field label={t('email')} type="email" value={form.email} onChange={(v) => update('email', v)} />
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
