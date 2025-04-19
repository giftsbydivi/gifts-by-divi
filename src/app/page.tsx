import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-4 text-center text-4xl font-medium md:text-5xl">Everyday Gift</h1>
      <p className="mb-2 max-w-md text-center text-lg text-neutral-500">by Divi</p>
      <p className="mb-8 max-w-md text-center text-lg text-neutral-600">
        Luxury gifts for life&apos;s everyday moments
      </p>
      <Link href="/products">
        <Button className="px-8 py-6 text-lg">Explore our Collection</Button>
      </Link>
    </main>
  );
}
