'use client';

import { useState, useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Define validation schema using zod
const addressSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'Mobile number must be at least 10 digits' })
    .max(10, { message: 'Mobile number must not exceed 10 digits' })
    .regex(/^\d+$/, { message: 'Mobile number must contain only digits' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters long' }),
  pinCode: z
    .string()
    .length(6, { message: 'PIN code must be exactly 6 digits' })
    .regex(/^\d+$/, { message: 'PIN code must contain only digits' }),
  state: z.string().min(2, { message: 'Please select a state' }),
  city: z.string().min(2, { message: 'City is required' }),
  landmark: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(10, { message: 'Phone number must not exceed 10 digits' })
    .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
  alternatePhone: z
    .string()
    .regex(/^\d*$/, { message: 'Alternate phone must contain only digits' })
    .optional(),
});

// Define type based on the schema
export type AddressFormValues = z.infer<typeof addressSchema>;

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

interface EditAddressFormProps {
  onClose: () => void;
  onSave: (data: AddressFormValues) => void;
  defaultValues?: Partial<AddressFormValues>;
}

export default function EditAddressForm({ onClose, onSave, defaultValues }: EditAddressFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Handle click outside to close modal
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Initialize react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || {
      name: '',
      mobileNumber: '',
      address: '',
      pinCode: '',
      state: '',
      city: '',
      landmark: '',
      phoneNumber: '',
      alternatePhone: '',
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send data to your API
      // For now we'll just simulate a delay and call onSave
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSave(data);
      onClose();
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div ref={modalRef} className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Shipping Address</h2>
          <Button
            type="button"
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-700">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <Input
                id="name"
                type="text"
                {...register('name')}
                className="border-neutral-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label
                htmlFor="mobileNumber"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="mobileNumber"
                type="tel"
                {...register('mobileNumber')}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                placeholder="10-digit mobile number"
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-xs text-rose-500">{errors.mobileNumber.message}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium text-neutral-700">
              Address <span className="text-rose-500">*</span>
            </label>
            <Textarea
              id="address"
              {...register('address')}
              rows={3}
              className="border-neutral-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              placeholder="Enter your full address"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-rose-500">{errors.address.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* PIN Code */}
            <div>
              <label htmlFor="pinCode" className="mb-1 block text-sm font-medium text-neutral-700">
                PIN Code <span className="text-rose-500">*</span>
              </label>
              <input
                id="pinCode"
                type="text"
                {...register('pinCode')}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                placeholder="6-digit PIN code"
              />
              {errors.pinCode && (
                <p className="mt-1 text-xs text-rose-500">{errors.pinCode.message}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="mb-1 block text-sm font-medium text-neutral-700">
                State <span className="text-rose-500">*</span>
              </label>
              <select
                id="state"
                {...register('state')}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <p className="mt-1 text-xs text-rose-500">{errors.state.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* City */}
            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium text-neutral-700">
                City <span className="text-rose-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                {...register('city')}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                placeholder="Enter your city"
              />
              {errors.city && <p className="mt-1 text-xs text-rose-500">{errors.city.message}</p>}
            </div>

            {/* Landmark */}
            <div>
              <label htmlFor="landmark" className="mb-1 block text-sm font-medium text-neutral-700">
                Landmark
              </label>
              <input
                id="landmark"
                type="text"
                {...register('landmark')}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                placeholder="Optional - Nearby landmark"
              />
              {errors.landmark && (
                <p className="mt-1 text-xs text-rose-500">{errors.landmark.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="phoneNumber"
                type="tel"
                {...register('phoneNumber')}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                placeholder="10-digit phone number"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-rose-500">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Alternate Phone */}
            <div>
              <label
                htmlFor="alternatePhone"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Alternate Phone (Optional)
              </label>
              <input
                id="alternatePhone"
                type="tel"
                {...register('alternatePhone')}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                placeholder="Optional - Alternate number"
              />
              {errors.alternatePhone && (
                <p className="mt-1 text-xs text-rose-500">{errors.alternatePhone.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-rose-700 text-white hover:bg-rose-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Address'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
