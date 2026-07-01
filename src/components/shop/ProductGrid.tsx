'use client'

import { SearchX } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import type { Product } from '@/lib/mockData'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'

export function ProductGrid({
  products,
  loading = false,
  cols = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
}: {
  products: Product[]
  loading?: boolean
  cols?: string
}) {
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className={`grid gap-3 lg:gap-4 ${cols}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-surface-muted py-20 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-surface-muted text-ink-muted">
          <SearchX size={24} />
        </span>
        <p className="text-sm font-medium text-ink-soft">{t('shop.noResults')}</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-3 lg:gap-4 ${cols}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
