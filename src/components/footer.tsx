'use client';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-rose-50/50">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <FadeInWhenVisible>
          {/* Logo and name */}
          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-2xl font-medium text-neutral-900">Everyday Gift</h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-rose-200"></div>
          </div>

          {/* Contact details */}
          <div className="mx-auto mb-10 grid max-w-3xl gap-8 text-center md:grid-cols-3 md:gap-4 md:text-left">
            {/* Address */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="mt-3 font-medium text-neutral-900">Our Address</h3>
              <p className="mt-1 text-sm text-neutral-600">
                4/58, Shramik Colony, Rau, Indore,
                <br />
                Madhya Pradesh 453331
              </p>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </div>
              <h3 className="mt-3 font-medium text-neutral-900">Instagram</h3>
              <a
                href="https://www.instagram.com/everydaygiftbydivi.indore"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-neutral-600 transition-colors hover:text-rose-600"
              >
                @everydaygiftbydivi.indore
              </a>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="mt-3 font-medium text-neutral-900">Contact Us</h3>
              <a
                href="https://www.instagram.com/everydaygiftbydivi.indore"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-neutral-600 transition-colors hover:text-rose-600"
              >
                Message on Instagram
              </a>
            </div>
          </div>

          {/* Message and copyright */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 rounded-full bg-rose-50 px-6 py-2.5 shadow-sm">
              <p className="text-sm font-medium text-rose-800">
                Handcrafted with love in Indore 💝
              </p>
            </div>
            <div className="h-px w-24 bg-neutral-200"></div>
            <p className="mt-6 text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} Everyday Gift. All rights reserved.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </footer>
  );
}
