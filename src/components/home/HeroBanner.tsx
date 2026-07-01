'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { buttonVariants } from '@/components/ui/Button'

const heroImage =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80'

export function HeroBanner() {
  const { t } = useTranslation()

  const perks = [
    { icon: Truck, title: t('home.freeShipping'), desc: t('home.freeShippingDesc') },
    { icon: RotateCcw, title: t('home.easyReturns'), desc: t('home.easyReturnsDesc') },
    { icon: ShieldCheck, title: t('home.securePay'), desc: t('home.securePayDesc') },
  ]

  return (
    <section className="container-px pt-5">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-brand-100/60 shadow-soft">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:gap-8 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {t('home.heroKicker')}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {t('home.heroTitle1')}
              <br />
              <span className="text-brand-600">{t('home.heroTitle2')}</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
              {t('home.heroText')}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className={buttonVariants({ size: 'lg' })}>
                {t('home.shopNow')}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop?sort=sale"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                {t('home.exploreDeals')}
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-3 border-t border-white/60 pt-6">
              {perks.map((perk) => (
                <div key={perk.title} className="flex items-start gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand-600 shadow-soft">
                    <perk.icon size={17} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-ink">{perk.title}</p>
                    <p className="truncate text-[11px] text-ink-muted">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-float">
              <Image
                src={heroImage}
                alt="Tchokos collection"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute right-4 top-4 grid h-16 w-16 place-items-center rounded-full bg-accent text-center text-[11px] font-bold uppercase leading-tight text-white shadow-float"
            >
              {t('home.upTo')}
              <br />
              -60%
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
