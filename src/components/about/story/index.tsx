'use client';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function AboutStory() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <FadeInWhenVisible delay={0.1}>
              <h2 className="font-playfair text-3xl font-medium text-neutral-900">Our Story</h2>
              <div className="mt-6 space-y-4 text-neutral-700">
                <p>
                  It all began with a simple belief - that gifts should be more than just material
                  items. They should be carriers of emotion, thoughtfully created and beautifully
                  presented, to make both the giver and receiver feel special.
                </p>
                <p>
                  After years of crafting heartfelt gifts for friends and family, I decided to turn
                  my passion into something more. Every piece in our collection is handcrafted with
                  intention, designed to celebrate life&apos;s everyday moments and special
                  occasions alike.
                </p>
                <p>
                  As a small, one-woman business based in Indore, I personally select each material,
                  craft each piece, and package each order with care. This isn&apos;t just a
                  business for me - it&apos;s a labor of love.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="h-full">
                <div className="relative h-full overflow-hidden rounded-xl bg-neutral-100 shadow-md">
                  <div className="flex h-full min-h-[400px] items-center justify-center">
                    <p className="text-neutral-400">Founder Image</p>
                  </div>
                </div>
                <p className="font-playfair mt-6 text-lg text-rose-700 italic">
                  With love, Divi 💌
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}
