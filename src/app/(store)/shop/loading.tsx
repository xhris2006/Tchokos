import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeleton'

export default function ShopLoading() {
  return (
    <div className="container-px py-6">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="mt-2 h-4 w-56" />
      <div className="mt-6 flex gap-6">
        <div className="hidden w-56 shrink-0 lg:block">
          <Skeleton className="h-[420px] w-full rounded-2xl" />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
