'use client';

import { useQueries, useQuery } from '@tanstack/react-query';

import { api, Product } from '@/lib/services/api';
import { CartItem } from '@/lib/stores/cart-store';

// Type for product item with loading state
export type ProductItemWithStatus = {
  slug: string;
  quantity: number;
  product: Product | null;
  isLoading: boolean;
};

// Query keys
export const queryKeys = {
  products: ['products'] as const,
  product: (id: string) => ['product', id] as const,
  productBySlug: (slug: string) => ['product', 'slug', slug] as const,
  productsByCategory: (category: string) => ['products', 'category', category] as const,
  featuredProducts: ['products', 'featured'] as const,
  cartProducts: (slugs: string[]) => ['products', 'cart', slugs] as const,
};

// Check if a string looks like a slug (contains only alphanumeric, hyphen, underscore)
const isSlug = (str: string) => /^[a-z0-9\-_]+$/i.test(str);

// Hook to fetch all products
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: () => api.getProducts(),
  });
}

// Hook to fetch featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: queryKeys.featuredProducts,
    queryFn: () => api.getFeaturedProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch a single product by ID or slug
export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.product(id || ''),
    queryFn: async () => {
      if (!id) return Promise.resolve(undefined);

      // If it looks like a slug, use getProductBySlug
      if (isSlug(id)) {
        return api.getProductBySlug(id);
      }
      // Otherwise, use getProduct (which may be an alias for getProductBySlug or get by ID)
      return api.getProduct(id);
    },
    enabled: !!id, // Only run the query if an ID is provided
  });
}

// Hook to fetch products by category
export function useProductsByCategory(category: string | undefined) {
  return useQuery({
    queryKey: queryKeys.productsByCategory(category || ''),
    queryFn: () => api.getProductsByCategory(category || ''),
    enabled: !!category, // Only run the query if a category is provided
  });
}

// Hook to fetch products for cart items
export function useCartProducts(items: CartItem[]) {
  return useQueries({
    queries: items.map((item) => ({
      queryKey: queryKeys.productBySlug(item.productSlug),
      queryFn: () => api.getProductBySlug(item.productSlug),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    })),
    combine: (results) => {
      return {
        data: results.map((result, index) => ({
          slug: items[index].productSlug,
          quantity: items[index].quantity,
          product: result.data || null,
          isLoading: result.isLoading && !result.data,
        })) as ProductItemWithStatus[],
        isLoading: results.some((result) => result.isLoading && !result.data),
      };
    },
  });
}
