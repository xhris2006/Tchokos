import { HeroBanner } from '@/components/home/HeroBanner'
import { CategoryScroll } from '@/components/home/CategoryScroll'
import { FlashDeals } from '@/components/home/FlashDeals'
import { PopularCategories } from '@/components/home/PopularCategories'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { BrandStrip } from '@/components/home/BrandStrip'
import { PromoBanners } from '@/components/home/PromoBanners'
import { BestSellers } from '@/components/home/BestSellers'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <CategoryScroll />
      <HeroBanner />
      <FlashDeals />
      <PopularCategories />
      <FeaturedProducts />
      <BrandStrip />
      <PromoBanners />
      <BestSellers />
      <Testimonials />
      <Newsletter />
    </>
  )
}
