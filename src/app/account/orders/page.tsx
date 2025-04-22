'use client';

import React from 'react';

import Link from 'next/link';

import { User, Package, LogOut, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';

// Define order status types and their properties
interface StatusConfig {
  color: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  step: number;
}

const orderStatusConfig: Record<string, StatusConfig> = {
  'Order Placed': {
    color: 'bg-blue-100 text-blue-800',
    description: 'Your order has been received',
    icon: User,
    step: 1,
  },
  'Payment Confirmed': {
    color: 'bg-indigo-100 text-indigo-800',
    description: 'Payment has been processed successfully',
    icon: User,
    step: 2,
  },
  Processing: {
    color: 'bg-amber-100 text-amber-800',
    description: 'Your order is being prepared',
    icon: User,
    step: 3,
  },
  Shipped: {
    color: 'bg-purple-100 text-purple-800',
    description: 'Your order is on the way',
    icon: User,
    step: 4,
  },
  Delivered: {
    color: 'bg-green-100 text-green-800',
    description: 'Your order has been delivered',
    icon: User,
    step: 5,
  },
  Cancelled: {
    color: 'bg-red-100 text-red-800',
    description: 'Your order has been cancelled',
    icon: User,
    step: 6,
  },
};

// Sample order data with updated statuses
const orders = [
  {
    id: '#ORD-2023-1234',
    date: 'June 15, 2023',
    status: 'Delivered',
    total: '₹4,250.00',
    items: [
      {
        name: 'Handcrafted Wooden Lamp',
        quantity: 1,
        price: 2500,
        mrp: 3000,
        image: '/images/products/wooden-lamp.jpg',
      },
      {
        name: 'Personalized Coffee Mug',
        quantity: 2,
        price: 875,
        mrp: 1000,
        image: '/images/products/coffee-mug.jpg',
      },
    ],
  },
  {
    id: '#ORD-2023-0987',
    date: 'May 28, 2023',
    status: 'Shipped',
    total: '₹1,800.00',
    items: [
      {
        name: 'Decorative Wall Art',
        quantity: 1,
        price: 1800,
        mrp: 2200,
        image: '/images/products/wall-art.jpg',
      },
    ],
  },
  {
    id: '#ORD-2023-0456',
    date: 'April 10, 2023',
    status: 'Cancelled',
    total: '₹3,250.00',
    items: [
      {
        name: 'Handmade Ceramic Vase',
        quantity: 1,
        price: 1750,
        mrp: 2000,
        image: '/images/products/ceramic-vase.jpg',
      },
      {
        name: 'Scented Candle Set',
        quantity: 1,
        price: 1500,
        mrp: 1800,
        image: '/images/products/candle-set.jpg',
      },
    ],
  },
  {
    id: '#ORD-2023-3456',
    date: 'June 20, 2023',
    status: 'Order Placed',
    total: '₹2,100.00',
    items: [
      {
        name: 'Artisanal Tea Set',
        quantity: 1,
        price: 2100,
        mrp: 2500,
        image: '/images/products/tea-set.jpg',
      },
    ],
  },
  {
    id: '#ORD-2023-5678',
    date: 'June 18, 2023',
    status: 'Payment Confirmed',
    total: '₹3,450.00',
    items: [
      {
        name: 'Handwoven Basket',
        quantity: 1,
        price: 1950,
        mrp: 2200,
        image: '/images/products/handwoven-basket.jpg',
      },
      {
        name: 'Organic Spice Collection',
        quantity: 1,
        price: 1500,
        mrp: 1800,
        image: '/images/products/spice-collection.jpg',
      },
    ],
  },
  {
    id: '#ORD-2023-7890',
    date: 'June 16, 2023',
    status: 'Processing',
    total: '₹5,200.00',
    items: [
      {
        name: 'Luxury Silk Scarf',
        quantity: 1,
        price: 3200,
        mrp: 3800,
        image: '/images/products/silk-scarf.jpg',
      },
      {
        name: 'Artisan Chocolate Box',
        quantity: 2,
        price: 1000,
        mrp: 1200,
        image: '/images/products/chocolate-box.jpg',
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        {/* Account Sidebar */}
        <div className="shrink-0 space-y-4">
          <h1 className="mb-6 text-2xl font-bold">My Account</h1>

          <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="flex flex-col">
              <Link
                href="/account"
                className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-rose-700"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>

              <Link
                href="/account/orders"
                className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-4 py-3 font-medium text-rose-700"
              >
                <Package size={18} />
                <span>Orders</span>
              </Link>

              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-rose-700"
                onClick={() => alert('Logout functionality will be implemented with actual auth')}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Order History</h2>

          {orders.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center shadow-sm">
              <Package className="mx-auto mb-3 h-12 w-12 text-neutral-300" />
              <h3 className="mb-1 text-lg font-medium">No orders yet</h3>
              <p className="mb-4 text-neutral-600">You haven&apos;t placed any orders yet.</p>
              <Link href="/products">
                <Button className="bg-rose-700 text-white hover:bg-rose-800">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{order.id}</h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${orderStatusConfig[order.status].color}`}
                          title={orderStatusConfig[order.status].description}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500">{order.date}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-medium">{order.total}</p>
                      <Link
                        href={`/account/orders/${order.id.replace('#', '')}`}
                        className="flex items-center gap-1 text-sm font-medium text-rose-700 hover:text-rose-800"
                      >
                        <span>View Details</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="grid grid-cols-[40px_1fr] gap-3 py-1 text-sm">
                        <div className="h-10 w-10 overflow-hidden rounded-md bg-neutral-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="ml-2 text-neutral-500">× {item.quantity}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                              {item.mrp > item.price && (
                                <span className="text-xs text-neutral-500 line-through">
                                  ₹{(item.mrp * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                            {item.quantity > 1 && (
                              <span className="text-xs text-neutral-500">
                                (₹{item.price.toFixed(2)} each)
                              </span>
                            )}
                            {item.mrp > item.price && (
                              <span className="text-xs text-rose-600">
                                Save ₹{((item.mrp - item.price) * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
