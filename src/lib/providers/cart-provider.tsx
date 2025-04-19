'use client';

import { PropsWithChildren, createContext, useContext } from 'react';

import { toast } from 'sonner';

import { Product } from '../services/api';
import { useCartStore } from '../stores/cart-store';

// Create a context to expose cart helper functions
interface CartContextType {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  // Get cart actions from the store
  const { addItem, removeItem, updateQuantity, clearCart } = useCartStore();

  // Enhanced add to cart that shows a toast notification
  const addToCart = (product: Product, quantity = 1) => {
    addItem(product, quantity);
    toast.success(`Added to Cart`, {
      description: `${quantity} × ${product.name}`,
      action: {
        label: 'View Cart',
        onClick: () => {
          // This could navigate to cart page or open cart drawer
          console.log('View cart clicked');
        },
      },
    });
  };

  // Enhanced remove from cart with notification
  const removeFromCart = (productId: string) => {
    removeItem(productId);
    toast.info('Item removed from cart');
  };

  // Enhanced update quantity with notification
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    toast.info('Cart updated');
  };

  // Enhanced clear cart with confirmation and notification
  const clearCartWithConfirmation = () => {
    clearCart();
    toast.info('Cart cleared');
  };

  // Value object with enhanced functions
  const contextValue: CartContextType = {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart: clearCartWithConfirmation,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
