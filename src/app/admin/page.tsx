'use client'

import Image from 'next/image'
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage, useTranslation } from '@/lib/i18n/LanguageProvider'
import {
  adminStats,
  mockOrders,
  getBestSellers,
  localized,
  categoryName,
} from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import { StatCard } from '@/components/admin/StatCard'
import { SalesChart } from '@/components/admin/SalesChart'
import { StatusBadge } from '@/components/admin/StatusBadge'

const icons: Record<string, LucideIcon> = {
  revenue: DollarSign,
  totalOrders: ShoppingBag,
  totalUsers: Users,
  conversion: TrendingUp,
}

export default function AdminOverviewPage() {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const topProducts = getBestSellers().slice(0, 5)
  const recent = mockOrders.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {adminStats.map((stat, i) => (
          <StatCard
            key={stat.key}
            label={t(`admin.${stat.key}`)}
            value={stat.value}
            change={stat.change}
            icon={icons[stat.key] ?? TrendingUp}
            delay={i * 0.06}
          />
        ))}
      </div>

      {/* Chart + top products */}
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        <div className="rounded-2xl border border-surface-muted bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-ink">{t('admin.topProducts')}</h3>
          <div className="space-y-2.5">
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-2.5">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                  <Image src={p.images[0]} alt={p.name} fill sizes="36px" className="object-cover" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{p.name}</p>
                  <p className="text-[11px] text-ink-muted">{categoryName(p.category, locale)}</p>
                </div>
                <span className="whitespace-nowrap text-xs font-semibold text-ink">{formatPrice(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl border border-surface-muted bg-white">
        <div className="flex items-center justify-between border-b border-surface-muted px-4 py-3">
          <h3 className="text-sm font-semibold text-ink">{t('admin.recentOrders')}</h3>
          <span className="text-xs font-medium text-ink-muted">{mockOrders.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-surface-muted text-left text-[11px] uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-2.5 font-semibold">ID</th>
                <th className="px-4 py-2.5 font-semibold">{t('admin.customer')}</th>
                <th className="hidden px-4 py-2.5 font-semibold sm:table-cell">{t('admin.date')}</th>
                <th className="px-4 py-2.5 font-semibold">{t('admin.status')}</th>
                <th className="px-4 py-2.5 text-right font-semibold">{t('admin.amount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-muted">
              {recent.map((o) => (
                <tr key={o.id} className="transition hover:bg-surface-soft">
                  <td className="px-4 py-2.5 font-medium text-ink">{o.id}</td>
                  <td className="px-4 py-2.5 text-ink-soft">{o.customer}</td>
                  <td className="hidden px-4 py-2.5 text-ink-muted sm:table-cell">{o.date}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right font-semibold text-ink">
                    {formatPrice(o.amount)}
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
