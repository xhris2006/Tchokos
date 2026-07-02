'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage, useTranslation } from '@/lib/i18n/LanguageProvider'
import { categories, localized } from '@/lib/mockData'
import { Reveal, SectionHeader } from '@/components/ui/Section'

export function PopularCategories() {
  const { t } = useTranslation()
  const { locale } = useLanguage()

  return (
    <section className="container-px pt-10">
      <SectionHeader
        title={t('home.popularCategories')}
        href="/shop"
        actionLabel={t('common.viewAll')}
      />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <Link
              href={`/shop?category=${c.slug}`}
              className="card group flex items-center gap-3 overflow-hidden p-3 transition-shadow hover:shadow-card"
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                <Image
                  src={c.image}
                  alt={localized(c.name, locale)}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {localized(c.name, locale)}
                </p>
                <p className="text-xs text-ink-muted">
                  {c.itemCount.toLocaleString()}+ {t('home.items')}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
