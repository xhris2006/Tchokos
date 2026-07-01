'use client'

import { create } from 'zustand'

interface UiState {
  menuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  accountOpen: boolean
  openAccount: () => void
  closeAccount: () => void
}

export const useUiStore = create<UiState>((set) => ({
  menuOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  accountOpen: false,
  openAccount: () => set({ accountOpen: true, menuOpen: false }),
  closeAccount: () => set({ accountOpen: false }),
}))
