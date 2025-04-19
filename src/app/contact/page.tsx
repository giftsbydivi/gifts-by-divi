'use client';

import { useState } from 'react';

import { FadeInWhenVisible } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/c80e81f71ea3ae4aad4866472ec0c406 ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          _captcha: false,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          message: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-rose-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-playfair text-4xl font-medium text-neutral-900 md:text-5xl">
                Get in Touch
              </h1>
              <p className="mt-6 text-lg text-neutral-700">
                We&apos;d love to hear from you. Whether it&apos;s a question, feedback, or a custom
                order – just drop us a message.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Form */}
            <FadeInWhenVisible delay={0.1}>
              {isSubmitted ? (
                <div className="rounded-lg bg-green-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-medium text-green-900">Thank You!</h3>
                  <p className="text-green-700">
                    We&apos;ve received your message and will get back to you within 1-2 business
                    days.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                  {error && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>
                  )}

                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 font-medium text-neutral-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-neutral-300 p-3 text-neutral-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-1 font-medium text-neutral-900">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-neutral-300 p-3 text-neutral-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="message" className="mb-1 font-medium text-neutral-900">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="w-full rounded-md border border-neutral-300 p-3 text-neutral-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="self-start bg-rose-700 px-6 py-2 text-white hover:bg-rose-800 disabled:bg-rose-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </FadeInWhenVisible>

            {/* Contact Information */}
            <FadeInWhenVisible delay={0.3}>
              <div className="flex h-full flex-col justify-start space-y-8 md:justify-center">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">Our Address</h3>
                  <p className="mt-2 text-neutral-700">
                    4/58, Shramik Colony,
                    <br />
                    Rau, Indore,
                    <br />
                    Madhya Pradesh 453331
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">Contact Info</h3>
                  <div className="mt-2 space-y-2">
                    <p className="flex items-center text-neutral-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5 text-rose-700"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      09926860660
                    </p>
                    <p className="flex items-center text-neutral-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5 text-rose-700"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      contact@everydaygift.com
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">Follow Us</h3>
                  <div className="mt-2 flex space-x-4">
                    <a
                      href="https://www.instagram.com/everydaygiftbydivi.indore?igsh=MWc0eXB4MDk5bmYyMg=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-700 hover:text-rose-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </main>
  );
}
