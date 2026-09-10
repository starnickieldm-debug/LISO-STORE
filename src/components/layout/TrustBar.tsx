import React, { useState, useEffect } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const TrustBar: React.FC = () => {
  const { currentMarket } = useMarket();
  const prefersReduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const trustItems = [
    'Envío gratis a toda Colombia',
    'Pago seguro con PSE y tarjetas',
    'Garantía legal de 30 días'
  ];

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % trustItems.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [trustItems.length, prefersReduced]);

  return (
    <aside 
      aria-label="Condiciones de compra y confianza" 
      className="w-full bg-night-950 text-bone/80 text-[11px] sm:text-xs font-sans font-semibold border-b border-white/10 select-none overflow-hidden"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      <div className="max-w-[1480px] mx-auto px-3 sm:px-8 lg:px-12 flex items-center justify-center text-center h-8 sm:h-9">
        {/* Desktop View (>= 640px): All 3 points displayed inline on a single line */}
        <p className="hidden sm:flex items-center justify-center gap-x-3.5 sm:gap-x-4 tracking-wider uppercase whitespace-nowrap">
          <span>Envío gratis a toda Colombia</span>
          <span className="text-accent font-bold">·</span>
          <span>Pago seguro con PSE y tarjetas</span>
          <span className="text-accent font-bold">·</span>
          <span>Garantía legal de 30 días</span>
        </p>

        {/* Mobile View (< 640px): 100% Mobile-First Single-Line Ticker (Zero vertical growth, zero text stacking) */}
        <div className="flex sm:hidden items-center justify-center gap-2 tracking-wider uppercase h-full w-full whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse" />
          <span 
            key={activeIdx}
            className={`transition-opacity duration-300 truncate text-[10.5px] xs:text-[11px] font-sans ${
              prefersReduced ? 'opacity-100' : 'animate-fadeIn'
            }`}
          >
            {trustItems[activeIdx]}
          </span>
          <div className="flex items-center gap-1 pl-1 shrink-0">
            {trustItems.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeIdx ? 'w-2.5 bg-accent' : 'w-1 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
