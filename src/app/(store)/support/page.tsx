'use client'

import { useState } from 'react'
import {
  LifeBuoy,
  Mail,
  Users,
  ChevronDown,
  Clock3,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { useToastStore } from '@/store/toastStore'
import { cn } from '@/lib/utils'

function SoonBadge() {
  const { t } = useTranslation()
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
      <Clock3 size={12} />
      {t('support.soon')}
    </span>
  )
}

export default function SupportPage() {
  const { t } = useTranslation()
  const notify = useToastStore((s) => s.notify)
  const [open, setOpen] = useState<number | null>(0)

  const faqs = [
    { q: t('support.q1'), a: t('support.a1') },
    { q: t('support.q2'), a: t('support.a2') },
    { q: t('support.q3'), a: t('support.a3') },
    { q: t('support.q4'), a: t('support.a4') },
  ]

  return (
    <div className="container-px py-8">
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <LifeBuoy size={22} />
        </span>
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {t('support.title')}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">{t('support.subtitle')}</p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {/* Contact */}
        <div className="card flex flex-col p-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Mail size={19} />
          </span>
          <h2 className="mt-4 text-base font-bold text-ink">{t('support.contactTitle')}</h2>
          <p className="mt-1 flex-1 text-sm text-ink-soft">{t('support.contactDesc')}</p>
          <a
            href="mailto:support@tchokos.com"
            className="btn mt-4 h-11 w-fit bg-brand-600 px-5 text-white hover:bg-brand-700"
          >
            <Mail size={16} />
            {t('support.emailUs')}
          </a>
        </div>

        {/* Group */}
        <div className="card flex flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
              <Users size={19} />
            </span>
            <SoonBadge />
          </div>
          <h2 className="mt-4 text-base font-bold text-ink">{t('support.groupTitle')}</h2>
          <p className="mt-1 flex-1 text-sm text-ink-soft">{t('support.groupDesc')}</p>
          <button
            onClick={() => notify(t('support.soon'), 'check')}
            className="btn mt-4 h-11 w-fit border border-surface-muted bg-white px-5 text-ink hover:bg-surface-soft"
          >
            <Users size={16} />
            {t('support.joinGroup')}
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-8">
        <h2 className="font-display text-lg font-bold tracking-tight text-ink">
          {t('support.faqTitle')}
        </h2>
        <div className="mt-4 space-y-2.5">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-ink">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'shrink-0 text-ink-muted transition-transform',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed text-ink-soft">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
