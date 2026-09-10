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
        <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
        </span>
      );
    }
    if (verdict === 'bad') {
      return (
        <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
          <X className="w-3 h-3 text-red-400/80 stroke-[2.5]" />
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
        <Minus className="w-3 h-3 text-bone/40 stroke-[2.5]" />
      </span>
    );
  };

  const renderLisoIcon = (verdict?: 'bad' | 'neutral' | 'good') => {
    if (verdict === 'good') {
      return (
        <span className="w-5 h-5 rounded-full bg-accent/25 border border-accent/40 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(180,36,124,0.3)]">
          <Check className="w-3 h-3 text-accent stroke-[3]" />
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
        <Minus className="w-3 h-3 text-bone/60 stroke-[2.5]" />
      </span>
    );
  };

  return (
    <section 
      id="comparativa" 
      className="py-20 sm:py-28 bg-night-900 text-bone border-b border-night-700 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#121318' }}
    >
      {/* Ambient Warm Glow */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.08)_0%,transparent_65%)] blur-2xl" 
        aria-hidden="true" 
      />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          title="¿Y cómo se compara con una plancha normal?"
          subtitle="Depende de lo que quieras hacer. Para una pila de ropa, hay herramientas mejores. Para arreglarte rápido antes de salir, LISO juega en otra liga."
          theme="dark"
        />

        {/* =========================================================================
            DESKTOP HIGH-SCAN COMPARISON TABLE (>= 768px)
            ========================================================================= */}
        <Reveal direction="up" duration={700} className="hidden md:block">
          <div ref={ref} className="relative rounded-2xl border border-white/10 bg-night-950/90 shadow-2xl overflow-hidden">
            
            <div className="overflow-x-auto horizontal-scroll-touch overscroll-x-contain">
              <table className="w-full text-left border-collapse min-w-[700px]">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-white/10 bg-night-900/95">
                    <th className="py-4 px-6 text-xs font-sans font-bold uppercase tracking-wider text-bone/60 w-[24%]">
                      CRITERIO
                    </th>
                    <th className="py-4 px-5 text-xs font-sans font-semibold uppercase tracking-wider text-bone/60 w-[24%] border-l border-white/5">
                      PLANCHA + TABLA
                    </th>
                    <th className="py-4 px-5 text-xs font-sans font-semibold uppercase tracking-wider text-bone/60 w-[24%] border-l border-white/5">
                      VAPORIZADOR BARATO
                    </th>
                    <th className="relative py-4 px-6 text-xs font-sans uppercase tracking-wider text-bone w-[28%] bg-accent/[0.08] border-l border-accent/25 overflow-hidden">
                      {/* Animated hairline drawing rule */}
                      <div 
                        className={`absolute top-0 left-0 right-0 h-[3px] bg-accent transition-transform duration-600 ease-vapor-m origin-left ${
                          inView ? 'scale-x-100' : 'scale-x-0'
                        }`} 
                      />
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          <span className="font-bold text-sm text-white tracking-wide">{brandConfig.name}</span>
                        </div>
                        <span className="text-[10px] bg-accent text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          RECOMENDADO
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                  {comparisonRows.map((row, idx) => {
                    const isLast = idx === comparisonRows.length - 1;

                    return (
                      <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                        {/* 1. Criterio */}
                        <td className="py-4 px-6 font-medium text-bone">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-bone/40 font-semibold">0{idx + 1}</span>
                            <span className="font-sans font-semibold text-bone/90">{row.feature}</span>
                          </div>
                        </td>
                        
                        {/* 2. Plancha Tradicional */}
                        <td className="py-4 px-5 border-l border-white/5">
                          <div className="flex items-start gap-2.5">
                            {renderCompetitorIcon(row.traditionalVerdict)}
                            <div className="space-y-0.5">
                              <span className="font-semibold text-bone/85 text-xs sm:text-[13px] block">
                                {row.traditionalHighlight}
                              </span>
                              <span className="text-bone/50 text-[11.5px] block leading-tight">
                                {row.traditionalIron}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 3. Vaporizador Barato */}
                        <td className="py-4 px-5 border-l border-white/5">
                          <div className="flex items-start gap-2.5">
                            {renderCompetitorIcon(row.steamerVerdict)}
                            <div className="space-y-0.5">
                              <span className="font-semibold text-bone/85 text-xs sm:text-[13px] block">
                                {row.steamerHighlight}
                              </span>
                              <span className="text-bone/50 text-[11.5px] block leading-tight">
                                {row.cheapSteamer}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 4. LISO (Destacada) */}
                        <td className={`py-4 px-6 bg-accent/[0.08] border-l border-accent/25 ${isLast ? 'bg-accent/[0.05]' : ''}`}>
                          <div className="flex items-start gap-2.5">
                            {renderLisoIcon(row.lisoVerdict)}
                            <div className="space-y-0.5">
                              <span className="font-bold text-white text-xs sm:text-[13.5px] block tracking-tight">
                                {row.lisoHighlight}
                              </span>
                              <span className="text-bone/80 text-[11.5px] block leading-snug">
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
            <div className="p-3.5 bg-night-900/95 border-t border-white/10 text-[11px] font-sans text-bone/50 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>*Comparativa basada en especificaciones estándar de mercado para Colombia</span>
              <span className="font-sans text-[10.5px] italic text-bone/45">{brandConfig.labClaimNote}</span>
            </div>

          </div>
        </Reveal>

        {/* =========================================================================
            MOBILE HIGH-SCAN CARDS (< 768px)
            ========================================================================= */}
        <div className="block md:hidden">
          
          {/* Competitor Selector Pills */}
          <div className="space-y-2 mb-4">
            <span className="font-sans text-[10px] uppercase tracking-widest text-bone/50 font-bold block text-center">
              COMPARAR LISO CONTRA:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => setCompareTarget('traditional')}
                className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all cursor-pointer ${
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
                className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all cursor-pointer ${
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
                className="p-3.5 bg-night-950/90 rounded-2xl border border-white/10 shadow-lg space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-accent font-bold">
                    0{idx + 1} · {row.feature}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {/* LISO Column */}
                  <div className="bg-accent/15 border border-accent/35 p-3 rounded-xl space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-[11.5px] tracking-wide">LISO</span>
                      {renderLisoIcon(row.lisoVerdict)}
                    </div>
                    <span className="font-bold text-white text-[12.5px] block leading-tight">
                      {row.lisoHighlight}
                    </span>
                    <p className="text-bone/80 text-[11px] leading-snug">
                      {row.liso}
                    </p>
                  </div>

                  {/* Competitor Column */}
                  <div className="bg-white/[0.03] border border-white/10 p-3 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-bone/50 text-[10.5px] font-semibold uppercase tracking-wider block truncate">
                        {compareTarget === 'traditional' ? 'Plancha + Tabla' : 'Vaporizador'}
                      </span>
                      {renderCompetitorIcon(compareTarget === 'traditional' ? row.traditionalVerdict : row.steamerVerdict)}
                    </div>
                    <span className="font-semibold text-bone/80 text-[12px] block leading-tight">
                      {compareTarget === 'traditional' ? row.traditionalHighlight : row.steamerHighlight}
                    </span>
                    <p className="text-bone/60 text-[11px] leading-snug">
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
          <div className="mt-10 sm:mt-14 text-center max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-display font-medium text-bone leading-relaxed">
                Para una pila de ropa, usa una plancha. Para una prenda que necesitas lista en cinco minutos, usa LISO.
              </p>
              <p className="text-sm font-sans text-bone/70">
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
