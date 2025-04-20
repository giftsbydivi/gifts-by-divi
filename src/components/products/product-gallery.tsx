'use client';

import { useState, useEffect, useRef } from 'react';

import Image from 'next/image';

import { MediaItem } from '@/lib/services/api';

interface ProductGalleryProps {
  media: MediaItem[];
}

export function ProductGallery({ media }: ProductGalleryProps) {
  // Sort media to ensure Instagram videos come last
  const sortedMedia = [...media].sort((a, b) => {
    if (a.type === 'instagram' && b.type !== 'instagram') return 1;
    if (a.type !== 'instagram' && b.type === 'instagram') return -1;
    return 0;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start auto-rotation when component mounts
  useEffect(() => {
    if (sortedMedia.length > 1) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((current) => (current + 1) % sortedMedia.length);
      }, 7000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sortedMedia.length]);

  // Reset auto-rotation when active index changes
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (sortedMedia.length > 1) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((current) => (current + 1) % sortedMedia.length);
      }, 7000);
    }

    // Play video when it's active
    if (sortedMedia[activeIndex]?.type === 'video' && videoRef.current) {
      videoRef.current.play().catch((error) => console.error('Error playing video:', error));
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex, sortedMedia]);

  // Function to render the appropriate media based on type
  const renderMedia = (item: MediaItem) => {
    if (!item)
      return (
        <div className="flex h-full items-center justify-center">
          <p className="text-neutral-400">No media available</p>
        </div>
      );

    switch (item.type) {
      case 'image':
        return <Image src={item.url} alt="Product" fill className="object-cover" priority />;
      case 'video':
        return (
          <video
            ref={videoRef}
            src={item.url}
            controls
            className="h-full w-full object-cover"
            poster={item.thumbnail}
          />
        );
      case 'instagram':
        return (
          <div className="relative h-full w-full overflow-hidden">
            <iframe
              src={item.embedUrl || `${item.url}/embed?autoplay=1&mute=1`}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              title="Instagram content"
              allow="autoplay; encrypted-media"
            />
          </div>
        );
      default:
        return (
          <div className="flex h-full items-center justify-center">
            <p className="text-neutral-400">Unsupported media type</p>
          </div>
        );
    }
  };

  // Don't render thumbnails if there's only one item
  if (sortedMedia.length <= 1) {
    const item = sortedMedia[0];
    return (
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-neutral-100 sm:h-[400px]">
        {renderMedia(item)}
      </div>
    );
  }

  // Responsive layout: vertical on mobile, horizontal on desktop
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-[80px_1fr]">
      {/* Main display - full width on top for mobile, right side for desktop */}
      <div className="relative order-1 h-[300px] w-full overflow-hidden rounded-xl bg-neutral-100 md:order-2 md:h-[400px]">
        {renderMedia(sortedMedia[activeIndex])}
      </div>

      {/* Thumbnails - horizontal scroll on mobile, vertical on desktop */}
      <div className="order-2 flex overflow-x-auto md:order-1 md:max-h-[400px] md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pr-2">
        <div className="flex gap-2 md:flex-col">
          {sortedMedia.map((item, index) => (
            <div
              key={index}
              className={`relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 ${
                index === activeIndex ? 'border-rose-700' : 'border-transparent'
              }`}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : item.type === 'instagram' ? (
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center bg-pink-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="h-8 w-8"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={item.thumbnail || ''}
                    alt={`Video thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
