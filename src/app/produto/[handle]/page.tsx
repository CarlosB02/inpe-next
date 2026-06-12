import React from 'react';
import { notFound } from 'next/navigation';
import { getProduct, getCollectionProducts, getProducts } from '@/lib/shopify';
import ProductClient from '@/components/ProductClient';

interface Props {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  try {
    const product = await getProduct(handle);
    if (!product) return {};
    return {
      title: `${product.title} – Inpe Barefoot`,
      description: product.description
    };
  } catch (err) {
    return {
      title: 'Produto – Inpe Barefoot'
    };
  }
}

export default async function ProdutoPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  // Fetch related products from collection or fall back to general listing
  const collectionHandle = product.collections.edges[0]?.node.handle;
  let relatedProducts: any[] = [];
  
  try {
    if (collectionHandle) {
      relatedProducts = await getCollectionProducts({ collection: collectionHandle, first: 8 });
    }
  } catch (err) {
    console.error('Error fetching related products from collection:', err);
  }

  // Fall back to general catalog if collection yields no items
  if (!relatedProducts || relatedProducts.length === 0) {
    try {
      relatedProducts = await getProducts({ first: 8 });
    } catch (err) {
      console.error('Error fetching fallback products:', err);
    }
  }

  // Exclude current product
  let filteredRelated = relatedProducts.filter(p => p.id !== product.id);

  // If we still don't have enough recommendations, mix in general catalog items
  if (filteredRelated.length < 2) {
    try {
      const fallback = await getProducts({ first: 8 });
      filteredRelated = [...filteredRelated, ...fallback.filter(p => p.id !== product.id)];
      const seen = new Set();
      filteredRelated = filteredRelated.filter(p => {
        const duplicate = seen.has(p.id);
        seen.add(p.id);
        return !duplicate;
      });
    } catch (_) {}
  }

  const finalRelated = filteredRelated.slice(0, 4);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://inpe-barefoot.com';
  const images = product.images?.edges?.map(edge => edge.node.url) || [];
  const minPrice = product.priceRange?.minVariantPrice;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'image': images,
    'description': product.description,
    'sku': product.id,
    'offers': {
      '@type': 'Offer',
      'price': minPrice?.amount || '0.00',
      'priceCurrency': minPrice?.currencyCode || 'EUR',
      'availability': product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'url': `${BASE_URL}/produto/${product.handle}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient product={product} relatedProducts={finalRelated} />
    </>
  );
}
