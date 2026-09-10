import React, { useState } from 'react';
import { honestyLabelData, brandConfig } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Check, X, Cable } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const HonestyLabelSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const prefersReduced = useReducedMotion();
  const [mobileTab, setMobileTab] = useState<'does' | 'doesNot'>('does');

  return (
    <section 
      id="etiqueta" 
      className="py-20 sm:py-28 bg-bone border-b border-graphite/10 scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#EFEBE2', color: '#262320' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <SectionHeader
          title="Te contamos la verdad sobre LISO."
          subtitle="Lo que hace increíblemente bien, y lo que simplemente no está hecha para hacer."
          align="center"
        />

        {/* Nutritional-Style Technical Label Card with Thermal Print Effect */}
        <Reveal direction="up" duration={700}>
          <div ref={ref} className="bg-white border-2 border-graphite p-4 sm:p-8 lg:p-10 shadow-card relative">
            
            {/* Label Header */}
            <div className="border-b-4 border-graphite pb-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-graphite">
                  LO QUE PUEDES ESPERAR DE LISO
                </h3>
                <div className="text-left sm:text-right">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-accent block">
                    LISO · PLANCHA A VAPOR
                  </span>
                  <span className="text-xs font-sans text-graphite/70 font-medium block">
                    Depósito: 100 ml
                  </span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                DESKTOP TWO-COLUMN MATRIX (>= 768px) — 100% Unchanged
                ========================================================================= */}
            <div className="hidden md:grid grid-cols-2 gap-8 lg:gap-12 pb-8 border-b-2 border-graphite">
              
              {/* COL 1: QUÉ HACE */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-graphite">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <h4 className="font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-graphite">
                    DONDE LISO REALMENTE BRILLA
                  </h4>
                </div>

                <ul className="space-y-4 pt-1">
                  {honestyLabelData.does.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-2.5 text-sm sm:text-[15px] text-graphite leading-relaxed transition-all duration-200 ease-mech-s"
                      style={prefersReduced ? undefined : {
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 14px, 0)',
                        transition: `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 50}ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 50}ms`,
                        willChange: inView ? 'auto' : 'opacity, transform'
                      }}
                    >
                      <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-1 stroke-[2.5]" />
                      <div className="space-y-0.5">
                        <p className="font-bold text-graphite leading-snug">{item.title}</p>
                        <p className="text-graphite/75 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COL 2: QUÉ NO HACE */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-graphite">
                  <span className="w-5 h-5 rounded-full bg-graphite text-white flex items-center justify-center">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <h4 className="font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-graphite">
                    PARA LO QUE NO ESTÁ HECHA
                  </h4>
                </div>

                <ul className="space-y-4 pt-1">
                  {honestyLabelData.doesNot.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-2.5 text-sm sm:text-[15px] text-graphite leading-relaxed transition-all duration-200 ease-mech-s"
                      style={prefersReduced ? undefined : {
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 14px, 0)',
                        transition: `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${(idx + honestyLabelData.does.length) * 50}ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${(idx + honestyLabelData.does.length) * 50}ms`,
                        willChange: inView ? 'auto' : 'opacity, transform'
                      }}
                    >
                      <X className="w-4 h-4 text-accent flex-shrink-0 mt-1 stroke-[2.5]" />
                      <div className="space-y-0.5">
                        <p className="font-bold text-graphite leading-snug">{item.title}</p>
                        <p className="text-graphite/75 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* =========================================================================
                MOBILE SEGMENTED CONTROL (< 768px) — 100% Native Mobile App Experience
                ========================================================================= */}
            <div className="block md:hidden pb-6 border-b-2 border-graphite">
              
              {/* Segmented Tab Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-graphite/5 border border-graphite/20 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setMobileTab('does')}
                  className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all ${
                    mobileTab === 'does'
                      ? 'bg-graphite text-white shadow-sm'
                      : 'text-graphite/60 hover:text-graphite active:bg-graphite/10'
                  }`}
                >
                  Lo que hace mejor ({honestyLabelData.does.length})
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('doesNot')}
                  className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all ${
                    mobileTab === 'doesNot'
                      ? 'bg-graphite text-white shadow-sm'
                      : 'text-graphite/60 hover:text-graphite active:bg-graphite/10'
                  }`}
                >
                  Para lo que no es ({honestyLabelData.doesNot.length})
                </button>
              </div>

              {/* Active Tab List */}
              {mobileTab === 'does' ? (
                <ul className="space-y-3 pt-1 animate-fadeIn">
                  {honestyLabelData.does.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite leading-relaxed">
                      <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                      <div className="space-y-0.5">
                        <p className="font-bold text-graphite leading-snug">{item.title}</p>
                        <p className="text-graphite/75 text-[11px] sm:text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3 pt-1 animate-fadeIn">
                  {honestyLabelData.doesNot.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite leading-relaxed">
                      <X className="w-4 h-4 text-accent flex-shrink-0 mt-0.5 stroke-[2.5]" />
                      <div className="space-y-0.5">
                        <p className="font-bold text-graphite leading-snug">{item.title}</p>
                        <p className="text-graphite/75 text-[11px] sm:text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

            </div>

            {/* Cable Design Rationale Subcard */}
            <div className="mt-8 pt-4 bg-bone-50/80 border border-graphite/15 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-none bg-graphite text-white flex items-center justify-center flex-shrink-0">
                <Cable className="w-6 h-6 text-accent" />
              </div>
              <div className="space-y-1">
                <h5 className="font-display font-bold text-base sm:text-lg text-graphite">
                  {honestyLabelData.cordRationale.title}
                </h5>
                <p className="text-xs sm:text-sm text-graphite/80 leading-relaxed">
                  {honestyLabelData.cordRationale.description}
                </p>
              </div>
            </div>

            {/* Label Footer Note */}
            <div className="mt-6 pt-3 border-t border-graphite/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-sans font-medium text-graphite/60">
              <span>COMPROMISO DE TRANSPARENCIA LISO</span>
              <span>{brandConfig.labClaimNote}</span>
            </div>

          </div>
        </Reveal>

        {/* Brand statement under label */}
        <Reveal direction="up" delay={150} duration={600}>
          <div className="mt-8 text-center max-w-xl mx-auto">
            <p className="text-xs sm:text-sm text-graphite/65 italic">
              "Queremos que sepas exactamente qué estás comprando."
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
