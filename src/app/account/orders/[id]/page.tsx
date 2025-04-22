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

import { Button } from '@/components/ui/button';

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
  paymentStatus: 'Pending' | 'Paid' | 'Refunded';
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
    paymentStatus: 'Paid',
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
    paymentStatus: 'Paid',
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
    paymentStatus: 'Refunded',
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
    paymentStatus: 'Pending',
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
    paymentStatus: 'Paid',
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
    paymentStatus: 'Paid',
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
            <Button className="bg-rose-700 text-white hover:bg-rose-800">Back to Orders</Button>
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
    <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-6 flex items-center gap-2">
        <Button
          onClick={() => router.push('/account/orders')}
          variant="ghost"
          className="flex h-auto items-center gap-1 p-0 text-neutral-600 hover:text-rose-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Orders</span>
        </Button>
      </div>

      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h1 className="mr-1 text-2xl font-bold">Order {order.id}</h1>
            <div className="mt-1 flex flex-wrap gap-2 sm:mt-0">
              {order.paymentStatus === 'Pending' && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                  Payment Pending
                </span>
              )}
            </div>
          </div>
          <p className="text-neutral-500">Placed on {order.date}</p>
        </div>

        <div className="mt-3 sm:mt-0">
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

      {/* Payment Instructions for Pending Orders */}
      {order.paymentStatus === 'Pending' && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-amber-800">
            <CreditCard className="h-5 w-5" />
            Payment Instructions
          </h2>

          <div className="space-y-4">
            <p className="text-amber-800">
              Your order has been placed successfully, but payment is pending. Please complete the
              payment to process your order.
            </p>

            <div className="rounded-lg border border-amber-200 bg-white p-4">
              <div className="flex flex-col space-y-2 text-center">
                <p className="font-medium text-neutral-700">UPI ID:</p>
                <p className="text-lg font-bold text-rose-700">giftshop@upi</p>

                <div className="mx-auto mt-2 h-40 w-40 overflow-hidden rounded-md border border-amber-200 bg-white p-2">
                  <img
                    src="/images/upi-qr-code.png"
                    alt="UPI QR Code"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const message = `Hi, I've placed an order with Order ID: ${order.id}. Here's my payment receipt.`;
                  window.open(
                    `https://wa.me/919876543210?text=${encodeURIComponent(message)}`,
                    '_blank'
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="mr-2 h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.415 14.382C17.117 14.233 15.656 13.515 15.384 13.415C15.112 13.316 14.914 13.267 14.715 13.565C14.517 13.861 13.948 14.531 13.775 14.729C13.601 14.928 13.428 14.952 13.131 14.804C12.834 14.654 11.876 14.341 10.741 13.329C9.858 12.541 9.261 11.568 9.088 11.27C8.915 10.973 9.069 10.812 9.218 10.664C9.352 10.531 9.517 10.317 9.666 10.144C9.814 9.97 9.863 9.846 9.963 9.647C10.062 9.448 10.012 9.275 9.938 9.126C9.863 8.978 9.268 7.515 9.02 6.92C8.779 6.341 8.534 6.419 8.35 6.41C8.166 6.403 7.967 6.4 7.769 6.4C7.57 6.4 7.248 6.474 6.976 6.772C6.704 7.07 5.936 7.788 5.936 9.251C5.936 10.714 7.001 12.127 7.149 12.325C7.297 12.524 9.26 15.521 12.239 16.818C12.949 17.122 13.504 17.301 13.935 17.437C14.65 17.659 15.294 17.627 15.801 17.549C16.365 17.464 17.551 16.837 17.801 16.143C18.051 15.448 18.051 14.853 17.976 14.729C17.901 14.605 17.713 14.531 17.415 14.382V14.382Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.05195 21.9501L3.31895 16.7571C2.54595 15.1081 2.13895 13.2871 2.13995 11.4341C2.14295 6.22306 6.38095 2.00006 11.608 2.00006C14.122 2.00106 16.481 2.98706 18.282 4.78906C20.083 6.59106 21.069 8.94706 21.068 11.4531C21.065 16.6641 16.827 20.8871 11.608 20.8871H11.604C9.83695 20.8861 8.10095 20.5041 6.55295 19.7861L2.05195 21.9501Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Send Receipt on WhatsApp
              </Button>
            </div>

            <div className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-sm">
              <p className="font-medium text-rose-700">
                Note: Your order will be processed once payment is confirmed. If you have any
                questions, please contact us.
              </p>
            </div>
          </div>
        </div>
      )}

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
