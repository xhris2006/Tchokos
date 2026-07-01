'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { selectCount, useCartStore } from '@/store/cartStore'
import { selectWishlistCount, useWishlistStore } from '@/store/wishlistStore'
import { useUiStore } from '@/store/uiStore'
import { useHydrated } from '@/lib/useHydrated'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
      {count > 99 ? '99+' : count}
    </span>
  )
}

export function Header() {
  const { t } = useTranslation()
  const router = useRouter()
  const hydrated = useHydrated()
  const cartCount = useCartStore(selectCount)
  const wishlistCount = useWishlistStore(selectWishlistCount)
  const openCart = useCartStore((s) => s.openCart)
  const openMenu = useUiStore((s) => s.openMenu)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop')
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-brand-600 text-white">
        <div className="container-px flex h-9 items-center justify-center gap-2 text-center text-[13px] font-medium">
          <span className="truncate">{t('home.announce')}</span>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          'border-b border-surface-muted bg-white/90 backdrop-blur transition-shadow',
          scrolled && 'shadow-soft'
        )}
      >
        <div className="container-px flex h-16 items-center gap-3 sm:gap-5">
          <button
            onClick={openMenu}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-xl text-ink transition hover:bg-surface-muted lg:hidden"
          >
            <Menu size={22} />
          </button>

          <Logo />

          <form onSubmit={onSearch} className="relative hidden flex-1 md:block">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.search')}
              className="h-11 w-full rounded-xl border border-surface-muted bg-surface-soft pl-11 pr-28 text-sm text-ink placeholder:text-ink-muted focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/15"
            />
            <button
              type="submit"
              className="btn absolute right-1.5 top-1.5 h-8 bg-brand-600 px-4 text-white hover:bg-brand-700"
            >
              <Search size={16} />
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher className="hidden sm:inline-flex" />

            <Link
              href="/admin"
              aria-label={t('nav.account')}
              className="hidden h-10 w-10 place-items-center rounded-xl text-ink transition hover:bg-surface-muted sm:grid"
            >
              <User size={20} />
            </Link>

            <Link
              href="/shop"
              aria-label={t('nav.wishlist')}
              className="relative grid h-10 w-10 place-items-center rounded-xl text-ink transition hover:bg-surface-muted"
            >
              <Heart size={20} />
              {hydrated && <CountBadge count={wishlistCount} />}
            </Link>

            <button
              onClick={openCart}
              aria-label={t('nav.cart')}
              className="relative grid h-10 w-10 place-items-center rounded-xl text-ink transition hover:bg-surface-muted"
            >
              <ShoppingCart size={20} />
              {hydrated && <CountBadge count={cartCount} />}
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="container-px pb-3 md:hidden">
          <form onSubmit={onSearch} className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.searchShort')}
              className="h-11 w-full rounded-xl border border-surface-muted bg-surface-soft pl-11 pr-4 text-sm text-ink placeholder:text-ink-muted focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/15"
            />
          </form>
        </div>
      </div>

      {/* subtle animated progress hint */}
      <motion.div
        className="h-0.5 bg-gradient-to-r from-brand-600 via-brand-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        style={{ transformOrigin: 'left' }}
        transition={{ duration: 0.4 }}
      />
    </header>
  )
}
