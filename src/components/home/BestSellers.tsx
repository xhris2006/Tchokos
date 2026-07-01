'use client'

import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { getBestSellers } from '@/lib/mockData'
import { ProductCard } from '@/components/shop/ProductCard'
import { SectionHeader } from '@/components/ui/Section'

export function BestSellers() {
  const { t } = useTranslation()
  const items = getBestSellers()

  return (
    <section className="container-px pt-10">
      <SectionHeader
        title={t('home.bestSellers')}
        href="/shop?sort=popular"
        actionLabel={t('common.viewAll')}
      />
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="no-scrollbar mt-5 flex snap-x gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible">
        {items.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            className="w-44 shrink-0 snap-start sm:w-52 lg:w-auto"
          />
        ))}
      </div>
    </section>
  )
}
