'use client';

import { useEffect, useState } from 'react';

import { getProducts, getCategories } from '@/lib/services/api';
import { Product, Category } from '@/lib/services/api';

export default function SanityTest() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Try to fetch products and categories
        const productsData = await getProducts();
        const categoriesData = await getCategories();

        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Sanity data:', err);
        setError('Failed to fetch data from Sanity. Check console for details.');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading Sanity data...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Sanity Connection Test</h2>

      <div className="mb-8">
        <h3 className="mb-2 text-xl font-semibold">Categories ({categories.length})</h3>
        {categories.length === 0 ? (
          <p className="text-amber-500">No categories found. Have you added any in Sanity?</p>
        ) : (
          <ul className="list-disc pl-5">
            {categories.map((category) => (
              <li key={category._id}>
                {category.name} <span className="text-gray-500">({category.slug.current})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-xl font-semibold">Products ({products.length})</h3>
        {products.length === 0 ? (
          <p className="text-amber-500">No products found. Have you added any in Sanity?</p>
        ) : (
          <ul className="list-disc pl-5">
            {products.map((product) => (
              <li key={product._id}>
                {product.name} - ${product.price}
                <br />
                <span className="text-sm text-gray-500">
                  Categories: {product.categories?.map((c) => c.name).join(', ') || 'None'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 rounded bg-gray-100 p-4">
        <h3 className="font-semibold">Connection Status:</h3>
        {categories.length > 0 || products.length > 0 ? (
          <p className="text-green-600">✅ Successfully connected to Sanity and retrieved data!</p>
        ) : (
          <p className="text-amber-500">
            ⚠️ Connected to Sanity but no content found. Try adding some products and categories in
            the Sanity Studio.
          </p>
        )}
      </div>
    </div>
  );
}
