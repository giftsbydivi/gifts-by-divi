'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Form schema
const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' })
    .regex(/^[A-Za-z\s.'-]{2,50}$/, { message: 'Please enter a valid name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterStepProps {
  onSubmit: (data: RegisterFormValues) => void;
  isPending: boolean;
  errorMessage?: string;
}

export function RegisterStep({ onSubmit, isPending, errorMessage }: RegisterStepProps) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  return (
    <motion.div
      key="register-form"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} maxLength={50} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                    maxLength={100}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && (
            <div className="flex items-center gap-2 text-xs text-red-500">
              <AlertCircle className="h-3 w-3" />
              <span>{errorMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-rose-700 text-white hover:bg-rose-800"
            disabled={isPending}
          >
            {isPending ? 'Creating Account...' : 'Complete Registration'}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
