import React, { useState } from 'react';
import { comparisonRows, brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { SectionHeader } from '../ui/SectionHeader';
import { CTAButton } from '../ui/CTAButton';
import { useInView } from '../../hooks/useInView';
import { Reveal } from '../ui/Reveal';
import { Check, X, Minus, Sparkles } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const { currentMarket } = useMarket();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [compareTarget, setCompareTarget] = useState<'traditional' | 'steamer'>('traditional');

  const renderCompetitorIcon = (verdict?: 'bad' | 'neutral' | 'good') => {
    if (verdict === 'good') {
      return (
        <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
        </span>
      );
    }
    if (verdict === 'bad') {
      return (
        <span className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
          <X className="w-3 h-3 text-red-600 stroke-[2.5]" />
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full bg-graphite/5 border border-graphite/15 flex items-center justify-center shrink-0">
        <Minus className="w-3 h-3 text-graphite/40 stroke-[2.5]" />
      </span>
    );
  };

  const renderLisoIcon = (verdict?: 'bad' | 'neutral' | 'good') => {
    if (verdict === 'good') {
      return (
        <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0 shadow-sm">
          <Check className="w-3 h-3 text-white stroke-[3]" />
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full bg-graphite/10 border border-graphite/20 flex items-center justify-center shrink-0">
        <Minus className="w-3 h-3 text-graphite/60 stroke-[2.5]" />
      </span>
    );
  };

  return (
    <section 
      id="comparativa" 
      className="py-20 sm:py-28 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#F5F1EA' }}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          title="¿Y cómo se compara con una plancha normal?"
          subtitle="Depende de lo que quieras hacer. Para una pila de ropa, hay herramientas mejores. Para arreglarte rápido antes de salir, LISO juega en otra liga."
        />

        {/* =========================================================================
            DESKTOP HIGH-SCAN COMPARISON TABLE (>= 768px)
            ========================================================================= */}
        <Reveal direction="up" duration={700} className="hidden md:block">
          <div ref={ref} className="relative rounded-2xl border border-graphite/15 bg-white shadow-card overflow-hidden">
            
            <div className="overflow-x-auto horizontal-scroll-touch overscroll-x-contain">
              <table className="w-full text-left border-collapse min-w-[700px]">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-graphite/10 bg-bone-50/80">
                    <th className="py-4 px-6 text-xs font-sans font-bold uppercase tracking-wider text-graphite/60 w-[24%]">
                      CRITERIO
                    </th>
                    <th className="py-4 px-5 text-xs font-sans font-semibold uppercase tracking-wider text-graphite/60 w-[24%] border-l border-graphite/10">
                      PLANCHA + TABLA
                    </th>
                    <th className="py-4 px-5 text-xs font-sans font-semibold uppercase tracking-wider text-graphite/60 w-[24%] border-l border-graphite/10">
                      VAPORIZADOR BARATO
                    </th>
                    <th className="relative py-4 px-6 text-xs font-sans uppercase tracking-wider text-graphite w-[28%] bg-accent/[0.06] border-l border-accent/25 overflow-hidden">
                      {/* Animated hairline drawing rule */}
                      <div 
                        className={`absolute top-0 left-0 right-0 h-[3px] bg-accent transition-transform duration-600 ease-vapor-m origin-left ${
                          inView ? 'scale-x-100' : 'scale-x-0'
                        }`} 
                      />
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          <span className="font-bold text-sm text-graphite tracking-wide">{brandConfig.name}</span>
                        </div>
                        <span className="text-[10px] bg-accent text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          RECOMENDADO
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-graphite/10 text-xs sm:text-sm">
                  {comparisonRows.map((row, idx) => {
                    const isLast = idx === comparisonRows.length - 1;

                    return (
                      <tr key={row.feature} className="hover:bg-graphite/[0.02] transition-colors">
                        {/* 1. Criterio */}
                        <td className="py-4 px-6 font-medium text-graphite">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-graphite/45 font-semibold">0{idx + 1}</span>
                            <span className="font-sans font-semibold text-graphite">{row.feature}</span>
                          </div>
                        </td>
                        
                        {/* 2. Plancha Tradicional */}
                        <td className="py-4 px-5 border-l border-graphite/10">
                          <div className="flex items-start gap-2.5">
                            {renderCompetitorIcon(row.traditionalVerdict)}
                            <div className="space-y-0.5">
                              <span className="font-semibold text-graphite/85 text-xs sm:text-[13px] block">
                                {row.traditionalHighlight}
                              </span>
                              <span className="text-graphite/55 text-[11.5px] block leading-tight">
                                {row.traditionalIron}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 3. Vaporizador Barato */}
                        <td className="py-4 px-5 border-l border-graphite/10">
                          <div className="flex items-start gap-2.5">
                            {renderCompetitorIcon(row.steamerVerdict)}
                            <div className="space-y-0.5">
                              <span className="font-semibold text-graphite/85 text-xs sm:text-[13px] block">
                                {row.steamerHighlight}
                              </span>
                              <span className="text-graphite/55 text-[11.5px] block leading-tight">
                                {row.cheapSteamer}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 4. LISO (Destacada) */}
                        <td className={`py-4 px-6 bg-accent/[0.04] border-l border-accent/20 ${isLast ? 'bg-accent/[0.02]' : ''}`}>
                          <div className="flex items-start gap-2.5">
                            {renderLisoIcon(row.lisoVerdict)}
                            <div className="space-y-0.5">
                              <span className="font-bold text-graphite text-xs sm:text-[13.5px] block tracking-tight">
                                {row.lisoHighlight}
                              </span>
                              <span className="text-graphite/80 text-[11.5px] block leading-snug">
                                {row.liso}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>

            {/* Table Footer Note */}
            <div className="p-3.5 bg-bone-50/80 border-t border-graphite/10 text-[11px] font-sans text-graphite/55 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>*Comparativa basada en especificaciones estándar de mercado para Colombia</span>
              <span className="font-sans text-[10.5px] italic text-graphite/45">{brandConfig.labClaimNote}</span>
            </div>

          </div>
        </Reveal>

        {/* =========================================================================
            MOBILE HIGH-SCAN CARDS (< 768px)
            ========================================================================= */}
        <div className="block md:hidden">
          
          {/* Competitor Selector Pills */}
          <div className="space-y-2 mb-4">
            <span className="font-sans text-[10px] uppercase tracking-widest text-graphite/50 font-bold block text-center">
              COMPARAR LISO CONTRA:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-graphite/[0.04] border border-graphite/10 rounded-xl">
              <button
                type="button"
                onClick={() => setCompareTarget('traditional')}
                className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  compareTarget === 'traditional'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-graphite/60 hover:text-graphite active:bg-graphite/5'
                }`}
              >
                Plancha + Tabla
              </button>
              <button
                type="button"
                onClick={() => setCompareTarget('steamer')}
                className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  compareTarget === 'steamer'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-graphite/60 hover:text-graphite active:bg-graphite/5'
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
                className="p-3.5 bg-white rounded-2xl border border-graphite/15 shadow-card space-y-2.5 text-graphite"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-accent font-bold">
                    0{idx + 1} · {row.feature}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {/* LISO Column */}
                  <div className="bg-accent/[0.06] border border-accent/25 p-3 rounded-xl space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-graphite text-[11.5px] tracking-wide">LISO</span>
                      {renderLisoIcon(row.lisoVerdict)}
                    </div>
                    <span className="font-bold text-graphite text-[12.5px] block leading-tight">
                      {row.lisoHighlight}
                    </span>
                    <p className="text-graphite/80 text-[11px] leading-snug">
                      {row.liso}
                    </p>
                  </div>

                  {/* Competitor Column */}
                  <div className="bg-bone-50 border border-graphite/10 p-3 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-graphite/55 text-[10.5px] font-semibold uppercase tracking-wider block truncate">
                        {compareTarget === 'traditional' ? 'Plancha + Tabla' : 'Vaporizador'}
                      </span>
                      {renderCompetitorIcon(compareTarget === 'traditional' ? row.traditionalVerdict : row.steamerVerdict)}
                    </div>
                    <span className="font-semibold text-graphite/80 text-[12px] block leading-tight">
                      {compareTarget === 'traditional' ? row.traditionalHighlight : row.steamerHighlight}
                    </span>
                    <p className="text-graphite/60 text-[11px] leading-snug">
                      {compareTarget === 'traditional' ? row.traditionalIron : row.cheapSteamer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-sans text-graphite/45 italic text-center pt-3">
            {brandConfig.labClaimNote}
          </p>

        </div>

        {/* Honest concluding statement & CTA */}
        <Reveal direction="up" delay={150} duration={650}>
          <div className="mt-10 sm:mt-14 text-center max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-display font-medium text-graphite leading-relaxed">
                Para una pila de ropa, usa una plancha. Para una prenda que necesitas lista en cinco minutos, usa LISO.
              </p>
              <p className="text-sm font-sans text-graphite/70">
                LISO está hecha exactamente para esos momentos.
              </p>
            </div>
            
            <div>
              <CTAButton href="#oferta" size="large" className="shadow-lg shadow-accent/25 py-3.5 px-8">
                Pedir LISO — {currentMarket.formattedPrice}
              </CTAButton>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
