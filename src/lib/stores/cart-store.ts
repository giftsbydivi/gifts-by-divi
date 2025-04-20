import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;

  // Actions
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,

      addItem: (productId: string, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item.productId === productId);

        let updatedItems;
        if (existingItem) {
          // If item already exists, update quantity
          updatedItems = items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          // Otherwise add new item
          updatedItems = [...items, { productId, quantity }];
        }

        // Calculate total items
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);

        set({ items: updatedItems, totalItems });
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.productId !== productId);

        // Calculate total items
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);

        set({ items: updatedItems, totalItems });
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();

        // Ensure quantity is at least 1
        const safeQuantity = Math.max(1, quantity);

        const updatedItems = items.map((item) =>
          item.productId === productId ? { ...item, quantity: safeQuantity } : item
        );

        // Calculate total items
        const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);

        set({ items: updatedItems, totalItems });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0 });
      },
    }),
    {
      name: 'gift-shop-cart', // unique name for localStorage
    }
  )
);
