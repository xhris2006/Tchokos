'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  lineId: string
  productId: string
  slug: string
  name: string
  image: string
  price: number
  size?: string
  color?: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  add: (item: Omit<CartItem, 'lineId' | 'quantity'>, quantity?: number) => void
  remove: (lineId: string) => void
  updateQty: (lineId: string, quantity: number) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
}

const makeLineId = (item: { productId: string; size?: string; color?: string }) =>
  `${item.productId}__${item.size ?? '-'}__${item.color ?? '-'}`

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item, quantity = 1) =>
        set((state) => {
          const lineId = makeLineId(item)
          const existing = state.items.find((i) => i.lineId === lineId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.lineId === lineId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, { ...item, lineId, quantity }] }
        }),
      remove: (lineId) =>
        set((state) => ({
          items: state.items.filter((i) => i.lineId !== lineId),
        })),
      updateQty: (lineId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.lineId === lineId ? { ...i, quantity: Math.max(1, quantity) } : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: 'tchokos.cart' }
  )
)

/** Derived selectors (call with the store state). */
export const selectCount = (s: CartState) =>
  s.items.reduce((n, i) => n + i.quantity, 0)

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
