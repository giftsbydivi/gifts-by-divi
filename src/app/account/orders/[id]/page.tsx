'use client';

import React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import {
  CheckCircle2,
  CircleDot,
  Clock,
  ArrowLeft,
  Truck,
  Package,
  CreditCard,
  X,
} from 'lucide-react';

// Define types for order data
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  mrp: number;
  image: string;
  slug: string;
}

interface StatusHistoryItem {
  status: OrderStatusType;
  date: string;
  reason?: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatusType;
  total: string;
  paymentMethod: 'UPI' | 'Cash on Delivery';
  shippingAddress: string;
  trackingNumber: string;
  items: OrderItem[];
  statusHistory: StatusHistoryItem[];
}

// Define allowed order status types
type OrderStatusType =
  | 'Order Placed'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

interface StatusConfig {
  color: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  step: number;
}

// Define order status types and their properties
const orderStatusConfig: Record<OrderStatusType, StatusConfig> = {
  'Order Placed': {
    color: 'bg-blue-100 text-blue-800',
    description: 'Your order has been received and is being processed',
    icon: CircleDot,
    step: 1,
  },
  'Payment Confirmed': {
    color: 'bg-indigo-100 text-indigo-800',
    description: 'Payment has been successfully processed',
    icon: CreditCard,
    step: 2,
  },
  Processing: {
    color: 'bg-amber-100 text-amber-800',
    description: 'Your order is being prepared for shipment',
    icon: Package,
    step: 3,
  },
  Shipped: {
    color: 'bg-purple-100 text-purple-800',
    description: 'Your order has been shipped and is on the way',
    icon: Truck,
    step: 4,
  },
  Delivered: {
    color: 'bg-green-100 text-green-800',
    description: 'Your order has been successfully delivered',
    icon: CheckCircle2,
    step: 5,
  },
  Cancelled: {
    color: 'bg-red-100 text-red-800',
    description: 'Your order has been cancelled',
    icon: X,
    step: -1, // Special case for cancelled orders
  },
};

