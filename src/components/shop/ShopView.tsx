'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { products, type CategorySlug } from '@/lib/mockData'
import {
  applyFilters,
  countActiveFilters,
  defaultFilters,
  type ShopFilters,
  type SortKey,
} from '@/lib/shop'
import { Filters } from './Filters'
import { SortDropdown } from './SortDropdown'
import { ProductGrid } from './ProductGrid'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

const CATEGORY_SLUGS: CategorySlug[] = [
  'fashion',
  'electronics',
  'beauty',
  'home',
  'sports',
  'accessories',
]

export function ShopView() {
  const { t } = useTranslation()
  const params = useSearchParams()

  const [filters, setFilters] = useState<ShopFilters>(() => {
    const category = params.get('category')
    const q = params.get('q')
    const sort = params.get('sort')
    return {
      ...defaultFilters,
      category:
        category && CATEGORY_SLUGS.includes(category as CategorySlug)
          ? (category as CategorySlug)
          : 'all',
      query: q ?? '',
      sort: (sort as SortKey) || defaultFilters.sort,
    }
  })
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  // React to external navigation (e.g. header search, category links)
  useEffect(() => {
    const category = params.get('category')
    const q = params.get('q')
    const sort = params.get('sort')
    setFilters((prev) => ({
      ...prev,
      category:
        category && CATEGORY_SLUGS.includes(category as CategorySlug)
          ? (category as CategorySlug)
          : 'all',
      query: q ?? '',
      sort: (sort as SortKey) || prev.sort,
    }))
  }, [params])

  // Brief skeleton flash on every filter change for perceived responsiveness
  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => setLoading(false), 280)
    return () => clearTimeout(id)
  }, [filters])

  const result = useMemo(() => applyFilters(products, filters), [filters])
  const patch = (p: Partial<ShopFilters>) => setFilters((f) => ({ ...f, ...p }))
  const activeCount = countActiveFilters(filters)

  return (
    <div className="container-px py-6">
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('shop.title')}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {t('shop.showing', { count: result.length })}
          {filters.query && ` · “${filters.query}”`}
        </p>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-28 rounded-2xl border border-surface-muted bg-white p-4">
            <Filters value={filters} onChange={patch} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <SlidersHorizontal size={16} />
              {t('shop.filters')}
              {activeCount > 0 && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </Button>
            <span className="hidden text-sm text-ink-muted lg:block">
              {result.length} {t('common.results')}
            </span>
            <div className="ml-auto">
              <SortDropdown value={filters.sort} onChange={(sort) => patch({ sort })} />
            </div>
          </div>

          <ProductGrid products={result} loading={loading} />
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Modal
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title={t('shop.filters')}
        className="max-h-[85vh] overflow-y-auto"
      >
        <Filters
          value={filters}
          onChange={patch}
          onCategorySelect={() => setMobileOpen(false)}
        />
        <div className="sticky bottom-0 mt-5 flex gap-2 bg-white pt-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setFilters(defaultFilters)}
          >
            {t('shop.clear')}
          </Button>
          <Button className="flex-1" onClick={() => setMobileOpen(false)}>
            {t('shop.apply')} ({result.length})
          </Button>
        </div>
      </Modal>
    </div>
  )
}
