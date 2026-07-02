'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check, ArrowUpDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import type { SortKey } from '@/lib/shop'
import { cn } from '@/lib/utils'

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey
  onChange: (key: SortKey) => void
}) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const options: { key: SortKey; label: string }[] = [
    { key: 'popular', label: t('shop.popular') },
    { key: 'latest', label: t('shop.latest') },
    { key: 'price-asc', label: t('shop.priceLow') },
    { key: 'price-desc', label: t('shop.priceHigh') },
    { key: 'rating', label: t('shop.rating') },
  ]

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = options.find((o) => o.key === value)?.label ?? options[0].label

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn h-10 gap-2 border border-surface-muted bg-white px-4 text-[13px] text-ink hover:bg-surface-soft"
      >
        <ArrowUpDown size={16} className="text-ink-muted" />
        <span className="hidden text-ink-muted sm:inline">{t('shop.sortBy')}:</span>
        <span className="font-semibold">{current}</span>
        <ChevronDown
          size={16}
          className={cn('text-ink-muted transition', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-surface-muted bg-white p-1.5 shadow-card"
          >
            {options.map((o) => (
              <button
                key={o.key}
                onClick={() => {
                  onChange(o.key)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition',
                  value === o.key
                    ? 'bg-brand-50 font-semibold text-brand-700'
                    : 'text-ink-soft hover:bg-surface-muted'
                )}
              >
                {o.label}
                {value === o.key && <Check size={15} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
