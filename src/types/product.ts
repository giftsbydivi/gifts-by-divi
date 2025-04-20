// Define Product interface for use throughout the application
export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string | Array<Record<string, unknown>>; // Can be string or Portable Text blocks
  price: number;
  compareAtPrice?: number;
  images: {
    url: string;
    type?: string;
    thumbnail?: string;
    alt?: string;
  }[];
  categories: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
  }[];
  featured: boolean;
  inStock: boolean;
  tags?: string[];
}
