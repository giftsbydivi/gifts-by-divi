'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '../../../../sanity/sanity.config';

export default function StudioPage() {
  // Check if the required environment variables are set
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId) {
    return (
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Sanity Studio Configuration Error</h1>
        <p className="mb-4">
          The Sanity Studio is not properly configured. Please check your environment variables.
        </p>
        <ul className="ml-6 list-disc">
          <li className="mb-2">
            Ensure{' '}
            <code className="rounded bg-gray-100 px-2 py-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code> is
            set
          </li>
          <li className="mb-2">
            Ensure <code className="rounded bg-gray-100 px-2 py-1">NEXT_PUBLIC_SANITY_DATASET</code>{' '}
            is set
          </li>
        </ul>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
