import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface TickerItem {
  text: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface MovingTickerBarProps {
  items: (string | TickerItem)[];
  theme?: 'dark' | 'light';
  speedSeconds?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const MovingTickerBar: React.FC<MovingTickerBarProps> = ({
  items,
  theme = 'light',
  speedSeconds = 34,
  className = '',
  style
}) => {
  const prefersReduced = useReducedMotion();
  const isDark = theme === 'dark';

  const renderItem = (item: string | TickerItem, key: string) => {
    const isObj = typeof item === 'object' && item !== null;
    const text = isObj ? item.text : item;
    const badge = isObj ? item.badge : null;
    const icon = isObj ? item.icon : null;

    return (
      <div key={key} className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 shrink-0">
        {icon && <span className="shrink-0 text-accent">{icon}</span>}
        {badge && (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            isDark ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-accent text-white'
          }`}>
            {badge}
          </span>
        )}
        <span className={`font-sans font-semibold text-xs sm:text-[13px] tracking-wider uppercase whitespace-nowrap ${
          isDark ? 'text-bone/90' : 'text-graphite/90'
        }`}>
          {text}
        </span>
        <span className="text-accent font-bold text-xs shrink-0 select-none ml-2">✦</span>
      </div>
    );
  };

  return (
    <aside
      aria-label="Cinta de información en movimiento"
      className={`w-full py-2.5 sm:py-3 border-y select-none overflow-hidden relative ${
        isDark 
          ? 'bg-night-950 border-white/10 text-bone' 
          : 'bg-[#EFEAE0] border-graphite/10 text-graphite'
      } ${className}`}
      style={{
        backgroundColor: isDark ? '#262320' : '#EFEAE0',
        ...style
      }}
    >
      <div className="marquee-container">
        <div 
          className="marquee-track flex items-center"
          style={prefersReduced ? { animation: 'none' } : { animationDuration: `${speedSeconds}s` }}
        >
          {/* First set */}
          <div className="flex items-center shrink-0">
            {items.map((it, i) => renderItem(it, `set1-${i}`))}
          </div>
          {/* Duplicate set for infinite seamless loop */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {items.map((it, i) => renderItem(it, `set2-${i}`))}
          </div>
        </div>
      </div>
    </aside>
  );
};
