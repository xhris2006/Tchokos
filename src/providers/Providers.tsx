'use client'

import type { ReactNode } from 'react'
import { LanguageProvider } from '@/lib/i18n/LanguageProvider'
import { Toaster } from '@/components/ui/Toaster'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster />
    </LanguageProvider>
  )
}
