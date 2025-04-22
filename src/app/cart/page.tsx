'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import { useCartProducts } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';
import { useCartStore } from '@/lib/stores/cart-store';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartPage() {
  // Get cart state from Zustand store
  const { items } = useCartStore();

  // Get cart actions from context
  const { updateQuantity, removeFromCart, clearCart } = useCart();

  // Calculate total items once, not during render
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Use the hook to fetch cart products with caching
  const { data: cartItemsWithProducts = [], isLoading } = useCartProducts(items);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return cartItemsWithProducts.reduce((sum, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);
  }, [cartItemsWithProducts]);

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
                <Card key={item.slug} className="group relative cursor-pointer overflow-hidden">
                  {item.product && (
                    <Link
                      href={`/products/${item.product.slug.current}`}
                      className="absolute inset-0 z-10"
                      aria-label={`View details for ${item.product.name}`}
                    />
                  )}
                  <div className="relative flex flex-col sm:flex-row">
                    <div className="flex w-full items-center justify-center bg-neutral-100 p-4 sm:w-1/4 sm:p-0">
                      <div className="flex h-24 w-full items-center justify-center sm:h-full">
                        {item.isLoading ? (
                          <Skeleton className="h-24 w-24 sm:h-32 sm:w-32" />
                        ) : item.product &&
                          item.product.images &&
                          item.product.images.length > 0 ? (
                          <div className="relative h-24 w-24 overflow-hidden sm:h-32 sm:w-32">
                            <img
                              src={item.product.images[0].url}
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
                              <p className="text-sm text-neutral-600">
                                {item.product.categories && item.product.categories.length > 0
                                  ? item.product.categories[0].name
                                  : 'Uncategorized'}
                              </p>
                              {item.product.compareAtPrice &&
                                item.product.compareAtPrice > item.product.price && (
                                  <p className="text-xs text-rose-600">
                                    Save $
                                    {(
                                      item.quantity *
                                      (item.product.compareAtPrice - item.product.price)
                                    ).toFixed(2)}
                                    {item.quantity > 1 && (
                                      <span className="ml-1 text-neutral-500">
                                        ($
                                        {(item.product.compareAtPrice - item.product.price).toFixed(
                                          2
                                        )}{' '}
                                        each)
                                      </span>
                                    )}
                                  </p>
                                )}
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
                                updateQuantity(item.slug, Math.max(1, item.quantity - 1));
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
                                updateQuantity(item.slug, item.quantity + 1);
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
                              removeFromCart(item.slug);
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

            {!isLoading && (
              <div className="border-t border-neutral-200 pt-4">
                {/* Calculate MRP (total price without discounts) */}
                {(() => {
                  const totalMRP = cartItemsWithProducts.reduce((sum, item) => {
                    if (item.product) {
                      const priceToUse =
                        item.product.compareAtPrice &&
                        item.product.compareAtPrice > item.product.price
                          ? item.product.compareAtPrice
                          : item.product.price;
                      return sum + priceToUse * item.quantity;
                    }
                    return sum;
                  }, 0);

                  const totalDiscount = cartItemsWithProducts.reduce((sum, item) => {
                    if (
                      item.product?.compareAtPrice &&
                      item.product.compareAtPrice > item.product.price
                    ) {
                      return (
                        sum + (item.product.compareAtPrice - item.product.price) * item.quantity
                      );
                    }
                    return sum;
                  }, 0);

                  return (
                    <>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-neutral-600">Total MRP:</span>
                        <span className="text-neutral-600">${totalMRP.toFixed(2)}</span>
                      </div>

                      {totalDiscount > 0 && (
                        <div className="flex items-center justify-between py-2 text-neutral-600">
                          <span>Discount on MRP:</span>
                          <span>- ${totalDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between py-2 text-sm text-neutral-500">
                        <span>Shipping Fee:</span>
                        <span>Calculated at checkout</span>
                      </div>

                      <div className="mt-2 flex items-center justify-between border-t border-neutral-200 py-4 text-lg font-bold">
                        <span>Total Amount:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </>
                  );
                })()}

                <div className="mt-6 flex justify-end">
                  <Link href="/checkout">
                    <Button size="lg" className="bg-rose-700 px-8 text-white hover:bg-rose-800">
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
