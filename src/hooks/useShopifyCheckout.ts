import { useState, useEffect, useCallback, useRef } from 'react';
import { ShopifyProduct, ShopifyVariant } from '../types/shopify';
import { getLisoProduct, getColorOptions, resolveVariantForColor, createShopifyCart } from '../services/shopify';

export interface UseShopifyCheckoutResult {
  product: ShopifyProduct | null;
  isLoadingProduct: boolean;
  isCheckingOut: boolean;
  error: string | null;
  colorOptions: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  initiateCheckout: (colorToBuy?: string, quantityToBuy?: number, countryCode?: string) => Promise<void>;
  clearError: () => void;
}

export function useShopifyCheckout(): UseShopifyCheckoutResult {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [colorOptions, setColorOptions] = useState<string[]>(['Negro', 'Gris']);
  const [selectedColor, setSelectedColor] = useState<string>('Negro');
  const [quantity, setQuantity] = useState<number>(1);
  const productRef = useRef<ShopifyProduct | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setIsLoadingProduct(true);
        const fetchedProduct = await getLisoProduct();
        if (isMounted) {
          if (fetchedProduct) {
            setProduct(fetchedProduct);
            productRef.current = fetchedProduct;

            // Extraer opciones de color reales de Shopify
            const availableColors = getColorOptions(fetchedProduct);
            if (availableColors && availableColors.length > 0) {
              setColorOptions(availableColors);
              setSelectedColor(prev => 
                availableColors.some(c => c.toLowerCase() === prev.toLowerCase())
                  ? prev
                  : availableColors[0]
              );
            }
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.warn('Advertencia al consultar producto LISO en Shopify:', err.message);
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
    async (
      colorToBuy?: string,
      quantityOrCountry?: number | string,
      countryCodeParam?: string
    ) => {
      setError(null);
      setIsCheckingOut(true);

      const targetColor = colorToBuy || selectedColor;
      let targetQty = quantity;
      let countryCode = 'CO';

      if (typeof quantityOrCountry === 'number') {
        targetQty = quantityOrCountry;
        if (typeof countryCodeParam === 'string') {
          countryCode = countryCodeParam;
        }
      } else if (typeof quantityOrCountry === 'string') {
        countryCode = quantityOrCountry;
      } else if (typeof countryCodeParam === 'string') {
        countryCode = countryCodeParam;
      }

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
          throw new Error('No se encontró el producto LISO en Shopify.');
        }

        // Resolver variante según el color seleccionado por el cliente
        const targetVariant: ShopifyVariant | undefined = resolveVariantForColor(currentProduct, targetColor);

        if (!targetVariant) {
          const available = currentProduct.variants.map(v => v.title).join(', ');
          throw new Error(
            `No se encontró la variante para el color "${targetColor}" en Shopify. Variantes disponibles: ${available}`
          );
        }

        // Crear carrito moderno con Storefront Cart API 2026-07 (con cantidad y país)
        const { checkoutUrl } = await createShopifyCart(targetVariant.id, targetQty, countryCode);

        // Redirigir al checkout oficial de Shopify
        window.location.href = checkoutUrl;
      } catch (err: any) {
        console.error('Error durante el proceso de checkout en Shopify:', err);
        setError(err.message || 'Ocurrió un error al preparar tu pedido. Por favor intenta de nuevo.');
        setIsCheckingOut(false);
      }
    },
    [product, selectedColor, quantity]
  );

  return {
    product,
    isLoadingProduct,
    isCheckingOut,
    error,
    colorOptions,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    initiateCheckout,
    clearError,
  };
}

