'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Fade-up on scroll-into-view wrapper. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeader({
  title,
  href,
  actionLabel,
  className,
}: {
  title: string
  href?: string
  actionLabel?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <h2 className="flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-ink sm:text-lg">
        <span aria-hidden className="h-4 w-1.5 shrink-0 rounded-full bg-brand-600 sm:h-5" />
        {title}
      </h2>
      {href && actionLabel && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-700 transition hover:bg-brand-100"
        >
          {actionLabel}
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  )
}
