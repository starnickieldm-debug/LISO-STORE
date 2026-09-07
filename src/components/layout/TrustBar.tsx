import React from 'react';
import { useMarket } from '../../context/MarketContext';

export const TrustBar: React.FC = () => {
  const { currentMarket } = useMarket();

  return (
    <aside 
      aria-label="Condiciones de compra y confianza" 
      className="w-full bg-night-950 text-bone/75 text-[11px] sm:text-xs font-sans font-semibold py-2.5 px-4 tracking-wider uppercase border-b border-white/10 select-none"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-center text-center">
        <p className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 gap-y-1">
          <span>{currentMarket.shippingLabel}</span>
          <span className="text-accent font-bold">·</span>
          <span>Pago 100% seguro</span>
          <span className="text-accent font-bold">·</span>
          <span>Atención postventa</span>
        </p>
      </div>
    </aside>
  );
};
