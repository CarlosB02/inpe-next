import { Product } from '../types/shopify';
import { getAdminToken } from './admin-token';

export interface ActiveDiscount {
  title: string;
  percentage?: number;
  amount?: number;
  appliesToAll: boolean;
  productHandles: string[];
  variantIds: string[];
  collectionHandles: string[];
}

// Fetches active automatic discounts from the Shopify Admin API
export async function getAutomaticDiscounts(): Promise<ActiveDiscount[]> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const adminToken = await getAdminToken();

  if (!domain || !adminToken) {
    return [];
  }

  const endpoint = `https://${domain}/admin/api/2026-07/graphql.json`;

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
                      productVariants(first: 100) {
                        edges {
                          node {
                            id
                            product {
                              handle
                            }
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
      next: { revalidate: 60 }, // Cache for 60 seconds
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
      const variantIds: string[] = [];
      const collectionHandles: string[] = [];

      if (items) {
        if (items.products?.edges) {
          for (const pEdge of items.products.edges) {
            if (pEdge.node?.handle) {
              productHandles.push(pEdge.node.handle);
            }
          }
        }
        if (items.productVariants?.edges) {
          for (const vEdge of items.productVariants.edges) {
            if (vEdge.node?.id) {
              variantIds.push(vEdge.node.id);
              if (vEdge.node?.product?.handle && !productHandles.includes(vEdge.node.product.handle)) {
                productHandles.push(vEdge.node.product.handle);
              }
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
        variantIds,
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
    // Find discounts that match this product or any of its variants
    const matchingDiscounts = discounts.filter(d => {
      if (d.appliesToAll) return true;
      if (d.productHandles.includes(product.handle)) return true;
      if (product.collections?.edges?.some(edge => d.collectionHandles.includes(edge.node.handle))) return true;
      if (product.variants?.edges?.some(vEdge => {
        const vId = vEdge.node.id;
        return d.variantIds.some(dVarId => dVarId === vId || dVarId.endsWith('/' + vId.split('/').pop()));
      })) return true;
      return false;
    });

    if (matchingDiscounts.length === 0) return product;

    // Clone product to avoid mutations on cache
    const cloned = JSON.parse(JSON.stringify(product)) as Product;

    // Apply discount on variants
    const updatedVariants = cloned.variants?.edges?.map(edge => {
      const variant = edge.node;
      const variantId = variant.id;

      // Find best matching discount for this variant
      const disc = matchingDiscounts.find(d => {
        if (d.variantIds && d.variantIds.length > 0) {
          return d.variantIds.some(dVarId => dVarId === variantId || dVarId.endsWith('/' + variantId.split('/').pop()));
        }
        return true;
      });

      if (!disc) return edge;

      // Check if variant already has manual compareAtPrice > price
      const originalCompareAt = variant.compareAtPrice?.amount ? parseFloat(variant.compareAtPrice.amount) : 0;
      const originalPriceVal = parseFloat(variant.price.amount);
      if (originalCompareAt > originalPriceVal) return edge;

      let discountedPriceVal = originalPriceVal;
      if (disc.percentage !== undefined) {
        discountedPriceVal = originalPriceVal * (1 - disc.percentage / 100);
      } else if (disc.amount !== undefined) {
        discountedPriceVal = Math.max(0, originalPriceVal - disc.amount);
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
    const discountedComparePrices: number[] = [];

    updatedVariants.forEach(e => {
      const p = parseFloat(e.node.price.amount);
      const c = e.node.compareAtPrice?.amount ? parseFloat(e.node.compareAtPrice.amount) : 0;
      if (c > p) {
        discountedComparePrices.push(c);
      }
    });

    if (variantPrices.length > 0) {
      const minPrice = Math.min(...variantPrices);
      const maxPrice = Math.max(...variantPrices);
      const currency = cloned.priceRange.minVariantPrice.currencyCode;

      cloned.priceRange = {
        minVariantPrice: { amount: minPrice.toFixed(2), currencyCode: currency },
        maxVariantPrice: { amount: maxPrice.toFixed(2), currencyCode: currency }
      };

      if (discountedComparePrices.length > 0) {
        const minCompare = Math.min(...discountedComparePrices);
        const maxCompare = Math.max(...discountedComparePrices);
        cloned.compareAtPriceRange = {
          minVariantPrice: { amount: minCompare.toFixed(2), currencyCode: currency },
          maxVariantPrice: { amount: maxCompare.toFixed(2), currencyCode: currency }
        };
      } else {
        cloned.compareAtPriceRange = undefined;
      }
    }

    return cloned;
  });
}

