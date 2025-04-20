'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { useCart } from '@/lib/providers/cart-provider';
import { Product } from '@/lib/services/api';

import { childVariants } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div variants={childVariants}>
      <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
        <Link
          href={`/products/${product.slug.current}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${product.name}`}
        />
        {/* Product Image */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-lg bg-neutral-100">
          {product.images && product.images.length > 0 ? (
            <div className="h-full w-full overflow-hidden">
              {product.images[0].type === 'image' ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : product.images[0].type === 'video' && product.images[0].thumbnail ? (
                <Image
                  src={product.images[0].thumbnail}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-neutral-400">No image available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-neutral-400">Product Image</p>
            </div>
          )}
          {/* Category badge - top right */}
          <div className="absolute top-3 right-3 z-20">
            {product.categories && product.categories.length > 0 && (
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                {product.categories[0].name}
              </Badge>
            )}
          </div>

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

          {product.images && product.images.length > 1 && (
            <div className="absolute right-3 bottom-3 z-20">
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                +{product.images.length - 1} more
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="mb-1 text-lg font-semibold tracking-tight text-neutral-900">
            {product.name}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-neutral-700">
            {typeof product.description === 'string' ? product.description : 'Beautiful gift item'}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-neutral-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-sm text-neutral-500 line-through">
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

            <div className="flex items-center gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="relative z-20 rounded-full bg-rose-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-rose-800"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
