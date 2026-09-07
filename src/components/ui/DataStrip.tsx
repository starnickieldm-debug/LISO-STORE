import React from 'react';
import { productSpecs } from '../../config/siteContent';
import { useInView } from '../../hooks/useInView';

export const DataStrip: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className="relative z-30 w-full bg-night-900 border-y border-white/10 py-3.5 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-[1480px] mx-auto flex flex-wrap items-center justify-between gap-y-2.5 gap-x-6 text-xs sm:text-[13px] font-sans uppercase tracking-wider text-bone font-semibold">
        
        {/* Spec Item 1: Potencia */}
        <div className={`flex items-center gap-2 transition-all duration-250 ease-mech-s ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(180,36,124,0.6)]" />
          <span className="font-bold text-white">{productSpecs.power}</span>
          <span className="text-bone/60 hidden md:inline text-[11px] font-medium tracking-wide">POTENCIA CONTINUA</span>
        </div>

        <span className="hidden sm:inline text-white/15">|</span>

        {/* Spec Item 2: Temperatura */}
        <div className={`flex items-center gap-2 transition-all duration-250 ease-mech-s delay-[60ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="font-bold text-white">{productSpecs.maxTemperature}</span>
          <span className="text-bone/60 hidden md:inline text-[11px] font-medium tracking-wide">EN PANTALLA DIGITAL</span>
        </div>

        <span className="hidden sm:inline text-white/15">|</span>

        {/* Spec Item 3: Depósito y prendas */}
        <div className={`flex items-center gap-2 transition-all duration-250 ease-mech-s delay-[120ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="font-bold text-white">{productSpecs.tankCapacity} ≈ {productSpecs.garmentsPerTank}</span>
        </div>

        <span className="hidden sm:inline text-white/15">|</span>

        {/* Spec Item 4: Tiempo de calentamiento */}
        <div className={`flex items-center gap-2 transition-all duration-250 ease-mech-s delay-[180ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(180,36,124,0.6)]" />
          <span className="font-bold text-white">{productSpecs.heatUpTime}</span>
          <span className="text-bone/60 text-[11px] font-medium tracking-wide">AL ARRANQUE</span>
        </div>

      </div>

      {/* Decorative hairline progress underline */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-accent/40 transition-transform duration-600 ease-vapor-m origin-left ${
          inView ? 'scale-x-100' : 'scale-x-0'
        }`} 
      />
    </div>
  );
};
