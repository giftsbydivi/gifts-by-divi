'use client';

import { PortableText } from '@portabletext/react';

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
        {product.categories && product.categories.length > 0 && (
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
            {product.categories[0].name}
          </Badge>
        )}
        <Badge variant="outline">{product.inStock ? 'In Stock' : 'Out of Stock'}</Badge>
      </div>

      <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
      <p className="mb-4 text-2xl font-semibold">
        ${product.price.toFixed(2)}
        {product.compareAtPrice && (
          <span className="ml-2 text-sm text-gray-500 line-through">
            ${product.compareAtPrice.toFixed(2)}
          </span>
        )}
      </p>
      <div className="mb-6 text-neutral-600">
        {typeof product.description === 'string' ? (
          <p>{product.description}</p>
        ) : (
          <PortableText value={product.description} />
        )}
      </div>
    </FadeInWhenVisible>
  );
}
