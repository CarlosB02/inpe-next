// Product Fragment to keep code DRY and maintainable
export const PRODUCT_FRAGMENT = `
  fragment productFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        cursor
        node {
          url
          altText
          width
          height
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
    variants(first: 100) {
      edges {
        cursor
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
    collections(first: 5) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`;

// Cart Fragment
export const CART_FRAGMENT = `
  fragment cartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        cursor
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
                width
                height
              }
              product {
                id
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

// 1. Get multiple products (paginated)
export const getProductsQuery = `
  ${PRODUCT_FRAGMENT}
  query getProducts($first: Int, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        cursor
        node {
          ...productFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// 2. Get single product by handle
export const getProductQuery = `
  ${PRODUCT_FRAGMENT}
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...productFields
    }
  }
`;

// 3. Get products by collection handle
export const getCollectionProductsQuery = `
  ${PRODUCT_FRAGMENT}
  query getCollectionProducts($handle: String!, $first: Int, $after: String) {
    collection(handle: $handle) {
      products(first: $first, after: $after) {
        edges {
          cursor
          node {
            ...productFields
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

// 4. Create a new cart
export const createCartMutation = `
  ${CART_FRAGMENT}
  mutation createCart($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ...cartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// 5. Retrieve cart by ID
export const getCartQuery = `
  ${CART_FRAGMENT}
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cartFields
    }
  }
`;

// 6. Add line items to cart
export const addToCartMutation = `
  ${CART_FRAGMENT}
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// 7. Update line item quantities in cart
export const updateCartLinesMutation = `
  ${CART_FRAGMENT}
  mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// 8. Remove line items from cart
export const removeFromCartMutation = `
  ${CART_FRAGMENT}
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// 9. Search products with filters
export const searchProductsQuery = `
  ${PRODUCT_FRAGMENT}
  query searchProducts($query: String!, $first: Int, $after: String, $filters: [ProductFilter!]) {
    search(query: $query, first: $first, after: $after, productFilters: $filters) {
      edges {
        cursor
        node {
          ... on Product {
            ...productFields
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
