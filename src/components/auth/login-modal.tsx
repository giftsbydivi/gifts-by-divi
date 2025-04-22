'use client';

import { useState, useEffect, useTransition } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { z } from 'zod';

import { User } from '@/lib/stores/auth-store';

import { OtpStep } from '@/components/auth/otp-step';
import { PhoneStep, PhoneFormValues } from '@/components/auth/phone-step';
import { RegisterStep, RegisterFormValues } from '@/components/auth/register-step';
import { Button } from '@/components/ui/button';

type Step = 'phone' | 'otp' | 'register';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

// Define schemas for validation in auto-submit case
const otpSchema = z.object({
  otp: z.string().regex(/^[0-9]{6}$/, { message: 'Please enter a valid 6-digit OTP' }),
});

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPending, startTransition] = useTransition();
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [registerError, setRegisterError] = useState<string | undefined>();

  // Reset form state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('phone');
        setPhoneNumber('');
        setResendTimer(60);
        setCanResend(false);
        setRegisterError(undefined);
      }, 300);
    }
  }, [isOpen]);

  // Start resend timer when OTP step is activated
  useEffect(() => {
    if (step === 'otp') {
      startResendTimer();
    }
  }, [step]);

  // Function to start the resend timer
  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(60);

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup the timer
    return () => clearInterval(timer);
  };

  if (!isOpen) return null;

  // Handle phone step submission
  const handlePhoneSubmit = (data: PhoneFormValues) => {
    startTransition(async () => {
      try {
        // In a real implementation, this is where you would call your API to send an OTP
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPhoneNumber(data.phone);
        setStep('otp');
      } catch {
        // Error handling is done in the component
      }
    });
  };

  // Handle OTP step submission
  const handleOtpSubmit = () => {
    startTransition(async () => {
      try {
        // In a real implementation, this is where you would verify the OTP
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if user is new (this would be determined by your API)
        const isNewUser = true; // For demo purposes

        if (isNewUser) {
          setStep('register');
        } else {
          // For existing users, we'd typically get their info from the API
          onLogin({
            id: '123',
            name: 'Existing User',
            email: 'user@example.com',
            phone: phoneNumber,
          });
          onClose();
        }
      } catch {
        // Error handling is done in the component
      }
    });
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (!canResend) return;

    startTransition(async () => {
      try {
        // In a real implementation, this would trigger a new OTP send
        await new Promise((resolve) => setTimeout(resolve, 1000));
        startResendTimer();
      } catch {
        // Error handling is done in the component
      }
    });
  };

  // Handle registration step submission
  const handleRegisterSubmit = (data: RegisterFormValues) => {
    startTransition(async () => {
      try {
        // In a real implementation, this is where you would save the user's info
        await new Promise((resolve) => setTimeout(resolve, 1000));

        onLogin({
          id: '123',
          name: data.name,
          email: data.email,
          phone: phoneNumber,
          isNewUser: true,
        });
        onClose();
      } catch {
        setRegisterError('Failed to complete registration. Please try again.');
      }
    });
  };

  // Handle OTP auto-submission
  const handleOtpChange = (value: string) => {
    // Auto-submit when all 6 digits are entered
    if (value.length === 6 && !isPending) {
      const isValid = otpSchema.safeParse({ otp: value }).success;

      if (isValid) {
        // Use setTimeout to ensure the state is updated before submitting
        setTimeout(() => {
          handleOtpSubmit();
        }, 100);
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-md rounded-lg bg-white shadow-lg md:max-w-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex flex-col md:flex-row">
          {/* Left side image */}
          <div className="hidden md:block md:w-1/2">
            <div className="relative h-full w-full">
              <div className="h-full w-full rounded-l-lg bg-rose-100">
                {/* Removed Image component that required a file */}
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-l-lg bg-rose-700/20">
                <div className="p-8 text-center text-rose-900">
                  <h2 className="mb-2 text-2xl font-bold">Welcome Back</h2>
                  <p className="text-sm">Sign in to access your account and manage your orders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side form */}
          <div className="p-6 md:w-1/2 md:p-8">
            <motion.div className="mb-6 text-center md:text-left" animate={{ height: 'auto' }}>
              <motion.h2
                className="mb-1 text-2xl font-bold text-neutral-900"
                key={`title-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {step === 'phone' && 'Sign In'}
                {step === 'otp' && 'Enter OTP'}
                {step === 'register' && 'Complete Your Profile'}
              </motion.h2>
              <motion.p
                className="text-sm text-neutral-500"
                key={`subtitle-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {step === 'phone' && 'Enter your phone number to continue'}
                {step === 'otp' && 'We sent a verification code to your phone'}
                {step === 'register' && 'Please provide your details to complete registration'}
              </motion.p>
            </motion.div>

            <div className="relative min-h-[250px]">
              <AnimatePresence mode="wait">
                {step === 'phone' && (
                  <PhoneStep onSubmit={handlePhoneSubmit} isPending={isPending} />
                )}

                {step === 'otp' && (
                  <OtpStep
                    onSubmit={handleOtpSubmit}
                    onChangePhone={() => setStep('phone')}
                    onResendOtp={handleResendOtp}
                    phoneNumber={phoneNumber}
                    isPending={isPending}
                    canResend={canResend}
                    resendTimer={resendTimer}
                    onOtpChange={handleOtpChange}
                  />
                )}

                {step === 'register' && (
                  <RegisterStep
                    onSubmit={handleRegisterSubmit}
                    isPending={isPending}
                    errorMessage={registerError}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
