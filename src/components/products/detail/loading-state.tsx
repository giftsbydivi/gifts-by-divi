'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailLoading() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Skeleton className="h-[400px] rounded-lg" />
      <div>
        <Skeleton className="mb-2 h-6 w-24" />
        <Skeleton className="mb-2 h-10 w-3/4" />
        <Skeleton className="mb-4 h-6 w-20" />
        <Skeleton className="mb-6 h-24 w-full" />
        <div className="mb-6 flex items-center gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}
