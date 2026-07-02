'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, LayoutGrid, Tag, Heart, User } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { selectWishlistCount, useWishlistStore } from '@/store/wishlistStore'
import { useUiStore } from '@/store/uiStore'
import { useHydrated } from '@/lib/useHydrated'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const hydrated = useHydrated()
  const wishlistCount = useWishlistStore(selectWishlistCount)
  const openAccount = useUiStore((s) => s.openAccount)

  if (pathname.startsWith('/admin')) return null

  const links = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/shop', label: t('nav.categories'), icon: LayoutGrid },
    { href: '/deals', label: t('nav.deals'), icon: Tag },
    { href: '/wishlist', label: t('nav.wishlist'), icon: Heart, badge: true },
  ]

  const itemClass =
    'relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition'

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-muted bg-white/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {links.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(itemClass, active ? 'text-brand-600' : 'text-ink-muted')}
            >
              <span className="relative">
                {active && (
                  <motion.span
                    layoutId="bottomnav-pill"
                    className="absolute -inset-x-3.5 -inset-y-1 rounded-full bg-brand-50"
                    transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  />
                )}
                <item.icon size={21} className="relative z-10" />
                {item.badge && hydrated && wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 z-10 grid h-4 min-w-[16px] place-items-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </span>
              {item.label}
            </Link>
          )
        })}

        <button
          onClick={openAccount}
          className={cn(itemClass, 'text-ink-muted')}
          aria-label={t('nav.account')}
        >
          <User size={21} />
          {t('nav.account')}
        </button>
      </div>
    </nav>
  )
}
