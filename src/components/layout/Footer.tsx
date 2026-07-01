'use client'

import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LanguageProvider'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { categories, localized } from '@/lib/mockData'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useTranslation()
  const { locale } = useLanguage()

  const support = [
    { label: t('footer.contact'), href: '#' },
    { label: t('footer.faq'), href: '#' },
    { label: t('footer.shipping'), href: '#' },
    { label: t('footer.returns'), href: '#' },
  ]
  const company = [
    { label: t('footer.about'), href: '#' },
    { label: t('footer.careers'), href: '#' },
    { label: t('footer.privacy'), href: '#' },
    { label: t('footer.terms'), href: '#' },
  ]

  return (
    <footer className="mt-16 border-t border-surface-muted bg-white">
      <div className="container-px grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <Logo showTagline={false} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            {t('footer.aboutText')}
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="grid h-9 w-9 place-items-center rounded-full bg-surface-muted text-ink-soft transition hover:bg-brand-600 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">{t('footer.shop')}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link href={`/shop?category=${c.slug}`} className="transition hover:text-brand-700">
                  {localized(c.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">{t('footer.support')}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {support.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">{t('footer.company')}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-surface-muted">
        <div className="container-px flex flex-col items-center gap-4 py-4 text-sm text-ink-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t('common.brandFull')}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <Truck size={15} /> {t('home.freeShipping')}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={15} /> {t('home.securePay')}
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard size={15} /> Visa · Mastercard
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
