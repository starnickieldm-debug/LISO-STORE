import React, { useState, useRef, useEffect, useId } from 'react';
import { useMarket } from '../../context/MarketContext';
import { CountryCode } from '../../types/market';
import { ChevronDown, Check } from 'lucide-react';

interface CountrySelectorProps {
  variant?: 'navbar' | 'footer' | 'drawer';
  className?: string;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { currentMarket, setMarket, availableMarkets } = useMarket();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: CountryCode) => {
    setMarket(code);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  if (variant === 'drawer') {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="text-[11px] font-sans uppercase tracking-widest text-bone/60 font-semibold block">
          País / Región
        </label>
        <div className="grid grid-cols-1 gap-1.5 bg-white/5 border border-white/10 p-1.5">
          {availableMarkets.map((market) => {
            const isSelected = market.countryCode === currentMarket.countryCode;
            return (
              <button
                key={market.countryCode}
                type="button"
                onClick={() => setMarket(market.countryCode)}
                className={`flex items-center justify-between px-3 py-2.5 text-sm font-sans transition-all text-left ${
                  isSelected
                    ? 'bg-accent text-white font-semibold'
                    : 'text-bone/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base" aria-hidden="true">{market.flag}</span>
                  <span>{market.countryName}</span>
                </span>
                <span className="text-xs font-mono opacity-80">
                  {market.formattedPrice}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const isFooter = variant === 'footer';

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`País actual: ${currentMarket.countryName}. Haz clic para cambiar de país.`}
        className={
          isFooter
            ? "flex items-center gap-2 px-3 py-1.5 text-xs font-sans text-bone/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40"
            : "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-sans font-medium text-bone/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40"
        }
      >
        <span className="text-sm sm:text-base leading-none" aria-hidden="true">
          {currentMarket.flag}
        </span>
        <span className="tracking-wide">
          {currentMarket.countryName}
        </span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-bone/60 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
          aria-hidden="true" 
        />
      </button>

      {/* Floating Dropdown */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Seleccionar país o región"
          className={`absolute z-[70] mt-1.5 w-56 sm:w-64 bg-night-900/95 backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.7)] py-1.5 animate-fadeIn ${
            isFooter ? 'bottom-full mb-1.5 left-0' : 'right-0'
          }`}
          style={{ backgroundColor: 'rgba(18, 19, 24, 0.98)' }}
        >
          <div className="px-3 py-1.5 border-b border-white/10 mb-1">
            <p className="text-[10px] font-mono uppercase tracking-widest text-bone/50">
              Mercado y Moneda Local
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto py-0.5">
            {availableMarkets.map((market) => {
              const isSelected = market.countryCode === currentMarket.countryCode;
              return (
                <button
                  key={market.countryCode}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => handleSelect(market.countryCode)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-sans transition-colors text-left ${
                    isSelected
                      ? 'bg-accent/20 text-white font-semibold'
                      : 'text-bone/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0" aria-hidden="true">
                      {market.flag}
                    </span>
                    <span className="truncate">{market.countryName}</span>
                  </span>

                  <span className="flex items-center gap-2 text-[11px] font-mono text-bone/60 shrink-0 ml-2">
                    <span>{market.formattedPrice}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-accent stroke-[2.5]" aria-hidden="true" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 border-t border-white/10 mt-1">
            <p className="text-[10px] font-sans text-bone/50 text-center">
              Envío GRATIS a todos los destinos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
