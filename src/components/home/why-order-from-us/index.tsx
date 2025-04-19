'use client';

import { motion } from 'framer-motion';

import { FadeInWhenVisible } from '@/components/animations/fade-in';

export function WhyOrderFromUs() {
  return (
    <section className="w-full bg-rose-50/50 py-10">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <h2 className="mb-6 text-center text-2xl font-semibold text-neutral-900 md:text-3xl">
            Why Order From Us
          </h2>
        </FadeInWhenVisible>

        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          {/* Left Column - Bullet Points */}
          <FadeInWhenVisible className="w-full md:w-1/2">
            <ul className="space-y-8">
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">
                    Handmade with love & care
                  </h3>
                  <p className="mt-1 text-neutral-700">
                    Every gift is crafted with attention to detail and genuine care.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">Every gift is unique</h3>
                  <p className="mt-1 text-neutral-700">
                    No two items are exactly the same, ensuring a truly special present.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">
                    Personal touch in every order
                  </h3>
                  <p className="mt-1 text-neutral-700">
                    Custom notes and thoughtful packaging make each delivery special.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.3 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">
                    Perfect for thoughtful surprises
                  </h3>
                  <p className="mt-1 text-neutral-700">
                    Curated gifts that show how much you care about your loved ones.
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.4 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h8.25c1.035 0 1.875-.84 1.875-1.875V15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">Delivered with joy</h3>
                  <p className="mt-1 text-neutral-700">
                    Secure, timely delivery with beautiful presentation upon arrival.
                  </p>
                </div>
              </motion.li>
            </ul>
          </FadeInWhenVisible>

          {/* Right Column - Image */}
          <FadeInWhenVisible className="mt-6 w-full md:mt-0 md:w-1/2" delay={0.2}>
            <div className="aspect-square overflow-hidden rounded-xl bg-neutral-100 md:aspect-[3/2]">
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-neutral-400">Handmade Gifting Image</p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
