'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useLanguage, useTranslation } from '@/lib/i18n/LanguageProvider'
import { products, categoryName } from '@/lib/mockData'
import { formatPrice, cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export default function AdminProductsPage() {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const [query, setQuery] = useState('')

  const list = products.filter((p) =>
    `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">{t('admin.products')}</h2>
          <p className="text-sm text-ink-muted">{products.length} {t('common.results')}</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('admin.search')}
              className="h-11 w-full rounded-xl border border-surface-muted bg-white pl-9 pr-3 text-sm focus:border-brand-400 focus:outline-none"
            />
          </div>
          <Button>
            <Plus size={16} />
            <span className="hidden sm:inline">{t('admin.addProduct')}</span>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-muted bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-muted text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3 font-semibold">{t('admin.name')}</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">{t('shop.category')}</th>
                <th className="px-5 py-3 font-semibold">{t('shop.price')}</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">{t('admin.stock')}</th>
                <th className="px-5 py-3 font-semibold">{t('admin.status')}</th>
                <th className="px-5 py-3 text-right font-semibold">{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-muted">
              {list.map((p) => (
                <tr key={p.id} className="transition hover:bg-surface-soft">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                        <Image src={p.images[0]} alt={p.name} fill sizes="40px" className="object-cover" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{p.name}</p>
                        <p className="text-xs text-ink-muted">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-ink-soft md:table-cell">
                    {categoryName(p.category, locale)}
                  </td>
                  <td className="px-5 py-3 font-semibold text-ink">{formatPrice(p.price)}</td>
                  <td className="hidden px-5 py-3 sm:table-cell">
                    <span
                      className={cn(
                        'font-medium',
                        p.stock > 20 ? 'text-ink-soft' : 'text-danger'
                      )}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                        p.stock > 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.stock > 0 ? t('admin.published') : t('admin.draft')}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-muted hover:text-brand-700">
                        <Pencil size={15} />
                      </button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-muted hover:text-danger">
                        <Trash2 size={15} />
                      </button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-muted">
                        <MoreHorizontal size={15} />
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
