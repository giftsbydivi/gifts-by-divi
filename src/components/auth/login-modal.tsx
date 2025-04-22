'use client';

import { useState, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

import { User } from '@/lib/stores/auth-store';

import { OtpInput } from '@/components/auth/otp-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Step = 'phone' | 'otp' | 'register';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reset form state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('phone');
        setPhone('');
        setPhoneError('');
        setOtp('');
        setOtpError('');
        setName('');
        setNameError('');
        setEmail('');
        setEmailError('');
      }, 300);
    }
  }, [isOpen]);

  // Validate phone number - must be 10 digits only
  const validatePhone = (): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  // Validate OTP - must be 6 digits only
  const validateOtp = (): boolean => {
    const otpRegex = /^[0-9]{6}$/;
    if (!otpRegex.test(otp)) {
      setOtpError('Please enter a valid 6-digit OTP');
      return false;
    }
    setOtpError('');
    return true;
  };

  // Validate name - 2 to 50 characters, letters, spaces and basic punctuation
  const validateName = (): boolean => {
    const nameRegex = /^[A-Za-z\s.'-]{2,50}$/;
    if (!nameRegex.test(name)) {
      setNameError('Please enter a valid name (2-50 characters)');
      return false;
    }
    setNameError('');
    return true;
  };

  // Validate email
  const validateEmail = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone()) return;

    setIsLoading(true);

    // In a real implementation, this is where you would call your API to send an OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateOtp()) return;

    setIsLoading(true);

    // In a real implementation, this is where you would verify the OTP
    // For demo purposes, we're simulating a new user flow
    setTimeout(() => {
      setIsLoading(false);

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
          phone: phone,
        });
        onClose();
      }
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all registration fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isEmailValid) return;

    setIsLoading(true);

    // In a real implementation, this is where you would save the user's info
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        id: '123',
        name,
        email,
        phone,
        isNewUser: true,
      });
      onClose();
    }, 1000);
  };

  // Handle input changes with real-time validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(value);
    if (phoneError && value.length === 10) {
      validatePhone();
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
                  <motion.div
                    key="phone-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <form onSubmit={handlePhoneSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your 10-digit phone number"
                          value={phone}
                          onChange={handlePhoneChange}
                          required
                          className={phoneError ? 'border-red-500' : ''}
                        />
                        {phoneError && (
                          <div className="flex items-center gap-2 text-xs text-red-500">
                            <AlertCircle className="h-3 w-3" />
                            <span>{phoneError}</span>
                          </div>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-rose-700 text-white hover:bg-rose-800"
                        disabled={isLoading || phone.length !== 10}
                      >
                        {isLoading ? 'Sending OTP...' : 'Continue'}
                      </Button>
                    </form>
                  </motion.div>
                )}

                {step === 'otp' && (
                  <motion.div
                    key="otp-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <form onSubmit={handleOtpSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp">Verification Code</Label>
                        <OtpInput
                          value={otp}
                          onChange={(value) => {
                            setOtp(value);
                            if (otpError && value.length === 6) {
                              validateOtp();
                            }
                          }}
                          disabled={isLoading}
                        />
                        {otpError && (
                          <div className="flex items-center gap-2 text-xs text-red-500">
                            <AlertCircle className="h-3 w-3" />
                            <span>{otpError}</span>
                          </div>
                        )}
                        <p className="text-xs text-neutral-500">
                          OTP sent to {phone}.
                          <button
                            type="button"
                            className="ml-1 text-rose-700 hover:text-rose-800"
                            onClick={() => setStep('phone')}
                          >
                            Change?
                          </button>
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-rose-700 text-white hover:bg-rose-800"
                        disabled={isLoading || otp.length !== 6}
                      >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                      </Button>

                      <div className="text-center">
                        <button
                          type="button"
                          className="text-xs text-rose-700 hover:text-rose-800"
                          onClick={() => {
                            // In a real implementation, this would trigger a new OTP send
                            alert('New OTP would be sent in a real implementation');
                          }}
                        >
                          Didn&apos;t receive the code? Resend
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 'register' && (
                  <motion.div
                    key="register-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (nameError) validateName();
                          }}
                          maxLength={50}
                          required
                          className={nameError ? 'border-red-500' : ''}
                        />
                        {nameError && (
                          <div className="flex items-center gap-2 text-xs text-red-500">
                            <AlertCircle className="h-3 w-3" />
                            <span>{nameError}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) validateEmail();
                          }}
                          maxLength={100}
                          required
                          className={emailError ? 'border-red-500' : ''}
                        />
                        {emailError && (
                          <div className="flex items-center gap-2 text-xs text-red-500">
                            <AlertCircle className="h-3 w-3" />
                            <span>{emailError}</span>
                          </div>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-rose-700 text-white hover:bg-rose-800"
                        disabled={isLoading || !name || !email}
                      >
                        {isLoading ? 'Creating Account...' : 'Complete Registration'}
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
