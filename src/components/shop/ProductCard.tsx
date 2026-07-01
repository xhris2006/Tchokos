'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage, useTranslation } from '@/lib/i18n/LanguageProvider'
import { localized, type Product } from '@/lib/mockData'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useToastStore } from '@/store/toastStore'
import { useHydrated } from '@/lib/useHydrated'
import { cn, discountPercent, formatPrice } from '@/lib/utils'
import { Rating } from '@/components/ui/Rating'
import { Badge } from '@/components/ui/Badge'

export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const hydrated = useHydrated()
  const add = useCartStore((s) => s.add)
  const toggleWish = useWishlistStore((s) => s.toggle)
  const wished = useWishlistStore((s) => s.ids.includes(product.id))
  const notify = useToastStore((s) => s.notify)
  const discount = discountPercent(product.price, product.compareAt)

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: product.sizes[0],
      color: product.colors[0] ? localized(product.colors[0].name, locale) : undefined,
    })
    notify(t('product.addedToCart'), 'cart')
  }

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWish(product.id)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn('group', className)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="card flex h-full flex-col overflow-hidden transition-shadow hover:shadow-card"
      >
        <div className="relative aspect-square overflow-hidden bg-surface-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
            {discount > 0 ? (
              <Badge tone="sale">-{discount}%</Badge>
            ) : product.badge === 'new' ? (
              <Badge tone="new">{t('common.new')}</Badge>
            ) : product.badge === 'bestseller' ? (
              <Badge tone="bestseller">{t('common.top')}</Badge>
            ) : null}
          </div>

          <button
            onClick={onWish}
            aria-label={t('product.addToWishlist')}
            className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur transition hover:bg-white"
          >
            <Heart
              size={16}
              className={cn(
                'transition',
                hydrated && wished && 'fill-danger text-danger'
              )}
            />
          </button>

          <button
            onClick={quickAdd}
            className="btn absolute bottom-2.5 right-2.5 h-9 w-9 translate-y-2 bg-brand-600 p-0 text-white opacity-0 shadow-soft transition-all duration-300 hover:bg-brand-700 group-hover:translate-y-0 group-hover:opacity-100"
            aria-label={t('common.addToCart')}
          >
            <ShoppingCart size={16} />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
            {product.brand}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-ink">
            {product.name}
          </h3>
          <div className="mt-1.5">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          <div className="mt-auto flex items-end gap-2 pt-3">
            <span className="text-base font-bold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-ink-muted line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
