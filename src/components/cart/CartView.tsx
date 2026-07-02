'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, Tag, Trash2, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import {
  selectSubtotal,
  useCartStore,
  type CartItem,
} from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import { useHydrated } from '@/lib/useHydrated'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/shop'
import { formatPrice } from '@/lib/utils'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Button, buttonVariants } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

function Row({ item }: { item: CartItem }) {
  const { t } = useTranslation()
  const updateQty = useCartStore((s) => s.updateQty)
  const remove = useCartStore((s) => s.remove)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 py-5"
    >
      <Link
        href={`/product/${item.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-muted sm:h-28 sm:w-28"
      >
        <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${item.slug}`}
              className="line-clamp-2 font-semibold text-ink hover:text-brand-700"
            >
              {item.name}
            </Link>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-ink-muted">
              {item.size && (
                <span className="rounded-md bg-surface-muted px-2 py-0.5">{item.size}</span>
              )}
              {item.color && (
                <span className="rounded-md bg-surface-muted px-2 py-0.5">{item.color}</span>
              )}
            </div>
          </div>
          <button
            onClick={() => remove(item.lineId)}
            aria-label="Remove"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-muted hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => updateQty(item.lineId, q)}
          />
          <div className="text-right">
            <p className="font-bold text-ink">{formatPrice(item.price * item.quantity)}</p>
            {item.quantity > 1 && (
              <p className="text-xs text-ink-muted">
                {formatPrice(item.price)} / {t('common.perUnit')}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CartView() {
  const { t } = useTranslation()
  const hydrated = useHydrated()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore(selectSubtotal)
  const clear = useCartStore((s) => s.clear)
  const notify = useToastStore((s) => s.notify)
  const [promo, setPromo] = useState('')

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  if (!hydrated) {
    return <div className="container-px py-24 text-center text-ink-muted">{t('common.loading')}</div>
  }

  if (items.length === 0) {
    return (
      <div className="container-px flex flex-col items-center justify-center gap-5 py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-surface-muted text-ink-muted">
          <ShoppingBag size={34} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{t('cart.empty')}</h1>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">{t('cart.emptyDesc')}</p>
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
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {t('cart.title')}
        <span className="ml-2 text-lg font-normal text-ink-muted">
          ({items.length} {t('cart.items')})
        </span>
      </h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="rounded-2xl border border-surface-muted bg-white px-5">
          <div className="divide-y divide-surface-muted">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <Row key={item.lineId} item={item} />
              ))}
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between border-t border-surface-muted py-4">
            <Link
              href="/shop"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              ← {t('cart.continueShopping')}
            </Link>
            <button
              onClick={clear}
              className="text-sm font-medium text-ink-muted hover:text-danger"
            >
              {t('cart.remove')}
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="rounded-2xl border border-surface-muted bg-white p-6">
            <h2 className="text-lg font-bold text-ink">{t('cart.orderSummary')}</h2>

            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Tag
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                />
                <Input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder={t('cart.promoPlaceholder')}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => promo && notify('Code: ' + promo)}
              >
                {t('cart.applyPromo')}
              </Button>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-soft">{t('common.subtotal')}</span>
                <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">{t('common.shipping')}</span>
                <span className="font-medium text-ink">
                  {shipping === 0 ? (
                    <span className="text-success">{t('cart.freeShipping')}</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">{t('cart.taxes')}</span>
                <span className="text-xs text-ink-muted">{t('cart.taxesNote')}</span>
              </div>
              <div className="flex items-center justify-between border-t border-surface-muted pt-3">
                <span className="font-semibold text-ink">{t('common.total')}</span>
                <span className="text-xl font-extrabold text-ink">{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-5 w-full"
              onClick={() => notify(t('cart.checkout'), 'check')}
            >
              <Lock size={16} />
              {t('cart.checkout')}
            </Button>

            <div className="mt-4 space-y-1.5">
              <p className="text-center text-xs font-medium text-ink-soft">
                {subtotal < FREE_SHIPPING_THRESHOLD
                  ? t('cart.freeShipProgress', {
                      amount: formatPrice(FREE_SHIPPING_THRESHOLD - subtotal),
                    })
                  : t('cart.freeShipUnlocked')}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className="h-full rounded-full bg-success transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
