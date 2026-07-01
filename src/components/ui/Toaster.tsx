'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart, ShoppingCart } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'

const icons = {
  cart: ShoppingCart,
  heart: Heart,
  check: Check,
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-6">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.icon ?? 'check']
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
              className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-float"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                <Icon size={14} />
              </span>
              {toast.message}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
