import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-xl border border-surface-muted bg-white px-4 text-sm text-ink placeholder:text-ink-muted',
        'transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
        className
      )}
      {...props}
    />
  )
)

Input.displayName = 'Input'
