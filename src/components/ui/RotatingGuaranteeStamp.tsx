import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface RotatingGuaranteeStampProps {
  className?: string;
  size?: number;
  circularText?: string;
  centerText?: string;
}

export const RotatingGuaranteeStamp: React.FC<RotatingGuaranteeStampProps> = ({
  className = '',
  size = 110,
  circularText = '★ GARANTÍA LEGAL ★ COMPRA PROTEGIDA',
  centerText = '30 DÍAS'
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Sello de confianza: Garantía legal y compra protegida"
    >
      {/* Rotating SVG with curved circular text */}
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full animate-spin-slow text-bone/60"
      >
        <defs>
          <path
            id="circlePath"
            d="M 60, 60 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
          />
        </defs>
        
        {/* Subtle circular boundary hairlines */}
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />

        {/* Circular text */}
        <text 
          className="text-[8px] font-sans font-bold uppercase tracking-[0.24em] fill-bone"
        >
          <textPath href="#circlePath" startOffset="0%">
            {circularText}
          </textPath>
        </text>
      </svg>

      {/* Static center shield icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <ShieldCheck className="w-5 h-5 text-accent stroke-[2.2] drop-shadow-[0_0_8px_rgba(180,36,124,0.5)]" />
        <span className="text-[8.5px] font-sans font-bold text-bone tracking-wider uppercase mt-0.5">
          {centerText}
        </span>
      </div>
    </div>
  );
};
