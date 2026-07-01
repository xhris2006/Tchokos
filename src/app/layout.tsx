import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Providers } from '@/providers/Providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tchokos Sarl — Shop Smart, Live Better',
    template: '%s · Tchokos Sarl',
  },
  description:
    'Tchokos Sarl — premium e-commerce. Discover fashion, electronics, beauty, home and more from top brands at the best prices.',
  keywords: ['Tchokos', 'e-commerce', 'shop', 'fashion', 'electronics', 'beauty'],
  authors: [{ name: 'Tchokos Sarl' }],
  openGraph: {
    title: 'Tchokos Sarl — Shop Smart, Live Better',
    description: 'Premium e-commerce. Everything you need, all in one place.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
