import React from 'react';
import { productSpecs } from '../../config/siteContent';
import { useInView } from '../../hooks/useInView';

export const DataStrip: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref} className="relative z-30 w-full bg-night-950/80 backdrop-blur-sm border-y border-white/[0.07] py-2 sm:py-3 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-[1480px] mx-auto grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between gap-x-4 sm:gap-x-5 gap-y-2.5 sm:gap-y-2 text-[11px] sm:text-xs font-sans tracking-wider text-bone/80">
        
        {/* Spec Item 1: Potencia */}
        <div className={`flex items-center gap-2 transition-all duration-250 ease-mech-s ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
            <span className="font-sans font-bold text-bone text-xs sm:text-[13px]">{productSpecs.power}</span>
            <span className="text-bone/45 text-[9px] sm:text-[11px] tracking-widest font-normal uppercase">POTENCIA</span>
          </div>
        </div>

        <span className="hidden sm:inline text-white/10 font-thin">|</span>

        {/* Spec Item 2: Temperatura */}
        <div className={`flex items-center gap-2 transition-all duration-250 ease-mech-s delay-[60ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
            <span className="font-sans font-bold text-bone text-xs sm:text-[13px]">{productSpecs.maxTemperature}</span>
            <span className="text-bone/45 text-[9px] sm:text-[11px] tracking-widest font-normal uppercase">DIGITAL</span>
          </div>
        </div>

        <span className="hidden sm:inline text-white/10 font-thin">|</span>

        {/* Spec Item 3: Depósito y prendas */}
        <div className={`flex items-center gap-2 transition-all duration-250 ease-mech-s delay-[120ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
            <span className="font-sans font-bold text-bone text-xs sm:text-[13px]">{productSpecs.tankCapacity} ≈ {productSpecs.garmentsPerTank}</span>
            <span className="text-bone/45 text-[9px] sm:text-[11px] tracking-widest font-normal uppercase sm:hidden">CAPACIDAD</span>
          </div>
        </div>

        <span className="hidden sm:inline text-white/10 font-thin">|</span>

        {/* Spec Item 4: Tiempo de calentamiento */}
        <div className={`flex items-center gap-2 transition-all duration-250 ease-mech-s delay-[180ms] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
            <span className="font-sans font-bold text-bone text-xs sm:text-[13px]">{productSpecs.heatUpTime}</span>
            <span className="text-bone/45 text-[9px] sm:text-[11px] tracking-widest font-normal uppercase">AL ARRANQUE</span>
          </div>
        </div>

      </div>

      {/* Decorative hairline progress underline */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-accent/25 transition-transform duration-600 ease-vapor-m origin-left ${
          inView ? 'scale-x-100' : 'scale-x-0'
        }`} 
      />
    </div>
  );
};
