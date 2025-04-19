'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useProduct } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';

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
        <div className="mb-6">
          <Link href="/products" className="text-blue-600 hover:underline">
            ← Back to products
          </Link>
        </div>

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
          <Card className="p-8 text-center">
            <h2 className="mb-2 text-lg font-medium text-red-700">Product Not Found</h2>
            <p className="mb-4 text-neutral-600">
              We couldn&apos;t find the product you&apos;re looking for.
            </p>
            <Link href="/products">
              <Button>Browse All Products</Button>
            </Link>
          </Card>
        )}

        {/* Success state */}
        {productQuery.isSuccess && productQuery.data && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex h-[400px] items-center justify-center rounded-lg bg-neutral-100">
              <p className="text-neutral-400">Product Image</p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                  {productQuery.data.category}
                </Badge>
                <Badge variant="outline">In Stock</Badge>
              </div>

              <h1 className="mb-2 text-3xl font-bold">{productQuery.data.name}</h1>
              <p className="mb-4 text-2xl font-semibold">${productQuery.data.price.toFixed(2)}</p>
              <p className="mb-6 text-neutral-600">{productQuery.data.description}</p>

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
                <Button onClick={handleAddToCart} className="px-8">
                  Add to Cart
                </Button>
              </div>

              <Separator className="my-6" />

              <div>
                <h2 className="mb-2 text-lg font-semibold">Product Details:</h2>
                <ul className="list-disc space-y-1 pl-5 text-neutral-600">
                  <li>Premium quality materials</li>
                  <li>Elegant design for any occasion</li>
                  <li>Makes a perfect gift</li>
                  <li>Free gift wrapping available</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
