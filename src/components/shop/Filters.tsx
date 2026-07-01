'use client'

import { Check } from 'lucide-react'
import { useLanguage, useTranslation } from '@/lib/i18n/LanguageProvider'
import { categories, localized } from '@/lib/mockData'
import {
  allColors,
  allSizes,
  countActiveFilters,
  defaultFilters,
  PRICE_CEILING,
  type ShopFilters,
} from '@/lib/shop'
import { formatPrice, cn } from '@/lib/utils'

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-surface-muted pb-3.5 last:border-0 last:pb-0">
      <h4 className="mb-2 text-[13px] font-semibold text-ink">{title}</h4>
      {children}
    </div>
  )
}

export function Filters({
  value,
  onChange,
  onCategorySelect,
}: {
  value: ShopFilters
  onChange: (patch: Partial<ShopFilters>) => void
  onCategorySelect?: () => void
}) {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const active = countActiveFilters(value)

  const toggleSize = (s: string) =>
    onChange({
      sizes: value.sizes.includes(s)
        ? value.sizes.filter((x) => x !== s)
        : [...value.sizes, s],
    })

  const toggleColor = (hex: string) =>
    onChange({
      colors: value.colors.includes(hex)
        ? value.colors.filter((x) => x !== hex)
        : [...value.colors, hex],
    })

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink">{t('shop.filters')}</h3>
        {active > 0 && (
          <button
            onClick={() => onChange(defaultFilters)}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            {t('shop.clear')}
          </button>
        )}
      </div>

      <Group title={t('shop.category')}>
        <div className="space-y-1">
          {[{ slug: 'all' as const, name: { fr: 'Toutes', en: 'All' } }, ...categories].map(
            (c) => {
              const checked = value.category === c.slug
              return (
                <button
                  key={c.slug}
                  onClick={() => {
                    onChange({ category: c.slug })
                    onCategorySelect?.()
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] transition',
                    checked
                      ? 'bg-brand-50 font-semibold text-brand-700'
                      : 'text-ink-soft hover:bg-surface-muted'
                  )}
                >
                  {c.slug === 'all'
                    ? t('shop.allCategories')
                    : localized(c.name, locale)}
                  {checked && <Check size={15} />}
                </button>
              )
            }
          )}
        </div>
      </Group>

      <Group title={t('shop.price')}>
        <input
          type="range"
          min={0}
          max={PRICE_CEILING}
          step={5000}
          value={value.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-muted accent-brand-600"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-ink-soft">
          <span>{formatPrice(0)}</span>
          <span className="font-semibold text-ink">
            ≤ {formatPrice(value.maxPrice)}
          </span>
        </div>
      </Group>

      <Group title={t('shop.size')}>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => {
            const checked = value.sizes.includes(s)
            return (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={cn(
                  'min-w-[42px] rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition',
                  checked
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-surface-muted text-ink-soft hover:border-brand-300'
                )}
              >
                {s}
              </button>
            )
          })}
        </div>
      </Group>

      <Group title={t('shop.color')}>
        <div className="flex flex-wrap gap-2.5">
          {allColors.map((c) => {
            const checked = value.colors.includes(c.hex)
            return (
              <button
                key={c.hex}
                onClick={() => toggleColor(c.hex)}
                aria-label={localized(c.name, locale)}
                title={localized(c.name, locale)}
                className={cn(
                  'grid h-8 w-8 place-items-center rounded-full ring-1 ring-inset ring-black/10 transition',
                  checked && 'ring-2 ring-brand-600 ring-offset-2'
                )}
                style={{ backgroundColor: c.hex }}
              >
                {checked && (
                  <Check
                    size={14}
                    className={c.hex === '#f8fafc' ? 'text-ink' : 'text-white'}
                  />
                )}
              </button>
            )
          })}
        </div>
      </Group>
    </div>
  )
}
