'use client';

import Link from 'next/link';

import { UseQueryResult } from '@tanstack/react-query';

import { Product } from '@/lib/services/api';

import { FadeInWhenVisible, StaggerChildren } from '@/components/animations/fade-in';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  productsQuery: UseQueryResult<Product[], unknown>;
  category?: string;
}

export function ProductGrid({ productsQuery, category }: ProductGridProps) {
  return (
    <>
      {/* Loading state */}
      {productsQuery.isLoading && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-xl bg-white shadow-sm">
              {/* Product Image Skeleton */}
              <div className="relative h-64 w-full bg-neutral-100">
                <Skeleton className="h-full w-full" />
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>

              {/* Product Info Skeleton */}
              <div className="p-5">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-full" />

                <div className="flex items-center justify-between">
                  <Skeleton className="h-7 w-20" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {productsQuery.isError && (
        <FadeInWhenVisible>
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="mb-2 text-lg font-medium text-red-700">Error Loading Products</h2>
            <p className="mb-4 text-red-600">
              We encountered a problem while loading the products. Please try again later.
            </p>
            <Button
              variant="outline"
              onClick={() => productsQuery.refetch()}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Try Again
            </Button>
          </div>
        </FadeInWhenVisible>
      )}

      {/* Success state */}
      {productsQuery.isSuccess && (
        <>
          {productsQuery.data.length === 0 ? (
            <FadeInWhenVisible>
              <div className="rounded-lg border border-neutral-200 p-8 text-center">
                <h2 className="mb-2 text-lg font-medium">No Products Found</h2>
                <p className="mb-4 text-neutral-600">
                  {category
                    ? `We couldn't find any products in the ${category} category.`
                    : "We couldn't find any products matching your criteria."}
                </p>
                <Link href="/products">
                  <Button variant="outline">View All Products</Button>
                </Link>
              </div>
            </FadeInWhenVisible>
          ) : (
            <StaggerChildren
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.08}
            >
              {productsQuery.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </StaggerChildren>
          )}
        </>
      )}
    </>
  );
}
