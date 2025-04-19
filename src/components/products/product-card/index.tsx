'use client';

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
      <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
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
          <p className="mb-4 line-clamp-2 text-sm text-neutral-700">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>

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
                className="rounded-full bg-rose-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-rose-800"
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
