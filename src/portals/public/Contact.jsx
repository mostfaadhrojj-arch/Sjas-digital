import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { Card, Button } from '../../components/ui'

export default function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)

  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <Card>
        <h3 className="font-display text-lg text-ink-900 mb-4">{t('contactTitle')}</h3>
        <div className="flex flex-col gap-3 text-sm text-ink-700">
          <div className="flex gap-2"><span>📍</span><span>{t('address')}</span></div>
          <div className="flex gap-2"><span>📞</span><span dir="ltr">{t('phone')}</span></div>
          <div className="flex gap-2"><span>✉️</span><span>sjas.contact@gmail.com</span></div>
          <div className="flex gap-2"><span>🌐</span><span>{t('website')}</span></div>
        </div>
        <div className="mt-5 p-4 bg-parchment-100 rounded-lg">
          <div className="text-[11px] text-ink-300">{t('hours')}</div>
          <div className="text-sm text-ink-900 mt-1">{t('hoursVal')}</div>
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-lg text-ink-900 mb-4">{t('sendMessage')}</h3>
        {sent ? (
          <div className="p-4 rounded-lg bg-ok/10 text-ok text-sm font-medium">✓ {t('send')} — {t('schoolName')}</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="flex flex-col gap-3">
            <input required placeholder={t('name')} className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
            <input required type="email" placeholder={t('emailLabel')} className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
            <input required placeholder={t('subject')} className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass" />
            <textarea required placeholder={t('message')} rows={4} className="border border-ink-100 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brass resize-y" />
            <Button variant="primary" type="submit" className="w-fit">{t('send')}</Button>
          </form>
        )}
      </Card>
    </div>
  )
}
