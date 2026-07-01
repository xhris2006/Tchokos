'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { categories, localized } from '@/lib/mockData'

export function CategoryScroll() {
  const { locale } = useLanguage()

  return (
    <section className="container-px pt-6">
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0">
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/shop?category=${c.slug}`}
              className="group flex w-16 flex-col items-center gap-2 sm:w-20"
            >
              <span className="relative h-16 w-16 overflow-hidden rounded-2xl bg-surface-muted shadow-soft transition group-hover:shadow-card sm:h-[72px] sm:w-[72px]">
                <Image
                  src={c.image}
                  alt={localized(c.name, locale)}
                  fill
                  sizes="72px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="text-center text-xs font-medium text-ink-soft transition group-hover:text-brand-700">
                {localized(c.name, locale)}
              </span>
            </Link>
          </motion.div>
        ))}

        <Link
          href="/shop"
          className="group flex w-16 flex-col items-center gap-2 sm:w-20"
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl border border-dashed border-brand-200 bg-brand-50 text-brand-600 transition group-hover:bg-brand-100 sm:h-[72px] sm:w-[72px]">
            <MoreHorizontal size={22} />
          </span>
          <span className="text-center text-xs font-medium text-ink-soft group-hover:text-brand-700">
            All
          </span>
        </Link>
      </div>
    </section>
  )
}
