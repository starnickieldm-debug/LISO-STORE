import React, { useState } from 'react';
import { brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';
import { Reveal } from '../ui/Reveal';

interface LiquidComparisonRow {
  feature: string;
  liso: string;
  traditional: string;
  steamer: string;
}

export const liquidComparisonRows: LiquidComparisonRow[] = [
  {
    feature: "Tiempo de calentamiento",
    liso: "Lista en ~15 segundos",
    traditional: "Demora varios minutos",
    steamer: "1–2 minutos",
  },
  {
    feature: "¿Requiere tabla?",
    liso: "Directo en gancho o superficie",
    traditional: "Obligatoria (tabla voluminosa)",
    steamer: "Solo uso vertical",
  },
  {
    feature: "Placa y definición",
    liso: "Suela cerámica a 150 °C (cuellos y puños)",
    traditional: "Buena presión, pero pesada",
    steamer: "Sin placa caliente (vapor difuso)",
  },
  {
    feature: "Control antigoteo",
    liso: "Cámara sellada (cero fugas)",
    traditional: "Puede condensar con el uso",
    steamer: "Gotea con frecuencia al inclinar",
  },
  {
    feature: "Espacio y portabilidad",
    liso: "Compacta, cabe en maleta o cajón",
    traditional: "Ocupa espacio de clóset",
    steamer: "Cuerpo voluminoso",
  },
  {
    feature: "Caso de uso ideal",
    liso: "Prendas del día a día en 2–3 min",
    traditional: "Tandas grandes de ropa semanal",
    steamer: "Prendas muy leves sin exigencia",
  },
];

export const ComparisonSection: React.FC = () => {
  const { currentMarket } = useMarket();
  const [compareTarget, setCompareTarget] = useState<'traditional' | 'steamer'>('traditional');

  const renderCellValue = (text: string) => {
    return <span>{text.replace(/‼️|!!/g, '').trim()}</span>;
  };

  return (
    <section 
      id="comparativa" 
      className="pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-18 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32"
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

      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        {/* =========================================================================
            ASYMMETRICAL 2-COLUMN HEADER (Liquid+ DTC Reference Logic)
            Left: Brand vs. The Rest Title + Tag | Right: Editorial Thesis Paragraph
            ========================================================================= */}
        <Reveal direction="up" duration={650}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-graphite tracking-tight leading-[1.12]">
                LISO<sup className="text-accent text-lg sm:text-xl font-sans">®</sup>{' '}
                <span className="italic font-normal font-display text-accent">vs.</span>{' '}
                el resto
              </h2>
            </div>

            <div className="max-w-lg lg:text-right">
              <p className="text-sm sm:text-[15px] font-sans text-graphite/75 leading-relaxed">
                El punto exacto entre dos extremos. La plancha pesada es para tandas grandes de sábanas; los vaporizadores baratos escupen agua y calientan poco. <strong className="font-semibold text-graphite">LISO®</strong> está hecha para dejarte impecable en 3 minutos.
              </p>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            DESKTOP PILL CARDS SEGMENTED MATRIX (>= 768px)
            Liquid+ Logic: Free-floating cutouts (zero boxes/badges), discrete rounded pills,
            LISO column highlighted in soft solid brand wash, direct column-anchored CTA
            ========================================================================= */}
        <Reveal direction="up" duration={700} className="hidden md:block">
          <div className="space-y-3 sm:space-y-3.5">
            
            {/* 1. Header Row (Col 1: Metric Spacer, Col 2: LISO Hero, Col 3: Plancha, Col 4: Vaporizador) */}
            <div className="grid grid-cols-[1.1fr_1.35fr_1.2fr_1.2fr] gap-3 sm:gap-3.5 items-center pb-2">
              {/* Col 1 Empty Spacer */}
              <div aria-hidden="true" />

              {/* Col 2: LISO Floating Cutout + Title (No box container) */}
              <div className="flex items-center justify-center gap-3.5 py-1 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src="/images/liso-pure-cutout.webp" 
                    alt="Plancha de vapor portátil LISO" 
                    className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(180,36,124,0.18)]"
                  />
                </div>
                <div className="text-left">
                  <span className="font-display font-bold text-lg sm:text-xl text-graphite block tracking-tight leading-tight">
                    {brandConfig.name}<sup className="text-accent text-xs font-sans">®</sup>
                  </span>
                  <span className="text-[11px] sm:text-xs font-sans text-accent font-bold tracking-wider uppercase block mt-0.5">
                    Plancha Portátil
                  </span>
                </div>
              </div>

              {/* Col 3: Plancha tradicional Floating Cutout + Title (No box container) */}
              <div className="flex items-center justify-center gap-3.5 py-1 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src="/images/comp-iron-board-cutout.webp" 
                    alt="Plancha tradicional con tabla de planchar" 
                    className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
                  />
                </div>
                <div className="text-left">
                  <span className="font-sans font-bold text-sm sm:text-base text-graphite block leading-tight">
                    Plancha tradicional
                  </span>
                  <span className="text-[11px] sm:text-xs font-sans text-graphite/55 block mt-0.5">
                    Con tabla de planchar
                  </span>
                </div>
              </div>

              {/* Col 4: Vaporizador común Floating Cutout + Title (No box container) */}
              <div className="flex items-center justify-center gap-3.5 py-1 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src="/images/comp-common-steamer-cutout.webp" 
                    alt="Vaporizador vertical común de plástico" 
                    className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
                  />
                </div>
                <div className="text-left">
                  <span className="font-sans font-bold text-sm sm:text-base text-graphite block leading-tight">
                    Vaporizador común
                  </span>
                  <span className="text-[11px] sm:text-xs font-sans text-graphite/55 block mt-0.5">
                    Vertical de plástico
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Matrix Rows (Segmented Discrete Rounded Pill Cards - Liquid+ Density) */}
            {liquidComparisonRows.map((row) => (
              <div 
                key={row.feature} 
                className="grid grid-cols-[1.1fr_1.35fr_1.2fr_1.2fr] gap-3 sm:gap-3.5 items-stretch"
              >
                {/* Col 1: Criterio */}
                <div className="rounded-2xl bg-white/95 border border-graphite/10 p-3.5 sm:p-4 px-4 sm:px-5 flex items-center justify-start shadow-xs">
                  <span className="font-sans font-bold text-graphite text-xs sm:text-[13.5px] leading-snug">
                    {row.feature}
                  </span>
                </div>

                {/* Col 2: LISO (Hero Columna Ganadora - Tinte Sólido de Marca) */}
                <div className="rounded-2xl bg-[#F6EAF1] border-2 border-accent/35 p-3.5 sm:p-4 px-3 sm:px-4 flex items-center justify-center text-center shadow-xs transition-all hover:border-accent/60 hover:scale-[1.01]">
                  <span className="font-sans font-bold text-graphite text-xs sm:text-[14px] leading-snug">
                    {row.liso}
                  </span>
                </div>

                {/* Col 3: Plancha tradicional */}
                <div className="rounded-2xl bg-white/90 border border-graphite/10 p-3.5 sm:p-4 px-3 sm:px-4 flex items-center justify-center text-center shadow-xs transition-colors hover:bg-white">
                  <span className="font-sans font-semibold text-graphite/80 text-xs sm:text-[13.5px] leading-snug">
                    {renderCellValue(row.traditional)}
                  </span>
                </div>

                {/* Col 4: Vaporizador común */}
                <div className="rounded-2xl bg-white/90 border border-graphite/10 p-3.5 sm:p-4 px-3 sm:px-4 flex items-center justify-center text-center shadow-xs transition-colors hover:bg-white">
                  <span className="font-sans font-semibold text-graphite/80 text-xs sm:text-[13.5px] leading-snug">
                    {renderCellValue(row.steamer)}
                  </span>
                </div>
              </div>
            ))}

            {/* 3. CTA Button directly anchored beneath LISO column (Liquid+ Formula) */}
            <div className="grid grid-cols-[1.1fr_1.35fr_1.2fr_1.2fr] gap-3 sm:gap-3.5 pt-2 items-center">
              <div aria-hidden="true" />
              <div>
                <CTAButton 
                  href="#oferta" 
                  size="large" 
                  className="w-full py-3.5 sm:py-4 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 text-xs sm:text-[13px] font-bold tracking-wide"
                >
                  Pide la tuya – {currentMarket.formattedPrice}
                </CTAButton>
              </div>
              <div aria-hidden="true" />
              <div aria-hidden="true" />
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
            Liquid+ Logic: Free-floating cutouts, tactile competitor switcher,
            ultra-minimalist 1-3 word pill comparison cards, anchored CTA
            ========================================================================= */}
        <div className="block md:hidden space-y-4">
          
          {/* Competitor Selector Pills */}
          <div className="space-y-2 mb-3">
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
                Plancha tradicional
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
                Vaporizador común
              </button>
            </div>
          </div>

          {/* Visual Dual Product Preview for Mobile with Floating Cutouts (No box containers) */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            {/* LISO */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[9px] bg-accent text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 shadow-xs">
                RECOMENDADO
              </span>
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src="/images/liso-pure-cutout.webp" 
                  alt="LISO" 
                  className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(180,36,124,0.18)]"
                />
              </div>
              <span className="font-display font-bold text-sm text-graphite mt-1">
                {brandConfig.name}<sup className="text-accent text-[10px]">®</sup>
              </span>
              <span className="text-[10px] font-sans text-accent font-medium">Plancha Portátil</span>
            </div>

            {/* Competitor */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[9px] text-graphite/50 font-sans font-bold uppercase tracking-wider mb-1.5 py-0.5">
                {compareTarget === 'traditional' ? 'TRADICIONAL' : 'GENÉRICO'}
              </span>
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={compareTarget === 'traditional' ? '/images/comp-iron-board-cutout.webp' : '/images/comp-common-steamer-cutout.webp'} 
                  alt={compareTarget === 'traditional' ? 'Plancha tradicional' : 'Vaporizador común'} 
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
                />
              </div>
              <span className="font-sans font-bold text-sm text-graphite mt-1">
                {compareTarget === 'traditional' ? 'Plancha + Tabla' : 'Vaporizador'}
              </span>
              <span className="text-[10px] font-sans text-graphite/50">
                {compareTarget === 'traditional' ? 'Pesada y voluminosa' : 'Vertical común'}
              </span>
            </div>
          </div>

          {/* Feature Pill Cards Mobile (Ultra-Minimalist Liquid+ Style) */}
          <div className="space-y-2.5">
            {liquidComparisonRows.map((row) => {
              const compValue = compareTarget === 'traditional' ? row.traditional : row.steamer;

              return (
                <div key={row.feature} className="space-y-1">
                  {/* Metric / Criterio Pill */}
                  <div className="px-3.5 py-1.5 bg-white/95 rounded-xl border border-graphite/10 shadow-xs flex items-center justify-between">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-graphite/75 font-bold">
                      {row.feature}
                    </span>
                    <span className="text-[9px] font-sans text-graphite/40 uppercase tracking-wider">CRITERIO</span>
                  </div>

                  {/* 2-Column Side-by-Side Confrontation Cards */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                    {/* LISO */}
                    <div className="bg-[#F6EAF1] border-2 border-accent/35 p-3 rounded-xl flex items-center justify-center text-center shadow-xs min-h-[48px]">
                      <span className="font-bold text-graphite text-[12.5px] leading-snug">
                        {row.liso}
                      </span>
                    </div>

                    {/* Competitor */}
                    <div className="bg-white border border-graphite/10 p-3 rounded-xl flex items-center justify-center text-center shadow-xs min-h-[48px]">
                      <span className="font-semibold text-graphite/80 text-[12px] leading-snug">
                        {renderCellValue(compValue)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile CTA Button */}
          <div className="mt-5">
            <CTAButton 
              href="#oferta" 
              size="large" 
              className="w-full shadow-lg shadow-accent/25 py-3.5 text-xs font-bold tracking-wide"
            >
              Pide la tuya – {currentMarket.formattedPrice}
            </CTAButton>
          </div>

          <p className="text-[10px] font-sans text-graphite/45 italic text-center pt-2">
            {brandConfig.labClaimNote}
          </p>

        </div>

        {/* Honest concluding statement - Compact Editorial Ribbon */}
        <Reveal direction="up" delay={100} duration={600}>
          <div className="mt-6 sm:mt-8 text-center max-w-2xl mx-auto py-3 px-4 sm:py-3.5 sm:px-6 rounded-2xl bg-white/80 border border-graphite/10 shadow-xs backdrop-blur-xs">
            <p className="text-xs sm:text-[13.5px] font-display font-medium text-graphite leading-snug">
              Para una pila de ropa, usa una plancha. Para una prenda que necesitas lista en 3 minutos, usa <strong className="text-accent font-semibold">LISO</strong>.
            </p>
            <p className="text-[11px] sm:text-xs font-sans text-graphite/60 mt-0.5">
              LISO está hecha exactamente para esos momentos.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
