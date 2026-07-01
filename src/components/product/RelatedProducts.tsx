'use client'

import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { getRelated, type Product } from '@/lib/mockData'
import { ProductCard } from '@/components/shop/ProductCard'
import { SectionHeader } from '@/components/ui/Section'

export function RelatedProducts({ product }: { product: Product }) {
  const { t } = useTranslation()
  const related = getRelated(product, 4)

  return (
    <section className="container-px pt-6">
      <SectionHeader title={t('product.related')} />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
