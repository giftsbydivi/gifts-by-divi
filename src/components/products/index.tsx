'use client';

import { useSearchParams } from 'next/navigation';

import { useProducts, useProductsByCategory } from '@/lib/hooks/use-products';

import { ProductsFilter } from '@/components/products/filter';
import { ProductGrid } from '@/components/products/product-grid';

export function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || undefined;

  // Always call both hooks but use the enabled flag to control which one actually runs
  const allProductsQuery = useProducts();
  const categoryProductsQuery = useProductsByCategory(category);

  // Choose which query result to use based on whether a category is selected
  const productsQuery = category ? categoryProductsQuery : allProductsQuery;

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <ProductsFilter category={category} />
        <ProductGrid productsQuery={productsQuery} category={category} />
      </div>
    </section>
  );
}
