'use client';

import { Suspense } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useProducts, useProductsByCategory } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;

  // Always call both hooks but use the enabled flag to control which one actually runs
  const allProductsQuery = useProducts();
  const categoryProductsQuery = useProductsByCategory(category);

  // Choose which query result to use based on whether a category is selected
  const productsQuery = category ? categoryProductsQuery : allProductsQuery;

  // Get the addToCart function from our cart context
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-medium md:text-4xl">
          {category ? `${category} Gifts` : 'All Luxury Gifts'}
        </h1>
        <div className="mb-6 flex flex-wrap gap-2">
          <Link href="/products">
            <Badge className={!category ? 'bg-neutral-800 text-white' : ''}>All</Badge>
          </Link>
          <Link href="/products?category=Home Decor">
            <Badge className={category === 'Home Decor' ? 'bg-neutral-800 text-white' : ''}>
              Home Decor
            </Badge>
          </Link>
          <Link href="/products?category=Gourmet">
            <Badge className={category === 'Gourmet' ? 'bg-neutral-800 text-white' : ''}>
              Gourmet
            </Badge>
          </Link>
          <Link href="/products?category=Personalized">
            <Badge className={category === 'Personalized' ? 'bg-neutral-800 text-white' : ''}>
              Personalized
            </Badge>
          </Link>
        </div>
      </div>

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
      )}

      {/* Success state */}
      {productsQuery.isSuccess && (
        <>
          {productsQuery.data.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 p-8 text-center">
              <h2 className="mb-2 text-lg font-medium">No Products Found</h2>
              <p className="mb-4 text-neutral-600">
                {category
                  ? `We couldn&apos;t find any products in the ${category} category.`
                  : 'We couldn&apos;t find any products matching your criteria.'}
              </p>
              <Link href="/products">
                <Button variant="outline">View All Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {productsQuery.data.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  {/* Product Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div className="transition-transform duration-500 group-hover:scale-110">
                        <p className="text-neutral-400">Product Image</p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="mb-1 text-lg font-semibold tracking-tight text-neutral-900">
                      {product.name}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-neutral-500">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-neutral-900">
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
                          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen p-8">
      <Suspense
        fallback={
          <div className="container mx-auto">
            <h1 className="mb-4 text-3xl font-medium md:text-4xl">Loading Products...</h1>
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
          </div>
        }
      >
        <ProductsContent />
      </Suspense>
    </main>
  );
}
