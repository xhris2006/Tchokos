import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'sale' | 'new' | 'bestseller' | 'neutral' | 'success' | 'warning' | 'danger'

const tones: Record<Tone, string> = {
  sale: 'bg-danger text-white',
  new: 'bg-brand-600 text-white',
  bestseller: 'bg-accent text-white',
  neutral: 'bg-surface-muted text-ink-soft',
  success: 'bg-success/10 text-success',
  warning: 'bg-accent/10 text-accent',
  danger: 'bg-danger/10 text-danger',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
