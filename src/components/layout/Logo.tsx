'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { cn } from '@/lib/utils'

export function Logo({
  showTagline = true,
  className,
}: {
  showTagline?: boolean
  className?: string
}) {
  const { t } = useTranslation()
  return (
    <Link href="/" className={cn('flex items-center gap-2.5', className)}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-soft">
        <ShoppingBag size={20} strokeWidth={2.4} />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold tracking-tight text-ink">
          Tchokos
        </span>
        {showTagline && (
          <span className="hidden text-[11px] font-medium text-ink-muted sm:block">
            {t('common.brandSlogan')}
          </span>
        )}
      </span>
    </Link>
  )
}
