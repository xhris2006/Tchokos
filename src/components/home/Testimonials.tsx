'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useLanguage, useTranslation } from '@/lib/i18n/LanguageProvider'
import { localized, testimonials } from '@/lib/mockData'
import { Rating } from '@/components/ui/Rating'
import { SectionHeader } from '@/components/ui/Section'
import { cn } from '@/lib/utils'

export function Testimonials() {
  const { t } = useTranslation()
  const { locale } = useLanguage()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5000
    )
    return () => clearInterval(id)
  }, [])

  const item = testimonials[index]

  return (
    <section className="container-px pt-10">
      <SectionHeader title={t('home.testimonialTitle')} />
      <div className="mt-5 overflow-hidden rounded-3xl bg-white p-6 shadow-soft sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Quote size={36} className="shrink-0 text-brand-200" />
            <div className="flex-1">
              <p className="text-base font-medium leading-relaxed text-ink sm:text-lg">
                “{localized(item.quote, locale)}”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full bg-surface-muted">
                  <Image src={item.avatar} alt={item.name} fill sizes="44px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-ink-muted">{localized(item.role, locale)}</p>
                </div>
                <Rating value={item.rating} className="ml-auto" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all',
                i === index ? 'w-6 bg-brand-600' : 'w-2 bg-surface-muted'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
