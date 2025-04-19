'use client';

import Link from 'next/link';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function ProductNavigation() {
  return (
    <FadeInWhenVisible>
      <div className="mb-6">
        <Link href="/products" className="text-rose-700 hover:underline">
          ← Back to products
        </Link>
      </div>
    </FadeInWhenVisible>
  );
}
