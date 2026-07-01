'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { Button } from '@/components/ui/Button'

export function Newsletter() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 3500)
  }

  return (
    <section className="container-px pt-12">
      <div className="relative overflow-hidden rounded-3xl bg-brand-900 p-7 shadow-float sm:p-10">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute -bottom-12 right-1/4 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-start gap-4">
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-white sm:grid">
              <Mail size={22} />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                {t('home.newsletterTitle')}
              </h2>
              <p className="mt-1.5 max-w-md text-sm text-white/70">
                {t('home.newsletterDesc')}
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.emailPlaceholder')}
              className="h-12 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Button type="submit" size="lg" className="bg-white text-brand-700 hover:bg-white/90">
              {done ? <Check size={18} /> : t('home.subscribe')}
            </Button>
          </form>
        </div>

        {done && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-4 text-center text-sm font-medium text-accent lg:text-right"
          >
            {t('home.subscribed')}
          </motion.p>
        )}
      </div>
    </section>
  )
}
