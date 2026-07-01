'use client'

import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  delay = 0,
}: {
  label: string
  value: string
  change: number
  icon: LucideIcon
  delay?: number
}) {
  const { t } = useTranslation()
  const positive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-surface-muted bg-white p-5"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon size={20} />
        </span>
        <span
          className={cn(
            'flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold',
            positive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          )}
        >
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="mt-4 text-2xl font-extrabold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
      <p className="mt-0.5 text-[11px] text-ink-muted">{t('admin.vsLastMonth')}</p>
    </motion.div>
  )
}
