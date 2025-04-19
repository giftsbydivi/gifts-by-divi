import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/lib/services/api';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item.product.id === product.id);

        let updatedItems;
        if (existingItem) {
          // If item already exists, update quantity
          updatedItems = items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          // Otherwise add new item
          updatedItems = [...items, { product, quantity }];
        }

        // Calculate totals
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.product.id !== productId);

        // Calculate totals
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();

        // Ensure quantity is at least 1
        const safeQuantity = Math.max(1, quantity);

        const updatedItems = items.map((item) =>
          item.product.id === productId ? { ...item, quantity: safeQuantity } : item
        );

        // Calculate totals
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'gift-shop-cart', // unique name for localStorage
    }
  )
);
