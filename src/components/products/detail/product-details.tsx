'use client';

import { motion } from 'framer-motion';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Separator } from '@/components/ui/separator';

export function ProductDetails() {
  return (
    <>
      <Separator className="my-6" />

      <FadeInWhenVisible delay={0.3}>
        <div>
          <h2 className="mb-2 text-lg font-semibold">Product Details:</h2>
          <ul className="list-disc space-y-1 pl-5 text-neutral-600">
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              Premium quality materials
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Elegant design for any occasion
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              Makes a perfect gift
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              Free gift wrapping available
            </motion.li>
          </ul>
        </div>
      </FadeInWhenVisible>
    </>
  );
}
