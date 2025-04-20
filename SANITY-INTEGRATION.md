# Sanity Integration for Gift Shop

This document outlines how Sanity CMS is integrated with the Gift Shop application.

## Integration Points

The following components have been updated to work with Sanity:

1. **Featured Products** - The homepage featured products section now fetches data from Sanity using the `getFeaturedProducts` API.

2. **Product Detail Page** - Product pages now use data from Sanity including:

   - Product information (name, price, description)
   - Product images
   - Categories
   - Tags and other metadata

3. **Similar Products** - The similar products component uses Sanity data to show related products.

## Data Structure

The Sanity schema includes:

- **Products** - Main product document type with fields for name, slug, description, price, images, etc.
- **Categories** - Category document type used to organize products

## API Services

The `src/lib/services/api.ts` file contains all the necessary functions to interact with Sanity:

- `getProducts()` - Get all products
- `getProductBySlug(slug)` - Get a single product by its slug
- `getFeaturedProducts()` - Get products marked as featured
- `getProductsByCategory(categorySlug)` - Get products in a specific category
- `getCategories()` - Get all categories
- `getCategoryBySlug(slug)` - Get a single category by its slug

## How to Use

1. **Adding Products in Sanity**

   - Create products in the Sanity Studio
   - Add images, set prices, and other details
   - Mark products as "featured" to show them on the homepage

2. **Working with Categories**
   - Create categories in Sanity Studio
   - Assign products to categories
   - Use category filters on the product listing page

## Testing the Integration

Visit `/sanity-test` to see a simple test page that verifies the Sanity connection.

## Troubleshooting

Several components were updated to work with the Sanity data structure:

1. **Data structure changes:**

   - `product.id` → `product._id` (Sanity uses `_id` for document IDs)
   - `product.media` → `product.images` (Images field name changed in Sanity schema)
   - `product.category` → `product.categories[0].name` (Categories are now an array of references)
   - `product.isFeatured` → `product.featured` (Property name simplified)
   - `product.isTrending` → `product.tags?.includes('trending')` (Moved to tags array)

2. **Components fixed:**
   - Product Card - Updated to use the Sanity data structure
   - Product Detail - Added support for rich text with Portable Text
   - Featured Products - Fixed image references and category display
   - Similar Products - Updated to work with Sanity references
   - Cart Page - Updated to display product data from Sanity

If you encounter any "Cannot read properties of undefined" errors, check that you're accessing the correct property paths in the Sanity data structure.
