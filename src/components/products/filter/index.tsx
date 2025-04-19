'use client';

import Link from 'next/link';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';

interface FilterProps {
  category?: string;
}

export function ProductsFilter({ category }: FilterProps) {
  return (
    <FadeInWhenVisible>
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
    </FadeInWhenVisible>
  );
}
