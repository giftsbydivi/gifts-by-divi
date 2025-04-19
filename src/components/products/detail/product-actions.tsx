'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';

import { useCart } from '@/lib/providers/cart-provider';
import { Product } from '@/lib/services/api';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <FadeInWhenVisible delay={0.2}>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="rounded-r-none"
          >
            -
          </Button>
          <div className="border-input flex h-10 items-center justify-center border px-4">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="rounded-l-none"
          >
            +
          </Button>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={handleAddToCart}
            className="bg-rose-700 px-8 text-white hover:bg-rose-800"
          >
            Add to Cart
          </Button>
        </motion.div>
      </div>
    </FadeInWhenVisible>
  );
}
