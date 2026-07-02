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
      className="rounded-2xl border border-surface-muted bg-white p-4"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
          <Icon size={16} />
        </span>
        <span
          className={cn(
            'flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold',
            positive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          )}
        >
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="mt-3 truncate text-lg font-extrabold tracking-tight text-ink">{value}</p>
      <p className="text-xs text-ink-muted">
        {label} <span className="text-[10px]">· {t('admin.vsLastMonth')}</span>
      </p>
    </motion.div>
  )
}
