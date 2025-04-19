'use client';

import { ReactNode, useRef, CSSProperties } from 'react';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

type FadeInProps = {
  children: ReactNode;
  duration?: number;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function FadeInWhenVisible({
  children,
  duration = 0.4,
  delay = 0,
  y = 20,
  once = true,
  className = '',
  style,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Smooth easing function
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  containerDelay = 0,
  once = true,
  className = '',
  style,
}: {
  children: ReactNode;
  staggerDelay?: number;
  containerDelay?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: containerDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};
