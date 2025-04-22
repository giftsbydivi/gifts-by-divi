'use client';

import { useState, useEffect, useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { CheckCircle, CreditCard, MapPin, Truck } from 'lucide-react';

import { useCartProducts } from '@/lib/hooks/use-products';
import { useCart } from '@/lib/providers/cart-provider';
import { formatCurrency } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// List of Indian states for dropdown
const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

// Types
interface AddressData {
  name: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

interface OrderItem {
  productSlug: string;
  quantity: number;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  categories?: { id: string; name: string; slug: string }[];
}

interface OrderData {
  shippingAddress: AddressData;
  items: OrderItem[];
  total: number;
  status: 'Order Placed';
  paymentStatus: 'Pending';
  orderDate: string;
}

// Mock default address - in a real app, fetch this from an API
const defaultAddress: AddressData = {
  name: 'John Doe',
  mobileNumber: '9876543210',
  address: '123 Main Street, Apartment 4B',
  city: 'Mumbai',
  state: 'Maharashtra',
  pinCode: '400001',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, clearCart } = useCart();

  // Use the cart products hook to fetch product details
  const { data: cartItemsWithProducts = [] } = useCartProducts(cartItems);

  // Calculate total price
  const total = useMemo(() => {
    return cartItemsWithProducts.reduce((sum: number, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);
  }, [cartItemsWithProducts]);

  const [currentStep, setCurrentStep] = useState(1);
  const [addressType, setAddressType] = useState('default');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [address, setAddress] = useState<AddressData>(defaultAddress);
  const [customAddress, setCustomAddress] = useState<AddressData>({
    name: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const [orderId, setOrderId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<AddressData>>({});

  // If cart is empty, redirect to cart page
  useEffect(() => {
    if (cartItems.length === 0 && currentStep === 1) {
      router.push('/cart');
    }
  }, [cartItems, router, currentStep]);

  // Update the address based on the selected type
  useEffect(() => {
    if (addressType === 'default') {
      setAddress(defaultAddress);
    } else {
      setAddress(customAddress);
    }
  }, [addressType, customAddress]);

  // Handle custom address field changes
  const handleAddressChange = (field: keyof AddressData, value: string) => {
    setCustomAddress((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field if any
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate the address
  const validateAddress = (): boolean => {
    const newErrors: Partial<AddressData> = {};
    let isValid = true;

    // Only validate custom address if it's selected
    if (addressType === 'custom') {
      if (!customAddress.name || customAddress.name.length < 3) {
        newErrors.name = 'Name must be at least 3 characters long';
        isValid = false;
      }

      if (!customAddress.mobileNumber || !/^\d{10}$/.test(customAddress.mobileNumber)) {
        newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
        isValid = false;
      }

      if (!customAddress.address || customAddress.address.length < 5) {
        newErrors.address = 'Address must be at least 5 characters long';
        isValid = false;
      }

      if (!customAddress.city) {
        newErrors.city = 'City is required';
        isValid = false;
      }

      if (!customAddress.state) {
        newErrors.state = 'State is required';
        isValid = false;
      }

      if (!customAddress.pinCode || !/^\d{6}$/.test(customAddress.pinCode)) {
        newErrors.pinCode = 'PIN code must be exactly 6 digits';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle confirm order
  const handleConfirmOrder = async () => {
    if (!validateAddress()) {
      return;
    }

    setIsProcessing(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const orderData: OrderData = {
        shippingAddress: addressType === 'default' ? defaultAddress : customAddress,
        items: cartItemsWithProducts.map((item) => {
          const product = item.product;
          if (!product) {
            return {
              productSlug: item.slug,
              quantity: item.quantity,
              name: 'Unknown Product',
              price: 0,
              image: '',
            };
          }

          return {
            productSlug: item.slug,
            quantity: item.quantity,
            name: product.name,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            image: product.images?.[0]?.url || '',
            categories: product.categories?.map((cat) => ({
              id: cat._id,
              name: cat.name,
              slug: cat.slug.current,
            })),
          };
        }),
        total: total,
        status: 'Order Placed',
        paymentStatus: 'Pending',
        orderDate: new Date().toISOString(),
      };

      // In a real app, make an API call to create the order
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(orderData),
      // });
      // const data = await response.json();
      // setOrderId(data.orderId);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrderId(`ORD-${Date.now()}`);

      // Move to next step
      setCurrentStep(2);

      // Clear cart
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  };

  // Open WhatsApp with prefilled message
  const openWhatsApp = () => {
    const message = `Hi, I've placed an order with Order ID: ${orderId}. Here's my payment receipt.`;
    window.open(`https://wa.me/919926860660?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Render step 1: Shipping address
  const renderShippingStep = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <MapPin className="text-rose-600" />
          <h2 className="text-xl font-semibold">Shipping Address</h2>
        </div>

        <Card className="p-6">
          <RadioGroup value={addressType} onValueChange={setAddressType} className="space-y-4">
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="default" id="default" />
              <div className="flex-1">
                <Label htmlFor="default" className="text-base font-medium">
                  Use Default Address
                </Label>

                {/* Default address preview */}
                <div className="mt-2 rounded-md bg-neutral-50 p-3 text-sm text-neutral-700">
                  <p className="font-medium">{defaultAddress.name}</p>
                  <p>{defaultAddress.address}</p>
                  <p>
                    {defaultAddress.city}, {defaultAddress.state} {defaultAddress.pinCode}
                  </p>
                  <p className="mt-1">Mobile: {defaultAddress.mobileNumber}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <RadioGroupItem value="custom" id="custom" />
              <div className="flex-1">
                <Label htmlFor="custom" className="text-base font-medium">
                  Add New Address
                </Label>

                {/* Custom address form */}
                {addressType === 'custom' && (
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Name */}
                      <div>
                        <Label htmlFor="name" className="mb-1 block text-sm text-neutral-700">
                          Full Name <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={customAddress.name}
                          onChange={(e) => handleAddressChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className={errors.name ? 'border-rose-500' : ''}
                        />
                        {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <Label
                          htmlFor="mobileNumber"
                          className="mb-1 block text-sm text-neutral-700"
                        >
                          Mobile Number <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="mobileNumber"
                          value={customAddress.mobileNumber}
                          onChange={(e) => handleAddressChange('mobileNumber', e.target.value)}
                          placeholder="10-digit mobile number"
                          type="tel"
                          className={errors.mobileNumber ? 'border-rose-500' : ''}
                        />
                        {errors.mobileNumber && (
                          <p className="mt-1 text-xs text-rose-500">{errors.mobileNumber}</p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <Label htmlFor="address" className="mb-1 block text-sm text-neutral-700">
                        Address <span className="text-rose-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        value={customAddress.address}
                        onChange={(e) => handleAddressChange('address', e.target.value)}
                        placeholder="Enter your full address"
                        rows={3}
                        className={errors.address ? 'border-rose-500' : ''}
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-rose-500">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      {/* City */}
                      <div>
                        <Label htmlFor="city" className="mb-1 block text-sm text-neutral-700">
                          City <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          value={customAddress.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          placeholder="Enter your city"
                          className={errors.city ? 'border-rose-500' : ''}
                        />
                        {errors.city && <p className="mt-1 text-xs text-rose-500">{errors.city}</p>}
                      </div>

                      {/* State */}
                      <div>
                        <Label htmlFor="state" className="mb-1 block text-sm text-neutral-700">
                          State <span className="text-rose-500">*</span>
                        </Label>
                        <Select
                          value={customAddress.state}
                          onValueChange={(value) => handleAddressChange('state', value)}
                        >
                          <SelectTrigger
                            id="state"
                            className={errors.state ? 'border-rose-500' : ''}
                          >
                            <SelectValue placeholder="Select a state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && (
                          <p className="mt-1 text-xs text-rose-500">{errors.state}</p>
                        )}
                      </div>

                      {/* PIN Code */}
                      <div>
                        <Label htmlFor="pinCode" className="mb-1 block text-sm text-neutral-700">
                          PIN Code <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="pinCode"
                          value={customAddress.pinCode}
                          onChange={(e) => handleAddressChange('pinCode', e.target.value)}
                          placeholder="6-digit PIN code"
                          className={errors.pinCode ? 'border-rose-500' : ''}
                        />
                        {errors.pinCode && (
                          <p className="mt-1 text-xs text-rose-500">{errors.pinCode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="text-rose-600" />
            <h2 className="text-xl font-semibold">Order Summary</h2>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-neutral-200 pb-4">
                <span>Number of items:</span>
                <span className="font-semibold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between border-b border-neutral-200 pb-4">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatCurrency(total)}</span>
              </div>

              <div className="flex justify-between border-b border-neutral-200 pb-4">
                <span>Shipping:</span>
                <span className="font-semibold">FREE</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-rose-700">{formatCurrency(total)}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button
            className="mt-4 w-full bg-rose-700 px-8 py-6 text-lg hover:bg-rose-800 md:w-auto"
            onClick={handleConfirmOrder}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm Order'}
          </Button>
        </div>
      </div>
    );
  };

  // Render step 2: Payment instructions
  const renderPaymentStep = () => {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-medium text-green-700">Order Successfully Placed!</h3>
          </div>
          <p className="mt-2 text-green-700">
            Your order #{orderId} has been placed successfully. Please complete the payment to
            process your order.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <CreditCard className="text-rose-600" />
            <h2 className="text-xl font-semibold">How to Pay</h2>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <p className="text-neutral-700">
                We only accept UPI payments. Please scan the QR code below and send us the payment
                receipt on WhatsApp. Alternatively, wait for us to reach out to you for payment
                confirmation.
              </p>

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="h-64 w-64 overflow-hidden rounded-lg border-2 border-neutral-200 bg-white p-4">
                  <Image
                    src="/images/upi-qr-code.png"
                    alt="UPI QR Code"
                    width={240}
                    height={240}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-center font-medium">
                  UPI ID: <span className="font-bold text-rose-700">giftshop@upi</span>
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={openWhatsApp}>
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

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/account/orders')}
                >
                  View My Orders
                </Button>
              </div>

              <div className="rounded-lg border border-rose-100 bg-rose-50 p-4 text-sm">
                <p className="font-medium text-rose-700">
                  Note: Your order will be processed once payment is confirmed.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  // Render based on current step
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 1 ? 'bg-rose-700 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              <MapPin className="h-5 w-5" />
            </div>
            <div
              className={`h-1 w-16 ${currentStep >= 2 ? 'bg-rose-700' : 'bg-neutral-200'}`}
            ></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 2 ? 'bg-rose-700 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              <CreditCard className="h-5 w-5" />
            </div>
            <div
              className={`h-1 w-16 ${currentStep >= 3 ? 'bg-rose-700' : 'bg-neutral-200'}`}
            ></div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= 3 ? 'bg-rose-700 text-white' : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              <Truck className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="flex justify-center text-sm md:space-x-16">
          <span
            className={`text-center ${
              currentStep >= 1 ? 'font-medium text-rose-700' : 'text-neutral-500'
            }`}
          >
            Shipping
          </span>
          <span
            className={`text-center ${
              currentStep >= 2 ? 'font-medium text-rose-700' : 'text-neutral-500'
            }`}
          >
            Payment
          </span>
          <span
            className={`text-center ${
              currentStep >= 3 ? 'font-medium text-rose-700' : 'text-neutral-500'
            }`}
          >
            Complete
          </span>
        </div>
      </div>

      <div>
        {currentStep === 1 && renderShippingStep()}
        {currentStep === 2 && renderPaymentStep()}
      </div>
    </main>
  );
}
