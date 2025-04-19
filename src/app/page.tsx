'use client';

import { Categories } from '@/components/home/categories';
import { FeaturedProducts } from '@/components/home/featured-products';
import { Hero } from '@/components/home/hero';
import { WhyOrderFromUs } from '@/components/home/why-order-from-us';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Banner */}
      <Hero />

      {/* Categories Bento Grid */}
      <Categories />

      {/* Why Order From Us Section */}
      <WhyOrderFromUs />

      {/* Featured Products Carousel */}
      <FeaturedProducts />
    </main>
  );
}
