import type { Locale } from './i18n/dictionaries'

/** ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

export interface LocalizedText {
  fr: string
  en: string
}

export interface ColorOption {
  name: LocalizedText
  hex: string
}

export type ProductBadge = 'new' | 'sale' | 'bestseller' | null

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: CategorySlug
  price: number
  compareAt?: number
  rating: number
  reviews: number
  images: string[]
  colors: ColorOption[]
  sizes: string[]
  badge: ProductBadge
  description: LocalizedText
  stock: number
  featured?: boolean
  bestSeller?: boolean
  createdAt: string
}

export type CategorySlug =
  | 'fashion'
  | 'electronics'
  | 'beauty'
  | 'home'
  | 'sports'
  | 'accessories'

export interface Category {
  id: string
  slug: CategorySlug
  name: LocalizedText
  image: string
  itemCount: number
}

/** Helper to build a sized Unsplash URL from a photo id. */
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

/** Read the localized value for the current locale. */
export function localized(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.fr
}

/** ------------------------------------------------------------------ *
 * Colors (reused)
 * ------------------------------------------------------------------ */

const C = {
  black: { name: { fr: 'Noir', en: 'Black' }, hex: '#111827' },
  white: { name: { fr: 'Blanc', en: 'White' }, hex: '#f8fafc' },
  red: { name: { fr: 'Rouge', en: 'Red' }, hex: '#dc2626' },
  blue: { name: { fr: 'Bleu', en: 'Blue' }, hex: '#1e3a8a' },
  navy: { name: { fr: 'Marine', en: 'Navy' }, hex: '#16244f' },
  beige: { name: { fr: 'Beige', en: 'Beige' }, hex: '#d6c7b0' },
  gray: { name: { fr: 'Gris', en: 'Gray' }, hex: '#9ca3af' },
  green: { name: { fr: 'Vert', en: 'Green' }, hex: '#16a34a' },
  silver: { name: { fr: 'Argent', en: 'Silver' }, hex: '#cbd5e1' },
  gold: { name: { fr: 'Or', en: 'Gold' }, hex: '#d4af37' },
  pink: { name: { fr: 'Rose', en: 'Pink' }, hex: '#f9a8d4' },
} satisfies Record<string, ColorOption>

const APPAREL = ['XS', 'S', 'M', 'L', 'XL']
const SHOES = ['40', '41', '42', '43', '44', '45']

/** ------------------------------------------------------------------ *
 * Categories
 * ------------------------------------------------------------------ */

export const categories: Category[] = [
  {
    id: 'c1',
    slug: 'fashion',
    name: { fr: 'Mode', en: 'Fashion' },
    image: img('1434389677669-e08b4cac3105', 400),
    itemCount: 20000,
  },
  {
    id: 'c2',
    slug: 'electronics',
    name: { fr: 'Électronique', en: 'Electronics' },
    image: img('1505740420928-5e560c06d30e', 400),
    itemCount: 15000,
  },
  {
    id: 'c3',
    slug: 'beauty',
    name: { fr: 'Beauté', en: 'Beauty' },
    image: img('1596462502278-27bfdc403348', 400),
    itemCount: 8000,
  },
  {
    id: 'c4',
    slug: 'home',
    name: { fr: 'Maison', en: 'Home' },
    image: img('1567538096630-e0c55bd6374c', 400),
    itemCount: 12000,
  },
  {
    id: 'c5',
    slug: 'sports',
    name: { fr: 'Sport', en: 'Sports' },
    image: img('1571019613454-1cb2f99b2d8b', 400),
    itemCount: 9000,
  },
  {
    id: 'c6',
    slug: 'accessories',
    name: { fr: 'Accessoires', en: 'Accessories' },
    image: img('1572635196237-14b3f281503f', 400),
    itemCount: 6000,
  },
]

export function categoryName(slug: CategorySlug, locale: Locale) {
  const c = categories.find((cat) => cat.slug === slug)
  return c ? localized(c.name, locale) : slug
}

