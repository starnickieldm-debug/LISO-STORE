import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Compass } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';

interface RotatingPlateVisualProps {
  className?: string;
}

export const RotatingPlateVisual: React.FC<RotatingPlateVisualProps> = ({ className = '' }) => {
  const [angle, setAngle] = useState<0 | 45 | 90>(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const prefersReduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const hasAutoRotated = useRef(false);

  // Auto-demonstrate rotation once when entering view (if motion not reduced)
  useEffect(() => {
    if (inView && !hasAutoRotated.current && !prefersReduced) {
      hasAutoRotated.current = true;
      const t1 = setTimeout(() => handleSelectAngle(45), 600);
      const t2 = setTimeout(() => handleSelectAngle(90), 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [inView, prefersReduced]);

  const handleSelectAngle = (newAngle: 0 | 45 | 90) => {
    if (newAngle === angle) return;
    setIsSnapping(true);
    setAngle(newAngle);
    if (!prefersReduced) {
      setTimeout(() => setIsSnapping(false), 350);
    } else {
      setIsSnapping(false);
    }
  };

  const angleDescriptions = {
    0: '0° · Horizontal (prendas en plano o percha abierta)',
    45: '45° · Esquinas, sisas y pliegues estrechos',
    90: '90° · Vertical directa entre botones y cuellos'
  };

  return (
    <div 
      ref={ref}
      className={`relative w-full bg-night-900/95 border border-white/15 p-5 sm:p-7 flex flex-col justify-between shadow-dark-card select-none rounded-none ${className}`}
    >
      {/* Visual Header */}
      <div className="flex items-center justify-between text-xs font-sans font-medium text-bone/70 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-accent animate-spin-slow" />
          <span className="font-semibold text-bone uppercase tracking-wider text-[11px]">
            MECANISMO GIRATORIO 90°
          </span>
        </div>
        <span className="font-mono tabular-specs text-[11px] px-2 py-0.5 bg-white/10 text-accent font-bold">
          {angle}° ACTIVO
        </span>
      </div>

      {/* Central Rotating Stage */}
      <div className="relative my-6 sm:my-8 h-48 sm:h-56 flex items-center justify-center overflow-hidden">
        
        {/* Background Compass / Protractor Dial */}
        <div className="absolute w-44 sm:w-52 h-44 sm:h-52 rounded-full border border-dashed border-white/20 flex items-center justify-center pointer-events-none">
          {/* Degree Ticks */}
          <span className="absolute top-2 font-mono text-[9px] text-bone/40 font-bold">90°</span>
          <span className="absolute right-2 font-mono text-[9px] text-bone/40 font-bold">0°</span>
          <span className="absolute top-6 right-6 font-mono text-[9px] text-bone/40 font-bold">45°</span>
          <div className="w-full h-[1px] bg-white/10 absolute top-1/2 left-0" />
          <div className="h-full w-[1px] bg-white/10 absolute top-0 left-1/2" />
        </div>

        {/* Rotating Iron Head & Plate Assembly */}
        <div
          className={`relative w-36 sm:w-44 h-16 sm:h-20 flex items-center justify-center transition-transform ${
            prefersReduced ? 'duration-0' : 'duration-350 ease-mech-overshoot'
          } ${isSnapping ? 'scale-[1.03]' : 'scale-100'}`}
          style={{ transform: `rotate(-${angle}deg)` }}
        >
          {/* Ceramic Soleplate Shape */}
          <div className="relative w-full h-full bg-night-800 rounded-[28px] border-2 border-accent shadow-rim-warm flex items-center justify-between px-4 py-2">
            
            {/* Steam Vents Graphic */}
            <div className="flex items-center gap-1.5 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            </div>

            {/* Plate Core Spec */}
            <div className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
              PLACA 150°C
            </div>

            {/* Tip marker */}
            <div className="w-2.5 h-2.5 rotate-45 border-t-2 border-r-2 border-accent" />
          </div>

          {/* Pivot Axis Indicator */}
          <div className="absolute w-5 h-5 rounded-full bg-night-950 border-2 border-accent shadow-sm flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

      </div>

      {/* Degree feedback caption */}
      <div className="text-center pb-4">
        <p className="font-mono text-xs text-bone/80 font-medium">
          {angleDescriptions[angle]}
        </p>
      </div>

      {/* Mechanical 3-Angle Selector Controls (Mobile & Desktop Tactile Fallback) */}
      <div className="pt-3 border-t border-white/10">
        <div className="text-[10px] font-sans uppercase tracking-wider text-bone/50 mb-2 font-semibold text-center">
          Haz clic o pulsa para girar la placa:
        </div>
        <div className="grid grid-cols-3 gap-2">
          {([0, 45, 90] as const).map((deg) => (
            <button
              key={deg}
              type="button"
              onClick={() => handleSelectAngle(deg)}
              className={`py-2 px-1 text-center font-mono text-xs uppercase tracking-tight font-bold transition-all border ${
                angle === deg
                  ? 'bg-accent text-white border-accent shadow-subtle scale-[1.02]'
                  : 'bg-white/5 text-bone/70 border-white/15 hover:border-white/40 hover:text-white'
              }`}
              aria-label={`Rotar placa a ${deg} grados`}
            >
              <span>{deg}°</span>
              <span className="block text-[9px] font-sans font-normal opacity-75 truncate">
                {deg === 0 ? 'Horizontal' : deg === 45 ? 'Cuello' : 'Vertical'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
