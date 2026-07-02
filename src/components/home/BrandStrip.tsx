'use client'

import { useTranslation } from '@/lib/i18n/LanguageProvider'

const brands = ['Northline', 'Lumen', 'Meridian', 'Urbano', 'Kasa', 'Peak', 'Vireo', 'Solace']

export function BrandStrip() {
  const { t } = useTranslation()
  // Duplicate the list so the -50% marquee loops seamlessly.
  const row = [...brands, ...brands]

  return (
    <section className="pt-12">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-ink-muted">
        {t('home.trustedBrands')}
      </p>
      <div className="mask-fade-x mt-5 overflow-hidden">
        <div className="flex w-max animate-marquee items-center">
          {row.map((brand, i) => (
            <span
              key={i}
              className="mx-8 font-display text-xl font-bold tracking-tight text-ink/20 transition hover:text-ink/40 sm:mx-10 sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
