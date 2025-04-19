import { Playfair_Display, Montserrat } from 'next/font/google';

import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { CartProvider } from '@/lib/providers/cart-provider';
import { TanstackQueryProvider } from '@/lib/providers/query-provider';

import { Header } from '@/components/header';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gift Shop',
  description: 'Luxury Gift Shop Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased`}>
        <TanstackQueryProvider>
          <CartProvider>
            <Header />
            {children}
            <Toaster position="top-right" closeButton />
          </CartProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
