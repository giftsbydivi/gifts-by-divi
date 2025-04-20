'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

import { MediaItem } from '@/lib/services/api';

interface ProductGalleryProps {
  media: MediaItem[];
}

export function ProductGallery({ media }: ProductGalleryProps) {
  // Handle case when media is undefined or null
  const validMedia = media || [];

  // Sort media to ensure Instagram videos come last
  const sortedMedia = [...validMedia].sort((a, b) => {
    if (a.type === 'instagram' && b.type !== 'instagram') return 1;
    if (a.type !== 'instagram' && b.type === 'instagram') return -1;
    return 0;
  });

  // Filter for images only (for fullscreen carousel)
  const imageOnlyMedia = sortedMedia.filter((item) => item.type === 'image');

  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for fullscreen viewer
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  // Navigate through images in fullscreen
  const navigateFullscreen = useCallback(
    (direction: 'next' | 'prev') => {
      if (imageOnlyMedia.length <= 1) return;

      setFullscreenIndex((prev) => {
        if (direction === 'next') {
          return (prev + 1) % imageOnlyMedia.length;
        } else {
          return (prev - 1 + imageOnlyMedia.length) % imageOnlyMedia.length;
        }
      });
    },
    [imageOnlyMedia]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigateFullscreen('prev');
          break;
        case 'ArrowRight':
          navigateFullscreen('next');
          break;
        case 'Escape':
          closeFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, fullscreenIndex, navigateFullscreen]);

  // Open fullscreen viewer
  const openFullscreen = (originalIndex: number) => {
    // Find the corresponding index in the images-only array
    const item = sortedMedia[originalIndex];
    if (item.type !== 'image') return;

    const imageIndex = imageOnlyMedia.findIndex((img) => img.url === item.url);
    if (imageIndex !== -1) {
      setFullscreenIndex(imageIndex);
      setIsFullscreen(true);
    }
  };

  // Close fullscreen viewer
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Function to render the appropriate media based on type
  const renderMedia = (item: MediaItem, isInFullscreen = false) => {
    if (!item)
      return (
        <div className="flex h-full items-center justify-center">
          <p className="text-neutral-400">No media available</p>
        </div>
      );

    switch (item.type) {
      case 'image':
        return (
          <div className="relative h-full w-full">
            <Image
              src={item.url}
              alt="Product"
              fill
              className={`${isInFullscreen ? 'rounded-lg object-contain shadow-lg' : 'object-cover'}`}
              priority
            />
            {!isInFullscreen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openFullscreen(sortedMedia.indexOf(item));
                }}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-lg transition-all hover:scale-110 hover:bg-white"
                aria-label="View fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            )}
          </div>
        );
      case 'video':
        return (
          <div className="relative h-full w-full">
            <video
              ref={videoRef}
              src={item.url}
              controls
              className="h-full w-full object-cover"
              poster={item.thumbnail}
            />
          </div>
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
      <>
        <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-neutral-100 sm:h-[400px]">
          {renderMedia(item)}
        </div>

        {/* Fullscreen Modal */}
        <FullscreenViewer
          isOpen={isFullscreen}
          onClose={closeFullscreen}
          media={imageOnlyMedia}
          currentIndex={fullscreenIndex}
          onNavigate={navigateFullscreen}
          renderMedia={renderMedia}
        />
      </>
    );
  }

  // Responsive layout: vertical on mobile, horizontal on desktop
  return (
    <>
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
                  // Play video automatically when selected
                  if (item.type === 'video' && videoRef.current && index === activeIndex) {
                    videoRef.current
                      .play()
                      .catch((error) => console.error('Error playing video:', error));
                  }
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

      {/* Fullscreen Modal */}
      <FullscreenViewer
        isOpen={isFullscreen}
        onClose={closeFullscreen}
        media={imageOnlyMedia}
        currentIndex={fullscreenIndex}
        onNavigate={navigateFullscreen}
        renderMedia={renderMedia}
      />
    </>
  );
}

// Fullscreen Viewer Component
interface FullscreenViewerProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem[];
  currentIndex: number;
  onNavigate: (direction: 'next' | 'prev') => void;
  renderMedia: (item: MediaItem, isInFullscreen?: boolean) => React.ReactNode;
}

function FullscreenViewer({
  isOpen,
  onClose,
  media,
  currentIndex,
  onNavigate,
  renderMedia,
}: FullscreenViewerProps) {
  // Early return after hooks
  if (!media.length) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={onClose} // Clicking anywhere on the backdrop closes the modal
        >
          <motion.div
            className="relative max-h-[90vh] max-w-[90vw]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking this container
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-10 rounded-full bg-white p-2 text-black shadow-md transition-transform hover:scale-110"
              aria-label="Close fullscreen view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative h-[80vh] w-[80vw] max-w-5xl overflow-hidden rounded-lg">
              {/* Create a wrapping container for the image with AnimatePresence for smooth transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  {renderMedia(media[currentIndex], true)}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('prev');
                  }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/80 p-3 text-neutral-800 shadow-md transition hover:scale-110 hover:bg-white"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('next');
                  }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/80 p-3 text-neutral-800 shadow-md transition hover:scale-110 hover:bg-white"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}

            {/* Image indicator pills instead of counter */}
            {media.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-1.5">
                {media.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(index > currentIndex ? 'next' : 'prev');
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentIndex ? 'w-6 bg-white' : 'w-3 bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
