'use client'

import { useState } from 'react'
import { Eye } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { mockOrders, type OrderStatus } from '@/lib/mockData'
import { formatPrice, cn } from '@/lib/utils'
import { StatusBadge } from '@/components/admin/StatusBadge'

const FILTERS: (OrderStatus | 'all')[] = ['all', 'paid', 'pending', 'shipped', 'refunded']

export default function AdminOrdersPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')

  const list =
    filter === 'all' ? mockOrders : mockOrders.filter((o) => o.status === filter)

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-ink">{t('admin.orders')}</h2>
        <p className="text-sm text-ink-muted">{mockOrders.length} {t('common.results')}</p>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition',
              filter === f
                ? 'bg-brand-600 text-white'
                : 'bg-white text-ink-soft ring-1 ring-inset ring-surface-muted hover:bg-surface-muted'
            )}
          >
            {f === 'all' ? t('shop.allCategories') : t(`admin.${f}`)}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-muted bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-muted text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3 font-semibold">ID</th>
                <th className="px-5 py-3 font-semibold">{t('admin.customer')}</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">{t('admin.date')}</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">{t('cart.items')}</th>
                <th className="px-5 py-3 font-semibold">{t('admin.status')}</th>
                <th className="px-5 py-3 text-right font-semibold">{t('admin.amount')}</th>
                <th className="px-5 py-3 text-right font-semibold">{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-muted">
              {list.map((o) => (
                <tr key={o.id} className="transition hover:bg-surface-soft">
                  <td className="px-5 py-3 font-medium text-ink">{o.id}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-ink">{o.customer}</p>
                    <p className="text-xs text-ink-muted">{o.email}</p>
                  </td>
                  <td className="hidden px-5 py-3 text-ink-muted md:table-cell">{o.date}</td>
                  <td className="hidden px-5 py-3 text-ink-soft sm:table-cell">{o.items}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-ink">
                    {formatPrice(o.amount)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-muted hover:text-brand-700">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