/** ------------------------------------------------------------------ *
 * Products
 * ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'air-runner-sneakers',
    name: 'Air Runner Sneakers',
    brand: 'Northline',
    category: 'fashion',
    price: 35000,
    compareAt: 48000,
    rating: 4.5,
    reviews: 1234,
    images: [
      img('1595950653106-6c9ebd614d3a'),
      img('1542291026-7eec264c27ff'),
      img('1600185365483-26d7a4cc7519'),
    ],
    colors: [C.white, C.black, C.red],
    sizes: SHOES,
    badge: 'sale',
    description: {
      fr: 'Des baskets de running légères et respirantes, pensées pour un confort maximal du matin au soir. Semelle amortissante et maintien souple.',
      en: 'Lightweight, breathable running sneakers built for all-day comfort. Cushioned sole with a soft, supportive fit.',
    },
    stock: 42,
    featured: true,
    bestSeller: true,
    createdAt: '2026-05-02',
  },
  {
    id: 'p2',
    slug: 'wireless-earbuds-pro',
    name: 'Wireless Earbuds Pro',
    brand: 'Lumen',
    category: 'electronics',
    price: 42000,
    compareAt: 60000,
    rating: 4.7,
    reviews: 2631,
    images: [img('1606107557195-0e29a4b5b4aa'), img('1618354691373-d851c5c3a990')],
    colors: [C.white, C.black],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Écouteurs sans fil avec réduction de bruit active, son cristallin et 30h d’autonomie. Étui de charge compact inclus.',
      en: 'True wireless earbuds with active noise cancellation, crystal-clear sound and 30h battery life. Compact charging case included.',
    },
    stock: 88,
    featured: true,
    bestSeller: true,
    createdAt: '2026-05-20',
  },
  {
    id: 'p3',
    slug: 'studio-over-ear-headphones',
    name: 'Studio Over-Ear Headphones',
    brand: 'Lumen',
    category: 'electronics',
    price: 90000,
    compareAt: 120000,
    rating: 4.8,
    reviews: 964,
    images: [img('1505740420928-5e560c06d30e'), img('1583394838336-acd977736f90')],
    colors: [C.black, C.silver],
    sizes: [],
    badge: 'bestseller',
    description: {
      fr: 'Un casque circum-auriculaire au son haute-fidélité, coussinets mémoire de forme et Bluetooth multipoint pour une immersion totale.',
      en: 'Hi-fi over-ear headphones with memory-foam cushions and multipoint Bluetooth for total immersion.',
    },
    stock: 33,
    bestSeller: true,
    createdAt: '2026-04-11',
  },
  {
    id: 'p4',
    slug: 'oversized-printed-tee',
    name: 'Oversized Printed T-Shirt',
    brand: 'Urbano',
    category: 'fashion',
    price: 15000,
    compareAt: 28000,
    rating: 4.9,
    reviews: 136,
    images: [img('1576566588028-4147f3842f27'), img('1521572163474-6864f9cf17ab')],
    colors: [C.navy, C.white, C.blue],
    sizes: APPAREL,
    badge: 'new',
    description: {
      fr: 'Rehaussez votre style décontracté avec ce t-shirt à coupe ample. Coton premium pour un confort et une tenue durables.',
      en: 'Elevate your casual wardrobe with this loose-fit tee. Crafted from premium cotton for lasting comfort and shape.',
    },
    stock: 120,
    featured: true,
    createdAt: '2026-06-18',
  },
  {
    id: 'p5',
    slug: 'smart-watch-series-7',
    name: 'Smart Watch Series 7',
    brand: 'Meridian',
    category: 'electronics',
    price: 95000,
    compareAt: 155000,
    rating: 4.6,
    reviews: 1890,
    images: [img('1546868871-7041f2a55e12'), img('1523275335684-37898b6baf30')],
    colors: [C.black, C.silver, C.gold],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Suivez votre activité, votre sommeil et vos notifications d’un coup d’œil. Écran AMOLED lumineux et boîtier résistant à l’eau.',
      en: 'Track your activity, sleep and notifications at a glance. Bright AMOLED display and water-resistant case.',
    },
    stock: 54,
    featured: true,
    bestSeller: true,
    createdAt: '2026-05-28',
  },
  {
    id: 'p6',
    slug: 'signature-eau-de-parfum',
    name: 'Signature Eau de Parfum',
    brand: 'Solace',
    category: 'beauty',
    price: 52000,
    rating: 4.7,
    reviews: 412,
    images: [img('1585386959984-a4155224a1ad'), img('1611930022073-b7a4ba5fcccd')],
    colors: [C.gold],
    sizes: ['50ml', '100ml'],
    badge: null,
    description: {
      fr: 'Un parfum boisé et élégant aux notes de bergamote, cèdre et musc. Une signature raffinée qui dure toute la journée.',
      en: 'An elegant woody fragrance with notes of bergamot, cedar and musk. A refined signature that lasts all day.',
    },
    stock: 60,
    featured: true,
    createdAt: '2026-03-30',
  },
  {
    id: 'p7',
    slug: 'radiance-skincare-set',
    name: 'Radiance Skincare Set',
    brand: 'Solace',
    category: 'beauty',
    price: 30000,
    compareAt: 42000,
    rating: 4.8,
    reviews: 738,
    images: [img('1594633312681-425c7b97ccd1'), img('1588099768523-f4e6a5679d88')],
    colors: [C.pink],
    sizes: [],
    badge: 'bestseller',
    description: {
      fr: 'Un rituel complet nettoyant, sérum et hydratant pour une peau éclatante. Formules douces adaptées à tous types de peau.',
      en: 'A complete cleanser, serum and moisturizer ritual for glowing skin. Gentle formulas suited to all skin types.',
    },
    stock: 75,
    bestSeller: true,
    createdAt: '2026-04-25',
  },
  {
    id: 'p8',
    slug: 'modern-3-seater-sofa',
    name: 'Modern 3-Seater Sofa',
    brand: 'Kasa',
    category: 'home',
    price: 185000,
    compareAt: 235000,
    rating: 4.4,
    reviews: 542,
    images: [img('1567538096630-e0c55bd6374c'), img('1600180758890-6b94519a8ba6')],
    colors: [C.gray, C.beige],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Un canapé au design contemporain, tissu doux et assise profonde. La pièce maîtresse d’un salon chaleureux.',
      en: 'A contemporary sofa with soft fabric and a deep, comfortable seat. The centerpiece of a warm living room.',
    },
    stock: 12,
    bestSeller: true,
    createdAt: '2026-02-14',
  },
  {
    id: 'p9',
    slug: 'accent-armchair',
    name: 'Accent Lounge Armchair',
    brand: 'Kasa',
    category: 'home',
    price: 115000,
    rating: 4.5,
    reviews: 214,
    images: [img('1584100936595-c0654b55a2e2'), img('1487222477894-8943e31ef7b2')],
    colors: [C.beige, C.gray],
    sizes: [],
    badge: 'new',
    description: {
      fr: 'Un fauteuil d’appoint élégant et confortable, idéal pour un coin lecture. Structure robuste et finitions soignées.',
      en: 'An elegant, comfortable accent armchair, perfect for a reading nook. Sturdy frame and refined finishes.',
    },
    stock: 20,
    createdAt: '2026-06-01',
  },
  {
    id: 'p10',
    slug: 'ultrabook-air-13',
    name: 'Ultrabook Air 13"',
    brand: 'Meridian',
    category: 'electronics',
    price: 680000,
    compareAt: 830000,
    rating: 4.7,
    reviews: 1200,
    images: [img('1517336714731-489689fd1ca8'), img('1496181133206-80ce9b88a853')],
    colors: [C.silver, C.gray],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Ultraportable de 13 pouces, fin et puissant. Écran Retina, autonomie longue durée et châssis en aluminium.',
      en: 'A thin, powerful 13-inch ultraportable. Retina display, long battery life and an aluminium chassis.',
    },
    stock: 18,
    bestSeller: true,
    createdAt: '2026-05-10',
  },
  {
    id: 'p11',
    slug: 'pro-smartphone-256',
    name: 'Pro Smartphone 256GB',
    brand: 'Meridian',
    category: 'electronics',
    price: 620000,
    compareAt: 800000,
    rating: 4.6,
    reviews: 1200,
    images: [img('1592750475338-74b7b21085ab'), img('1511707171634-5f897ff02aa9')],
    colors: [C.black, C.navy, C.silver],
    sizes: [],
    badge: 'bestseller',
    description: {
      fr: 'Un smartphone haut de gamme avec triple caméra, écran OLED 120Hz et puce ultra-rapide. Photographie de niveau pro.',
      en: 'A flagship smartphone with triple camera, 120Hz OLED display and an ultra-fast chip. Pro-grade photography.',
    },
    stock: 30,
    bestSeller: true,
    createdAt: '2026-05-15',
  },
  {
    id: 'p12',
    slug: 'linen-blend-shirt',
    name: 'Regular Fit Linen Shirt',
    brand: 'Urbano',
    category: 'fashion',
    price: 27000,
    rating: 4.8,
    reviews: 236,
    images: [img('1620916566398-39f1143ab7be'), img('1503342217505-b0a15ec3261c')],
    colors: [C.white, C.beige, C.blue],
    sizes: APPAREL,
    badge: null,
    description: {
      fr: 'Chemise en lin mélangé, respirante et intemporelle. Parfaite pour un look estival élégant et décontracté.',
      en: 'A breathable, timeless linen-blend shirt. Perfect for an elegant yet relaxed summer look.',
    },
    stock: 64,
    featured: true,
    createdAt: '2026-06-08',
  },
  {
    id: 'p13',
    slug: 'track-jacket',
    name: 'DryMove Track Jacket',
    brand: 'Peak',
    category: 'sports',
    price: 48000,
    compareAt: 68000,
    rating: 4.7,
    reviews: 163,
    images: [img('1434389677669-e08b4cac3105'), img('1591047139829-d91aecb6caea')],
    colors: [C.navy, C.black],
    sizes: APPAREL,
    badge: 'sale',
    description: {
      fr: 'Veste de sport technique, légère et déperlante. Coupe ajustée et tissu respirant pour la performance.',
      en: 'A lightweight, water-repellent technical track jacket. Fitted cut and breathable fabric for performance.',
    },
    stock: 40,
    createdAt: '2026-04-02',
  },
  {
    id: 'p14',
    slug: 'adjustable-dumbbell-set',
    name: 'Adjustable Dumbbell Set',
    brand: 'Peak',
    category: 'sports',
    price: 80000,
    compareAt: 98000,
    rating: 4.6,
    reviews: 389,
    images: [img('1615486511484-92e172cc4fe0'), img('1571019613454-1cb2f99b2d8b')],
    colors: [C.black],
    sizes: [],
    badge: 'bestseller',
    description: {
      fr: 'Haltères réglables 2 à 24 kg, gain de place garanti. Idéal pour un entraînement complet à la maison.',
      en: 'Adjustable dumbbells from 2 to 24 kg — a serious space saver. Ideal for a complete home workout.',
    },
    stock: 25,
    bestSeller: true,
    createdAt: '2026-03-18',
  },
  {
    id: 'p15',
    slug: 'classic-aviator-sunglasses',
    name: 'Classic Aviator Sunglasses',
    brand: 'Vireo',
    category: 'accessories',
    price: 24000,
    compareAt: 36000,
    rating: 4.5,
    reviews: 271,
    images: [img('1572635196237-14b3f281503f'), img('1556905055-8f358a7a47b2')],
    colors: [C.gold, C.black, C.silver],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Lunettes de soleil aviateur intemporelles, verres polarisés anti-UV. Un accessoire qui ne se démode jamais.',
      en: 'Timeless aviator sunglasses with polarised, UV-protective lenses. An accessory that never goes out of style.',
    },
    stock: 90,
    featured: true,
    createdAt: '2026-05-06',
  },
  {
    id: 'p16',
    slug: 'everyday-leather-backpack',
    name: 'Everyday Leather Backpack',
    brand: 'Vireo',
    category: 'accessories',
    price: 55000,
    rating: 4.7,
    reviews: 318,
    images: [img('1527719327859-c6ce80353573'), img('1526947425960-945c6e72858f')],
    colors: [C.beige, C.black],
    sizes: [],
    badge: 'new',
    description: {
      fr: 'Sac à dos en cuir grainé, compartiment ordinateur et finitions premium. Le compagnon idéal du quotidien.',
      en: 'A grained-leather backpack with a padded laptop sleeve and premium finishes. The ideal everyday companion.',
    },
    stock: 48,
    featured: true,
    createdAt: '2026-06-12',
  },
  {
    id: 'p17',
    slug: 'floor-arc-lamp',
    name: 'Minimal Arc Floor Lamp',
    brand: 'Kasa',
    category: 'home',
    price: 72000,
    compareAt: 92000,
    rating: 4.4,
    reviews: 142,
    images: [img('1567016432779-094069958ea5'), img('1555529669-e69e7aa0ba9a')],
    colors: [C.black, C.gold],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Lampadaire arc au design minimaliste, lumière chaude et pied lesté stable. Une touche déco moderne.',
      en: 'A minimalist arc floor lamp with warm light and a weighted, stable base. A modern decorative touch.',
    },
    stock: 22,
    createdAt: '2026-04-19',
  },
  {
    id: 'p18',
    slug: 'mirrorless-camera-x100',
    name: 'Mirrorless Camera X100',
    brand: 'Lumen',
    category: 'electronics',
    price: 460000,
    compareAt: 550000,
    rating: 4.8,
    reviews: 526,
    images: [img('1526170375885-4d8ecf77b99f'), img('1516035069371-29a1b244cc32')],
    colors: [C.black, C.silver],
    sizes: [],
    badge: 'bestseller',
    description: {
      fr: 'Appareil hybride compact, capteur 26 Mpx et vidéo 4K. La créativité sans compromis, où que vous soyez.',
      en: 'A compact mirrorless camera with a 26 MP sensor and 4K video. Creativity without compromise, anywhere.',
    },
    stock: 15,
    featured: true,
    createdAt: '2026-05-01',
  },
  {
    id: 'p19',
    slug: 'dryfit-running-shorts',
    name: 'DryFit Running Shorts',
    brand: 'Peak',
    category: 'sports',
    price: 18000,
    compareAt: 26000,
    rating: 4.5,
    reviews: 208,
    images: [img('1591047139829-d91aecb6caea'), img('1434389677669-e08b4cac3105')],
    colors: [C.black, C.navy, C.gray],
    sizes: APPAREL,
    badge: 'sale',
    description: {
      fr: 'Short de running léger et déperlant avec poche zippée. Tissu extensible pour une liberté de mouvement totale.',
      en: 'Lightweight, water-repellent running shorts with a zip pocket. Stretch fabric for total freedom of movement.',
    },
    stock: 96,
    createdAt: '2026-06-14',
  },
  {
    id: 'p20',
    slug: 'premium-yoga-mat',
    name: 'Premium Yoga Mat',
    brand: 'Peak',
    category: 'sports',
    price: 22000,
    rating: 4.7,
    reviews: 341,
    images: [img('1571019613454-1cb2f99b2d8b'), img('1615486511484-92e172cc4fe0')],
    colors: [C.green, C.gray, C.pink],
    sizes: [],
    badge: 'new',
    description: {
      fr: 'Tapis de yoga antidérapant de 6 mm, dense et confortable. Idéal pour le yoga, le pilates et les étirements.',
      en: 'A 6 mm non-slip yoga mat, dense and comfortable. Ideal for yoga, pilates and stretching.',
    },
    stock: 70,
    featured: true,
    createdAt: '2026-06-20',
  },
  {
    id: 'p21',
    slug: 'ceramic-dinner-set-18pc',
    name: 'Ceramic Dinner Set 18pc',
    brand: 'Kasa',
    category: 'home',
    price: 45000,
    compareAt: 60000,
    rating: 4.6,
    reviews: 187,
    images: [img('1567538096630-e0c55bd6374c'), img('1600180758890-6b94519a8ba6')],
    colors: [C.white, C.beige],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Service de table 18 pièces en céramique émaillée. Élégant, résistant et compatible lave-vaisselle.',
      en: 'An 18-piece glazed ceramic dinner set. Elegant, durable and dishwasher-safe.',
    },
    stock: 34,
    bestSeller: true,
    createdAt: '2026-05-24',
  },
  {
    id: 'p22',
    slug: 'scented-candle-trio',
    name: 'Scented Candle Trio',
    brand: 'Kasa',
    category: 'home',
    price: 16000,
    rating: 4.8,
    reviews: 254,
    images: [img('1555529669-e69e7aa0ba9a'), img('1567016432779-094069958ea5')],
    colors: [C.beige, C.gold],
    sizes: [],
    badge: 'new',
    description: {
      fr: 'Trio de bougies parfumées en cire de soja : vanille, bois de santal et agrumes. Jusqu’à 30h de diffusion chacune.',
      en: 'A trio of soy-wax scented candles: vanilla, sandalwood and citrus. Up to 30h burn time each.',
    },
    stock: 110,
    createdAt: '2026-06-05',
  },
  {
    id: 'p23',
    slug: 'matte-liquid-lipstick',
    name: 'Matte Liquid Lipstick',
    brand: 'Solace',
    category: 'beauty',
    price: 9000,
    rating: 4.6,
    reviews: 612,
    images: [img('1596462502278-27bfdc403348'), img('1611930022073-b7a4ba5fcccd')],
    colors: [C.red, C.pink],
    sizes: [],
    badge: 'bestseller',
    description: {
      fr: 'Rouge à lèvres liquide mat longue tenue, formule confort non desséchante. Couleur intense en une seule couche.',
      en: 'A long-wear matte liquid lipstick with a comfortable, non-drying formula. Intense color in a single coat.',
    },
    stock: 200,
    bestSeller: true,
    createdAt: '2026-06-02',
  },
  {
    id: 'p24',
    slug: 'ionic-hair-dryer-pro',
    name: 'Ionic Hair Dryer Pro',
    brand: 'Lumen',
    category: 'beauty',
    price: 38000,
    compareAt: 52000,
    rating: 4.7,
    reviews: 428,
    images: [img('1585386959984-a4155224a1ad'), img('1594633312681-425c7b97ccd1')],
    colors: [C.black, C.pink],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Sèche-cheveux ionique 2200W, séchage rapide et anti-frisottis. Deux embouts et trois réglages de température.',
      en: 'A 2200W ionic hair dryer for fast, frizz-free drying. Two nozzles and three temperature settings.',
    },
    stock: 52,
    featured: true,
    createdAt: '2026-05-18',
  },
  {
    id: 'p25',
    slug: 'classic-denim-jacket',
    name: 'Classic Denim Jacket',
    brand: 'Urbano',
    category: 'fashion',
    price: 42000,
    compareAt: 60000,
    rating: 4.6,
    reviews: 297,
    images: [img('1576566588028-4147f3842f27'), img('1521572163474-6864f9cf17ab')],
    colors: [C.blue, C.navy],
    sizes: APPAREL,
    badge: 'sale',
    description: {
      fr: 'Veste en jean intemporelle, coupe régulière et denim résistant. Un basique qui se porte en toute saison.',
      en: 'A timeless denim jacket with a regular fit and durable denim. A staple you can wear all year round.',
    },
    stock: 58,
    featured: true,
    createdAt: '2026-05-30',
  },
  {
    id: 'p26',
    slug: 'floral-summer-dress',
    name: 'Floral Summer Dress',
    brand: 'Urbano',
    category: 'fashion',
    price: 33000,
    rating: 4.8,
    reviews: 176,
    images: [img('1503342217505-b0a15ec3261c'), img('1620916566398-39f1143ab7be')],
    colors: [C.pink, C.white],
    sizes: APPAREL,
    badge: 'new',
    description: {
      fr: 'Robe d’été fluide à motif floral, tissu léger et respirant. Parfaite pour les journées ensoleillées.',
      en: 'A flowing floral summer dress in light, breathable fabric. Perfect for sunny days.',
    },
    stock: 84,
    createdAt: '2026-06-22',
  },
  {
    id: 'p27',
    slug: 'bifold-leather-wallet',
    name: 'Bifold Leather Wallet',
    brand: 'Vireo',
    category: 'accessories',
    price: 20000,
    rating: 4.7,
    reviews: 344,
    images: [img('1527719327859-c6ce80353573'), img('1526947425960-945c6e72858f')],
    colors: [C.black, C.beige],
    sizes: [],
    badge: null,
    description: {
      fr: 'Portefeuille en cuir véritable à deux volets, protection anti-RFID et nombreux emplacements cartes.',
      en: 'A genuine-leather bifold wallet with RFID protection and plenty of card slots.',
    },
    stock: 130,
    createdAt: '2026-05-12',
  },
  {
    id: 'p28',
    slug: 'minimalist-analog-watch',
    name: 'Minimalist Analog Watch',
    brand: 'Meridian',
    category: 'accessories',
    price: 65000,
    compareAt: 85000,
    rating: 4.7,
    reviews: 402,
    images: [img('1523275335684-37898b6baf30'), img('1546868871-7041f2a55e12')],
    colors: [C.silver, C.gold, C.black],
    sizes: [],
    badge: 'bestseller',
    description: {
      fr: 'Montre analogique au design épuré, bracelet en acier inoxydable et étanchéité 3 ATM. L’élégance au quotidien.',
      en: 'A clean-design analog watch with a stainless-steel strap and 3 ATM water resistance. Everyday elegance.',
    },
    stock: 46,
    featured: true,
    bestSeller: true,
    createdAt: '2026-04-28',
  },
  {
    id: 'p29',
    slug: 'portable-bluetooth-speaker',
    name: 'Portable Bluetooth Speaker',
    brand: 'Lumen',
    category: 'electronics',
    price: 40000,
    compareAt: 55000,
    rating: 4.6,
    reviews: 731,
    images: [img('1606107557195-0e29a4b5b4aa'), img('1618354691373-d851c5c3a990')],
    colors: [C.black, C.blue, C.red],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Enceinte Bluetooth portable étanche IPX7, son puissant et 20h d’autonomie. La bande-son de toutes vos sorties.',
      en: 'A waterproof IPX7 portable Bluetooth speaker with powerful sound and 20h battery life. The soundtrack to every outing.',
    },
    stock: 120,
    featured: true,
    createdAt: '2026-06-10',
  },
  {
    id: 'p30',
    slug: 'pro-gaming-mouse',
    name: 'Pro Gaming Mouse',
    brand: 'Meridian',
    category: 'electronics',
    price: 25000,
    rating: 4.7,
    reviews: 512,
    images: [img('1517336714731-489689fd1ca8'), img('1496181133206-80ce9b88a853')],
    colors: [C.black],
    sizes: [],
    badge: 'new',
    description: {
      fr: 'Souris gaming filaire, capteur 16 000 DPI, 7 boutons programmables et éclairage RGB. Précision de compétition.',
      en: 'A wired gaming mouse with a 16,000 DPI sensor, 7 programmable buttons and RGB lighting. Competition-grade precision.',
    },
    stock: 88,
    createdAt: '2026-06-16',
  },
  {
    id: 'p31',
    slug: '4k-smart-tv-55',
    name: '4K Smart TV 55"',
    brand: 'Meridian',
    category: 'electronics',
    price: 320000,
    compareAt: 400000,
    rating: 4.6,
    reviews: 289,
    images: [img('1526170375885-4d8ecf77b99f'), img('1516035069371-29a1b244cc32')],
    colors: [C.black],
    sizes: [],
    badge: 'bestseller',
    description: {
      fr: 'Téléviseur 4K UHD de 55 pouces, HDR et système intelligent intégré. Une image immersive pour toute la maison.',
      en: 'A 55-inch 4K UHD TV with HDR and a built-in smart system. Immersive picture for the whole home.',
    },
    stock: 21,
    bestSeller: true,
    createdAt: '2026-05-22',
  },
  {
    id: 'p32',
    slug: 'espresso-coffee-maker',
    name: 'Espresso Coffee Maker',
    brand: 'Kasa',
    category: 'home',
    price: 58000,
    compareAt: 72000,
    rating: 4.5,
    reviews: 233,
    images: [img('1600180758890-6b94519a8ba6'), img('1567538096630-e0c55bd6374c')],
    colors: [C.black, C.silver],
    sizes: [],
    badge: 'sale',
    description: {
      fr: 'Machine à espresso 15 bars avec buse vapeur pour un lait onctueux. Un café de qualité barista à la maison.',
      en: 'A 15-bar espresso machine with a steam wand for silky milk. Barista-quality coffee at home.',
    },
    stock: 37,
    featured: true,
    createdAt: '2026-06-03',
  },
]

/** ------------------------------------------------------------------ *
 * Selectors
 * ------------------------------------------------------------------ */

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug || p.id === slug)
}

