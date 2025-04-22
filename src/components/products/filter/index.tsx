'use client';

import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useCategories } from '@/lib/hooks/use-products';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface FilterProps {
  category?: string;
}

export function ProductsFilter({ category }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

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

        {categoriesLoading ? (
          // Loading skeleton for categories
          <div className="mb-6 flex flex-wrap gap-2">
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        ) : (
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

            {categories?.map((cat) => (
              <Badge
                key={cat._id}
                className={
                  category === cat.name
                    ? 'cursor-pointer bg-neutral-800 text-white hover:bg-neutral-700'
                    : 'cursor-pointer'
                }
                onClick={() => handleCategoryChange(cat.name)}
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </FadeInWhenVisible>
  );
}
