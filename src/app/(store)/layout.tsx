import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileDrawer } from '@/components/layout/MobileDrawer'
import { CartSidebar } from '@/components/layout/CartSidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { AccountModal } from '@/components/layout/AccountModal'
import { ScrollToTop } from '@/components/layout/ScrollToTop'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MobileDrawer />
      <CartSidebar />
      <AccountModal />
      <main className="flex-1 pb-24 lg:pb-0">{children}</main>
      <Footer />
      <BottomNav />
      <ScrollToTop />
    </div>
  )
}
