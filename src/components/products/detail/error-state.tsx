'use client';

import Link from 'next/link';

import { AlertTriangle } from 'lucide-react';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';

export function ProductDetailError() {
  return (
    <FadeInWhenVisible>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />
        <h2 className="mb-2 text-2xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find the product you were looking for.
        </p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    </FadeInWhenVisible>
  );
}
