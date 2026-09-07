export type CountryCode = 'CO' | 'MX' | 'PE' | 'CL' | 'AR' | 'CR' | 'ES';

export interface MarketConfig {
  countryCode: CountryCode;
  countryName: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  price: number;
  formattedPrice: string;
  compareAtPrice?: number;
  formattedCompareAtPrice?: string;
  shippingPrice: number;
  shippingLabel: string;
  locale: string;
  plugType: 'US' | 'EU' | 'UK' | 'AU';
  plugName: string;
  shippingPolicy?: {
    processingTime: string;
    deliveryEstimate: string;
    disclaimer?: string;
  };
  returnsPolicy?: {
    condition: string;
    instructions: string;
  };
  warrantyPolicy?: {
    damagedOrDefective: string;
    disclaimer?: string;
  };
}

export interface MarketContextValue {
  currentMarket: MarketConfig;
  setMarket: (countryCode: CountryCode) => void;
  availableMarkets: MarketConfig[];
}