export function getFeatured() {
  return products.filter((p) => p.featured)
}

export function getBestSellers() {
  return products.filter((p) => p.bestSeller)
}

export function getRelated(product: Product, count = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, count)
}

export const flashDealProduct = products.find((p) => p.slug === 'smart-watch-series-7')!

/** ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */

export interface Testimonial {
  id: string
  name: string
  role: LocalizedText
  avatar: string
  quote: LocalizedText
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Emily Johnson',
    role: { fr: 'Cliente vérifiée', en: 'Verified buyer' },
    avatar: img('1494790108377-be9c29b29330', 120),
    quote: {
      fr: 'Produits de qualité, livraison rapide et un service client excellent. Tchokos est ma destination shopping préférée.',
      en: 'Great products, fast delivery and excellent customer service. Tchokos is my go-to shopping destination.',
    },
    rating: 5,
  },
  {
    id: 't2',
    name: 'Karim Benali',
    role: { fr: 'Client vérifié', en: 'Verified buyer' },
    avatar: img('1500648767791-00dcc994a43e', 120),
    quote: {
      fr: 'Une interface fluide et des prix imbattables. J’ai reçu ma commande en deux jours, tout était parfait.',
      en: 'A smooth interface and unbeatable prices. I received my order in two days and everything was perfect.',
    },
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sophie Laurent',
    role: { fr: 'Cliente vérifiée', en: 'Verified buyer' },
    avatar: img('1438761681033-6461ffad8d80', 120),
    quote: {
      fr: 'Le choix est immense et la qualité au rendez-vous. Je recommande à 100%, on se sent en confiance.',
      en: 'The selection is huge and the quality is there. I recommend it 100% — you feel in good hands.',
    },
    rating: 4,
  },
]

