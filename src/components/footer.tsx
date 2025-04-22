'use client';

import { usePathname } from 'next/navigation';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function SiteFooter() {
  //dont show this for studio route
  const router = usePathname();
  if (router.includes('/studio')) {
    return null;
  }

  return (
    <footer className="w-full border-t border-neutral-200 bg-rose-50/50">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <FadeInWhenVisible>
          {/* Logo and name */}
          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-2xl font-medium text-neutral-900">Gifts by Divi</h2>
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
                href="https://wa.me/919926860660"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1 text-sm text-neutral-600 transition-colors hover:text-rose-600"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
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
              &copy; {new Date().getFullYear()} Gifts by Divi. All rights reserved.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </footer>
  );
}
