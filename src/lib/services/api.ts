// Types
export interface MediaItem {
  type: 'image' | 'video' | 'instagram';
  url: string;
  thumbnail?: string; // For video thumbnails
  embedUrl?: string; // For Instagram embeds
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  media: MediaItem[];
  category: string;
  isFeatured: boolean; // Marks featured products
  isTrending: boolean; // Marks trending products
}

// Mock data - In a real app, this would come from an actual API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Scented Candle Set',
    description: 'Set of 3 premium scented candles with natural soy wax and essential oils.',
    price: 49.99,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1608263153703-caa6b0fd7bc7?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'instagram',
        url: 'https://www.instagram.com/reel/DIYzC08My2Q/',
        embedUrl: 'https://www.instagram.com/reel/DIYzC08My2Q/embed',
        thumbnail:
          'https://images.unsplash.com/photo-1608263153703-caa6b0fd7bc7?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1628428988968-5549dd02dde2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    category: 'Home Decor',
    isFeatured: true,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Artisanal Chocolate Collection',
    description: 'Handcrafted chocolates made with premium ingredients from around the world.',
    price: 34.99,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1628428988968-5549dd02dde2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    category: 'Gourmet',
    isFeatured: true,
    isTrending: false,
  },
  {
    id: '3',
    name: 'Personalized Leather Journal',
    description: 'Genuine leather journal with custom monogram and high-quality paper.',
    price: 29.99,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1608263153703-caa6b0fd7bc7?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    category: 'Personalized',
    isFeatured: true,
    isTrending: false,
  },
  {
    id: '4',
    name: 'Crystal Wine Decanter',
    description: 'Elegant handblown crystal wine decanter for wine enthusiasts.',
    price: 89.99,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1608263153703-caa6b0fd7bc7?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1628428988968-5549dd02dde2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    category: 'Home Decor',
    isFeatured: false,
    isTrending: true,
  },
  {
    id: '5',
    name: 'Luxury Gift Hamper',
    description: 'Curated luxury gift basket with gourmet treats, wine and premium accessories.',
    price: 129.99,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1608263153703-caa6b0fd7bc7?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1628428988968-5549dd02dde2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    category: 'Gourmet',
    isFeatured: false,
    isTrending: true,
  },
  {
    id: '6',
    name: 'Handcrafted Ceramic Vase Set',
    description: 'Set of 3 artisanal ceramic vases in complementary colors and designs.',
    price: 79.99,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1628428988968-5549dd02dde2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    category: 'Home Decor',
    isFeatured: false,
    isTrending: false,
  },
];

// API client functions
export const api = {
  // Simulate API fetching with a delay
  async getProducts(): Promise<Product[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockProducts;
  },

  async getProduct(id: string): Promise<Product | undefined> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProducts.find((product) => product.id === id);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockProducts.filter((product) => product.category === category);
  },

  // Function to get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 700));
    return mockProducts.filter((product) => product.isFeatured);
  },

  // Function to get trending products
  async getTrendingProducts(): Promise<Product[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 700));
    return mockProducts.filter((product) => product.isTrending);
  },
};
