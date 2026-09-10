import { ShopifyProduct, ShopifyVariant, CartCreatePayload } from '../types/shopify';

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
const ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-07';
const PRODUCT_HANDLE = import.meta.env.VITE_SHOPIFY_PRODUCT_HANDLE || 'liso-plancha-vaporizadora-de-ropa-port-til';

/**
 * Cliente HTTP para Shopify Storefront API (GraphQL)
 */
export async function fetchShopify<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  if (!STORE_DOMAIN || !ACCESS_TOKEN) {
    throw new Error(
      'Configuración de Shopify incompleta. Revisa las variables VITE_SHOPIFY_STORE_DOMAIN y VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN en tu archivo .env.'
    );
  }

  const endpoint = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Error en Storefront API (${response.status}): ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors.map((e: any) => e.message).join(' | '));
  }

  return json.data as T;
}

/**
 * Query para obtener el producto LISO y sus variantes con opciones de color
 */
const GET_PRODUCT_QUERY = `
query getProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    availableForSale
    options {
      id
      name
      values
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
        }
      }
    }
  }
}
`;

/**
 * Obtiene el producto LISO desde Shopify Storefront API
 */
export async function getLisoProduct(handle: string = PRODUCT_HANDLE): Promise<ShopifyProduct | null> {
  interface ProductQueryResponse {
    product: {
      id: string;
      title: string;
      handle: string;
      availableForSale: boolean;
      options?: Array<{
        id: string;
        name: string;
        values: string[];
      }>;
      variants: {
        edges: Array<{
          node: ShopifyVariant;
        }>;
      };
    } | null;
  }

  const data = await fetchShopify<ProductQueryResponse>(GET_PRODUCT_QUERY, { handle });

  if (!data.product) {
    return null;
  }

  return {
    id: data.product.id,
    title: data.product.title,
    handle: data.product.handle,
    availableForSale: data.product.availableForSale,
    options: data.product.options || [],
    variants: data.product.variants.edges.map(edge => edge.node),
  };
}

/**
 * Extrae las opciones reales de color disponibles para el producto desde Shopify
 */
export function getColorOptions(product: ShopifyProduct): string[] {
  // 1. Buscar en options del producto la opción llamada "Color"
  const colorOption = product.options?.find(
    opt => opt.name.trim().toLowerCase() === 'color'
  );
  if (colorOption && colorOption.values && colorOption.values.length > 0) {
    return colorOption.values;
  }

  // 2. Extraer de selectedOptions en las variantes
  const colors = new Set<string>();
  product.variants.forEach(variant => {
    const opt = variant.selectedOptions?.find(
      o => o.name.trim().toLowerCase() === 'color'
    );
    if (opt && opt.value) {
      colors.add(opt.value);
    }
  });

  if (colors.size > 0) {
    return Array.from(colors);
  }

  // 3. Fallback: extraer prefijo del título de variantes (ej. "Negro / 110v" -> "Negro")
  product.variants.forEach(variant => {
    const parts = variant.title.split('/');
    if (parts.length > 0) {
      colors.add(parts[0].trim());
    }
  });

  return Array.from(colors);
}

/**
 * Resuelve dinámicamente la variante exacta de Shopify que coincide con el color seleccionado
 */
export function resolveVariantForColor(
  product: ShopifyProduct,
  color: string
): ShopifyVariant | undefined {
  if (!color) return undefined;
  const target = color.trim().toLowerCase();

  // 1. Coincidencia directa en selectedOptions con name = 'Color'
  const matchByOption = product.variants.find(variant =>
    variant.selectedOptions?.some(
      opt => opt.name.trim().toLowerCase() === 'color' && opt.value.trim().toLowerCase() === target
    )
  );
  if (matchByOption) return matchByOption;

  // 2. Coincidencia en título de variante (ej. "Negro / 110v" contiene "negro")
  const matchByTitle = product.variants.find(variant => {
    const parts = variant.title.toLowerCase().split('/').map(s => s.trim());
    return parts.includes(target) || variant.title.toLowerCase().startsWith(target);
  });
  if (matchByTitle) return matchByTitle;

  // 3. Coincidencia en cualquier valor de selectedOptions
  return product.variants.find(variant =>
    variant.selectedOptions?.some(opt => opt.value.trim().toLowerCase() === target)
  );
}

/**
 * Mutación Storefront Cart API (cartCreate)
 */
const CREATE_CART_MUTATION = `
mutation createCart($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      code
      field
      message
    }
  }
}
`;

export interface CartLineItem {
  variantId: string;
  quantity: number;
}

/**
 * Crea un carrito en Shopify con una o varias variantes y retorna checkoutUrl
 */
export async function createShopifyCart(
  variantOrLines: string | CartLineItem[],
  quantity: number = 1,
  countryCode?: string
): Promise<{ checkoutUrl: string; cartId: string }> {
  interface CartMutationResponse {
    cartCreate: CartCreatePayload;
  }

  let lines: Array<{ merchandiseId: string; quantity: number }> = [];

  if (Array.isArray(variantOrLines)) {
    lines = variantOrLines
      .filter(item => item.variantId && item.quantity > 0)
      .map(item => ({
        merchandiseId: item.variantId,
        quantity: Math.max(1, Math.floor(item.quantity)),
      }));
  } else {
    const safeQuantity = Math.max(1, Math.floor(quantity || 1));
    lines = [
      {
        merchandiseId: variantOrLines,
        quantity: safeQuantity,
      },
    ];
  }

  if (lines.length === 0) {
    throw new Error('No hay productos válidos para agregar al carrito.');
  }

  const input: Record<string, any> = {
    lines,
  };

  // Preparado para localización de precios internacionales
  if (countryCode) {
    input.buyerIdentity = {
      countryCode,
    };
  }

  const data = await fetchShopify<CartMutationResponse>(CREATE_CART_MUTATION, { input });

  const { cart, userErrors } = data.cartCreate;

  if (userErrors && userErrors.length > 0) {
    const errorMsg = userErrors.map(e => e.message).join(' | ');
    throw new Error(`Shopify Cart: ${errorMsg}`);
  }

  if (!cart || !cart.checkoutUrl) {
    throw new Error('No se pudo generar el checkout de Shopify.');
  }

  return {
    checkoutUrl: cart.checkoutUrl,
    cartId: cart.id,
  };
}
