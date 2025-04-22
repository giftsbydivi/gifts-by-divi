'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useCategories, useProducts, useProductsByCategory } from '@/lib/hooks/use-products';

import { ProductsFilter } from '@/components/products/filter';
import { ProductGrid } from '@/components/products/product-grid';

export function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || undefined;
  const [categorySlug, setCategorySlug] = useState<string | undefined>(undefined);
  const [displayCategory, setDisplayCategory] = useState<string | undefined>(categoryParam);

  // Fetch all categories for lookup
  const { data: categories } = useCategories();

  // Find the category object based on the name in the URL
  useEffect(() => {
    if (categories && categoryParam) {
      // First, try to find by name (for backward compatibility)
      const category = categories.find((c) => c.name === categoryParam);

      if (category) {
        // If found by name, use the category's slug for querying products
        setCategorySlug(category.slug.current);
        setDisplayCategory(category.name);
      } else {
        // If not found by name, assume the parameter is a slug
        const categoryBySlug = categories.find((c) => c.slug.current === categoryParam);

        if (categoryBySlug) {
          setCategorySlug(categoryParam);
          setDisplayCategory(categoryBySlug.name);
        } else {
          // If no match found at all, reset
          setCategorySlug(undefined);
          setDisplayCategory(undefined);
        }
      }
    } else if (!categoryParam) {
      // If no category selected, reset
      setCategorySlug(undefined);
      setDisplayCategory(undefined);
    }
  }, [categories, categoryParam]);

  // Always call both hooks but use the enabled flag to control which one actually runs
  const allProductsQuery = useProducts();
  const categoryProductsQuery = useProductsByCategory(categorySlug);

  // Choose which query result to use based on whether a category is selected
  const productsQuery = categorySlug ? categoryProductsQuery : allProductsQuery;

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <ProductsFilter category={displayCategory} />
        <ProductGrid productsQuery={productsQuery} category={displayCategory} />
      </div>
    </section>
  );
}
