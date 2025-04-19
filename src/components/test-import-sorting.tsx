'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import
// This file is just to demonstrate import sorting
// The actual import order will be fixed when you run the format command

export default function TestComponent() {
  useEffect(() => {
    // This is just a placeholder to test import sorting
    console.log('Component mounted');
  }, []);

  return (
    <div>
      <h1>Test Import Sorting</h1>
      <p>When you run the formatter, imports will be sorted automatically</p>
      <Image src="/placeholder.jpg" alt="Placeholder" width={300} height={200} />
    </div>
  );
}
