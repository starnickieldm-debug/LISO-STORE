import { ShopifyProduct, ShopifyVariant, CartCreatePayload } from '../types/shopify';

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
const ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-07';
const PRODUCT_HANDLE = import.meta.env.VITE_SHOPIFY_PRODUCT_HANDLE || 'plancha-de-vapor-portatil-liso';

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
 * Query para obtener el producto LISO y sus variantes
 */
const GET_PRODUCT_QUERY = `
query getProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    availableForSale
    variants(first: 10) {
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
    variants: data.product.variants.edges.map(edge => edge.node),
  };
}

/**
 * Resuelve dinámicamente la variante que coincide con el enchufe (US, EU, AU)
 */
export function resolveVariantForPlug(
  product: ShopifyProduct,
  plugType: string
): ShopifyVariant | undefined {
  const target = plugType.trim().toUpperCase();

  return product.variants.find(variant => {
    // Coincidencia por título directo
    if (variant.title.trim().toUpperCase() === target) {
      return true;
    }
    // Coincidencia por cualquiera de las opciones seleccionadas (ej. Enchufe = US)
    return variant.selectedOptions.some(opt => opt.value.trim().toUpperCase() === target);
  });
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

/**
 * Crea un carrito en Shopify con la variante especificada y retorna checkoutUrl
 */
export async function createShopifyCart(
  variantId: string,
  countryCode?: string
): Promise<{ checkoutUrl: string; cartId: string }> {
  interface CartMutationResponse {
    cartCreate: CartCreatePayload;
  }

  const input: Record<string, any> = {
    lines: [
      {
        merchandiseId: variantId,
        quantity: 1,
      },
    ],
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
