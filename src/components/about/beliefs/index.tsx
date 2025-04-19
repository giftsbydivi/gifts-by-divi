'use client';

import { motion } from 'framer-motion';

import { FadeInWhenVisible, StaggerChildren, childVariants } from '@/components/animations/fade-in';

export function AboutBeliefs() {
  return (
    <section className="w-full bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-playfair text-3xl font-medium text-neutral-900">What We Believe</h2>
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
              Every piece is thoughtfully created by hand, imbued with care and attention to detail.
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
              From concept to delivery, each product is lovingly created by a single pair of hands.
            </p>
          </motion.div>
        </StaggerChildren>
      </div>
    </section>
  );
}
