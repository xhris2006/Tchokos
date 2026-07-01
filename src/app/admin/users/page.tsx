'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail, MoreHorizontal } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { mockUsers, type UserRole } from '@/lib/mockData'
import { cn } from '@/lib/utils'

const roleStyles: Record<UserRole, string> = {
  admin: 'bg-brand-50 text-brand-700',
  vendor: 'bg-accent/10 text-accent',
  customer: 'bg-surface-muted text-ink-soft',
}

export default function AdminUsersPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const list = mockUsers.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">{t('admin.users')}</h2>
          <p className="text-sm text-ink-muted">{mockUsers.length} {t('common.results')}</p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('admin.search')}
          className="h-11 rounded-xl border border-surface-muted bg-white px-4 text-sm focus:border-brand-400 focus:outline-none sm:w-56"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-muted bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-muted text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3 font-semibold">{t('admin.name')}</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">{t('admin.role')}</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">{t('admin.joined')}</th>
                <th className="px-5 py-3 font-semibold">{t('admin.orders')}</th>
                <th className="px-5 py-3 text-right font-semibold">{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-muted">
              {list.map((u) => (
                <tr key={u.id} className="transition hover:bg-surface-soft">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-muted">
                        <Image src={u.avatar} alt={u.name} fill sizes="40px" className="object-cover" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{u.name}</p>
                        <p className="truncate text-xs text-ink-muted">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 md:table-cell">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
                        roleStyles[u.role]
                      )}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3 text-ink-muted sm:table-cell">{u.joined}</td>
                  <td className="px-5 py-3 font-semibold text-ink">{u.orders}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-muted hover:text-brand-700">
                        <Mail size={15} />
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