// Sample orders data (in a real app, this would come from API)
const allOrders: Record<string, Order> = {
  'ORD-2023-1234': {
    id: '#ORD-2023-1234',
    date: 'June 15, 2023',
    status: 'Delivered',
    total: '₹4,250.00',
    paymentMethod: 'UPI',
    shippingAddress: '123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001',
    trackingNumber: 'TRK5678901234',
    items: [
      {
        name: 'Handcrafted Wooden Lamp',
        quantity: 1,
        price: 2500,
        mrp: 3000,
        image: '/images/products/wooden-lamp.jpg',
        slug: 'handcrafted-wooden-lamp',
      },
      {
        name: 'Personalized Coffee Mug',
        quantity: 2,
        price: 875,
        mrp: 1000,
        image: '/images/products/coffee-mug.jpg',
        slug: 'personalized-coffee-mug',
      },
    ],
    statusHistory: [
      { status: 'Order Placed', date: 'June 10, 2023, 10:23 AM' },
      { status: 'Payment Confirmed', date: 'June 10, 2023, 10:25 AM' },
      { status: 'Processing', date: 'June 11, 2023, 9:00 AM' },
      { status: 'Shipped', date: 'June 12, 2023, 2:30 PM' },
      { status: 'Delivered', date: 'June 15, 2023, 11:15 AM' },
    ],
  },
  'ORD-2023-0987': {
    id: '#ORD-2023-0987',
    date: 'May 28, 2023',
    status: 'Shipped',
    total: '₹1,800.00',
    paymentMethod: 'Cash on Delivery',
    shippingAddress: '456 Park Avenue, Delhi, Delhi 110001',
    trackingNumber: 'TRK9876543210',
    items: [
      {
        name: 'Decorative Wall Art',
        quantity: 1,
        price: 1800,
        mrp: 2200,
        image: '/images/products/wall-art.jpg',
        slug: 'decorative-wall-art',
      },
    ],
    statusHistory: [
      { status: 'Order Placed', date: 'May 25, 2023, 3:45 PM' },
      { status: 'Payment Confirmed', date: 'May 25, 2023, 3:47 PM' },
      { status: 'Processing', date: 'May 26, 2023, 10:15 AM' },
      { status: 'Shipped', date: 'May 27, 2023, 1:20 PM' },
    ],
  },
  'ORD-2023-0456': {
    id: '#ORD-2023-0456',
    date: 'April 10, 2023',
    status: 'Cancelled',
    total: '₹3,250.00',
    paymentMethod: 'UPI',
    shippingAddress: '789 Garden Street, Bangalore, Karnataka 560001',
    trackingNumber: 'N/A',
    items: [
      {
        name: 'Handmade Ceramic Vase',
        quantity: 1,
        price: 1750,
        mrp: 2000,
        image: '/images/products/ceramic-vase.jpg',
        slug: 'handmade-ceramic-vase',
      },
      {
        name: 'Scented Candle Set',
        quantity: 1,
        price: 1500,
        mrp: 1800,
        image: '/images/products/candle-set.jpg',
        slug: 'scented-candle-set',
      },
    ],
    statusHistory: [
      { status: 'Order Placed', date: 'April 8, 2023, 6:30 PM' },
      { status: 'Payment Confirmed', date: 'April 8, 2023, 6:33 PM' },
      { status: 'Processing', date: 'April 9, 2023, 9:45 AM' },
      {
        status: 'Cancelled',
        date: 'April 10, 2023, 11:20 AM',
        reason: 'Customer requested cancellation',
      },
    ],
  },
  'ORD-2023-3456': {
    id: '#ORD-2023-3456',
    date: 'June 20, 2023',
    status: 'Order Placed',
    total: '₹2,100.00',
    paymentMethod: 'Cash on Delivery',
    shippingAddress: '101 River Road, Chennai, Tamil Nadu 600001',
    trackingNumber: 'Not Available Yet',
    items: [
      {
        name: 'Artisanal Tea Set',
        quantity: 1,
        price: 2100,
        mrp: 2500,
        image: '/images/products/tea-set.jpg',
        slug: 'artisanal-tea-set',
      },
    ],
    statusHistory: [{ status: 'Order Placed', date: 'June 20, 2023, 5:15 PM' }],
  },
  'ORD-2023-5678': {
    id: '#ORD-2023-5678',
    date: 'June 18, 2023',
    status: 'Payment Confirmed',
    total: '₹3,450.00',
    paymentMethod: 'UPI',
    shippingAddress: '202 Hill Avenue, Kolkata, West Bengal 700001',
    trackingNumber: 'Not Available Yet',
    items: [
      {
        name: 'Handwoven Basket',
        quantity: 1,
        price: 1950,
        mrp: 2200,
        image: '/images/products/handwoven-basket.jpg',
        slug: 'handwoven-basket',
      },
      {
        name: 'Organic Spice Collection',
        quantity: 1,
        price: 1500,
        mrp: 1800,
        image: '/images/products/spice-collection.jpg',
        slug: 'organic-spice-collection',
      },
    ],
    statusHistory: [
      { status: 'Order Placed', date: 'June 18, 2023, 2:10 PM' },
      { status: 'Payment Confirmed', date: 'June 18, 2023, 2:15 PM' },
    ],
  },
  'ORD-2023-7890': {
    id: '#ORD-2023-7890',
    date: 'June 16, 2023',
    status: 'Processing',
    total: '₹5,200.00',
    paymentMethod: 'Cash on Delivery',
    shippingAddress: '303 Lake View Road, Hyderabad, Telangana 500001',
    trackingNumber: 'Not Available Yet',
    items: [
      {
        name: 'Luxury Silk Scarf',
        quantity: 1,
        price: 3200,
        mrp: 3800,
        image: '/images/products/silk-scarf.jpg',
        slug: 'luxury-silk-scarf',
      },
      {
        name: 'Artisan Chocolate Box',
        quantity: 2,
        price: 1000,
        mrp: 1200,
        image: '/images/products/chocolate-box.jpg',
        slug: 'artisan-chocolate-box',
      },
    ],
    statusHistory: [
      { status: 'Order Placed', date: 'June 16, 2023, 11:25 AM' },
      { status: 'Payment Confirmed', date: 'June 16, 2023, 11:28 AM' },
      { status: 'Processing', date: 'June 17, 2023, 9:30 AM' },
    ],
  },
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const order = allOrders[orderId];

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <Package className="mb-3 h-12 w-12 text-neutral-300" />
          <h2 className="mb-1 text-xl font-semibold">Order Not Found</h2>
          <p className="mb-4 text-neutral-600">
            The order you&apos;re looking for could not be found.
          </p>
          <Link href="/account/orders">
            <button className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:bg-rose-800">
              Back to Orders
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const { status, statusHistory } = order;
  const currentStep = orderStatusConfig[status].step;

  // Render the timeline steps based on the current order status
  const renderTimeline = () => {
    if (status === 'Cancelled') {
      // Special case for cancelled orders - show the status history
      return (
        <div className="mt-4 space-y-4">
          {statusHistory.map((step, index) => {
            const StepIcon = orderStatusConfig[step.status].icon;
            const isActive = index === statusHistory.length - 1;

            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${isActive ? 'text-red-800' : 'text-neutral-500'}`}
              >
                <div className="mt-0.5">
                  <StepIcon
                    className={`h-5 w-5 ${isActive ? 'text-red-500' : 'text-neutral-400'}`}
                  />
                </div>
                <div>
                  <p className={`font-medium ${isActive ? 'text-red-800' : ''}`}>{step.status}</p>
                  <p className="text-sm">{step.date}</p>
                  {step.reason && <p className="mt-1 text-sm italic">{step.reason}</p>}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Regular order status timeline
    const steps = [
      { name: 'Order Placed' as OrderStatusType, step: 1 },
      { name: 'Payment Confirmed' as OrderStatusType, step: 2 },
      { name: 'Processing' as OrderStatusType, step: 3 },
      { name: 'Shipped' as OrderStatusType, step: 4 },
      { name: 'Delivered' as OrderStatusType, step: 5 },
    ];

    return (
      <div className="mt-4 space-y-4">
        {steps.map((step, index) => {
          // Determine the status of this step
          let stepStatus = 'upcoming'; // Default status
          if (currentStep > step.step) {
            stepStatus = 'completed';
          } else if (currentStep === step.step) {
            stepStatus = 'current';
          }

          // Find the history entry for this step if it exists
          const historyEntry = statusHistory.find((h) => h.status === step.name);

          // Determine the icon and styling based on step status
          let iconElement;
          let textColor = 'text-neutral-400';

          if (stepStatus === 'completed') {
            iconElement = <CheckCircle2 className={`h-5 w-5 text-green-500`} />;
            textColor = 'text-neutral-500';
          } else if (stepStatus === 'current') {
            const CurrentIcon = orderStatusConfig[step.name].icon;
            iconElement = <CurrentIcon className={`h-5 w-5 text-blue-500`} />;
            textColor = 'text-neutral-900 font-medium';
          } else {
            iconElement = <Clock className={`h-5 w-5 text-neutral-300`} />;
          }

          return (
            <div key={index} className={`flex items-start gap-3 ${textColor}`}>
              <div className="mt-0.5">{iconElement}</div>
              <div>
                <p className={stepStatus === 'current' ? 'font-medium' : ''}>{step.name}</p>
                {historyEntry && <p className="text-sm">{historyEntry.date}</p>}
                {!historyEntry && stepStatus === 'upcoming' && (
                  <p className="text-sm italic">Pending</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => router.push('/account/orders')}
          className="flex items-center gap-1 text-neutral-600 hover:text-rose-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Orders</span>
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Order Details {order.id}</h1>

        <div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${orderStatusConfig[order.status].color}`}
          >
            <span className="h-4 w-4">
              {order.status === 'Order Placed' && <CircleDot className="h-4 w-4" />}
              {order.status === 'Payment Confirmed' && <CreditCard className="h-4 w-4" />}
              {order.status === 'Processing' && <Package className="h-4 w-4" />}
              {order.status === 'Shipped' && <Truck className="h-4 w-4" />}
              {order.status === 'Delivered' && <CheckCircle2 className="h-4 w-4" />}
              {order.status === 'Cancelled' && <X className="h-4 w-4" />}
            </span>
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        {/* Main order info */}
        <div className="space-y-6">
          {/* Order summary */}
          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-lg font-semibold">
              Order Summary
            </h2>

            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-neutral-600">Order Date</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-600">Payment Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-600">Shipping Address</span>
                <span className="max-w-xs text-right font-medium">{order.shippingAddress}</span>
              </div>
              {order.trackingNumber !== 'Not Available Yet' && order.trackingNumber !== 'N/A' && (
                <div className="flex justify-between py-1">
                  <span className="text-neutral-600">Tracking Number</span>
                  <span className="font-medium">{order.trackingNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order items */}
          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-lg font-semibold">
              Order Items
            </h2>

            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[80px_1fr] gap-4 border-b border-neutral-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="aspect-square h-20 w-20 overflow-hidden rounded-md bg-neutral-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-neutral-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.mrp > item.price && (
                          <span className="text-sm text-neutral-500 line-through">
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
                        <span className="text-xs font-medium text-rose-600">
                          Save ₹{((item.mrp - item.price) * item.quantity).toFixed(2)}
                          {item.quantity > 1 && (
                            <span className="text-xs text-neutral-500">
                              {' '}
                              (₹{(item.mrp - item.price).toFixed(2)} per item)
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-neutral-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ₹
                  {order.items
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>

              {/* Total Savings */}
              {order.items.some((item) => item.mrp > item.price) && (
                <div className="flex justify-between text-rose-600">
                  <span>Total Savings</span>
                  <span>
                    ₹
                    {order.items
                      .reduce((sum, item) => sum + (item.mrp - item.price) * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between border-t border-neutral-100 pt-2 font-semibold">
                <span>Total</span>
                <span>{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order status timeline */}
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 border-b border-neutral-200 pb-2 text-lg font-semibold">
            Order Status
          </h2>

          <div className="text-sm">
            <div className="mt-1 text-neutral-600">
              {orderStatusConfig[order.status].description}
            </div>

            {renderTimeline()}
          </div>
        </div>
      </div>
    </main>
  );
}
