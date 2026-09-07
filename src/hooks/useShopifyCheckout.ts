import { useState, useEffect, useCallback, useRef } from 'react';
import { ShopifyProduct, ShopifyVariant } from '../types/shopify';
import { getLisoProduct, resolveVariantForPlug, createShopifyCart } from '../services/shopify';

export interface UseShopifyCheckoutResult {
  product: ShopifyProduct | null;
  isLoadingProduct: boolean;
  isCheckingOut: boolean;
  error: string | null;
  initiateCheckout: (plugType: string, countryCode?: string) => Promise<void>;
  clearError: () => void;
}

export function useShopifyCheckout(): UseShopifyCheckoutResult {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const productRef = useRef<ShopifyProduct | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setIsLoadingProduct(true);
        const fetchedProduct = await getLisoProduct();
        if (isMounted) {
          setProduct(fetchedProduct);
          productRef.current = fetchedProduct;
        }
      } catch (err: any) {
        if (isMounted) {
          console.warn('Advertencia al consultar producto LISO en Shopify:', err.message);
          // No bloqueamos la UI inicial, se reintentará al hacer checkout
        }
      } finally {
        if (isMounted) {
          setIsLoadingProduct(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const initiateCheckout = useCallback(
    async (plugType: string, countryCode?: string) => {
      setError(null);
      setIsCheckingOut(true);

      try {
        // Obtener el producto si aún no está en memoria
        let currentProduct = productRef.current || product;
        if (!currentProduct) {
          currentProduct = await getLisoProduct();
          if (currentProduct) {
            setProduct(currentProduct);
            productRef.current = currentProduct;
          }
        }

        if (!currentProduct) {
          throw new Error('No se encontró el producto LISO en tu tienda de Shopify.');
        }

        // Resolver dinámicamente la variante que corresponde al enchufe del país
        const targetVariant: ShopifyVariant | undefined = resolveVariantForPlug(currentProduct, plugType);

        if (!targetVariant) {
          const available = currentProduct.variants.map(v => v.title).join(', ');
          throw new Error(
            `No se encontró una variante para el enchufe "${plugType}" en Shopify. Variantes disponibles: ${available}`
          );
        }

        // Crear carrito moderno con Storefront Cart API 2026-07
        const { checkoutUrl } = await createShopifyCart(targetVariant.id, countryCode);

        // Redirigir al checkout oficial de Shopify
        window.location.href = checkoutUrl;
      } catch (err: any) {
        console.error('Error durante el proceso de checkout en Shopify:', err);
        setError(err.message || 'Ocurrió un error al preparar tu pedido. Por favor intenta de nuevo.');
        setIsCheckingOut(false);
      }
    },
    [product]
  );

  return {
    product,
    isLoadingProduct,
    isCheckingOut,
    error,
    initiateCheckout,
    clearError,
  };
}
