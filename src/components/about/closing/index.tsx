'use client';

import Link from 'next/link';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';

export function AboutClosing() {
  return (
    <section className="w-full bg-rose-50/50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-playfair text-2xl font-medium text-neutral-900 italic md:text-3xl">
              &quot;Every gift you see here was packed with love, intention, and a little bit of
              magic.&quot;
            </h2>
            <div className="mt-10">
              <Link href="/products">
                <Button size="lg" className="bg-rose-700 hover:bg-rose-800">
                  Explore our collection
                </Button>
              </Link>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
