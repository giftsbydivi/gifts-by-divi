/* eslint-disable @typescript-eslint/no-explicit-any */
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { groq } from 'next-sanity';

import { client, urlForImage } from '../../../sanity/lib/client';

export interface MediaItem {
  url: string;
  type: 'image' | 'video' | 'instagram';
  thumbnail?: string;
  embedUrl?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: SanityImageSource;
  imageUrl?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: any;
  price: number;
  compareAtPrice?: number;
  images: MediaItem[];
  categories: Category[];
  featured: boolean;
  inStock: boolean;
  tags?: string[];
}

interface SanityImageData {
  url: string;
  type: string;
  thumbnail?: string;
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const categories = await client.fetch(
    groq`*[_type == "category"] {
      _id,
      name,
      "slug": slug.current,
      description,
      image
    }`
  );

  return categories.map((category: Record<string, unknown>) => ({
    ...category,
    slug: { current: category.slug },
    imageUrl: category.image ? urlForImage(category.image).url() : null,
  }));
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = await client.fetch(
    groq`*[_type == "category" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      description,
      image
    }`,
    { slug }
  );

  if (!category) return null;

  return {
    ...category,
    slug: { current: category.slug },
    imageUrl: category.image ? urlForImage(category.image).url() : null,
  };
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const products = await client.fetch(
    groq`*[_type == "product"] {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      compareAtPrice,
      "images": images[] {
        "url": url.asset->url,
        "type": type,
        "thumbnail": url.asset->url
      },
      "categories": categories[]->{ _id, name, "slug": slug.current },
      featured,
      inStock,
      tags
    }`
  );

  return products.map((product: Record<string, any>) => ({
    ...product,
    slug: { current: product.slug },
    images: mapMediaItems(product.images || []),
  }));
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      compareAtPrice,
      "images": images[] {
        "url": url.asset->url,
        "type": type,
        "thumbnail": url.asset->url
      },
      "categories": categories[]->{ _id, name, "slug": slug.current },
      featured,
      inStock,
      tags
    }`,
    { slug }
  );

  if (!product) return null;

  return {
    ...product,
    slug: { current: product.slug },
    images: mapMediaItems(product.images || []),
  };
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await client.fetch(
    groq`*[_type == "product" && featured == true] {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      compareAtPrice,
      "images": images[] {
        "url": url.asset->url,
        "type": type,
        "thumbnail": url.asset->url
      },
      "categories": categories[]->{ _id, name, "slug": slug.current },
      featured,
      inStock,
      tags
    }`
  );

  return products.map((product: Record<string, any>) => ({
    ...product,
    slug: { current: product.slug },
    images: mapMediaItems(product.images || []),
  }));
}

// Get products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await client.fetch(
    groq`*[_type == "product" && $categorySlug in categories[]->slug.current] {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      compareAtPrice,
      "images": images[] {
        "url": url.asset->url,
        "type": type,
        "thumbnail": url.asset->url
      },
      "categories": categories[]->{ _id, name, "slug": slug.current },
      featured,
      inStock,
      tags
    }`,
    { categorySlug }
  );

  return products.map((product: Record<string, any>) => ({
    ...product,
    slug: { current: product.slug },
    images: mapMediaItems(product.images || []),
  }));
}

// Helper function to map media items from Sanity format
function mapMediaItems(items: SanityImageData[]): MediaItem[] {
  if (!items || !Array.isArray(items)) return [];

  return items.map((item) => {
    const mediaItem: MediaItem = {
      url: item.url,
      type: (item.type || 'image') as MediaItem['type'],
    };

    if (item.thumbnail) {
      mediaItem.thumbnail = item.thumbnail;
    }

    return mediaItem;
  });
}

export const api = {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
  getProduct: getProductBySlug,
};
