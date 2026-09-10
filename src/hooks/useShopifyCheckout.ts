import { useState, useEffect, useCallback, useRef } from 'react';
import { ShopifyProduct, ShopifyVariant } from '../types/shopify';
import { getLisoProduct, getColorOptions, resolveVariantForColor, createShopifyCart, CartLineItem } from '../services/shopify';

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
  unitColors: string[];
  setUnitColor: (index: number, color: string) => void;
  setAllUnitColors: (color: string) => void;
  initiateCheckout: (
    colorToBuy?: string | string[],
    quantityToBuy?: number | string,
    countryCode?: string
  ) => Promise<void>;
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
  const [unitColors, setUnitColors] = useState<string[]>(['Negro']);
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
              const initialColor = availableColors[0];
              setSelectedColor(prev => {
                const match = availableColors.some(c => c.toLowerCase() === prev.toLowerCase());
                return match ? prev : initialColor;
              });
              setUnitColors(prev => {
                return prev.map(c => 
                  availableColors.some(ac => ac.toLowerCase() === c.toLowerCase()) ? c : initialColor
                );
              });
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

  // Sincronizar unitColors cuando cambia la cantidad
  useEffect(() => {
    setUnitColors(prev => {
      if (prev.length === quantity) return prev;
      if (quantity > prev.length) {
        const fallbackColor = selectedColor || (colorOptions[0] || 'Negro');
        const additions = Array(quantity - prev.length).fill(fallbackColor);
        return [...prev, ...additions];
      } else {
        return prev.slice(0, quantity);
      }
    });
  }, [quantity, selectedColor, colorOptions]);

  const handleSetSelectedColor = useCallback((color: string) => {
    setSelectedColor(color);
    if (quantity === 1) {
      setUnitColors([color]);
    }
  }, [quantity]);

  const setUnitColor = useCallback((index: number, color: string) => {
    setUnitColors(prev => {
      const next = [...prev];
      if (index >= 0 && index < next.length) {
        next[index] = color;
      }
      return next;
    });
    setSelectedColor(color);
  }, []);

  const setAllUnitColors = useCallback((color: string) => {
    setUnitColors(prev => prev.map(() => color));
    setSelectedColor(color);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const initiateCheckout = useCallback(
    async (
      colorOrColors?: string | string[],
      quantityOrCountry?: number | string,
      countryCodeParam?: string
    ) => {
      setError(null);
      setIsCheckingOut(true);

      let targetColors: string[] = [];
      let countryCode = 'CO';

      if (Array.isArray(colorOrColors)) {
        targetColors = colorOrColors;
      } else if (typeof colorOrColors === 'string' && colorOrColors.trim() !== '') {
        const qty = typeof quantityOrCountry === 'number' ? quantityOrCountry : quantity;
        targetColors = Array(qty).fill(colorOrColors);
      } else {
        targetColors = quantity > 1 && unitColors.length === quantity ? unitColors : [selectedColor];
      }

      if (typeof quantityOrCountry === 'string') {
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

        // Agrupar y contar unidades por color
        const colorCounts: Record<string, number> = {};
        targetColors.forEach(c => {
          const norm = c.trim();
          colorCounts[norm] = (colorCounts[norm] || 0) + 1;
        });

        // Resolver variantes para cada color y armar los line items
        const lineItems: CartLineItem[] = [];
        for (const [colorName, count] of Object.entries(colorCounts)) {
          const variant: ShopifyVariant | undefined = resolveVariantForColor(currentProduct, colorName);
          if (!variant) {
            const available = currentProduct.variants.map(v => v.title).join(', ');
            throw new Error(
              `No se encontró la variante para el color "${colorName}" en Shopify. Variantes disponibles: ${available}`
            );
          }
          lineItems.push({
            variantId: variant.id,
            quantity: count,
          });
        }

        // Crear carrito multivariante con Storefront Cart API
        const { checkoutUrl } = await createShopifyCart(lineItems, undefined, countryCode);

        // Redirigir al checkout oficial de Shopify
        window.location.href = checkoutUrl;
      } catch (err: any) {
        console.error('Error durante el proceso de checkout en Shopify:', err);
        setError(err.message || 'Ocurrió un error al preparar tu pedido. Por favor intenta de nuevo.');
        setIsCheckingOut(false);
      }
    },
    [product, selectedColor, quantity, unitColors]
  );

  return {
    product,
    isLoadingProduct,
    isCheckingOut,
    error,
    colorOptions,
    selectedColor,
    setSelectedColor: handleSetSelectedColor,
    quantity,
    setQuantity,
    unitColors,
    setUnitColor,
    setAllUnitColors,
    initiateCheckout,
    clearError,
  };
}