/** ------------------------------------------------------------------ *
 * Admin mock data
 * ------------------------------------------------------------------ */

export interface AdminStat {
  key: string
  value: string
  change: number
}

export const adminStats: AdminStat[] = [
  { key: 'revenue', value: '84 250 000 FCFA', change: 12.5 },
  { key: 'totalOrders', value: '3,842', change: 8.2 },
  { key: 'totalUsers', value: '18,204', change: 5.1 },
  { key: 'conversion', value: '4.7%', change: -1.3 },
]

export const salesByMonth = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 48 },
  { month: 'Apr', value: 68 },
  { month: 'May', value: 74 },
  { month: 'Jun', value: 82 },
  { month: 'Jul', value: 91 },
  { month: 'Aug', value: 78 },
  { month: 'Sep', value: 86 },
  { month: 'Oct', value: 95 },
  { month: 'Nov', value: 88 },
  { month: 'Dec', value: 100 },
]

export type OrderStatus = 'paid' | 'pending' | 'shipped' | 'refunded'

export interface AdminOrder {
  id: string
  customer: string
  email: string
  date: string
  amount: number
  status: OrderStatus
  items: number
}

export const mockOrders: AdminOrder[] = [
  { id: '#TK-10428', customer: 'Emily Johnson', email: 'emily.j@mail.com', date: '2026-06-28', amount: 142000, status: 'paid', items: 3 },
  { id: '#TK-10427', customer: 'Karim Benali', email: 'karim.b@mail.com', date: '2026-06-28', amount: 42000, status: 'shipped', items: 1 },
  { id: '#TK-10426', customer: 'Sophie Laurent', email: 'sophie.l@mail.com', date: '2026-06-27', amount: 680000, status: 'paid', items: 1 },
  { id: '#TK-10425', customer: 'David Chen', email: 'david.c@mail.com', date: '2026-06-27', amount: 84000, status: 'pending', items: 2 },
  { id: '#TK-10424', customer: 'Amina Diallo', email: 'amina.d@mail.com', date: '2026-06-26', amount: 52000, status: 'paid', items: 1 },
  { id: '#TK-10423', customer: 'Lucas Meyer', email: 'lucas.m@mail.com', date: '2026-06-26', amount: 185000, status: 'refunded', items: 1 },
  { id: '#TK-10422', customer: 'Nadia Haddad', email: 'nadia.h@mail.com', date: '2026-06-25', amount: 98000, status: 'shipped', items: 4 },
  { id: '#TK-10421', customer: 'Tom Wilson', email: 'tom.w@mail.com', date: '2026-06-25', amount: 24000, status: 'paid', items: 1 },
]

