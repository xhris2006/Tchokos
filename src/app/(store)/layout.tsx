import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { CartSidebar } from '@/components/layout/CartSidebar'
import { BottomNav } from '@/components/layout/BottomNav'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MobileDrawer />
      <CartSidebar />
      <main className="flex-1 pb-24 lg:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  )
}
