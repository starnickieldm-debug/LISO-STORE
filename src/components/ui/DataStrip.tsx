import React from 'react';
import { productSpecs } from '../../config/siteContent';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const DataStrip: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const specItems = [
    { value: productSpecs.power, label: "POTENCIA CONTINUA", isAccent: true },
    { value: productSpecs.maxTemperature, label: "PANTALLA DIGITAL", isAccent: false },
    { value: `${productSpecs.tankCapacity} ≈ ${productSpecs.garmentsPerTank}`, label: "AUTONOMÍA", isAccent: false },
    { value: productSpecs.heatUpTime, label: "CALENTAMIENTO RÁPIDO", isAccent: true },
    { value: "0° — 45° — 90°", label: "PLACA GIRATORIA", isAccent: false },
    { value: "Aluminio Inyectado", label: "CÁMARA TÉRMICA", isAccent: false },
    { value: "Vapor Continuo", label: "PRESIÓN CONSTANTE", isAccent: true },
    { value: "110V Colombia", label: "ENCHUFE DIRECTO", isAccent: false },
  ];

  const renderItem = (item: typeof specItems[0], index: number, prefix: string) => (
    <div 
      key={`${prefix}-${index}`} 
      className="inline-flex items-center gap-2.5 sm:gap-3.5 px-6 sm:px-8 shrink-0"
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${item.isAccent ? 'bg-accent shadow-[0_0_8px_rgba(180,36,124,0.4)]' : 'bg-graphite/35'}`} />
      <div className="flex items-baseline gap-2">
        <span className="font-sans font-bold text-graphite text-sm sm:text-[15px] tracking-tight">
          {item.value}
        </span>
        <span className="text-graphite/60 text-[11px] sm:text-xs tracking-widest font-medium uppercase">
          {item.label}
        </span>
      </div>
      <span className="text-graphite/20 font-thin text-sm sm:text-base ml-4 sm:ml-6 select-none">|</span>
    </div>
  );

  return (
    <aside 
      aria-label="Especificaciones clave de rendimiento en movimiento continuo"
      className="relative z-30 w-full border-y border-graphite/15 py-3.5 sm:py-4.5 overflow-hidden select-none shadow-sm"
      style={{ backgroundColor: 'rgba(250, 248, 245, 0.96)' }}
    >
      <div className="marquee-container">
        <div 
          className="marquee-track flex items-center"
          style={prefersReduced ? { animation: 'none' } : { animationDuration: '30s' }}
        >
          {/* First set */}
          <div className="flex items-center shrink-0">
            {specItems.map((item, idx) => renderItem(item, idx, 'set1'))}
          </div>
          {/* Duplicate set for infinite seamless loop */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {specItems.map((item, idx) => renderItem(item, idx, 'set2'))}
          </div>
        </div>
      </div>
    </aside>
  );
};
