'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart, Trash2, X } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import {
  selectSubtotal,
  useCartStore,
  type CartItem,
} from '@/store/cartStore'
import { useHydrated } from '@/lib/useHydrated'
import { formatPrice } from '@/lib/utils'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Button, buttonVariants } from '@/components/ui/Button'

function Line({ item }: { item: CartItem }) {
  const updateQty = useCartStore((s) => s.updateQty)
  const remove = useCartStore((s) => s.remove)
  return (
    <div className="flex gap-3 py-4">
      <Link
        href={`/product/${item.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted"
      >
        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${item.slug}`}
            className="line-clamp-2 text-sm font-medium text-ink hover:text-brand-700"
          >
            {item.name}
          </Link>
          <button
            onClick={() => remove(item.lineId)}
            aria-label="Remove"
            className="grid h-7 w-7 place-items-center rounded-lg text-ink-muted transition hover:bg-surface-muted hover:text-danger"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <div className="mt-0.5 flex flex-wrap gap-1.5 text-xs text-ink-muted">
          {item.size && <span>{item.size}</span>}
          {item.size && item.color && <span>·</span>}
          {item.color && <span>{item.color}</span>}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => updateQty(item.lineId, q)}
          />
          <span className="text-sm font-semibold text-ink">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}

export function CartSidebar() {
  const { t } = useTranslation()
  const hydrated = useHydrated()
  const open = useCartStore((s) => s.isOpen)
  const close = useCartStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore(selectSubtotal)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-float"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-surface-muted p-4">
              <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                <ShoppingCart size={18} /> {t('cart.title')}
                {hydrated && items.length > 0 && (
                  <span className="text-sm font-normal text-ink-muted">
                    ({items.length})
                  </span>
                )}
              </h3>
              <button
                onClick={close}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition hover:bg-surface-muted"
              >
                <X size={18} />
              </button>
            </div>

            {hydrated && items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-surface-muted text-ink-muted">
                  <ShoppingCart size={26} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{t('cart.empty')}</p>
                  <p className="mt-1 text-sm text-ink-muted">{t('cart.emptyDesc')}</p>
                </div>
                <Link href="/shop" onClick={close} className={buttonVariants()}>
                  {t('cart.continueShopping')}
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 divide-y divide-surface-muted overflow-y-auto px-4">
                  {items.map((item) => (
                    <Line key={item.lineId} item={item} />
                  ))}
                </div>
                <div className="space-y-3 border-t border-surface-muted p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">{t('common.subtotal')}</span>
                    <span className="text-lg font-bold text-ink">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <Link href="/cart" onClick={close} className={buttonVariants({ className: 'w-full' })}>
                    {t('cart.checkout')}
                  </Link>
                  <Button variant="ghost" className="w-full" onClick={close}>
                    {t('cart.continueShopping')}
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
