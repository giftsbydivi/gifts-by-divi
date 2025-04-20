'use client';

import React, { createContext, useContext, useMemo } from 'react';

import { toast } from 'sonner';

import { Product } from '@/types/product';

import { useCartStore, CartItem } from '@/lib/stores/cart-store';

// Create context with shopping cart functionality
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productSlug: string) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  getItemQuantity: (productSlug: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Use the cart store
  const cartStore = useCartStore();

  // Add item to cart
  const addToCart = (product: Product, quantity = 1) => {
    if (!product || !product.slug || !product.slug.current) {
      console.error('Failed to add product to cart: Invalid product or missing slug');
      return;
    }
    const slug = product.slug.current;
    cartStore.addItem(slug, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  // Remove item from cart
  const removeFromCart = (productSlug: string) => {
    cartStore.removeItem(productSlug);
  };

  // Update item quantity
  const updateQuantity = (productSlug: string, quantity: number) => {
    cartStore.updateQuantity(productSlug, quantity);
  };

  // Get item count - use useMemo to avoid recalculations during renders
  const itemCount = useMemo(() => cartStore.getTotalItemsCount(), [cartStore]);

  // Get quantity for a specific product
  const getItemQuantity = (productSlug: string) => {
    return cartStore.getItemQuantity(productSlug);
  };

  // Clear the cart
  const clearCart = () => {
    cartStore.clearCart();
  };

  // Provide cart functionality to components
  return (
    <CartContext.Provider
      value={{
        items: cartStore.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
