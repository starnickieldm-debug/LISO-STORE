export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: ShopifySelectedOption[];
  image?: {
    url: string;
    altText: string | null;
  } | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  options?: ShopifyOption[];
  variants: ShopifyVariant[];
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
}

export interface ShopifyUserError {
  code?: string;
  field?: string[];
  message: string;
}

export interface CartCreatePayload {
  cart: ShopifyCart | null;
  userErrors: ShopifyUserError[];
}
