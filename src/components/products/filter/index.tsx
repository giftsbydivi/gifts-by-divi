'use client';

import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';

interface FilterProps {
  category?: string;
}

export function ProductsFilter({ category }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = useCallback(
    (newCategory: string | null) => {
      // Create a new URLSearchParams instance
      const params = new URLSearchParams(searchParams.toString());

      // Handle category parameter
      if (newCategory) {
        params.set('category', newCategory);
      } else {
        params.delete('category');
      }

      // Update the URL without scrolling to top
      router.push(`/products${params.toString() ? `?${params.toString()}` : ''}`, {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  return (
    <FadeInWhenVisible>
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-medium md:text-4xl">
          {category ? `${category} Gifts` : 'All Luxury Gifts'}
        </h1>
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge
            className={
              !category
                ? 'cursor-pointer bg-neutral-800 text-white hover:bg-neutral-700'
                : 'cursor-pointer'
            }
            onClick={() => handleCategoryChange(null)}
          >
            All
          </Badge>
          <Badge
            className={
              category === 'Home Decor'
                ? 'cursor-pointer bg-neutral-800 text-white hover:bg-neutral-700'
                : 'cursor-pointer'
            }
            onClick={() => handleCategoryChange('Home Decor')}
          >
            Home Decor
          </Badge>
          <Badge
            className={
              category === 'Gourmet'
                ? 'cursor-pointer bg-neutral-800 text-white hover:bg-neutral-700'
                : 'cursor-pointer'
            }
            onClick={() => handleCategoryChange('Gourmet')}
          >
            Gourmet
          </Badge>
          <Badge
            className={
              category === 'Personalized'
                ? 'cursor-pointer bg-neutral-800 text-white hover:bg-neutral-700'
                : 'cursor-pointer'
            }
            onClick={() => handleCategoryChange('Personalized')}
          >
            Personalized
          </Badge>
        </div>
      </div>
    </FadeInWhenVisible>
  );
}
