'use client';

import Link from 'next/link';

import { useCart } from '@/lib/providers/cart-provider';
import { useCartStore } from '@/lib/stores/cart-store';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  // Get cart state from Zustand store
  const { items, totalItems, totalPrice } = useCartStore();

  // Get cart actions from context
  const { updateCartItemQuantity, removeFromCart, clearCart } = useCart();

  return (
    <main className="min-h-screen p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-medium md:text-4xl">Your Shopping Cart</h1>

        {items.length === 0 ? (
          <Card className="p-8 text-center">
            <CardTitle className="mb-2">Your cart is empty</CardTitle>
            <CardDescription className="mb-6">
              Looks like you haven&apos;t added any items to your cart yet.
            </CardDescription>
            <Link href="/products">
              <Button>Browse Products</Button>
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
              {items.map((item) => (
                <Card key={item.product.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex w-full items-center justify-center bg-neutral-100 p-4 sm:w-1/4 sm:p-0">
                      <div className="flex h-24 w-full items-center justify-center sm:h-full">
                        <p className="text-neutral-400">Product Image</p>
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="text-lg font-medium">{item.product.name}</h3>
                          <p className="text-sm text-neutral-600">{item.product.category}</p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateCartItemQuantity(item.product.id, item.quantity - 1)
                              }
                              className="h-8 w-8 rounded-r-none"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <div className="border-input flex h-8 w-12 items-center justify-center border text-sm">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateCartItemQuantity(item.product.id, item.quantity + 1)
                              }
                              className="h-8 w-8 rounded-l-none"
                            >
                              +
                            </Button>
                          </div>
                          <div className="min-w-[100px] text-right sm:text-left">
                            <div className="font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-xs text-neutral-500">
                              ${item.product.price.toFixed(2)} each
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
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

            <div className="rounded-lg bg-neutral-50 p-6">
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="mb-2 flex justify-between text-sm text-neutral-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="mb-2 flex justify-between text-sm text-neutral-600">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="my-4" />
              <div className="mb-6 flex justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
