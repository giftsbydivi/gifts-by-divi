'use client';

import { useState } from 'react';

import Link from 'next/link';

import { ShoppingCart, Menu, X } from 'lucide-react';

import { useCartStore } from '@/lib/stores/cart-store';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Header() {
  const { totalItems } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="z-10 font-serif text-xl font-medium md:text-2xl">
          Gifts <span className="text-neutral-500">by Divi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm md:flex">
          <Link href="/" className="text-neutral-900 hover:text-rose-700">
            Home
          </Link>
          <Link href="/products" className="text-neutral-900 hover:text-rose-700">
            Products
          </Link>
          <Link href="/about" className="text-neutral-900 hover:text-rose-700">
            About Us
          </Link>
          <Link href="/contact" className="text-neutral-900 hover:text-rose-700">
            Contact Us
          </Link>
        </nav>

        <div className="z-10 flex items-center gap-2">
          {/* Cart Link - Always Visible */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-rose-700 p-0 text-xs text-white"
                  variant="outline"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 right-0 z-[60] h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6 pt-16">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-neutral-900 hover:text-rose-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-neutral-900 hover:text-rose-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/featured-gifts"
              className="text-neutral-900 hover:text-rose-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Featured Gifts
            </Link>
            <Link
              href="/about"
              className="text-neutral-900 hover:text-rose-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-neutral-900 hover:text-rose-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>

          <div className="mt-auto space-y-6 pt-10">
            <div className="space-y-2">
              <h3 className="font-serif text-sm font-medium">Get in Touch</h3>
              <p className="text-xs text-neutral-600">
                Have questions about our products? <br />
                Email us at{' '}
                <a href="mailto:giftsbydivi@gmail.com" className="text-rose-700">
                  giftsbydivi@gmail.com
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-sm font-medium">Contact Us on WhatsApp</h3>
              <a
                href="https://wa.me/919926860660"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat with us on WhatsApp
              </a>
            </div>

            <div className="border-t border-neutral-200 pt-4 text-center text-xs text-neutral-500">
              We&apos;re here to help you find the perfect gift!
            </div>
          </div>
        </div>
      </div>

      {/* Semi-transparent blurred overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}
