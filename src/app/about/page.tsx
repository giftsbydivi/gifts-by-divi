'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { FadeInWhenVisible, StaggerChildren, childVariants } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
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

      {/* Our Story Section */}
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
                    After years of crafting heartfelt gifts for friends and family, I decided to
                    turn my passion into something more. Every piece in our collection is
                    handcrafted with intention, designed to celebrate life&apos;s everyday moments
                    and special occasions alike.
                  </p>
                  <p>
                    As a small, one-woman business based in Indore, I personally select each
                    material, craft each piece, and package each order with care. This isn&apos;t
                    just a business for me - it&apos;s a labor of love.
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

      {/* Our Beliefs Section */}
      <section className="w-full bg-neutral-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-playfair text-3xl font-medium text-neutral-900">
                What We Believe
              </h2>
              <p className="mt-4 text-neutral-700">
                Our approach to gift-giving is rooted in these core values
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              variants={childVariants}
              className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="font-playfair mt-4 text-xl font-medium text-neutral-900">
                Handcrafted with Love
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Every piece is thoughtfully created by hand, imbued with care and attention to
                detail.
              </p>
            </motion.div>

            <motion.div
              variants={childVariants}
              className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="font-playfair mt-4 text-xl font-medium text-neutral-900">
                Thoughtful & Personal
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                We believe gifts should reflect the unique bond between giver and receiver.
              </p>
            </motion.div>

            <motion.div
              variants={childVariants}
              className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="font-playfair mt-4 text-xl font-medium text-neutral-900">
                Quality in Every Detail
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                From materials to packaging, we never compromise on excellence and craftsmanship.
              </p>
            </motion.div>

            <motion.div
              variants={childVariants}
              className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12h2a2 2 0 1 0 0-4H2v8" />
                  <path d="M14 2v10a2 2 0 1 1-4 0V2" />
                  <path d="M8 8a2 2 0 1 0 0-4" />
                  <path d="M16 14a2 2 0 0 0 0 4h2a2 2 0 0 0 0-4h-2Z" />
                </svg>
              </div>
              <h3 className="font-playfair mt-4 text-xl font-medium text-neutral-900">
                One-Woman Powered 💪
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                From concept to delivery, each product is lovingly created by a single pair of
                hands.
              </p>
            </motion.div>
          </StaggerChildren>
        </div>
      </section>

      {/* Gallery Section */}
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

      {/* Closing Section */}
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
    </main>
  );
}
