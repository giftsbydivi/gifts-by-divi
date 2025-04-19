'use client';

import { Suspense } from 'react';

import { ProductsContent } from '@/components/products';
import { ProductsHero } from '@/components/products/hero';

export default function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <ProductsHero />

      {/* Products Section */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-16 text-center">Loading products...</div>
        }
      >
        <ProductsContent />
      </Suspense>
    </main>
  );
}
