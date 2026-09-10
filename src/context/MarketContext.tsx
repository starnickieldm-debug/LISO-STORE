import React, { createContext, useContext } from 'react';
import { MarketConfig, MarketContextValue } from '../types/market';
import { MARKETS, AVAILABLE_MARKETS } from '../config/markets';

const MarketContext = createContext<MarketContextValue | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentMarket: MarketConfig = MARKETS.CO;

  const value: MarketContextValue = {
    currentMarket,
    setMarket: () => {},
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
