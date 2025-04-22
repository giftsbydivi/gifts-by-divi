'use client';

import { useState } from 'react';

import Link from 'next/link';

import { PortableText } from '@portabletext/react';
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
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-4 md:grid md:grid-cols-[80px_1fr] md:gap-4">
                {/* Main image skeleton */}
                <Skeleton className="order-1 h-[300px] w-full rounded-lg md:order-2 md:h-[400px]" />

                {/* Thumbnails - horizontal on mobile, vertical on desktop */}
                <div className="order-2 flex gap-2 overflow-x-auto pb-2 md:order-1 md:flex-col md:overflow-x-hidden">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-16 flex-shrink-0 rounded" />
                  ))}
                </div>
              </div>

              <div>
                {/* Category badges */}
                <div className="mb-2 flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-22 rounded-full" />
                </div>

                {/* Product title */}
                <Skeleton className="mb-2 h-9 w-full max-w-[360px]" />

                {/* Price information */}
                <div className="mb-4 flex items-center gap-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>

                {/* Product description - multiple lines */}
                <div className="mb-6 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>

                {/* Quantity selector and Add to Cart button */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex gap-1">
                    <Skeleton className="h-10 w-10 rounded-l-md" />
                    <Skeleton className="h-10 w-12" />
                    <Skeleton className="h-10 w-10 rounded-r-md" />
                  </div>
                  <Skeleton className="h-10 w-32 rounded-md" />
                </div>

                {/* Separator */}
                <Skeleton className="mt-6 mb-6 h-[1px] w-full" />

                {/* Product details section */}
                <Skeleton className="mb-3 h-6 w-36" />

                {/* Bullet points */}
                <div className="space-y-2 pl-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Products Section Skeleton */}
            <div className="mt-12">
              <Skeleton className="mb-6 h-8 w-48" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="overflow-hidden rounded-lg shadow-sm">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="mb-2 h-5 w-16 rounded-full" />
                      <Skeleton className="mb-1 h-6 w-3/4" />
                      <Skeleton className="mb-4 h-4 w-full" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
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
                <ProductGallery media={productQuery.data.images || []} />
              </FadeInWhenVisible>

              <div>
                <FadeInWhenVisible delay={0.1}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {productQuery.data.categories && productQuery.data.categories.length > 0 && (
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700"
                      >
                        {productQuery.data.categories[0].name}
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {productQuery.data.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>

                    {productQuery.data.featured && (
                      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                        Featured
                      </Badge>
                    )}

                    {productQuery.data.tags?.includes('trending') && (
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
                    {productQuery.data.compareAtPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${productQuery.data.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </p>
                  <div className="mb-6 text-neutral-600">
                    {typeof productQuery.data.description === 'string' ? (
                      <p>{productQuery.data.description}</p>
                    ) : (
                      <PortableText value={productQuery.data.description} />
                    )}
                  </div>
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
                      {productQuery.data.tags?.map((tag, index) => (
                        <motion.li
                          key={tag}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        >
                          {tag}
                        </motion.li>
                      )) || (
                        <>
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
                        </>
                      )}
                    </ul>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>

            {/* Similar Products Section */}
            <SimilarProducts
              currentProductId={id}
              category={productQuery.data.categories?.[0]?.slug?.current || ''}
            />
          </>
        )}
      </div>
    </main>
  );
}
