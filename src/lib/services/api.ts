// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Mock data - In a real app, this would come from an actual API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Scented Candle Set',
    description: 'Set of 3 premium scented candles with natural soy wax and essential oils.',
    price: 49.99,
    image: '/images/candle-set.jpg',
    category: 'Home Decor',
  },
  {
    id: '2',
    name: 'Artisanal Chocolate Collection',
    description: 'Handcrafted chocolates made with premium ingredients from around the world.',
    price: 34.99,
    image: '/images/chocolate-collection.jpg',
    category: 'Gourmet',
  },
  {
    id: '3',
    name: 'Personalized Leather Journal',
    description: 'Genuine leather journal with custom monogram and high-quality paper.',
    price: 29.99,
    image: '/images/leather-journal.jpg',
    category: 'Personalized',
  },
  {
    id: '4',
    name: 'Crystal Wine Decanter',
    description: 'Elegant handblown crystal wine decanter for wine enthusiasts.',
    price: 89.99,
    image: '/images/wine-decanter.jpg',
    category: 'Home Decor',
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
};
