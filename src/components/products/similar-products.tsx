'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { useProductsByCategory } from '@/lib/hooks/use-products';
import { Product } from '@/lib/services/api';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
}

export function SimilarProducts({ currentProductId, category }: SimilarProductsProps) {
  const { data, isLoading, isError } = useProductsByCategory(category);

  // Filter out the current product and limit to 3 similar products
  const similarProducts = data?.filter((product) => product._id !== currentProductId).slice(0, 3);

  // Don't render anything if there are no similar products
  if (!isLoading && (!similarProducts || similarProducts.length === 0)) {
    return null;
  }

  return (
    <div className="mt-12">
      <FadeInWhenVisible>
        <h2 className="mb-6 text-2xl font-semibold">Similar Products</h2>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="mb-2 h-5 w-1/3" />
                  <Skeleton className="mb-4 h-4 w-full" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {isError && <p className="text-neutral-500">Unable to load similar products.</p>}

        {!isLoading && !isError && similarProducts && similarProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </FadeInWhenVisible>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="relative cursor-pointer overflow-hidden !p-0 transition-shadow hover:shadow-md">
        <Link
          href={`/products/${product.slug.current}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${product.name}`}
        />
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-neutral-100">
          {product.images && product.images.length > 0 ? (
            <div className="h-full w-full overflow-hidden">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-sm text-neutral-400">Product Image</p>
            </div>
          )}

          {/* Featured & Trending badges - top left */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            {product.featured && (
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50/90 text-blue-700 backdrop-blur-sm"
              >
                Featured
              </Badge>
            )}

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
        <div className="p-4">
          <div className="mb-2">
            {product.categories && product.categories.length > 0 && (
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                {product.categories[0].name}
              </Badge>
            )}
          </div>
          <h3 className="mb-1 font-medium">{product.name}</h3>
          <div className="mb-2 line-clamp-2 text-sm text-neutral-600">
            {typeof product.description === 'string' ? (
              <p>{product.description}</p>
            ) : (
              <p>Beautiful gift item</p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-neutral-900">${product.price.toFixed(2)}</p>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-neutral-500 line-through">
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
        </div>
      </Card>
    </motion.div>
  );
}
