'use client';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function ProductImage() {
  return (
    <FadeInWhenVisible>
      <div className="flex h-[400px] items-center justify-center rounded-lg bg-neutral-100">
        <p className="text-neutral-400">Product Image</p>
      </div>
    </FadeInWhenVisible>
  );
}
