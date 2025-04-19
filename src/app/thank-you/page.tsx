'use client';

import Link from 'next/link';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <section className="flex flex-1 items-center justify-center py-16">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 md:px-8">
          <FadeInWhenVisible>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-rose-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="font-playfair text-4xl font-medium text-neutral-900 md:text-5xl">
                Thank You!
              </h1>
              <p className="mt-6 text-lg text-neutral-700">
                We&apos;ve received your message and will get back to you as soon as possible.
              </p>
              <div className="mt-10">
                <Link href="/">
                  <Button className="bg-rose-700 px-6 py-2 text-white hover:bg-rose-800">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </main>
  );
}
