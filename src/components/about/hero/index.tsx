'use client';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function AboutHero() {
  return (
    <section className="relative w-full bg-rose-50/50 py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-playfair text-4xl font-medium text-neutral-900 md:text-5xl">
              The Heart Behind the Gifts
            </h1>
            <p className="mt-6 text-lg text-neutral-700">
              Thoughtfully handcrafted for every occasion.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
