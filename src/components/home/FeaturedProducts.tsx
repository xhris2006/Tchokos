'use client'

import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { getFeatured } from '@/lib/mockData'
import { ProductCard } from '@/components/shop/ProductCard'
import { Reveal, SectionHeader } from '@/components/ui/Section'

export function FeaturedProducts() {
  const { t } = useTranslation()
  const items = getFeatured().slice(0, 8)

  return (
    <section className="container-px pt-10">
      <SectionHeader
        title={t('home.featured')}
        href="/shop"
        actionLabel={t('common.viewAll')}
      />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
