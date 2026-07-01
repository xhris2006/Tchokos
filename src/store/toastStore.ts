'use client'

import { create } from 'zustand'

export interface Toast {
  id: number
  message: string
  icon?: 'cart' | 'heart' | 'check'
}

interface ToastState {
  toasts: Toast[]
  notify: (message: string, icon?: Toast['icon']) => void
  dismiss: (id: number) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  notify: (message, icon = 'check') => {
    const id = Date.now() + Math.random()
    set((s) => ({ toasts: [...s.toasts, { id, message, icon }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 2600)
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
