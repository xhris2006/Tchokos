'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ArrowLeft,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { Logo } from '@/components/layout/Logo'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { cn } from '@/lib/utils'

export function AdminShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const nav = [
    { href: '/admin', label: t('admin.overview'), icon: LayoutDashboard },
    { href: '/admin/products', label: t('admin.products'), icon: Package },
    { href: '/admin/orders', label: t('admin.orders'), icon: ShoppingBag },
    { href: '/admin/users', label: t('admin.users'), icon: Users },
  ]

  const SidebarContent = (
    <>
      <div className="px-5 py-5">
        <Logo showTagline={false} />
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                active
                  ? 'bg-brand-600 text-white shadow-soft'
                  : 'text-ink-soft hover:bg-surface-muted'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-surface-muted"
        >
          <ArrowLeft size={18} />
          {t('admin.backToStore')}
        </Link>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-surface-soft">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-surface-muted bg-white lg:flex">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white shadow-float"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-full text-ink-soft hover:bg-surface-muted"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              {SidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-surface-muted bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-surface-muted lg:hidden"
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-bold text-ink">{t('admin.dashboard')}</h1>

          <div className="relative ml-auto hidden md:block">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              placeholder={t('admin.search')}
              className="h-10 w-56 rounded-xl border border-surface-muted bg-surface-soft pl-9 pr-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none"
            />
          </div>

          <LanguageSwitcher className="ml-auto md:ml-0" />

          <button
            className="relative grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-surface-muted"
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
          </button>

          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
            T
          </span>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
