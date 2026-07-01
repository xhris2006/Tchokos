import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-lg', className)} />
}

/** A product-card shaped skeleton for grid loading states. */
export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden p-3">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-2 pt-3">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
