import { Playfair_Display, Montserrat } from 'next/font/google';

import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { AuthProvider } from '@/lib/providers/auth-provider';
import { CartProvider } from '@/lib/providers/cart-provider';
import { TanstackQueryProvider } from '@/lib/providers/query-provider';

import { SiteFooter } from '@/components/footer';
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
  title: 'Gifts by Divi',
  description: "Luxury gifts for life's everyday moments",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
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
            <AuthProvider>
              <Header />
              {children}
              <SiteFooter />
              <Toaster
                position="top-right"
                closeButton
                theme="light"
                className="toaster-with-rose-theme"
                toastOptions={{
                  className: 'toast-with-rose-accent',
                  style: {
                    background: '#fff',
                    borderColor: '#fecdd3',
                    color: '#111',
                  },
                }}
              />
            </AuthProvider>
          </CartProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
