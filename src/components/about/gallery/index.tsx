'use client';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function AboutGallery() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible className="mb-8 text-center md:mb-12">
          <h2 className="font-playfair text-3xl font-medium text-neutral-900">Our Workshop</h2>
          <p className="mt-4 text-neutral-700">A glimpse into where the magic happens</p>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="relative min-h-[250px] overflow-hidden rounded-xl bg-neutral-100 shadow-sm md:min-h-[300px]"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-neutral-400">Workshop Image {item}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
