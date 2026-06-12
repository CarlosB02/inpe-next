import {
  ShopifyProductsResponse,
  ShopifyProductResponse,
  ShopifyCollectionProductsResponse,
  ShopifyCartResponse,
  ShopifyCreateCartResponse,
  ShopifyCartOperationResponse,
  Product,
  Cart
} from '../types/shopify';
import {
  getProductsQuery,
  getProductQuery,
  getCollectionProductsQuery,
  createCartMutation,
  getCartQuery,
  addToCartMutation,
  updateCartLinesMutation,
  removeFromCartMutation,
  searchProductsQuery
} from './shopifyQueries';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-04';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  revalidate?: number;
}

// Low-level fetch wrapper
export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'default',
  revalidate
}: ShopifyFetchParams): Promise<{ status: number; body: { data: T; errors?: any[] } }> {
  if (!domain || !storefrontAccessToken) {
    throw new Error('Shopify domain or access token is missing in environment variables.');
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken
    };

    const fetchOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      cache
    };

    if (revalidate !== undefined) {
      // @ts-ignore
      fetchOptions.next = { revalidate };
    }

    const response = await fetch(endpoint, fetchOptions);
    const body = await response.json();

    if (body.errors) {
      console.error('Shopify API Error details:', JSON.stringify(body.errors, null, 2));
      throw new Error(`Shopify API Error: ${body.errors[0]?.message || 'GraphQL Query Error'}`);
    }

    return {
      status: response.status,
      body
    };
  } catch (error) {
    console.error('Failed to fetch from Shopify:', error);
    throw error;
  }
}

// 1. Get multiple products with pagination & optional query
export async function getProducts({
  first = 12,
  after,
  query,
  sortKey,
  reverse
}: {
  first?: number;
  after?: string;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
} = {}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsResponse>({
    query: getProductsQuery,
    variables: { first, after, query, sortKey, reverse },
    revalidate: 60 // Cache for 60 seconds (Incremental Static Regeneration)
  });

  return res.body.data.products.edges.map(edge => edge.node);
}

// 2. Get single product by handle
export async function getProduct(handle: string): Promise<Product | null> {
  const res = await shopifyFetch<ShopifyProductResponse>({
    query: getProductQuery,
    variables: { handle },
    revalidate: 60 // ISR
  });

  return res.body.data.product;
}

// 3. Get products by collection
export async function getCollectionProducts({
  collection,
  first = 12,
  after
}: {
  collection: string;
  first?: number;
  after?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsResponse>({
    query: getCollectionProductsQuery,
    variables: { handle: collection, first, after },
    revalidate: 60 // ISR
  });

  return res.body.data.collection?.products.edges.map(edge => edge.node) || [];
}

// 4. Create e-commerce Cart
export async function createCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartResponse>({
    query: createCartMutation,
    variables: {
      input: {
        lines: lines.map(line => ({
          merchandiseId: line.merchandiseId,
          quantity: line.quantity
        }))
      }
    },
    cache: 'no-store' // Do not cache cart creation
  });

  const cartCreate = res.body.data.cartCreate;
  if (cartCreate.userErrors && cartCreate.userErrors.length > 0) {
    throw new Error(cartCreate.userErrors[0].message);
  }

  return cartCreate.cart;
}

// 5. Get Cart by ID
export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await shopifyFetch<ShopifyCartResponse>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store' // Live check
  });

  return res.body.data.cart;
}

// 6. Add line items to Cart
export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCartOperationResponse>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines: lines.map(line => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity
      }))
    },
    cache: 'no-store'
  });

  const result = res.body.data.cartLinesAdd;
  if (!result) throw new Error('Failed to add items to Shopify cart.');
  if (result.userErrors && result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }

  return result.cart;
}

// 7. Update Cart lines
export async function updateCartLines(
  cartId: string,
  lines: { id: string; merchandiseId?: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCartOperationResponse>({
    query: updateCartLinesMutation,
    variables: {
      cartId,
      lines: lines.map(line => ({
        id: line.id,
        quantity: line.quantity
      }))
    },
    cache: 'no-store'
  });

  const result = res.body.data.cartLinesUpdate;
  if (!result) throw new Error('Failed to update Shopify cart lines.');
  if (result.userErrors && result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }

  return result.cart;
}

// 8. Remove items from Cart
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCartOperationResponse>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  const result = res.body.data.cartLinesRemove;
  if (!result) throw new Error('Failed to remove items from Shopify cart.');
  if (result.userErrors && result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }

  return result.cart;
}

// 9. Search products
export async function searchProducts({
  query,
  first = 12,
  after,
  minPrice,
  maxPrice,
  available
}: {
  query: string;
  first?: number;
  after?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}): Promise<Product[]> {
  const filters: Record<string, any>[] = [];

  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.push({
      price: {
        min: minPrice ?? 0,
        max: maxPrice ?? 99999
      }
    });
  }

  if (available !== undefined) {
    filters.push({
      available: available
    });
  }

  const res = await shopifyFetch<{ search: { edges: { node: Product }[] } }>({
    query: searchProductsQuery,
    variables: {
      query,
      first,
      after,
      filters
    },
    revalidate: 30 // Short revalidation for search results
  });

  return res.body.data.search.edges.map(edge => edge.node);
}
