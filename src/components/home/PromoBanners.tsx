'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { Reveal, SectionHeader } from '@/components/ui/Section'
import { cn } from '@/lib/utils'

interface PromoProps {
  title: string
  desc: string
  href: string
  image: string
  tone: 'amber' | 'blue'
}

function Promo({ title, desc, href, image, tone }: PromoProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex min-h-[190px] overflow-hidden rounded-3xl p-6 shadow-soft transition-shadow hover:shadow-card sm:min-h-[220px]',
        tone === 'amber' ? 'bg-accent/90' : 'bg-brand-600'
      )}
    >
      <div className="relative z-10 flex max-w-[60%] flex-col text-white">
        <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm text-white/90">{desc}</p>
        <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-ink/85 px-4 py-2 text-sm font-semibold transition group-hover:bg-ink">
          {tone === 'amber' ? 'Shop Now' : 'Shop Now'}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-90 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className={cn(
          'absolute inset-0',
          tone === 'amber'
            ? 'bg-gradient-to-r from-accent via-accent/80 to-accent/20'
            : 'bg-gradient-to-r from-brand-700 via-brand-600/85 to-brand-500/20'
        )}
      />
      {/* content again above overlay */}
      <div className="pointer-events-none absolute inset-0 z-[5]" />
    </Link>
  )
}

export function PromoBanners() {
  const { t } = useTranslation()

  return (
    <section className="container-px pt-10">
      <SectionHeader title={t('home.trustedBrands')} />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Reveal>
          <Promo
            title={t('home.summerCollection')}
            desc={t('home.summerDesc')}
            href="/shop?category=fashion"
            image="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
            tone="amber"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Promo
            title={t('home.homeEssentials')}
            desc={t('home.homeEssentialsDesc')}
            href="/shop?category=home"
            image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
            tone="blue"
          />
        </Reveal>
      </div>
    </section>
  )
}
