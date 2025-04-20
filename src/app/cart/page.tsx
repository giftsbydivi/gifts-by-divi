'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useCart } from '@/lib/providers/cart-provider';
import { api, Product } from '@/lib/services/api';
import { useCartStore } from '@/lib/stores/cart-store';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

// Interface to combine cart item with product details
interface CartItemWithProduct {
  id: string;
  quantity: number;
  product: Product | null;
  isLoading: boolean;
}

export default function CartPage() {
  // Get cart state from Zustand store
  const { items, totalItems } = useCartStore();
  const [cartItemsWithProducts, setCartItemsWithProducts] = useState<CartItemWithProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Get cart actions from context
  const { updateCartItemQuantity, removeFromCart, clearCart } = useCart();

  // Fetch product details for each cart item
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);

      // Create a placeholder array with loading state for each item
      const initialItemsWithProducts: CartItemWithProduct[] = items.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        product: null,
        isLoading: true,
      }));

      setCartItemsWithProducts(initialItemsWithProducts);

      // Fetch details for each product
      const updatedItems = await Promise.all(
        items.map(async (item): Promise<CartItemWithProduct> => {
          try {
            const product = await api.getProduct(item.productId);
            return {
              id: item.productId,
              quantity: item.quantity,
              product: product || null,
              isLoading: false,
            };
          } catch (error) {
            console.error(`Error fetching product ${item.productId}:`, error);
            return {
              id: item.productId,
              quantity: item.quantity,
              product: null,
              isLoading: false,
            };
          }
        })
      );

      setCartItemsWithProducts(updatedItems);

      // Calculate total price
      const total = updatedItems.reduce((sum, item) => {
        if (item.product) {
          return sum + item.product.price * item.quantity;
        }
        return sum;
      }, 0);

      setTotalPrice(total);
      setIsLoading(false);
    };

    fetchProductDetails();
  }, [items]);

  return (
    <main className="min-h-screen p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold text-neutral-900 md:text-4xl">
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <Card className="p-8 text-center">
            <CardTitle className="mb-2 text-neutral-900">Your cart is empty</CardTitle>
            <CardDescription className="mb-6 text-neutral-700">
              Looks like you haven&apos;t added any items to your cart yet.
            </CardDescription>
            <Link href="/products">
              <Button className="bg-rose-700 text-white hover:bg-rose-800">Browse Products</Button>
            </Link>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-neutral-500">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Clear Cart
                </Button>
              </div>
              <Separator />
            </div>

            <div className="mb-8 space-y-4">
              {cartItemsWithProducts.map((item) => (
                <Card key={item.id} className="group relative cursor-pointer overflow-hidden">
                  {item.product && (
                    <Link
                      href={`/products/${item.id}`}
                      className="absolute inset-0 z-10"
                      aria-label={`View details for ${item.product.name}`}
                    />
                  )}
                  <div className="relative flex flex-col sm:flex-row">
                    <div className="flex w-full items-center justify-center bg-neutral-100 p-4 sm:w-1/4 sm:p-0">
                      <div className="flex h-24 w-full items-center justify-center sm:h-full">
                        {item.isLoading ? (
                          <Skeleton className="h-24 w-24 sm:h-32 sm:w-32" />
                        ) : item.product && item.product.media && item.product.media.length > 0 ? (
                          <div className="relative h-24 w-24 overflow-hidden sm:h-32 sm:w-32">
                            <img
                              src={item.product.media[0].url}
                              alt={item.product.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ) : (
                          <p className="text-neutral-400">Product Image</p>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          {item.isLoading ? (
                            <>
                              <Skeleton className="mb-2 h-6 w-40" />
                              <Skeleton className="h-4 w-24" />
                            </>
                          ) : item.product ? (
                            <>
                              <h3 className="text-lg font-medium">{item.product.name}</h3>
                              <p className="text-sm text-neutral-600">{item.product.category}</p>
                            </>
                          ) : (
                            <p className="text-red-500">Product not available</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <div className="relative z-20 flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateCartItemQuantity(item.id, item.quantity - 1);
                              }}
                              className="h-8 w-8 rounded-r-none"
                              disabled={item.quantity <= 1 || item.isLoading || !item.product}
                            >
                              -
                            </Button>
                            <div className="border-input flex h-8 w-12 items-center justify-center border text-sm">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateCartItemQuantity(item.id, item.quantity + 1);
                              }}
                              className="h-8 w-8 rounded-l-none"
                              disabled={item.isLoading || !item.product}
                            >
                              +
                            </Button>
                          </div>
                          <div className="min-w-[100px] text-right sm:text-left">
                            {item.isLoading ? (
                              <Skeleton className="ml-auto h-5 w-16 sm:ml-0" />
                            ) : item.product ? (
                              <>
                                <div className="font-medium">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-xs text-neutral-500">
                                  ${item.product.price.toFixed(2)} each
                                </div>
                              </>
                            ) : (
                              <p className="text-red-500">N/A</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFromCart(item.id);
                            }}
                            className="relative z-20 text-red-600 hover:bg-red-50 hover:text-red-700"
                            disabled={item.isLoading}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="rounded-lg bg-rose-50/50 p-6">
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                {isLoading ? (
                  <Skeleton className="h-5 w-16" />
                ) : (
                  <span>${totalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="mb-2 flex justify-between text-sm text-neutral-700">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="mb-2 flex justify-between text-sm text-neutral-700">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="my-4" />
              <div className="mb-6 flex justify-between">
                <span className="text-lg font-medium">Total</span>
                {isLoading ? (
                  <Skeleton className="h-6 w-20" />
                ) : (
                  <span className="text-lg font-medium">${totalPrice.toFixed(2)}</span>
                )}
              </div>
              <Button
                className="w-full bg-rose-700 text-white hover:bg-rose-800"
                size="lg"
                disabled={isLoading}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
