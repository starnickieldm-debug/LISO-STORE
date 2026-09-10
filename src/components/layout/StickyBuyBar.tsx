import React, { useEffect, useState } from 'react';
import { brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const StickyBuyBar: React.FC = () => {
  const { currentMarket } = useMarket();
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after hero section (approx 450px)
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside 
      aria-label="Acceso rápido a compra" 
      aria-hidden={!visible}
      style={{ backgroundColor: 'rgba(20, 21, 26, 0.95)' }}
      className={`fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-night-950/95 text-bone border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] md:hidden pb-[env(safe-area-inset-bottom,0px)] transition-transform ease-mech-s ${
        prefersReduced ? 'duration-0' : 'duration-300'
      } ${
        visible ? 'translate-y-0 pointer-events-auto' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="max-w-md mx-auto px-3.5 py-1.5 min-h-[58px] flex items-center justify-between gap-3">
        {/* Price & Guarantee Microcopy */}
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-base font-display font-bold tracking-tight text-bone leading-tight">
            {currentMarket.formattedPrice}
          </span>
          <span className="text-[11px] font-sans text-bone/70 truncate leading-none mt-0.5">
            Envío gratis a toda Colombia
          </span>
        </div>

        {/* Action Button: Minimum 52px height as required, with active tap feedback */}
        <a
          href="#oferta"
          className="h-[48px] xs:h-[52px] px-5 sm:px-6 bg-accent hover:bg-accent-hover active:scale-[0.98] text-white font-semibold text-sm tracking-wide uppercase flex items-center justify-center transition-all flex-shrink-0 shadow-lg shadow-accent/20"
        >
          Pedir LISO
        </a>
      </div>
    </aside>
  );
};
