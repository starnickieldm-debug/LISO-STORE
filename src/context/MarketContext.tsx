import React, { createContext, useContext, useState, useEffect } from 'react';
import { CountryCode, MarketConfig, MarketContextValue } from '../types/market';
import { MARKETS, AVAILABLE_MARKETS, DEFAULT_COUNTRY_CODE } from '../config/markets';
import { detectBrowserMarket, saveMarket } from '../utils/marketDetection';

const MarketContext = createContext<MarketContextValue | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState<CountryCode>(() => {
    return detectBrowserMarket();
  });

  const handleSetMarket = (code: CountryCode) => {
    if (MARKETS[code]) {
      setCurrentCountry(code);
      saveMarket(code);
    }
  };

  const currentMarket: MarketConfig = MARKETS[currentCountry] || MARKETS[DEFAULT_COUNTRY_CODE];

  const value: MarketContextValue = {
    currentMarket,
    setMarket: handleSetMarket,
    availableMarkets: AVAILABLE_MARKETS,
  };

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  );
};

export function useMarket(): MarketContextValue {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
