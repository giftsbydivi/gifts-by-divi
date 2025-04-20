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
  const similarProducts = data?.filter((product) => product.id !== currentProductId).slice(0, 3);

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
              <ProductCard key={product.id} product={product} />
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
      <Link href={`/products/${product.id}`}>
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
          <div className="flex h-48 items-center justify-center bg-neutral-100">
            <p className="text-sm text-neutral-400">Product Image</p>
          </div>
          <div className="p-4">
            <div className="mb-2">
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                {product.category}
              </Badge>
            </div>
            <h3 className="mb-1 font-medium">{product.name}</h3>
            <p className="mb-2 line-clamp-2 text-sm text-neutral-600">{product.description}</p>
            <p className="font-semibold text-neutral-900">${product.price.toFixed(2)}</p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
