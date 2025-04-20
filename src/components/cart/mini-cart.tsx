'use client';

import { useMemo } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import { ShoppingBag } from 'lucide-react';

import { queryKeys, useCartProducts } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';
import { api } from '@/lib/services/api';
import { useCartStore } from '@/lib/stores/cart-store';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function MiniCart({ onClose }: { onClose?: () => void }) {
  const { items } = useCartStore();
  const { removeFromCart } = useCart();
  const queryClient = useQueryClient();

  // Calculate total items once
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Use the cart products hook
  const { data: cartItemsWithProducts = [], isLoading } = useCartProducts(items);

  // Compute total price
  const totalPrice = useMemo(() => {
    return cartItemsWithProducts.reduce((sum, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);
  }, [cartItemsWithProducts]);

  // Prefetch cart page data when hovering over "View Cart"
  const prefetchCartData = () => {
    // Prefetch any data needed for the cart page
    items.forEach((item) => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.productBySlug(item.productSlug),
        queryFn: () => api.getProductBySlug(item.productSlug),
      });
    });
  };

  if (totalItems === 0) {
    return (
      <div className="w-72 p-4">
        <div className="flex items-center justify-center gap-2 pb-3">
          <ShoppingBag className="h-5 w-5 text-neutral-500" />
          <h3 className="text-sm font-medium">Your cart is empty</h3>
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-center py-6">
          <p className="mb-4 text-xs text-neutral-500">Add some products to get started!</p>
          <Link href="/products" onClick={onClose}>
            <Button size="sm" className="bg-rose-700 text-white hover:bg-rose-800">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-neutral-500" />
          <h3 className="text-sm font-medium">Your Cart ({totalItems})</h3>
        </div>
        <Link href="/cart" onClick={onClose} onMouseEnter={prefetchCartData}>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs text-rose-700">
            View Cart
          </Button>
        </Link>
      </div>
      <Separator className="mb-2" />

      <div className="max-h-60 space-y-2 overflow-y-auto pb-2">
        {isLoading
          ? // Loading skeletons (only shown on initial load)
            Array.from({ length: Math.min(items.length, 3) }).map((_, index) => (
              <div key={index} className="flex items-center gap-2 py-2">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="flex-1">
                  <Skeleton className="mb-1 h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            ))
          : // Cart items
            cartItemsWithProducts.map((item) => (
              <div key={item.slug} className="flex items-center gap-2 py-2">
                {item.product ? (
                  <>
                    <div className="relative h-12 w-12 overflow-hidden rounded bg-neutral-100">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                          No img
                        </div>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <Link
                        href={`/products/${item.product.slug.current}`}
                        className="block truncate text-xs font-medium hover:text-rose-700"
                        onClick={onClose}
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span>
                          {item.quantity} × ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.compareAtPrice &&
                          item.product.compareAtPrice > item.product.price && (
                            <span className="text-xs line-through">
                              ${item.product.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                      </div>
                      {item.product.compareAtPrice &&
                        item.product.compareAtPrice > item.product.price && (
                          <div className="text-xs text-rose-600">
                            Save $
                            {(
                              (item.product.compareAtPrice - item.product.price) *
                              item.quantity
                            ).toFixed(2)}
                          </div>
                        )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full p-0 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                      onClick={() => removeFromCart(item.slug)}
                    >
                      <span className="sr-only">Remove</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3 w-3"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </Button>
                  </>
                ) : item.isLoading ? (
                  // Still loading specific item
                  <div className="flex w-full items-center gap-2">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="flex-1">
                      <Skeleton className="mb-1 h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ) : (
                  // Error state for item
                  <div className="flex w-full items-center justify-between rounded border border-red-100 bg-red-50 px-2 py-1 text-xs text-red-600">
                    <span>Item unavailable</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full p-0 text-red-400 hover:bg-red-100 hover:text-red-600"
                      onClick={() => removeFromCart(item.slug)}
                    >
                      <span className="sr-only">Remove</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3 w-3"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
            ))}
      </div>

      <Separator className="my-2" />

      <div className="flex items-center justify-between pt-1 pb-2 text-sm">
        <span className="font-medium">Total:</span>
        {isLoading ? (
          <Skeleton className="h-5 w-16" />
        ) : (
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        )}
      </div>

      <div className="flex gap-2">
        <Link href="/cart" className="flex-1" onClick={onClose} onMouseEnter={prefetchCartData}>
          <Button variant="outline" size="sm" className="w-full">
            View Cart
          </Button>
        </Link>
        <Link href="/checkout" className="flex-1" onClick={onClose}>
          <Button size="sm" className="w-full bg-rose-700 text-white hover:bg-rose-800">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
