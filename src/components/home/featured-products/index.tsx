'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { useFeaturedProducts } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';
import { Product } from '@/lib/services/api';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Use React Query hook to fetch featured products
  const { data: featuredProducts = [], isLoading, error } = useFeaturedProducts();

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

  // Function to render product cards
  const renderProductCard = (product: Product, isDuplicate = false) => (
    <motion.div
      key={isDuplicate ? `${product._id}-dup` : product._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className="group relative max-w-[280px] min-w-[280px] flex-shrink-0 cursor-pointer snap-start overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:max-w-[320px] sm:min-w-[320px] md:max-w-[300px] md:min-w-[300px]"
    >
      <Link
        href={`/products/${product.slug.current}`}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${product.name}`}
      />
      {/* Product Image */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg bg-neutral-100">
        {product.images && product.images.length > 0 ? (
          <div className="h-full w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0].url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-neutral-400">Product Image</p>
          </div>
        )}

        {/* Category badge - positioned absolutely over the image */}
        <div className="absolute top-3 right-3 z-20">
          {product.categories && product.categories.length > 0 && (
            <Badge variant="outline" className="bg-white/90 px-2 py-0.5 text-xs backdrop-blur-sm">
              {product.categories[0].name}
            </Badge>
          )}
        </div>

        {/*  Trending badges - top left */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.tags?.includes('trending') && (
            <Badge
              variant="outline"
              className="border-rose-200 bg-rose-50/90 text-rose-700 backdrop-blur-sm"
            >
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
                Trending
              </span>
            </Badge>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-lg font-medium text-neutral-900">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-700">
          {typeof product.description === 'string' ? product.description : 'Beautiful gift item'}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-neutral-900">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-neutral-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-rose-600">
                Save ${(product.compareAtPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="relative z-20 rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-rose-800"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Loading skeleton
  const renderSkeletonCard = (key: number) => (
    <motion.div
      key={`skeleton-${key}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className="max-w-[280px] min-w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-md sm:max-w-[320px] sm:min-w-[320px] md:max-w-[300px] md:min-w-[300px]"
    >
      {/* Skeleton Image */}
      <div className="relative h-[200px] w-full overflow-hidden bg-neutral-100">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Skeleton Content */}
      <div className="p-5">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mb-4 h-4 w-full" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <FadeInWhenVisible>
          <div className="relative mb-8">
            <h2 className="text-center text-2xl font-semibold text-neutral-900 md:text-3xl">
              Featured Gifts
            </h2>

            <div className="absolute top-1/2 right-4 hidden -translate-y-1/2 items-center gap-2 md:flex">
              <Button
                onClick={() => scrollCarousel('left')}
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50"
                aria-label="Scroll left"
                disabled={isLoading}
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
              </Button>
              <Button
                onClick={() => scrollCarousel('right')}
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50"
                aria-label="Scroll right"
                disabled={isLoading}
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
              </Button>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="relative w-full">
          {error && (
            <p className="mb-4 text-center text-red-500">
              {error instanceof Error ? error.message : 'Failed to load featured products'}
            </p>
          )}

          <div
            ref={carouselRef}
            className="scrollbar-hide -mx-4 flex snap-x snap-mandatory space-x-4 overflow-x-auto px-2 py-2 pb-8 sm:px-4"
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

            {isLoading
              ? // Show skeletons when loading
                Array.from({ length: 6 }).map((_, index) => renderSkeletonCard(index))
              : // Show products when loaded
                featuredProducts.map((product) => renderProductCard(product))}

            {/* Duplicate products to demonstrate scrolling */}
            {!isLoading &&
              featuredProducts.length > 6 &&
              featuredProducts.map((product) => renderProductCard(product, true))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
