import { products, type CategorySlug, type Product } from './mockData'

export type SortKey = 'popular' | 'latest' | 'price-asc' | 'price-desc' | 'rating' | 'sale'

export interface ShopFilters {
  category: CategorySlug | 'all'
  maxPrice: number
  sizes: string[]
  colors: string[]
  sort: SortKey
  query: string
}

export const PRICE_CEILING = 1200

export const defaultFilters: ShopFilters = {
  category: 'all',
  maxPrice: PRICE_CEILING,
  sizes: [],
  colors: [],
  sort: 'popular',
  query: '',
}

/** All distinct sizes across the catalogue, order preserved sensibly. */
export const allSizes = Array.from(
  new Set(products.flatMap((p) => p.sizes))
).sort((a, b) => {
  const order = ['XS', 'S', 'M', 'L', 'XL']
  const ai = order.indexOf(a)
  const bi = order.indexOf(b)
  if (ai !== -1 && bi !== -1) return ai - bi
  if (ai !== -1) return -1
  if (bi !== -1) return 1
  return a.localeCompare(b, undefined, { numeric: true })
})

/** All distinct colours across the catalogue (by hex). */
export const allColors = (() => {
  const map = new Map<string, { hex: string; name: { fr: string; en: string } }>()
  for (const p of products) {
    for (const c of p.colors) {
      if (!map.has(c.hex)) map.set(c.hex, c)
    }
  }
  return Array.from(map.values())
})()

export function applyFilters(list: Product[], f: ShopFilters): Product[] {
  const q = f.query.trim().toLowerCase()

  const filtered = list.filter((p) => {
    if (f.category !== 'all' && p.category !== f.category) return false
    if (p.price > f.maxPrice) return false
    if (f.sizes.length && !f.sizes.some((s) => p.sizes.includes(s))) return false
    if (f.colors.length && !f.colors.some((c) => p.colors.some((pc) => pc.hex === c)))
      return false
    if (q) {
      const haystack = `${p.name} ${p.brand} ${p.category}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  const sorted = [...filtered]
  switch (f.sort) {
    case 'latest':
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      break
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating)
      break
    case 'sale':
      sorted.sort(
        (a, b) =>
          (b.compareAt ? b.compareAt - b.price : 0) -
          (a.compareAt ? a.compareAt - a.price : 0)
      )
      break
    default:
      // popular = by review count
      sorted.sort((a, b) => b.reviews - a.reviews)
  }
  return sorted
}

export function countActiveFilters(f: ShopFilters): number {
  let n = 0
  if (f.category !== 'all') n++
  if (f.maxPrice < PRICE_CEILING) n++
  n += f.sizes.length
  n += f.colors.length
  return n
}
