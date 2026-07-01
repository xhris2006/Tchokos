# Tchokos Sarl — E-commerce Frontend

A modern, mobile-first e-commerce frontend for **Tchokos Sarl**, built with a
premium, minimal design system. Frontend only — powered by mock data, ready to
deploy on Vercel.

<p align="center">
  <em>Shop Smart, Live Better.</em>
</p>

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — custom deep-blue design system
- **Framer Motion** — page/scroll animations & micro-interactions
- **Lucide Icons**
- **Zustand** — cart & wishlist state (persisted to `localStorage`)
- **next/image** — optimized images (Unsplash)
- Built-in **i18n** — French (default) & English, with a FR / EN switcher

## Features

- Fully responsive, mobile-first (bottom nav, drawer menu, slide-in cart)
- Sticky header with live search
- Smooth scrolling, hover animations, loading skeletons
- Toast micro-interactions (add to cart / wishlist)
- Persistent cart & wishlist
- Clean, reusable component architecture

## Pages

| Route              | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `/`                | Home — hero, categories, flash deal, featured, best sellers, promos, testimonials, newsletter |
| `/shop`            | Catalogue with filters (category, price, size, color) + sorting |
| `/product/[id]`    | Product detail — gallery, variants, description, related products |
| `/cart`            | Cart — quantities, order summary, checkout           |
| `/admin`           | Admin dashboard — overview, products, orders, users  |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Project structure

```
src/
├── app/
│   ├── (store)/           # storefront route group (shared header/footer/nav)
│   │   ├── page.tsx       # home
│   │   ├── shop/
│   │   ├── product/[id]/
│   │   └── cart/
│   ├── admin/             # admin panel (own layout)
│   ├── layout.tsx         # root layout + providers + fonts
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── layout/            # Header, Footer, MobileDrawer, CartSidebar, BottomNav
│   ├── ui/                # Button, Input, Modal, Badge, Rating, Skeleton, ...
│   ├── home/              # hero & home sections
│   ├── shop/              # ProductCard, ProductGrid, Filters, SortDropdown
│   ├── product/           # gallery, product view, related
│   ├── cart/              # cart view
│   └── admin/             # dashboard shell, stat cards, chart, tables
├── lib/
│   ├── mockData.ts        # products, categories, testimonials, admin data
│   ├── shop.ts            # filtering & sorting helpers
│   ├── i18n/              # dictionaries + LanguageProvider
│   └── utils.ts           # cn(), price formatting, helpers
├── store/                 # zustand stores (cart, wishlist, ui, toast)
└── providers/             # app-wide providers
```

## Internationalization

Language state lives in `LanguageProvider` and persists to `localStorage`.
Add or edit copy in `src/lib/i18n/dictionaries.ts`. Use it in any client
component:

```tsx
const { t, locale, setLocale } = useTranslation()
t('home.shopNow')
```

## Deploy on Vercel

1. Push this project to a Git repository.
2. Import it on [vercel.com](https://vercel.com/new).
3. Framework preset **Next.js** is detected automatically — no env vars needed.
4. Deploy.

## Notes

- No backend: all data is mock data in `src/lib/mockData.ts`.
- Product & avatar images are served from Unsplash (whitelisted in
  `next.config.js`).

---

© Tchokos Sarl. All rights reserved.
