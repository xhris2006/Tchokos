'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { flashDealProduct } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'

/** Countdown to ~2.5 days from first mount, persisted for the session feel. */
function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const target = Date.now() + (2 * 24 * 60 * 60 + 12 * 3600 + 45 * 60 + 30) * 1000
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      const s = Math.floor(diff / 1000)
      setTime({
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        mins: Math.floor((s % 3600) / 60),
        secs: s % 60,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-base font-bold tabular-nums text-white backdrop-blur sm:h-12 sm:w-12 sm:text-xl">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-white/70">
        {label}
      </span>
    </div>
  )
}

export function FlashDeals() {
  const { t } = useTranslation()
  const time = useCountdown()
  const p = flashDealProduct

  return (
    <section className="container-px pt-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 p-5 shadow-float sm:p-7">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
          <Link
            href={`/product/${p.slug}`}
            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white shadow-soft sm:h-28 sm:w-28"
          >
            <Image src={p.images[0]} alt={p.name} fill sizes="112px" className="object-cover" />
          </Link>

          <div className="flex-1 text-center sm:text-left">
            <p className="flex items-center justify-center gap-1.5 text-sm font-bold text-white sm:justify-start">
              <Zap size={16} className="fill-accent text-accent" /> {t('home.flashDeal')}
            </p>
            <p className="mt-0.5 text-xs text-white/70">{t('home.flashDealDesc')}</p>
            <p className="mt-2 text-xs font-medium text-white/80">{t('home.specialPrice')}</p>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <span className="text-xl font-extrabold text-white">
                {formatPrice(p.price)}
              </span>
              {p.compareAt && (
                <span className="text-sm text-white/60 line-through">
                  {formatPrice(p.compareAt)}
                </span>
              )}
            </div>
            <Link
              href={`/product/${p.slug}`}
              className={buttonVariants({
                size: 'sm',
                className: 'mt-3 bg-accent text-white hover:bg-accent/90',
              })}
            >
              {t('home.shopTheDeal')}
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <TimeBox value={time.days} label={t('home.days')} />
            <TimeBox value={time.hours} label={t('home.hours')} />
            <TimeBox value={time.mins} label={t('home.mins')} />
            <TimeBox value={time.secs} label={t('home.secs')} />
          </div>
        </div>
      </div>
    </section>
  )
}
