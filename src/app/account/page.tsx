'use client';

import { useState } from 'react';

import Link from 'next/link';

import { User, Package, LogOut } from 'lucide-react';

import EditAddressForm from '@/components/account/edit-address-form';
import type { AddressFormValues } from '@/components/account/edit-address-form';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState<AddressFormValues>({
    name: 'John Doe',
    mobileNumber: '9876543210',
    address: '123 Main Street\nApartment 4B',
    pinCode: '400001',
    state: 'Maharashtra',
    city: 'Mumbai',
    landmark: '',
    phoneNumber: '9876543210',
    alternatePhone: '',
  });

  const handleSaveAddress = (newAddress: AddressFormValues) => {
    setAddress(newAddress);
    // In a real app, you would save this to your backend
    console.log('Address saved:', newAddress);
  };

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
                className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-4 py-3 font-medium text-rose-700"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>

              <Link
                href="/account/orders"
                className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 text-neutral-700 hover:bg-neutral-50 hover:text-rose-700"
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
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Name</h3>
                <p className="mt-1 text-neutral-900">{address.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-500">Email</h3>
                <p className="mt-1 text-neutral-900">john.doe@example.com</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-500">Phone</h3>
                <p className="mt-1 text-neutral-900">+91 {address.phoneNumber}</p>
              </div>
            </div>

            {/* <button className="mt-6 rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:bg-rose-800">
              Edit Profile
            </button> */}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Default Address</h2>

            <div>
              <p className="font-medium">{address.name}</p>
              <p className="mt-1 text-neutral-700">
                {address.address.split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <p className="text-neutral-700">
                {address.city}, {address.state} {address.pinCode}
              </p>
              <p className="text-neutral-700">India</p>
              {address.landmark && <p className="text-neutral-700">Landmark: {address.landmark}</p>}
              <p className="mt-1 text-neutral-700">Phone: +91 {address.phoneNumber}</p>
              {address.alternatePhone && (
                <p className="text-neutral-700">Alt Phone: +91 {address.alternatePhone}</p>
              )}
            </div>

            <Button
              className="mt-6 bg-rose-700 text-white hover:bg-rose-800"
              onClick={() => setShowAddressForm(true)}
            >
              Edit Address
            </Button>
          </div>
        </div>
      </div>

      {showAddressForm && (
        <EditAddressForm
          onClose={() => setShowAddressForm(false)}
          onSave={handleSaveAddress}
          defaultValues={address}
        />
      )}
    </main>
  );
}
