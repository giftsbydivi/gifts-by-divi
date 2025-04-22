import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schema } from './schema';

export default defineConfig({
  name: 'default',
  title: 'Gift Shop',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [visionTool(), structureTool()],

  schema,
});
