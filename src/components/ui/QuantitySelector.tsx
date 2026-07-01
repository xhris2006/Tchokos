'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  className?: string
}) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)))
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-surface-muted bg-white',
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => set(value - 1)}
        disabled={value <= min}
        className="grid h-10 w-10 place-items-center rounded-l-xl text-ink-soft transition hover:bg-surface-muted disabled:opacity-40"
      >
        <Minus size={16} />
      </button>
      <span className="w-9 text-center text-sm font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => set(value + 1)}
        disabled={value >= max}
        className="grid h-10 w-10 place-items-center rounded-r-xl text-ink-soft transition hover:bg-surface-muted disabled:opacity-40"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
