'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, Menu, Search, ShoppingCart, User, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage, useTranslation } from '@/lib/i18n/LanguageProvider'
import { categories, localized } from '@/lib/mockData'
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
  const { locale } = useLanguage()
  const router = useRouter()
  const hydrated = useHydrated()
  const cartCount = useCartStore(selectCount)
  const wishlistCount = useWishlistStore(selectWishlistCount)
  const openCart = useCartStore((s) => s.openCart)
  const openMenu = useUiStore((s) => s.openMenu)
  const openAccount = useUiStore((s) => s.openAccount)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      // Hide when scrolling down (past a small threshold), reveal when scrolling up.
      if (y > lastY.current && y > 140) setHidden(true)
      else if (y < lastY.current) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop')
  }

  return (
    <>
      {/* Announcement bar — scrolls away naturally, not sticky */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 text-white">
        <div className="container-px flex h-8 items-center justify-center gap-2 text-center text-xs font-medium">
          <Zap size={13} className="shrink-0 fill-accent text-accent" />
          <span className="truncate">{t('home.announce')}</span>
        </div>
      </div>

      <motion.header
        className="sticky top-0 z-50"
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Main bar */}
        <div
          className={cn(
            'border-b border-surface-muted bg-white/95 backdrop-blur-md transition-shadow',
            scrolled && 'shadow-soft'
          )}
        >
          <div className="container-px flex h-14 items-center gap-3 sm:gap-4">
            <button
              onClick={openMenu}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-xl text-ink transition hover:bg-surface-muted lg:hidden"
            >
              <Menu size={20} />
            </button>

            <Logo />

            <form onSubmit={onSearch} className="relative hidden flex-1 md:block md:max-w-xl lg:mx-auto">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('common.search')}
                className="h-10 w-full rounded-full border border-surface-muted bg-surface-soft pl-11 pr-24 text-[13px] text-ink placeholder:text-ink-muted transition focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/15"
              />
              <button
                type="submit"
                className="btn absolute right-1 top-1 h-8 rounded-full bg-brand-600 px-4 text-white hover:bg-brand-700"
              >
                <Search size={15} />
              </button>
            </form>

            <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
              <LanguageSwitcher className="hidden sm:inline-flex" />

              <button
                onClick={openAccount}
                aria-label={t('nav.account')}
                className="hidden h-9 w-9 place-items-center rounded-xl text-ink transition hover:bg-surface-muted sm:grid"
              >
                <User size={19} />
              </button>

              <Link
                href="/shop"
                aria-label={t('nav.wishlist')}
                className="relative grid h-9 w-9 place-items-center rounded-xl text-ink transition hover:bg-surface-muted"
              >
                <Heart size={19} />
                {hydrated && <CountBadge count={wishlistCount} />}
              </Link>

              <button
                onClick={openCart}
                aria-label={t('nav.cart')}
                className="relative grid h-9 w-9 place-items-center rounded-xl text-ink transition hover:bg-surface-muted"
              >
                <ShoppingCart size={19} />
                {hydrated && <CountBadge count={cartCount} />}
              </button>
            </div>
          </div>

          {/* Mobile search row */}
          <div className="container-px pb-2.5 md:hidden">
            <form onSubmit={onSearch} className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('common.searchShort')}
                className="h-10 w-full rounded-full border border-surface-muted bg-surface-soft pl-11 pr-4 text-[13px] text-ink placeholder:text-ink-muted focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/15"
              />
            </form>
          </div>

          {/* Desktop category nav */}
          <nav className="hidden border-t border-surface-muted/70 lg:block">
            <div className="container-px flex h-10 items-center gap-6 text-[13px] font-medium text-ink-soft">
              <Link
                href="/shop?sort=sale"
                className="flex items-center gap-1.5 font-semibold text-accent transition hover:text-accent/80"
              >
                <Zap size={14} className="fill-accent" />
                {t('nav.deals')}
              </Link>
              <span className="h-4 w-px bg-surface-muted" />
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?category=${c.slug}`}
                  className="transition hover:text-brand-600"
                >
                  {localized(c.name, locale)}
                </Link>
              ))}
              <Link href="/support" className="ml-auto transition hover:text-brand-600">
                {t('support.title')}
              </Link>
            </div>
          </nav>
        </div>

        {/* subtle animated progress hint */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-brand-600 via-brand-400 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.4 }}
        />
      </motion.header>
    </>
  )
}
