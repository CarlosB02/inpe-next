import React from 'react';
import CollectionsClient2 from '@/components/CollectionsClient2';
import { getProducts, searchProducts } from '@/lib/shopify';

export const metadata = { 
  title: 'Loja – Inpe Barefoot', 
  description: 'Explore todas as nossas coleções de calçado barefoot saudável.' 
};

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function LojaPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  
  let products: any[] = [];
  try {
    if (query) {
      // Execute text search from Shopify API
      products = await searchProducts({ query });
    } else {
      // Default products listing
      products = await getProducts({ first: 100 });
    }
  } catch (err) {
    console.error('Failed to load Shopify products on page load:', err);
  }

  return <CollectionsClient2 initialProducts={products} searchQuery={query} />;
}
