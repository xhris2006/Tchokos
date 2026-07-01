'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { LOCALES, type Locale } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-surface-muted bg-white p-0.5 text-xs font-semibold',
        className
      )}
    >
      {LOCALES.map((l: Locale) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase transition',
            locale === l
              ? 'bg-brand-600 text-white'
              : 'text-ink-soft hover:text-ink'
          )}
          aria-pressed={locale === l}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
