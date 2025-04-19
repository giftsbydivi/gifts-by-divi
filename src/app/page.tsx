'use client';

import { useState, useRef } from 'react';

import Link from 'next/link';

import { useCart } from '@/lib/providers/cart-provider';
import { Product } from '@/lib/services/api';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Dummy data for categories
const categories = [
  {
    id: 1,
    name: 'Home Decor',
    image: '/placeholder.png',
    description: 'Stylish and elegant pieces to elevate your space',
    size: 'large',
  },
  {
    id: 2,
    name: 'Gourmet',
    image: '/placeholder.png',
    description: 'Delicious treats for the discerning palate',
    size: 'medium',
  },
  {
    id: 3,
    name: 'Personalized',
    image: '/placeholder.png',
    description: 'One-of-a-kind gifts made just for them',
    size: 'medium',
  },
  {
    id: 4,
    name: 'Jewelry',
    image: '/placeholder.png',
    description: 'Timeless pieces that sparkle and shine',
    size: 'small',
  },
  {
    id: 5,
    name: 'Tech Gadgets',
    image: '/placeholder.png',
    description: 'Innovative solutions for modern living',
    size: 'small',
  },
];

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

// Motion effect component for category tiles
function BentoTile({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate position relative to element center
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Calculate transform based on mouse position
  const transform = `
    perspective(1000px)
    rotateX(${position.y * 4}deg)
    rotateY(${position.x * -4}deg)
    translateZ(10px)
  `;

  return (
    <div
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { addToCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    // Scroll by exactly one card width (including gap)
    const cardWidth = 245;
    const gap = 24; // 6 in space-x-6 = 24px
    const scrollAmount = cardWidth + gap;

    const scrollPosition =
      direction === 'left'
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;

    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Banner */}
      <section className="relative h-[500px] w-full">
        <div className="absolute inset-0 bg-neutral-900">
          {/* Placeholder for background image */}
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-neutral-950/60 to-neutral-950/60">
            <p className="text-neutral-400">Banner Image</p>
          </div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-medium md:text-6xl">Everyday Gift</h1>
          <p className="mb-8 max-w-xl text-xl text-white/80">
            Luxury gifts for life&apos;s everyday moments
          </p>
          <Link href="/products">
            <Button size="lg" className="px-8 py-6 text-lg">
              Shop All
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-medium">Shop by Category</h2>

          <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
            {categories.map((category) => {
              // Determine grid span based on size
              const colSpan =
                category.size === 'large'
                  ? 'md:col-span-2'
                  : category.size === 'medium'
                    ? 'md:col-span-2'
                    : 'md:col-span-1';
              const rowSpan =
                category.size === 'large'
                  ? 'md:row-span-2'
                  : category.size === 'medium'
                    ? 'md:row-span-1'
                    : 'md:row-span-1';

              return (
                <Link
                  href={`/products?category=${category.name}`}
                  key={category.id}
                  className={`group ${colSpan} ${rowSpan}`}
                >
                  <BentoTile className="h-full w-full overflow-hidden rounded-xl bg-neutral-50 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/10 to-neutral-900/80 opacity-60 transition-opacity group-hover:opacity-80" />
                    <div className="absolute inset-0 bg-neutral-100">
                      {/* Add actual image here when available */}
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-neutral-400">{category.name}</p>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white">
                      <h3 className="text-xl font-medium">{category.name}</h3>
                      {(category.size === 'large' || category.size === 'medium') && (
                        <p className="mt-1 text-sm text-white/80">{category.description}</p>
                      )}
                    </div>
                  </BentoTile>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative mb-8">
            <h2 className="text-center text-3xl font-medium">Featured Gifts</h2>

            <div className="absolute top-1/2 right-0 hidden -translate-y-1/2 items-center gap-2 md:flex">
              <button
                onClick={() => scrollCarousel('left')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100"
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100"
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
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

          <div className="relative mx-auto" style={{ maxWidth: '789px' }}>
            {' '}
            {/* Exactly 3 cards + gaps */}
            <div
              ref={carouselRef}
              className="scrollbar-hide flex snap-x snap-mandatory space-x-6 overflow-x-auto pb-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Hide scrollbar for Chrome, Safari and Opera */}
              <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="max-w-[245px] min-w-[245px] flex-shrink-0 snap-center overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-200 hover:translate-y-[-4px] hover:shadow-md"
                >
                  {/* Product Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div className="transition-transform duration-500 group-hover:scale-110">
                        <p className="text-sm text-neutral-400">Product Image</p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="outline"
                        className="bg-white/90 px-2 py-0 text-xs backdrop-blur-sm"
                      >
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="truncate text-base font-medium tracking-tight text-neutral-900">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-neutral-900">
                        ${product.price.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="rounded-full p-1.5 text-neutral-700 transition-colors hover:bg-neutral-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
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
                          className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-neutral-800"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicate products to demonstrate scrolling */}
              {featuredProducts.map((product) => (
                <div
                  key={`${product.id}-dup`}
                  className="max-w-[245px] min-w-[245px] flex-shrink-0 snap-center overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-200 hover:translate-y-[-4px] hover:shadow-md"
                >
                  {/* Product Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div className="transition-transform duration-500 group-hover:scale-110">
                        <p className="text-sm text-neutral-400">Product Image</p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="outline"
                        className="bg-white/90 px-2 py-0 text-xs backdrop-blur-sm"
                      >
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="truncate text-base font-medium tracking-tight text-neutral-900">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-neutral-900">
                        ${product.price.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="rounded-full p-1.5 text-neutral-700 transition-colors hover:bg-neutral-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
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
                          className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-neutral-800"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Gradient indicators at both ends */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent"></div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/products">
              <Button variant="outline" className="border-neutral-300">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
