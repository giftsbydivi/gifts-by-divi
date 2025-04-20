'use client';

import { useState } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { useProduct } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { ProductGallery } from '@/components/products/product-gallery';
import { SimilarProducts } from '@/components/products/similar-products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetail({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);
  const productQuery = useProduct(id);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (productQuery.data) {
      addToCart(productQuery.data, quantity);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="container mx-auto max-w-4xl">
        <FadeInWhenVisible>
          <div className="mb-6">
            <Link href="/products" className="text-rose-700 hover:underline">
              ← Back to products
            </Link>
          </div>
        </FadeInWhenVisible>

        {/* Loading state */}
        {productQuery.isLoading && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              {/* Main image skeleton */}
              <Skeleton className="h-[300px] w-full rounded-lg md:h-[400px]" />

              {/* Thumbnail row skeleton - horizontal on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-16 flex-shrink-0 rounded" />
                ))}
              </div>

              {/* Thumbnail column skeleton - vertical on desktop, hidden on mobile */}
              <div className="hidden md:grid md:grid-cols-[80px_1fr] md:gap-4">
                <div className="flex flex-col gap-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-16 rounded" />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Skeleton className="mb-2 h-6 w-24" />
              <Skeleton className="mb-2 h-10 w-3/4" />
              <Skeleton className="mb-4 h-6 w-20" />
              <Skeleton className="mb-6 h-24 w-full" />
              <div className="mb-6 flex items-center gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        )}

        {/* Error state */}
        {productQuery.isError && (
          <FadeInWhenVisible>
            <Card className="p-8 text-center">
              <h2 className="mb-2 text-lg font-medium text-red-700">Product Not Found</h2>
              <p className="mb-4 text-neutral-700">
                We couldn&apos;t find the product you&apos;re looking for.
              </p>
              <Link href="/products">
                <Button className="bg-rose-700 text-white hover:bg-rose-800">
                  Browse All Products
                </Button>
              </Link>
            </Card>
          </FadeInWhenVisible>
        )}

        {/* Success state */}
        {productQuery.isSuccess && productQuery.data && (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FadeInWhenVisible>
                <ProductGallery media={productQuery.data.media} />
              </FadeInWhenVisible>

              <div>
                <FadeInWhenVisible delay={0.1}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-green-200 bg-green-50 text-green-700"
                    >
                      {productQuery.data.category}
                    </Badge>
                    <Badge variant="outline">In Stock</Badge>

                    {productQuery.data.isFeatured && (
                      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                        Featured
                      </Badge>
                    )}

                    {productQuery.data.isTrending && (
                      <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700">
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

                  <h1 className="mb-2 text-3xl font-bold">{productQuery.data.name}</h1>
                  <p className="mb-4 text-2xl font-semibold">
                    ${productQuery.data.price.toFixed(2)}
                  </p>
                  <p className="mb-6 text-neutral-600">{productQuery.data.description}</p>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.2}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="rounded-r-none"
                      >
                        -
                      </Button>
                      <div className="border-input flex h-10 items-center justify-center border px-4">
                        {quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="rounded-l-none"
                      >
                        +
                      </Button>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        onClick={handleAddToCart}
                        className="bg-rose-700 px-8 text-white hover:bg-rose-800"
                      >
                        Add to Cart
                      </Button>
                    </motion.div>
                  </div>
                </FadeInWhenVisible>

                <Separator className="my-6" />

                <FadeInWhenVisible delay={0.3}>
                  <div>
                    <h2 className="mb-2 text-lg font-semibold">Product Details:</h2>
                    <ul className="list-disc space-y-1 pl-5 text-neutral-600">
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        Premium quality materials
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        Elegant design for any occasion
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        Makes a perfect gift
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                      >
                        Free gift wrapping available
                      </motion.li>
                    </ul>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>

            {/* Similar Products Section */}
            <SimilarProducts currentProductId={id} category={productQuery.data.category} />
          </>
        )}
      </div>
    </main>
  );
}
