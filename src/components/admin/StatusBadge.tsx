'use client'

import { useTranslation } from '@/lib/i18n/LanguageProvider'
import type { OrderStatus } from '@/lib/mockData'
import { cn } from '@/lib/utils'

const styles: Record<OrderStatus, string> = {
  paid: 'bg-success/10 text-success',
  pending: 'bg-accent/10 text-accent',
  shipped: 'bg-brand-50 text-brand-700',
  refunded: 'bg-danger/10 text-danger',
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useTranslation()
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        styles[status]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {t(`admin.${status}`)}
    </span>
  )
}
