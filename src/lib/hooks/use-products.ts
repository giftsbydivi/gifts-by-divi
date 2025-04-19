'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/services/api';

// Query keys
export const queryKeys = {
  products: ['products'] as const,
  product: (id: string) => ['product', id] as const,
  productsByCategory: (category: string) => ['products', 'category', category] as const,
};

// Hook to fetch all products
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: () => api.getProducts(),
  });
}

// Hook to fetch a single product by ID
export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.product(id || ''),
    queryFn: () => api.getProduct(id || ''),
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
