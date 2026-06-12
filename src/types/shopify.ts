export interface Connection<T> {
  edges: {
    cursor: string;
    node: T;
  }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: MoneyV2;
  image?: ShopifyImage;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  tags: string[];
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  images: Connection<ShopifyImage>;
  variants: Connection<ProductVariant>;
  collections: Connection<{
    title: string;
    handle: string;
  }>;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: MoneyV2;
  };
  merchandise: ProductVariant & {
    product: {
      id: string;
      title: string;
      handle: string;
      images: Connection<ShopifyImage>;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: MoneyV2;
    totalAmount: MoneyV2;
  };
  lines: Connection<CartLine>;
}

// GraphQL Response wrappers
export interface ShopifyProductsResponse {
  products: Connection<Product>;
}

export interface ShopifyProductResponse {
  product: Product | null;
}

export interface ShopifyCollectionProductsResponse {
  collection: {
    products: Connection<Product>;
  } | null;
}

export interface ShopifyCartResponse {
  cart: Cart | null;
}

export interface ShopifyCreateCartResponse {
  cartCreate: {
    cart: Cart;
    userErrors: ShopifyUserError[];
  };
}

export interface ShopifyCartOperationResponse {
  cartLinesAdd?: {
    cart: Cart;
    userErrors: ShopifyUserError[];
  };
  cartLinesUpdate?: {
    cart: Cart;
    userErrors: ShopifyUserError[];
  };
  cartLinesRemove?: {
    cart: Cart;
    userErrors: ShopifyUserError[];
  };
}

export interface ShopifyUserError {
  field?: string[];
  message: string;
}
