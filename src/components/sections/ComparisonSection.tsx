import React, { useState } from 'react';
import { comparisonRows, brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';
import { Reveal } from '../ui/Reveal';
import { Check, X, Minus, Sparkles, Flame, Wind, CheckCircle2 } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const { currentMarket } = useMarket();
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
        <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0 shadow-xs">
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
      className="py-12 sm:py-16 lg:py-18 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      {/* Background Texture: Pleated Silk (Horizontal Landscape) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/images/textures/texture-pleated-silk.webp" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-25 mix-blend-multiply filter contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/50 via-transparent to-[#FAF8F5]/60 pointer-events-none" />
      </div>

      <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        {/* =========================================================================
            ASYMMETRICAL 2-COLUMN HEADER (Liquid+ DTC Reference Logic)
            Left: Brand vs. The Rest Title + Tag | Right: Editorial Thesis Paragraph
            ========================================================================= */}
        <Reveal direction="up" duration={650}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-graphite/10 mb-6 sm:mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Comparativa de Rendimiento Diario</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-graphite tracking-tight leading-[1.12]">
                LISO<sup className="text-accent text-lg sm:text-xl font-sans">®</sup>{' '}
                <span className="italic font-normal font-display text-accent">vs.</span>{' '}
                el resto
              </h2>
            </div>

            <div className="max-w-lg lg:text-right">
              <p className="text-sm sm:text-[15px] font-sans text-graphite/75 leading-relaxed">
                Depende de lo que quieras hacer. Para una pila de ropa de toda la semana, hay herramientas mejores. Para arreglarte rápido en 5 minutos antes de salir, <strong className="font-semibold text-graphite">LISO juega en otra liga</strong>.
              </p>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            DESKTOP PILL CARDS SEGMENTED MATRIX (>= 768px)
            Liquid+ Logic: Discrete rounded cards with gap, LISO in Col 2 (Hero),
            Visual product avatars on header, direct column-anchored CTA button
            ========================================================================= */}
        <Reveal direction="up" duration={700} className="hidden md:block">
          <div className="space-y-3.5 sm:space-y-4">
            
            {/* 1. Header Row (Col 1: Metric, Col 2: LISO Hero, Col 3: Plancha, Col 4: Vaporizador) */}
            <div className="grid grid-cols-[1.05fr_1.45fr_1.2fr_1.2fr] gap-3.5 sm:gap-4 lg:gap-4.5 items-end">
              {/* Col 1 Label */}
              <div className="h-16 rounded-2xl bg-white/40 border border-graphite/10 px-5 sm:px-6 flex items-center justify-start text-xs font-mono font-bold tracking-wider text-graphite/50 uppercase">
                CRITERIO
              </div>

              {/* Col 2: LISO Header Card (Hero) */}
              <div className="rounded-2xl bg-[#FAF0F5] border-2 border-accent/40 p-3.5 sm:p-4 px-5 sm:px-6 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-accent to-graphite/40 shadow-sm overflow-hidden shrink-0">
                    <img 
                      src="/images/liso-main.webp" 
                      alt="LISO Steamer" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display italic font-bold text-base text-graphite tracking-tight">
                        {brandConfig.name}
                      </span>
                      <span className="text-[10px] font-mono text-accent font-semibold">CARE</span>
                    </div>
                    <span className="text-[10.5px] font-sans text-graphite/60 block">Placa giratoria + vapor</span>
                  </div>
                </div>
                <span className="text-[10px] bg-accent text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  RECOMENDADO
                </span>
              </div>

              {/* Col 3: Plancha + Tabla Header Card */}
              <div className="h-16 rounded-2xl bg-white/80 border border-graphite/12 px-4 sm:px-4.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-graphite/[0.05] border border-graphite/12 flex items-center justify-center text-graphite/55 shrink-0">
                  <Flame className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-xs sm:text-[13px] text-graphite block truncate">
                    Plancha + Tabla
                  </span>
                  <span className="text-[10.5px] font-sans text-graphite/50 block truncate">
                    Pesada y tradicional
                  </span>
                </div>
              </div>

              {/* Col 4: Vaporizador Barato Header Card */}
              <div className="h-16 rounded-2xl bg-white/80 border border-graphite/12 px-4 sm:px-4.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-graphite/[0.05] border border-graphite/12 flex items-center justify-center text-graphite/55 shrink-0">
                  <Wind className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-xs sm:text-[13px] text-graphite block truncate">
                    Vaporizador común
                  </span>
                  <span className="text-[10.5px] font-sans text-graphite/50 block truncate">
                    Vertical de plástico
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Matrix Rows (Segmented Discrete Pill Cards) */}
            {comparisonRows.map((row, idx) => (
              <div 
                key={row.feature} 
                className="grid grid-cols-[1.05fr_1.45fr_1.2fr_1.2fr] gap-3.5 sm:gap-4 lg:gap-4.5 items-stretch"
              >
                {/* Col 1: Criterio */}
                <div className="rounded-2xl bg-white/90 border border-graphite/12 p-4 sm:p-4.5 px-5 sm:px-6 flex items-center gap-3 shadow-xs transition-colors hover:bg-white">
                  <span className="text-[11px] font-mono text-graphite/40 font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="font-sans font-bold text-graphite text-xs sm:text-[13.5px] leading-snug">
                    {row.feature}
                  </span>
                </div>

                {/* Col 2: LISO (Hero Columna Destacada con tinte rosa/porcelana) */}
                <div className="rounded-2xl bg-[#FAF0F5] border-2 border-accent/40 p-4 sm:p-4.5 px-5 sm:px-6 flex flex-col justify-center shadow-xs transition-all hover:border-accent/60 hover:shadow-sm">
                  <div className="flex items-center gap-2">
                    {renderLisoIcon(row.lisoVerdict)}
                    <span className="font-bold text-graphite text-xs sm:text-[14px] tracking-tight">
                      {row.lisoHighlight}
                    </span>
                  </div>
                  <p className="text-graphite/75 text-[11.5px] sm:text-xs font-normal leading-snug mt-1 pl-7">
                    {row.liso}
                  </p>
                </div>

                {/* Col 3: Plancha + Tabla */}
                <div className="rounded-2xl bg-white/80 border border-graphite/12 p-4 sm:p-4.5 px-5 sm:px-6 flex flex-col justify-center shadow-xs transition-colors hover:bg-white">
                  <div className="flex items-center gap-2">
                    {renderCompetitorIcon(row.traditionalVerdict)}
                    <span className="font-semibold text-graphite/85 text-xs sm:text-[13.5px] tracking-tight">
                      {row.traditionalHighlight}
                    </span>
                  </div>
                  <p className="text-graphite/55 text-[11.5px] sm:text-xs font-normal leading-snug mt-1 pl-7">
                    {row.traditionalIron}
                  </p>
                </div>

                {/* Col 4: Vaporizador Barato */}
                <div className="rounded-2xl bg-white/80 border border-graphite/12 p-4 sm:p-4.5 px-5 sm:px-6 flex flex-col justify-center shadow-xs transition-colors hover:bg-white">
                  <div className="flex items-center gap-2">
                    {renderCompetitorIcon(row.steamerVerdict)}
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-graphite/85 text-xs sm:text-[13.5px] tracking-tight">
                        {row.steamerHighlight}
                      </span>
                      {row.steamerVerdict === 'bad' && (
                        <span className="text-accent font-bold text-xs" title="Falla crítica">!!</span>
                      )}
                    </div>
                  </div>
                  <p className="text-graphite/55 text-[11.5px] sm:text-xs font-normal leading-snug mt-1 pl-7">
                    {row.cheapSteamer}
                  </p>
                </div>
              </div>
            ))}

            {/* 3. Column Anchor CTA Button directly beneath LISO column (Liquid+ Formula) */}
            <div className="grid grid-cols-[1.05fr_1.45fr_1.2fr_1.2fr] gap-3.5 sm:gap-4 lg:gap-4.5 pt-2 items-center">
              <div /> {/* Col 1 spacer */}
              <div>
                <CTAButton 
                  href="#oferta" 
                  size="large" 
                  className="w-full py-3.5 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 text-xs sm:text-[13px] font-semibold tracking-wide"
                >
                  Pedir LISO — {currentMarket.formattedPrice}
                </CTAButton>
              </div>
              <div /> {/* Col 3 spacer */}
              <div /> {/* Col 4 spacer */}
            </div>

            {/* 4. Table Footnote Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-sans text-graphite/55 px-1">
              <span>*Comparativa basada en especificaciones estándar de mercado para Colombia</span>
              <span className="italic text-graphite/45">{brandConfig.labClaimNote}</span>
            </div>

          </div>
        </Reveal>

        {/* =========================================================================
            MOBILE PILL CARDS MATRIX (< 768px)
            Tactile pills with toggle, direct side-by-side confrontation cards
            ========================================================================= */}
        <div className="block md:hidden">
          
          {/* Competitor Selector Pills */}
          <div className="space-y-2 mb-4">
            <span className="font-sans text-[10.5px] uppercase tracking-widest text-graphite/55 font-bold block text-center">
              COMPARAR LISO CONTRA:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-graphite/[0.04] border border-graphite/10 rounded-xl">
              <button
                type="button"
                onClick={() => setCompareTarget('traditional')}
                className={`flex-1 py-2 px-2 text-center rounded-lg font-sans text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  compareTarget === 'traditional'
                    ? 'bg-accent text-white shadow-xs'
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
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-graphite/60 hover:text-graphite active:bg-graphite/5'
                }`}
              >
                Vaporizador Común
              </button>
            </div>
          </div>

          {/* Feature Pill Cards */}
          <div className="space-y-3.5">
            {comparisonRows.map((row, idx) => (
              <div 
                key={row.feature}
                className="space-y-2"
              >
                {/* Metric / Criterio Pill */}
                <div className="p-2.5 bg-white/90 rounded-xl border border-graphite/12 shadow-xs flex items-center justify-between">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-accent font-bold">
                    0{idx + 1} · {row.feature}
                  </span>
                  <span className="text-[10px] font-mono text-graphite/40 uppercase">CRITERIO</span>
                </div>

                {/* 2-Column Side-by-Side Confrontation Cards */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {/* LISO Highlight Card */}
                  <div className="bg-[#FAF0F5] border-2 border-accent/35 p-3 rounded-xl space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-graphite text-[11.5px] tracking-wide">LISO</span>
                      {renderLisoIcon(row.lisoVerdict)}
                    </div>
                    <span className="font-bold text-graphite text-[12.5px] block leading-tight">
                      {row.lisoHighlight}
                    </span>
                    <p className="text-graphite/75 text-[11px] leading-snug">
                      {row.liso}
                    </p>
                  </div>

                  {/* Competitor Card */}
                  <div className="bg-white border border-graphite/12 p-3 rounded-xl space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-graphite/55 text-[10px] font-semibold uppercase tracking-wider block truncate">
                        {compareTarget === 'traditional' ? 'Plancha + Tabla' : 'Vaporizador'}
                      </span>
                      {renderCompetitorIcon(compareTarget === 'traditional' ? row.traditionalVerdict : row.steamerVerdict)}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-graphite/80 text-[12px] block leading-tight">
                        {compareTarget === 'traditional' ? row.traditionalHighlight : row.steamerHighlight}
                      </span>
                      {compareTarget === 'steamer' && row.steamerVerdict === 'bad' && (
                        <span className="text-accent font-bold text-xs">!!</span>
                      )}
                    </div>
                    <p className="text-graphite/60 text-[11px] leading-snug">
                      {compareTarget === 'traditional' ? row.traditionalIron : row.cheapSteamer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA Button */}
          <div className="mt-6">
            <CTAButton 
              href="#oferta" 
              size="large" 
              className="w-full shadow-lg shadow-accent/25 py-3.5 text-xs font-semibold tracking-wide"
            >
              Pedir LISO — {currentMarket.formattedPrice}
            </CTAButton>
          </div>

          <p className="text-[10px] font-sans text-graphite/45 italic text-center pt-3">
            {brandConfig.labClaimNote}
          </p>

        </div>

        {/* Honest concluding statement */}
        <Reveal direction="up" delay={150} duration={650}>
          <div className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto space-y-3 p-6 sm:p-8 rounded-3xl bg-white/70 border border-graphite/12 shadow-xs backdrop-blur-xs">
            <p className="text-base sm:text-lg font-display font-medium text-graphite leading-relaxed">
              Para una pila de ropa, usa una plancha. Para una prenda que necesitas lista en cinco minutos, usa LISO.
            </p>
            <p className="text-xs sm:text-sm font-sans text-graphite/70">
              LISO está hecha exactamente para esos momentos.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
