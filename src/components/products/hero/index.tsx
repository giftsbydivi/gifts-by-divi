'use client';

import Image from 'next/image';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function ProductsHero() {
  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gift collection display"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInWhenVisible>
            <h1 className="mb-4 text-3xl font-semibold text-white md:text-4xl">
              Browse Our Collection
            </h1>
            <p className="text-lg text-white/90">
              Find the perfect gift for any occasion, each one thoughtfully handcrafted with love.
            </p>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
