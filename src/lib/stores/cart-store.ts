import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interface for cart items
export interface CartItem {
  productSlug: string; // Using slug instead of ID for easier retrieval
  quantity: number;
}

// Interface for cart state
export interface CartState {
  items: CartItem[];
  addItem: (productSlug: string, quantity: number) => void;
  removeItem: (productSlug: string) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productSlug: string) => number;
  getTotalItemsCount: () => number;
}

// Create the store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial empty cart
      items: [],

      // Add an item to the cart (or increase quantity if it exists)
      addItem: (productSlug: string, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.productSlug === productSlug);

          if (existingItem) {
            // Item exists, update quantity
            return {
              items: state.items.map((item) =>
                item.productSlug === productSlug
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // Item doesn't exist, add it
            return {
              items: [...state.items, { productSlug, quantity }],
            };
          }
        });
      },

      // Remove an item from the cart
      removeItem: (productSlug: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productSlug !== productSlug),
        }));
      },

      // Update the quantity of an item
      updateQuantity: (productSlug: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productSlug === productSlug ? { ...item, quantity } : item
          ),
        }));
      },

      // Clear the cart
      clearCart: () => {
        set({ items: [] });
      },

      // Get the quantity of a specific item
      getItemQuantity: (productSlug: string) => {
        const item = get().items.find((item) => item.productSlug === productSlug);
        return item ? item.quantity : 0;
      },

      // Get the total count of items in the cart
      getTotalItemsCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // Name for localStorage
    }
  )
);
