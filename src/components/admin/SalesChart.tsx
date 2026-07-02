'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { salesByMonth } from '@/lib/mockData'

export function SalesChart() {
  const { t } = useTranslation()
  const max = Math.max(...salesByMonth.map((d) => d.value))

  return (
    <div className="rounded-2xl border border-surface-muted bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">{t('admin.salesOverview')}</h3>
        <span className="text-xs font-medium text-ink-muted">2026</span>
      </div>
      <div className="flex h-40 gap-1.5 sm:gap-2.5">
        {salesByMonth.map((d, i) => (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
                className="w-full rounded-t-md bg-gradient-to-t from-brand-500 to-brand-400 transition-colors hover:from-brand-600 hover:to-brand-500"
                title={`${d.month}: ${d.value}k`}
              />
            </div>
            <span className="text-[10px] font-medium text-ink-muted">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
