'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { FadeInWhenVisible, StaggerChildren, childVariants } from '@/components/animations/fade-in';

// Categories data with Unsplash images
const categories = [
  {
    id: 1,
    name: 'Home Decor',
    image:
      'https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Cozy home decor setup',
    description: 'Stylish and elegant pieces to elevate your space',
    size: 'large',
  },
  {
    id: 2,
    name: 'Gourmet',
    image:
      'https://images.unsplash.com/photo-1740811852517-dd4d4ba06e78?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Handcrafted gourmet basket',
    description: 'Delicious treats for the discerning palate',
    size: 'medium',
  },
  {
    id: 3,
    name: 'Personalized',
    image:
      'https://images.unsplash.com/photo-1671393759133-781c76bb8f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Customized handmade gift box',
    description: 'One-of-a-kind gifts made just for them',
    size: 'medium',
  },
  {
    id: 4,
    name: 'Jewelry',
    image:
      'https://images.unsplash.com/photo-1721206624552-d945fc1a3b8a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Elegant handmade jewelry set',
    description: 'Timeless pieces that sparkle and shine',
    size: 'small',
  },
  {
    id: 5,
    name: 'Tech Gadgets',
    image:
      'https://images.unsplash.com/photo-1571923984698-05428ca23f72?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Smart and useful tech gadgets',
    description: 'Innovative solutions for modern living',
    size: 'medium',
  },
  {
    id: 6,
    name: 'Wellness',
    image:
      'https://images.unsplash.com/photo-1602013639049-68dadf4ea7f3?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Self-care and wellness gifts',
    description: 'Self-care essentials for mind and body',
    size: 'small',
  },
];

export function Categories() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <h2 className="mb-8 text-center text-2xl font-semibold text-neutral-900 md:text-3xl">
            Shop by Category
          </h2>
        </FadeInWhenVisible>

        <StaggerChildren
          staggerDelay={0.1}
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {categories.map((category) => {
            const colSpan =
              category.size === 'large'
                ? 'col-span-2'
                : category.size === 'medium'
                  ? 'md:col-span-1'
                  : 'md:col-span-1';

            return (
              <motion.div key={category.id} variants={childVariants} className={`${colSpan}`}>
                <Link
                  href={`/products?category=${category.name}`}
                  className="group block h-full w-full"
                >
                  <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                    <div className="h-full w-full bg-neutral-100">
                      <Image
                        src={category.image}
                        alt={category.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-rose-900/80 p-3">
                      <h3 className="text-lg font-medium text-white">{category.name}</h3>
                      {(category.size === 'large' || category.size === 'medium') && (
                        <p className="mt-1 line-clamp-1 text-sm text-white/90">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
