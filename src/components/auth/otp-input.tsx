'use client';

import { useRef, useEffect, KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, length = 6, disabled = false }: OtpInputProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Initialize the array of refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Auto-focus to the first empty input on mount or when value changes
  useEffect(() => {
    // Only auto-focus on mount, not on every value change
    if (value === '' && !disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const currentValue = e.target.value;

    // Only accept numbers
    if (!/^\d*$/.test(currentValue)) {
      return;
    }

    // Handle input of a single digit
    if (currentValue.length <= 1) {
      const newValue = value.split('');
      newValue[index] = currentValue;
      onChange(newValue.join(''));

      // Move to next input if a digit was entered and current input is filled
      // but only if we're not at the last input
      if (currentValue && index < length - 1) {
        // Use setTimeout to ensure the focus happens after the state update
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }
    }
    // Handle pasting multiple digits
    else if (currentValue.length > 1) {
      const newValue = value.split('');

      // Only use the first digit for the current input
      newValue[index] = currentValue[0];

      // Try to fill subsequent inputs with remaining digits
      for (let i = 1; i < currentValue.length && index + i < length; i++) {
        newValue[index + i] = currentValue[i];
      }

      onChange(newValue.join(''));

      // Focus the next empty input or last input, but don't cycle back
      const nextEmptyIndex = newValue.findIndex((v, i) => !v && i > index && i < length);

      setTimeout(() => {
        if (nextEmptyIndex !== -1) {
          inputRefs.current[nextEmptyIndex]?.focus();
        } else if (index + currentValue.length < length) {
          // Only focus on the last input if we haven't filled all inputs
          inputRefs.current[Math.min(index + currentValue.length, length - 1)]?.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (index > 0 && !value[index]) {
        // If current input is empty and Backspace is pressed,
        // move focus to the previous input and clear it
        const newValue = value.split('');
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 0);
      } else if (value[index]) {
        // If current input has a value, clear it
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move focus to the previous input on left arrow
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      // Move focus to the next input on right arrow
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();

    // Get the pasted text and filter out non-numeric characters
    const pastedData = e.clipboardData.getData('text').replace(/[^\d]/g, '').slice(0, length);

    if (!pastedData) return;

    // Create a new OTP with pasted data
    const newValue = value.split('');
    for (let i = 0; i < pastedData.length; i++) {
      if (index + i < length) {
        newValue[index + i] = pastedData[i];
      }
    }

    onChange(newValue.join(''));

    // If we pasted enough digits to complete or nearly complete the OTP,
    // always focus the last input box
    if (pastedData.length >= length - index || newValue.join('').length === length) {
      setTimeout(() => {
        inputRefs.current[length - 1]?.focus();
      }, 0);
    } else {
      // Otherwise, focus the next empty input
      const nextEmptyIndex = newValue.findIndex((v, i) => !v && i > index && i < length);

      setTimeout(() => {
        if (nextEmptyIndex !== -1) {
          inputRefs.current[nextEmptyIndex]?.focus();
        } else {
          // If no empty input, focus the last input we filled
          const focusIndex = Math.min(index + pastedData.length, length - 1);
          inputRefs.current[focusIndex]?.focus();
        }
      }, 0);
    }
  };

  return (
    <div className="flex w-full justify-between space-x-1 md:space-x-2">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            if (el) inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={(e) => handlePaste(e, i)}
          disabled={disabled}
          className="border-input bg-background flex h-10 w-10 items-center justify-center rounded-md border p-0 text-center text-lg focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
