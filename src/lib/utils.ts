import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind class names conditionally. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format an amount (in CFA francs) as a price string, e.g. "35 000 FCFA".
 * Prices across the app are stored directly in francs (integers).
 */
export function formatPrice(
  amount: number,
  opts: { locale?: string; suffix?: string } = {}
) {
  const { locale = 'fr-FR', suffix = 'FCFA' } = opts
  const value = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(Math.round(amount))
  return `${value} ${suffix}`
}

/** Compute a discount percentage from an original and current price. */
export function discountPercent(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return 0
  return Math.round(((compareAt - price) / compareAt) * 100)
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
