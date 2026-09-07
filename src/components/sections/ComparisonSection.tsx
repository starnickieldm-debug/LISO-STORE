import React, { useState } from 'react';
import { comparisonRows, brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';
import { useInView } from '../../hooks/useInView';
import { Reveal } from '../ui/Reveal';

export const ComparisonSection: React.FC = () => {
  const { currentMarket } = useMarket();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [compareTarget, setCompareTarget] = useState<'traditional' | 'steamer'>('traditional');

  return (
    <section 
      id="comparativa" 
      className="py-20 sm:py-28 bg-night-900 text-bone border-b border-night-700 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#121318' }}
    >
      {/* Ambient Layer (a): Radial cálido arriba-izquierda al 8% */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.08)_0%,transparent_65%)] blur-2xl" 
        aria-hidden="true" 
      />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          number="06"
          overline="COMPARATIVA REAL"
          title="¿Y cómo se compara con una plancha normal?"
          subtitle="Depende de lo que quieras hacer. Para una pila de ropa, hay herramientas mejores. Para arreglarte rápido antes de salir, LISO juega en otra liga."
          theme="dark"
        />

        {/* =========================================================================
            DESKTOP TABLE (>= 768px) — 100% Unchanged Full 4-Column Table
            ========================================================================= */}
        <Reveal direction="up" duration={700} className="hidden md:block">
          <div ref={ref} className="relative border border-night-700 bg-night-950/80 shadow-studio-hard-dark overflow-hidden">
            
            <div className="overflow-x-auto horizontal-scroll-touch overscroll-x-contain">
              <table className="w-full text-left border-collapse min-w-[580px] sm:min-w-[640px]">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-night-700 bg-night-900/90">
                    <th className="sticky left-0 bg-night-900 z-20 py-3 sm:py-4 px-3 sm:px-6 text-xs font-sans font-semibold uppercase tracking-wider text-bone/60 w-[125px] min-w-[125px] sm:w-1/4 sm:min-w-none border-r border-night-700 shadow-[3px_0_12px_rgba(0,0,0,0.7)]">
                      CRITERIO
                    </th>
                    <th className="py-3 sm:py-4 px-3.5 sm:px-5 text-xs font-sans font-semibold uppercase tracking-wider text-bone/60 w-1/4 border-r border-night-700">
                      PLANCHA + TABLA
                    </th>
                    <th className="py-3 sm:py-4 px-3.5 sm:px-5 text-xs font-sans font-semibold uppercase tracking-wider text-bone/60 w-1/4 border-r border-night-700">
                      VAPORIZADOR DE MANO
                    </th>
                    <th className="relative py-3 sm:py-4 px-3.5 sm:px-5 text-xs font-sans font-semibold uppercase tracking-wider text-bone bg-night-800/80 w-1/4 overflow-hidden border-r border-night-700">
                      {/* Animated hairline drawing rule */}
                      <div 
                        className={`absolute top-0 left-0 right-0 h-[3px] bg-accent transition-transform duration-600 ease-vapor-m origin-left ${
                          inView ? 'scale-x-100' : 'scale-x-0'
                        }`} 
                      />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-bone">{brandConfig.name}</span>
                        <span className="text-[10px] bg-accent px-1.5 py-0.5 text-white font-semibold uppercase">
                          RETOQUE DIARIO
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-night-700/70 text-xs sm:text-sm">
                  {comparisonRows.map((row, idx) => {
                    const isLast = idx === comparisonRows.length - 1;

                    return (
                      <tr key={row.feature} className={`hover:bg-white/[0.03] transition-colors ${idx % 2 === 1 ? 'bg-white/[0.015]' : ''}`}>
                        {/* Sticky 1st column */}
                        <td className="sticky left-0 bg-night-950 z-10 py-3 px-3 sm:py-3.5 sm:px-6 font-medium text-bone border-r border-night-700 shadow-[3px_0_12px_rgba(0,0,0,0.7)] text-xs sm:text-sm">
                          {row.feature}
                        </td>
                        
                        {/* Plancha Tradicional */}
                        <td className="py-3 px-3.5 sm:py-3.5 sm:px-5 text-bone/70 border-r border-night-700/60 text-xs sm:text-sm">
                          {row.traditionalIron}
                        </td>

                        {/* Vaporizador barato */}
                        <td className="py-3 px-3.5 sm:py-3.5 sm:px-5 text-bone/70 border-r border-night-700/60 text-xs sm:text-sm">
                          {row.cheapSteamer}
                        </td>

                        {/* LISO */}
                        <td className={`py-3 px-3.5 sm:py-3.5 sm:px-5 font-semibold text-bone bg-accent/10 border-r border-night-700/60 text-xs sm:text-sm ${isLast ? 'text-bone/60 font-normal italic' : 'text-bone'}`}>
                          {row.liso}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>

            {/* Table Footer Note */}
            <div className="p-3 bg-night-900/90 border-t border-night-700 text-[11px] font-sans font-medium text-bone/50 flex items-center justify-between">
              <span>*Comparativa basada en especificaciones estándar de mercado</span>
              <span className="font-mono text-[10px]">{brandConfig.labClaimNote}</span>
            </div>

          </div>
        </Reveal>

        {/* =========================================================================
            MOBILE FACE-TO-FACE COMPARISON (< 768px) — 100% Native Mobile Experience
            ========================================================================= */}
        <div className="block md:hidden">
          
          {/* Competitor Selector Pills */}
          <div className="space-y-2 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-bone/50 font-semibold block text-center">
              COMPARA DIRECTAMENTE CONTRA:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => setCompareTarget('traditional')}
                className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all ${
                  compareTarget === 'traditional'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-bone/60 hover:text-bone active:bg-white/5'
                }`}
              >
                Plancha + Tabla
              </button>
              <button
                type="button"
                onClick={() => setCompareTarget('steamer')}
                className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all ${
                  compareTarget === 'steamer'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-bone/60 hover:text-bone active:bg-white/5'
                }`}
              >
                Vaporizador Barato
              </button>
            </div>
          </div>

          {/* Direct 1-on-1 Feature Cards */}
          <div className="space-y-3">
            {comparisonRows.map((row, idx) => (
              <div 
                key={row.feature}
                className="p-3.5 bg-night-950/90 rounded-xl border border-white/10 shadow-md space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-bold">
                    0{idx + 1} · {row.feature}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {/* LISO Column */}
                  <div className="bg-accent/15 border border-accent/30 p-2.5 rounded-lg space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="font-bold text-bone text-[11px] tracking-wide">LISO</span>
                    </div>
                    <p className="text-bone font-medium text-[12px] leading-snug">
                      {row.liso}
                    </p>
                  </div>

                  {/* Competitor Column */}
                  <div className="bg-white/[0.03] border border-white/[0.08] p-2.5 rounded-lg space-y-1">
                    <span className="text-bone/50 text-[10px] font-semibold uppercase tracking-wider block truncate">
                      {compareTarget === 'traditional' ? 'Plancha tradicional' : 'Vaporizador'}
                    </span>
                    <p className="text-bone/65 text-[12px] leading-snug">
                      {compareTarget === 'traditional' ? row.traditionalIron : row.cheapSteamer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-sans text-bone/40 italic text-center pt-3">
            {brandConfig.labClaimNote}
          </p>

        </div>

        {/* Honest concluding statement & CTA */}
        <Reveal direction="up" delay={150} duration={650}>
          <div className="mt-10 sm:mt-12 text-center max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-display font-medium text-bone leading-relaxed">
                Para una pila de ropa, usa una plancha. Para una prenda que necesitas lista en cinco minutos, usa LISO.
              </p>
              <p className="text-sm font-sans text-bone/70">
                LISO está hecha exactamente para esos momentos.
              </p>
            </div>
            
            <div>
              <CTAButton href="#oferta" size="default">
                Quiero LISO — {currentMarket.formattedPrice}
              </CTAButton>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
