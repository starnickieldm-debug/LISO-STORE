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
      className="w-full relative text-white text-[10.5px] sm:text-[11px] font-sans font-semibold border-b border-black/20 select-none overflow-hidden shadow-inner"
      style={{ backgroundColor: '#A11868' }}
    >
      {/* Horizontal Silk Texture Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <picture>
          <source srcSet="/images/textures/trust-bar-silk-horizontal.webp" type="image/webp" />
          <img 
            src="/images/textures/trust-bar-silk-horizontal.jpg" 
            alt="" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
          />
        </picture>
        {/* Subtle dark tint to guarantee crystal-clear text contrast */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1480px] mx-auto px-3 sm:px-8 lg:px-12 flex items-center justify-center text-center h-[26px] sm:h-[28px]">
        {/* Desktop View (>= 640px): All 3 points displayed inline on a single line */}
        <p className="hidden sm:flex items-center justify-center gap-x-3.5 sm:gap-x-4 tracking-wider uppercase whitespace-nowrap text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          <span>Envío gratis a toda Colombia</span>
          <span className="text-white/80 font-bold">·</span>
          <span>Pago seguro con PSE y tarjetas</span>
          <span className="text-white/80 font-bold">·</span>
          <span>Garantía legal de 30 días</span>
        </p>

        {/* Mobile View (< 640px): 100% Mobile-First Single-Line Ticker (Zero vertical growth, zero text stacking) */}
        <div className="flex sm:hidden items-center justify-center gap-2 tracking-wider uppercase h-full w-full whitespace-nowrap text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
          <span 
            key={activeIdx}
            className={`transition-opacity duration-300 truncate text-[10px] xs:text-[10.5px] font-sans font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${
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
                  i === activeIdx ? 'w-2.5 bg-white' : 'w-1 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
