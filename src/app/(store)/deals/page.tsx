'use client'

import { Flame, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { products } from '@/lib/mockData'
import { discountPercent } from '@/lib/utils'
import { FlashDeals } from '@/components/home/FlashDeals'
import { ProductCard } from '@/components/shop/ProductCard'

export default function DealsPage() {
  const { t } = useTranslation()

  const deals = products
    .filter((p) => p.compareAt && p.compareAt > p.price)
    .sort(
      (a, b) => discountPercent(b.price, b.compareAt) - discountPercent(a.price, a.compareAt)
    )
  const maxDiscount = deals.length
    ? discountPercent(deals[0].price, deals[0].compareAt)
    : 0

  return (
    <div className="pb-4">
      {/* Hero banner */}
      <div className="container-px pt-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-danger via-[#e11d48] to-accent p-6 shadow-float sm:p-8">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-wrap items-center gap-4">
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur"
            >
              <Flame size={24} />
            </motion.span>
            <div className="min-w-0">
              <h1 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                {t('deals.title')}
              </h1>
              <p className="mt-0.5 text-sm text-white/85">{t('deals.subtitle')}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-danger">
                {t('deals.upTo', { percent: maxDiscount })}
              </span>
              <span className="hidden rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur sm:inline-flex">
                <Zap size={13} className="mr-1 fill-current" />
                {t('deals.count', { count: deals.length })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Flash deal countdown */}
      <FlashDeals />

      {/* All deals, biggest discount first */}
      <div className="container-px mt-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
