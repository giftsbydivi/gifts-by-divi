'use client';

import { useState } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { useProduct } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
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
            <Skeleton className="h-[400px] rounded-lg" />
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FadeInWhenVisible>
              <div className="flex h-[400px] items-center justify-center rounded-lg bg-neutral-100">
                <p className="text-neutral-400">Product Image</p>
              </div>
            </FadeInWhenVisible>

            <div>
              <FadeInWhenVisible delay={0.1}>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    {productQuery.data.category}
                  </Badge>
                  <Badge variant="outline">In Stock</Badge>
                </div>

                <h1 className="mb-2 text-3xl font-bold">{productQuery.data.name}</h1>
                <p className="mb-4 text-2xl font-semibold">${productQuery.data.price.toFixed(2)}</p>
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
        )}
      </div>
    </main>
  );
}
