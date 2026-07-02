'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Home,
  LayoutGrid,
  Tag,
  Heart,
  User,
  LifeBuoy,
  X,
  ChevronRight,
} from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { useUiStore } from '@/store/uiStore'
import { categories, localized } from '@/lib/mockData'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

export function MobileDrawer() {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const open = useUiStore((s) => s.menuOpen)
  const close = useUiStore((s) => s.closeMenu)
  const openAccount = useUiStore((s) => s.openAccount)
  const pathname = usePathname()

  useEffect(() => {
    close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/shop', label: t('nav.shop'), icon: LayoutGrid },
    { href: '/shop?sort=sale', label: t('nav.deals'), icon: Tag },
    { href: '/shop', label: t('nav.wishlist'), icon: Heart },
    { href: '/support', label: t('support.title'), icon: LifeBuoy },
  ]

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-float"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-surface-muted p-4">
              <Logo showTagline={false} />
              <button
                onClick={close}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition hover:bg-surface-muted"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              {links.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition',
                      active
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink hover:bg-surface-muted'
                    )}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="px-4">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {t('nav.categories')}
              </p>
              <div className="flex flex-col">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop?category=${c.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink-soft transition hover:bg-surface-muted"
                  >
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                      <Image
                        src={c.image}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                    {localized(c.name, locale)}
                    <ChevronRight size={16} className="ml-auto text-ink-muted" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-3 border-t border-surface-muted p-4">
              <button
                onClick={openAccount}
                className="flex w-full items-center gap-3 rounded-xl bg-surface-muted px-3 py-3 text-sm font-medium text-ink transition hover:bg-surface-soft"
              >
                <User size={18} />
                {t('nav.account')}
              </button>
              <LanguageSwitcher />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
