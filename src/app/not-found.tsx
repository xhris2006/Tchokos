'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { Logo } from '@/components/layout/Logo'
import { buttonVariants } from '@/components/ui/Button'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo showTagline={false} />
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-display text-7xl font-extrabold text-brand-600"
      >
        404
      </motion.p>
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{t('notFound.title')}</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-muted">{t('notFound.desc')}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants()}>
          <Home size={18} />
          {t('notFound.back')}
        </Link>
        <Link href="/shop" className={buttonVariants({ variant: 'outline' })}>
          <Search size={18} />
          {t('nav.shop')}
        </Link>
      </div>
    </div>
  )
}
