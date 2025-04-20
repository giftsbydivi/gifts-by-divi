# Sanity CMS Integration

This project uses Sanity CMS to manage the product catalog and categories for the Gift Shop.

## Setup Instructions

1. **Install Sanity CLI globally**

```bash
npm install -g @sanity/cli
# or
yarn global add @sanity/cli
```

2. **Initialize a new Sanity project**

```bash
sanity init
```

During initialization:

- Create a new project (or use an existing one)
- Give your project a name (e.g., "Gift Shop")
- Use the default dataset configuration
- Select "Empty project" as the schema type

3. **Get your Project ID**

After initialization, you'll get a Sanity project ID. Add this to your `.env.local` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-12
```

4. **Start the Next.js development server**

```bash
npm run dev
# or
yarn dev
```

5. **Access the Sanity Studio**

Visit `http://localhost:3000/studio` to access the Sanity Studio interface.

## Content Structure

### Categories

Categories organize your products. Each category has:

- Name
- Slug (URL-friendly identifier)
- Description (optional)
- Image (optional)

### Products

Products represent items in your store. Each product has:

- Name
- Slug
- Description (rich text)
- Price
- Compare at Price (optional for showing discounts)
- Images (can include regular images, videos, or Instagram embeds)
- Categories (references to category documents)
- Featured flag (for highlighting on the homepage)
- In Stock status
- Tags (optional for filtering)

## Using in your Application

The API services in `src/lib/services/api.ts` provide functions to fetch content from Sanity:

- `getCategories()` - Get all categories
- `getCategoryBySlug(slug)` - Get a category by its slug
- `getProducts()` - Get all products
- `getProductBySlug(slug)` - Get a product by its slug
- `getFeaturedProducts()` - Get products marked as featured
- `getProductsByCategory(categorySlug)` - Get products in a specific category
