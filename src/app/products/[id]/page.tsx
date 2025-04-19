import { use } from 'react';

import ProductDetail from './product-detail';

type Params = { params: Promise<{ id: string }> };

export default function ProductPage({ params }: Params) {
  const resolvedParams = typeof params === 'object' && 'then' in params ? use(params) : params;
  return <ProductDetail id={resolvedParams.id} />;
}
