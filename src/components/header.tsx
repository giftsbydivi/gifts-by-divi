'use client';

import Link from 'next/link';

import { ShoppingCart } from 'lucide-react';

import { useCartStore } from '@/lib/stores/cart-store';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Header() {
  const { totalItems } = useCartStore();

  return (
    <header className="relative border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="z-10 font-serif text-xl font-medium md:text-2xl">
          Everyday Gift <span className="text-neutral-500">by Divi</span>
        </Link>

        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm md:flex">
          <Link href="/" className="hover:text-neutral-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-neutral-600">
            Products
          </Link>
          <Link href="#" className="hover:text-neutral-600">
            Collections
          </Link>
          <Link href="#" className="hover:text-neutral-600">
            About
          </Link>
          <Link href="#" className="hover:text-neutral-600">
            Contact
          </Link>
        </nav>

        <div className="z-10 flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-black p-0 text-xs text-white"
                  variant="outline"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
