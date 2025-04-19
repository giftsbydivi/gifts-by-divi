'use client';

import { Product } from '@/lib/services/api';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <FadeInWhenVisible delay={0.1}>
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
          {product.category}
        </Badge>
        <Badge variant="outline">In Stock</Badge>
      </div>

      <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
      <p className="mb-4 text-2xl font-semibold">${product.price.toFixed(2)}</p>
      <p className="mb-6 text-neutral-600">{product.description}</p>
    </FadeInWhenVisible>
  );
}
