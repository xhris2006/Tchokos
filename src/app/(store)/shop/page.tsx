import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ShopView } from '@/components/shop/ShopView'

export const metadata: Metadata = {
  title: 'Boutique',
  description: 'Parcourez tous les produits Tchokos : filtres, tri et recherche.',
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-px py-20 text-center text-ink-muted">…</div>}>
      <ShopView />
    </Suspense>
  )
}
