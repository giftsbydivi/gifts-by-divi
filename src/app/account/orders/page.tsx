'use client';

import Link from 'next/link';

import { User, Package, LogOut, ExternalLink } from 'lucide-react';

// Sample order data
const orders = [
  {
    id: '#ORD-2023-1234',
    date: 'June 15, 2023',
    status: 'Delivered',
    statusColor: 'bg-green-100 text-green-800',
    total: '₹4,250.00',
    items: [
      { name: 'Handcrafted Wooden Lamp', quantity: 1, price: '₹2,500.00' },
      { name: 'Personalized Coffee Mug', quantity: 2, price: '₹875.00 each' },
    ],
  },
  {
    id: '#ORD-2023-0987',
    date: 'May 28, 2023',
    status: 'Delivered',
    statusColor: 'bg-green-100 text-green-800',
    total: '₹1,800.00',
    items: [{ name: 'Decorative Wall Art', quantity: 1, price: '₹1,800.00' }],
  },
  {
    id: '#ORD-2023-0456',
    date: 'April 10, 2023',
    status: 'Cancelled',
    statusColor: 'bg-red-100 text-red-800',
    total: '₹3,250.00',
    items: [
      { name: 'Handmade Ceramic Vase', quantity: 1, price: '₹1,750.00' },
      { name: 'Scented Candle Set', quantity: 1, price: '₹1,500.00' },
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

              <button
                className="flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-rose-700"
                onClick={() => alert('Logout functionality will be implemented with actual auth')}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
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
                <button className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:bg-rose-800">
                  Start Shopping
                </button>
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
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${order.statusColor}`}
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
                      <div key={i} className="flex items-center justify-between py-1 text-sm">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="ml-2 text-neutral-500">× {item.quantity}</span>
                        </div>
                        <span>{item.price}</span>
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
