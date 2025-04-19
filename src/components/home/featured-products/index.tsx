'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { useCart } from '@/lib/providers/cart-provider';
import { Product } from '@/lib/services/api';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Dummy data for featured products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Scented Candle',
    price: 39.99,
    category: 'Home Decor',
    description: 'Hand-poured soy wax candle with premium essential oils',
    image: '/placeholder.png',
  },
  {
    id: '2',
    name: 'Artisanal Chocolate Box',
    price: 49.99,
    category: 'Gourmet',
    description: 'Selection of handcrafted chocolates from around the world',
    image: '/placeholder.png',
  },
  {
    id: '3',
    name: 'Monogrammed Leather Wallet',
    price: 89.99,
    category: 'Personalized',
    description: 'Full-grain leather wallet with custom monogram',
    image: '/placeholder.png',
  },
];

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    // Scroll by exactly one card width (including gap)
    const cardWidth = 260; // Increased card width
    const gap = 24; // 6 in space-x-6 = 24px
    const scrollAmount = cardWidth + gap;

    // On mobile, scroll just one card at a time
    const isMobile = window.innerWidth < 768;
    const mobileScrollAmount = cardWidth;

    const scrollPosition =
      direction === 'left'
        ? carouselRef.current.scrollLeft - (isMobile ? mobileScrollAmount : scrollAmount)
        : carouselRef.current.scrollLeft + (isMobile ? mobileScrollAmount : scrollAmount);

    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <FadeInWhenVisible>
          <div className="relative mb-8">
            <h2 className="text-center text-2xl font-semibold text-neutral-900 md:text-3xl">
              Featured Gifts
            </h2>

            <div className="absolute top-1/2 right-4 hidden -translate-y-1/2 items-center gap-2 md:flex">
              <button
                onClick={() => scrollCarousel('left')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="relative w-full">
          <div
            ref={carouselRef}
            className="scrollbar-hide -mx-4 flex snap-x snap-mandatory space-x-4 overflow-x-auto px-2 pb-8 sm:px-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Hide scrollbar for Chrome, Safari and Opera */}
            <style jsx global>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }

              @media (max-width: 768px) {
                .scrollbar-hide {
                  scroll-snap-type: x mandatory;
                  scroll-padding: 1rem;
                }
              }
            `}</style>

            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                className="max-w-[280px] min-w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:max-w-[320px] sm:min-w-[320px] md:max-w-[300px] md:min-w-[300px]"
              >
                {/* Product Image */}
                <div className="relative h-[200px] w-full overflow-hidden bg-neutral-100">
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      <p className="text-neutral-400">Product Image</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="outline"
                      className="bg-white/90 px-2 py-0.5 text-xs backdrop-blur-sm"
                    >
                      {product.category}
                    </Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-medium text-neutral-900">{product.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-700">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-neutral-900">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="rounded-full p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                          <path
                            fillRule="evenodd"
                            d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41-.147-.381-.146-.804 0-1.186zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>

                      <Button
                        onClick={() => addToCart(product)}
                        className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-rose-800"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Duplicate products to demonstrate scrolling */}
            {featuredProducts.map((product) => (
              <motion.div
                key={`${product.id}-dup`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                className="max-w-[280px] min-w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:max-w-[320px] sm:min-w-[320px] md:max-w-[300px] md:min-w-[300px]"
              >
                {/* Product Image */}
                <div className="relative h-[200px] w-full overflow-hidden bg-neutral-100">
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      <p className="text-neutral-400">Product Image</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="outline"
                      className="bg-white/90 px-2 py-0.5 text-xs backdrop-blur-sm"
                    >
                      {product.category}
                    </Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-medium text-neutral-900">{product.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-700">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-neutral-900">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="rounded-full p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                          <path
                            fillRule="evenodd"
                            d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41-.147-.381-.146-.804 0-1.186zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>

                      <Button
                        onClick={() => addToCart(product)}
                        className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-rose-800"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="mt-6 text-center" delay={0.2}>
          <Link href="/products">
            <Button className="bg-rose-700 text-white hover:bg-rose-800 hover:text-white">
              View All Products
            </Button>
          </Link>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
