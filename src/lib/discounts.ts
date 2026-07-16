import { Product } from '../types/shopify';
import { getAdminToken } from './admin-token';

export interface ActiveDiscount {
  title: string;
  percentage?: number;
  amount?: number;
  appliesToAll: boolean;
  productHandles: string[];
  collectionHandles: string[];
}

// Fetches active automatic discounts from the Shopify Admin API
export async function getAutomaticDiscounts(): Promise<ActiveDiscount[]> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const adminToken = await getAdminToken();

  if (!domain || !adminToken) {
    return [];
  }

  const endpoint = `https://${domain}/admin/api/2025-01/graphql.json`;

  const query = `
    query {
      automaticDiscountNodes(first: 10, query: "status:active") {
        edges {
          node {
            automaticDiscount {
              ... on DiscountAutomaticBasic {
                title
                startsAt
                endsAt
                status
                customerGets {
                  value {
                    ... on DiscountPercentage {
                      percentage
                    }
                    ... on DiscountAmount {
                      amount {
                        amount
                        currencyCode
                      }
                    }
                  }
                  items {
                    ... on AllDiscountItems {
                      __typename
                    }
                    ... on DiscountProducts {
                      products(first: 50) {
                        edges {
                          node {
                            handle
                          }
                        }
                      }
                    }
                    ... on DiscountCollections {
                      collections(first: 50) {
                        edges {
                          node {
                            handle
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store', // FORÇA o Next.js a ignorar a cache e bater na Shopify sempre
    });

    const body = await res.json();
    if (body.errors) {
      console.error('Shopify Admin API Error details:', JSON.stringify(body.errors, null, 2));
      return [];
    }

    const nodes = body.data?.automaticDiscountNodes?.edges || [];
    const discounts: ActiveDiscount[] = [];

    const now = new Date();

    for (const edge of nodes) {
      const disc = edge.node?.automaticDiscount;
      if (!disc) continue;

      // Check status and dates validity
      if (disc.status && disc.status !== 'ACTIVE') continue;

      const startsAt = disc.startsAt ? new Date(disc.startsAt) : null;
      const endsAt = disc.endsAt ? new Date(disc.endsAt) : null;
      if (startsAt && startsAt > now) continue;
      if (endsAt && endsAt < now) continue;

      const val = disc.customerGets?.value;
      const items = disc.customerGets?.items;

      let percentage: number | undefined;
      let amount: number | undefined;

      if (val) {
        if (typeof val.percentage === 'number') {
          const pVal = val.percentage;
          percentage = (pVal > 0 && pVal <= 1) ? pVal * 100 : pVal;
        } else if (val.amount?.amount) {
          amount = parseFloat(val.amount.amount);
        }
      }

      if (percentage === undefined && amount === undefined) continue;

      const appliesToAll = items?.__typename === 'AllDiscountItems';
      const productHandles: string[] = [];
      const collectionHandles: string[] = [];

      if (items) {
        if (items.products?.edges) {
          for (const pEdge of items.products.edges) {
            if (pEdge.node?.handle) {
              productHandles.push(pEdge.node.handle);
            }
          }
        }
        if (items.collections?.edges) {
          for (const cEdge of items.collections.edges) {
            if (cEdge.node?.handle) {
              collectionHandles.push(cEdge.node.handle);
            }
          }
        }
      }

      discounts.push({
        title: disc.title,
        percentage,
        amount,
        appliesToAll,
        productHandles,
        collectionHandles,
      });
    }

    return discounts;
  } catch (error) {
    console.error('Failed to fetch automatic discounts from Shopify:', error);
    return [];
  }
}

// Intercepts list of products and applies active automatic discounts dynamically
export function applyAutomaticDiscounts(products: Product[], discounts: ActiveDiscount[]): Product[] {
  if (!products || products.length === 0 || !discounts || discounts.length === 0) {
    return products;
  }

  return products.map(product => {
    // Find a matching discount for this product
    const matchingDiscount = discounts.find(d => {
      if (d.appliesToAll) return true;
      if (d.productHandles.includes(product.handle)) return true;
      if (product.collections?.edges?.some(edge => d.collectionHandles.includes(edge.node.handle))) return true;
      return false;
    });

    if (!matchingDiscount) return product;

    // Only apply if the product doesn't already have a manual discount (compareAtPrice > price)
    const hasManualDiscount = product.compareAtPriceRange && 
      product.compareAtPriceRange.minVariantPrice &&
      parseFloat(product.compareAtPriceRange.minVariantPrice.amount) > parseFloat(product.priceRange.minVariantPrice.amount);

    if (hasManualDiscount) return product;

    // Clone product to avoid mutations on cache
    const cloned = JSON.parse(JSON.stringify(product)) as Product;

    // Apply discount on variants
    const updatedVariants = cloned.variants?.edges?.map(edge => {
      const variant = edge.node;
      const originalPriceVal = parseFloat(variant.price.amount);
      let discountedPriceVal = originalPriceVal;

      if (matchingDiscount.percentage !== undefined) {
        discountedPriceVal = originalPriceVal * (1 - matchingDiscount.percentage / 100);
      } else if (matchingDiscount.amount !== undefined) {
        discountedPriceVal = Math.max(0, originalPriceVal - matchingDiscount.amount);
      }

      if (discountedPriceVal < originalPriceVal) {
        variant.compareAtPrice = {
          amount: originalPriceVal.toFixed(2),
          currencyCode: variant.price.currencyCode
        };
        variant.price = {
          amount: discountedPriceVal.toFixed(2),
          currencyCode: variant.price.currencyCode
        };
      }
      return edge;
    }) || [];

    cloned.variants.edges = updatedVariants;

    // Recalculate price ranges
    const variantPrices = updatedVariants.map(e => parseFloat(e.node.price.amount));
    const variantComparePrices = updatedVariants.map(e => parseFloat(e.node.compareAtPrice?.amount || e.node.price.amount));

    if (variantPrices.length > 0) {
      const minPrice = Math.min(...variantPrices);
      const maxPrice = Math.max(...variantPrices);
      const minCompare = Math.min(...variantComparePrices);
      const maxCompare = Math.max(...variantComparePrices);

      const currency = cloned.priceRange.minVariantPrice.currencyCode;

      cloned.priceRange = {
        minVariantPrice: { amount: minPrice.toFixed(2), currencyCode: currency },
        maxVariantPrice: { amount: maxPrice.toFixed(2), currencyCode: currency }
      };

      if (minCompare > minPrice) {
        cloned.compareAtPriceRange = {
          minVariantPrice: { amount: minCompare.toFixed(2), currencyCode: currency },
          maxVariantPrice: { amount: maxCompare.toFixed(2), currencyCode: currency }
        };
      }
    }

    return cloned;
  });
}
