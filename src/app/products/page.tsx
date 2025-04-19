'use client';

import { Suspense } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useProducts, useProductsByCategory } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4">
                <Skeleton className="mb-2 h-6 w-40" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {productsQuery.data.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <CardDescription className="mt-2">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex h-48 items-center justify-center bg-neutral-100">
                      <p className="text-neutral-400">Product Image</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4">
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <Link href={`/products/${product.id}`}>
                        <Button variant="outline">Details</Button>
                      </Link>
                      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                    </div>
                  </CardFooter>
                </Card>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <Skeleton className="mb-2 h-6 w-40" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent className="p-0">
                    <Skeleton className="h-48 w-full" />
                  </CardContent>
                  <CardFooter className="flex justify-between p-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-9 w-24" />
                  </CardFooter>
                </Card>
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
