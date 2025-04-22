'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { useCategories } from '@/lib/hooks/use-products';

import { FadeInWhenVisible, StaggerChildren, childVariants } from '@/components/animations/fade-in';
import { Skeleton } from '@/components/ui/skeleton';

// Fallback categories data (used only when loading fails)
const fallbackCategories = [
  {
    _id: '1',
    name: 'Home Decor',
    imageUrl:
      'https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Stylish and elegant pieces to elevate your space',
    slug: { current: 'home-decor' },
  },
  {
    _id: '2',
    name: 'Gourmet',
    imageUrl:
      'https://images.unsplash.com/photo-1740811852517-dd4d4ba06e78?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Delicious treats for the discerning palate',
    slug: { current: 'gourmet' },
  },
];

// Helper function to determine the column span based on category position
const getCategorySize = (index: number, totalCategories: number): string => {
  // If there are only 1-2 categories, make them all large
  if (totalCategories <= 2) return 'col-span-2';

  // If there are 3 categories, make the first one large
  if (totalCategories === 3 && index === 0) return 'col-span-2';

  // For 4+ categories:
  // - First category is large
  // - Every fourth category (index % 4 === 0) is large
  // - Others are medium or small based on position
  if (index === 0 || index % 4 === 0) return 'col-span-2';

  // Medium size for positions 2, 5, 8, etc.
  if (index % 4 === 1) return 'md:col-span-1';

  // Small size for the rest
  return 'md:col-span-1';
};

export function Categories() {
  const { data: categories, isLoading, error } = useCategories();

  // If there's an error, use fallback data
  const displayCategories = error ? fallbackCategories : categories || [];

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <h2 className="mb-8 text-center text-2xl font-semibold text-neutral-900 md:text-3xl">
            Shop by Category
          </h2>
        </FadeInWhenVisible>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={i === 1 ? 'col-span-2' : ''}>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerChildren
            staggerDelay={0.1}
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            {displayCategories.map((category, index) => {
              const colSpan = getCategorySize(index, displayCategories.length);

              return (
                <motion.div key={category._id} variants={childVariants} className={`${colSpan}`}>
                  <Link
                    href={`/products?category=${category.slug.current}`}
                    className="group block h-full w-full"
                  >
                    <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                      <div className="h-full w-full bg-neutral-100">
                        {category.imageUrl ? (
                          <Image
                            src={category.imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-neutral-400">
                            No Image Available
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-rose-900/80 p-3">
                        <h3 className="text-lg font-medium text-white">{category.name}</h3>
                        {category.description &&
                          (colSpan === 'col-span-2' || colSpan === 'md:col-span-1') && (
                            <p className="mt-1 line-clamp-1 text-sm text-white/90">
                              {category.description}
                            </p>
                          )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </StaggerChildren>
        )}
      </div>
    </section>
  );
}
