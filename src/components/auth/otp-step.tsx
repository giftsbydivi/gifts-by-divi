'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { OtpInput } from '@/components/auth/otp-input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Form schema
const otpSchema = z.object({
  otp: z.string().regex(/^[0-9]{6}$/, { message: 'Please enter a valid 6-digit OTP' }),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

interface OtpStepProps {
  onSubmit: () => void;
  onChangePhone: () => void;
  onResendOtp: () => void;
  phoneNumber: string;
  isPending: boolean;
  canResend: boolean;
  resendTimer: number;
  onOtpChange: (value: string) => void;
}

export function OtpStep({
  onSubmit,
  onChangePhone,
  onResendOtp,
  phoneNumber,
  isPending,
  canResend,
  resendTimer,
  onOtpChange,
}: OtpStepProps) {
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Clear form errors when component mounts
  useEffect(() => {
    return () => {
      form.clearErrors();
    };
  }, [form]);

  const handleOtpChange = (value: string) => {
    form.setValue('otp', value);
    onOtpChange(value);
  };

  return (
    <motion.div
      key="otp-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <OtpInput value={field.value} onChange={handleOtpChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-neutral-500">
                  OTP sent to {phoneNumber}.
                  <button
                    type="button"
                    className="ml-1 cursor-pointer text-rose-700 hover:text-rose-800"
                    onClick={onChangePhone}
                  >
                    Change?
                  </button>
                </p>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-rose-700 text-white hover:bg-rose-800"
            disabled={isPending || !form.formState.isValid}
          >
            {isPending ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                className="cursor-pointer text-xs text-rose-700 hover:text-rose-800"
                onClick={onResendOtp}
                disabled={isPending}
              >
                Didn&apos;t receive the code? Resend
              </button>
            ) : (
              <p className="text-muted-foreground text-xs">
                Resend OTP in <span className="font-medium">{resendTimer}s</span>
              </p>
            )}
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
