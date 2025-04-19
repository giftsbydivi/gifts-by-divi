'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <FadeInWhenVisible>
      <section className="relative h-[500px] w-full">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1602177719868-98d27643bf99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Gift wrapping"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="mb-4 text-4xl font-medium text-white md:text-6xl"
          >
            Everyday Gift
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.1 }}
            className="mb-8 max-w-xl text-xl text-white/90"
          >
            Luxury gifts for life&apos;s everyday moments
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.2 }}
          >
            <Link href="/products">
              <Button
                size="lg"
                className="bg-rose-700 px-8 py-6 text-lg text-white hover:bg-rose-800"
              >
                Shop All
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
