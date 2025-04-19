'use client';

import { ProductsContent } from '@/components/products';
import { ProductsHero } from '@/components/products/hero';

export default function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <ProductsHero />

      {/* Products Section */}
      <ProductsContent />
    </main>
  );
}
