import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/shopify';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://inpe-barefoot.com'; // Fallback URL if env is not defined

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define static routes
  const staticRoutes = [
    '',
    '/loja',
    '/contactos',
    '/sobre-nos',
    '/termos',
    '/privacidade',
    '/guia-tamanhos',
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic products from Shopify
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts({ first: 250 }); // Fetch up to 250 products
    productEntries = products.map((product) => ({
      url: `${BASE_URL}/produto/${product.handle}`,
      lastModified: new Date(product.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  return [...staticEntries, ...productEntries];
}
