import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Rating({
  value,
  reviews,
  size = 14,
  className,
}: {
  value: number
  reviews?: number
  size?: number
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value)
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled ? 'fill-accent text-accent' : 'fill-surface-muted text-surface-muted'
              )}
            />
          )
        })}
      </div>
      <span className="text-xs font-medium text-ink-soft">
        {value.toFixed(1)}
        {typeof reviews === 'number' && (
          <span className="text-ink-muted"> ({reviews.toLocaleString()})</span>
        )}
      </span>
    </div>
  )
}
