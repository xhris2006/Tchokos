'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
  RotateCcw,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage, useTranslation } from '@/lib/i18n/LanguageProvider'
import { categoryName, localized, type Product } from '@/lib/mockData'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useToastStore } from '@/store/toastStore'
import { useHydrated } from '@/lib/useHydrated'
import { cn, discountPercent, formatPrice } from '@/lib/utils'
import { Rating } from '@/components/ui/Rating'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductGallery } from './ProductGallery'

export function ProductView({ product }: { product: Product }) {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const router = useRouter()
  const hydrated = useHydrated()

  const add = useCartStore((s) => s.add)
  const openCart = useCartStore((s) => s.openCart)
  const toggleWish = useWishlistStore((s) => s.toggle)
  const wished = useWishlistStore((s) => s.ids.includes(product.id))
  const notify = useToastStore((s) => s.notify)

  const [size, setSize] = useState<string | undefined>(product.sizes[0])
  const [color, setColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'description' | 'details'>('description')

  const discount = discountPercent(product.price, product.compareAt)

  const addToCart = () => {
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: product.price,
        size,
        color: color ? localized(color.name, locale) : undefined,
      },
      qty
    )
    notify(t('product.addedToCart'), 'cart')
  }

  const buyNow = () => {
    addToCart()
    router.push('/cart')
  }

  return (
    <div className="container-px py-6">
      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1.5 text-sm text-ink-muted">
        <Link href="/" className="hover:text-brand-700">{t('nav.home')}</Link>
        <ChevronRight size={14} />
        <Link href={`/shop?category=${product.category}`} className="hover:text-brand-700">
          {categoryName(product.category, locale)}
        </Link>
        <ChevronRight size={14} />
        <span className="truncate text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              {product.brand}
            </span>
            {discount > 0 && <Badge tone="sale">-{discount}%</Badge>}
            {product.badge === 'new' && <Badge tone="new">{t('common.new')}</Badge>}
          </div>

          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
            <span className="text-sm text-ink-muted">·</span>
            <span
              className={cn(
                'text-sm font-medium',
                product.stock > 0 ? 'text-success' : 'text-danger'
              )}
            >
              {product.stock > 0 ? t('common.inStock') : t('common.outOfStock')}
            </span>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl font-extrabold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="pb-1 text-lg text-ink-muted line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {localized(product.description, locale)}
          </p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-ink">
                {t('product.selectColor')}
                <span className="ml-2 font-normal text-ink-muted">
                  {color && localized(color.name, locale)}
                </span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c)}
                    aria-label={localized(c.name, locale)}
                    className={cn(
                      'grid h-9 w-9 place-items-center rounded-full ring-1 ring-inset ring-black/10 transition',
                      color?.hex === c.hex && 'ring-2 ring-brand-600 ring-offset-2'
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-ink">{t('product.selectSize')}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'min-w-[46px] rounded-xl border px-3 py-2 text-sm font-semibold transition',
                      size === s
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-surface-muted text-ink-soft hover:border-brand-300'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-xl border border-surface-muted">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center rounded-l-xl text-ink-soft transition hover:bg-surface-muted"
                aria-label="Decrease"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-semibold tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="grid h-12 w-12 place-items-center rounded-r-xl text-ink-soft transition hover:bg-surface-muted"
                aria-label="Increase"
              >
                <Plus size={16} />
              </button>
            </div>

            <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
              <Button variant="outline" size="lg" className="w-full" onClick={addToCart}>
                <ShoppingCart size={18} />
                {t('common.addToCart')}
              </Button>
            </motion.div>

            <button
              onClick={() => toggleWish(product.id)}
              aria-label={t('product.addToWishlist')}
              className={cn(
                'grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-surface-muted transition hover:bg-surface-muted',
                hydrated && wished && 'border-danger/30 bg-danger/5'
              )}
            >
              <Heart
                size={20}
                className={cn(hydrated && wished && 'fill-danger text-danger')}
              />
            </button>
          </div>

          <Button size="lg" className="mt-3 w-full" onClick={buyNow}>
            {t('common.buyNow')}
          </Button>

          <button
            onClick={openCart}
            className="mt-2 w-full text-center text-xs font-medium text-ink-muted hover:text-brand-700"
          >
            {t('cart.title')} →
          </button>

          {/* Trust perks */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-surface-muted pt-5">
            {[
              { icon: Truck, label: t('home.freeShipping') },
              { icon: RotateCcw, label: t('home.easyReturns') },
              { icon: ShieldCheck, label: t('home.securePay') },
            ].map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-1.5 text-center">
                <p.icon size={20} className="text-brand-600" />
                <span className="text-[11px] font-medium text-ink-soft">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 max-w-3xl">
        <div className="flex gap-6 border-b border-surface-muted">
          {(['description', 'details'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                'relative pb-3 text-sm font-semibold transition',
                tab === key ? 'text-ink' : 'text-ink-muted hover:text-ink-soft'
              )}
            >
              {t(`product.${key}`)}
              {tab === key && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand-600"
                />
              )}
            </button>
          ))}
        </div>

        <div className="pt-5 text-sm leading-relaxed text-ink-soft">
          {tab === 'description' ? (
            <p>{localized(product.description, locale)}</p>
          ) : (
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex justify-between border-b border-surface-muted pb-2">
                <dt className="text-ink-muted">{t('product.sku')}</dt>
                <dd className="font-medium text-ink">TK-{product.id.toUpperCase()}</dd>
              </div>
              <div className="flex justify-between border-b border-surface-muted pb-2">
                <dt className="text-ink-muted">{t('product.category')}</dt>
                <dd className="font-medium text-ink">{categoryName(product.category, locale)}</dd>
              </div>
              <div className="flex justify-between border-b border-surface-muted pb-2">
                <dt className="text-ink-muted">{t('product.soldBy')}</dt>
                <dd className="font-medium text-ink">{product.brand}</dd>
              </div>
              <div className="flex justify-between border-b border-surface-muted pb-2">
                <dt className="text-ink-muted">{t('product.availability')}</dt>
                <dd className="font-medium text-ink">{product.stock} pcs</dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  )
}