export type UserRole = 'customer' | 'admin' | 'vendor'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  joined: string
  orders: number
  avatar: string
}

export const mockUsers: AdminUser[] = [
  { id: 'u1', name: 'Emily Johnson', email: 'emily.j@mail.com', role: 'customer', joined: '2025-11-02', orders: 14, avatar: img('1494790108377-be9c29b29330', 80) },
  { id: 'u2', name: 'Karim Benali', email: 'karim.b@mail.com', role: 'customer', joined: '2025-12-18', orders: 6, avatar: img('1500648767791-00dcc994a43e', 80) },
  { id: 'u3', name: 'Sophie Laurent', email: 'sophie.l@mail.com', role: 'vendor', joined: '2025-09-30', orders: 41, avatar: img('1438761681033-6461ffad8d80', 80) },
  { id: 'u4', name: 'David Chen', email: 'david.c@mail.com', role: 'customer', joined: '2026-01-11', orders: 3, avatar: img('1633332755192-727a05c4013d', 80) },
  { id: 'u5', name: 'Amina Diallo', email: 'amina.d@mail.com', role: 'customer', joined: '2026-02-05', orders: 9, avatar: img('1531123897727-8f129e1688ce', 80) },
  { id: 'u6', name: 'Lucas Meyer', email: 'lucas.m@mail.com', role: 'admin', joined: '2025-08-21', orders: 0, avatar: img('1507003211169-0a1dd7228f2d', 80) },
]
