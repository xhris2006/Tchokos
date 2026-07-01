import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/mockData'
import { ProductView } from '@/components/product/ProductView'
import { RelatedProducts } from '@/components/product/RelatedProducts'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { id: string }
}): Metadata {
  const product = getProductBySlug(params.id)
  if (!product) return { title: 'Produit introuvable' }
  return {
    title: product.name,
    description: product.description.fr,
    openGraph: { images: [product.images[0]] },
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductBySlug(params.id)
  if (!product) notFound()

  return (
    <>
      <ProductView product={product} />
      <RelatedProducts product={product} />
    </>
  )
}
