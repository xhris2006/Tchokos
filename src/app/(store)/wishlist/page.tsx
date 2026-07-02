'use client'

import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { products } from '@/lib/mockData'
import { useWishlistStore } from '@/store/wishlistStore'
import { useHydrated } from '@/lib/useHydrated'
import { ProductCard } from '@/components/shop/ProductCard'
import { buttonVariants } from '@/components/ui/Button'

export default function WishlistPage() {
  const { t } = useTranslation()
  const hydrated = useHydrated()
  const ids = useWishlistStore((s) => s.ids)
  const clear = useWishlistStore((s) => s.clear)

  const items = products.filter((p) => ids.includes(p.id))

  if (!hydrated) {
    return (
      <div className="container-px py-24 text-center text-ink-muted">
        {t('common.loading')}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container-px flex flex-col items-center justify-center gap-5 py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-danger/5 text-danger/60">
          <Heart size={34} />
        </span>
        <div>
          <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">
            {t('wishlist.empty')}
          </h1>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">{t('wishlist.emptyDesc')}</p>
        </div>
        <Link href="/shop" className={buttonVariants({ size: 'lg' })}>
          {t('cart.continueShopping')}
          <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container-px py-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {t('wishlist.title')}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {items.length} {t('wishlist.items')}
          </p>
        </div>
        <button
          onClick={clear}
          className="text-sm font-medium text-ink-muted transition hover:text-danger"
        >
          {t('wishlist.clear')}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
