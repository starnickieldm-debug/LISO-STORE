import React, { useState } from 'react';
import { honestyLabelData, brandConfig } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { Check, X } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const HonestyLabelSection: React.FC = () => {
  const [mobileTab, setMobileTab] = useState<'does' | 'doesNot'>('does');

  return (
    <section 
      id="etiqueta" 
      className="py-12 sm:py-16 lg:py-18 bg-bone border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#EFEBE2', color: '#262320' }}
    >
      {/* Background Texture: Subtle Architecture Grid (Horizontal Landscape) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/images/textures/texture-grid-horizontal.webp" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-10 mix-blend-multiply"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFEBE2]/50 via-transparent to-[#EFEBE2]/60 pointer-events-none" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          title="Te contamos la verdad sobre LISO."
          subtitle="Lo que hace increíblemente bien, y lo que simplemente no está hecha para hacer."
          align="center"
          className="mb-8 sm:mb-10"
        />

        {/* Nutritional-Style Technical Label Card with Thermal Print Effect */}
        <Reveal direction="up" duration={700}>
          <div className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-premium-lg relative overflow-hidden">
            
            {/* Label Header */}
            <div className="border-b border-graphite/10 pb-5 mb-8">
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
                DESKTOP TECHNICAL VERIFICATION MATRIX (>= 768px)
                Col 1 (4 cols): Product Inspection Stage (Visual Anchor with specs)
                Col 2 (8 cols): 2-Column Honesty Matrix (Brilla vs. No está hecha)
                ========================================================================= */}
            <div className="hidden md:grid grid-cols-12 gap-6 lg:gap-8 pb-8 border-b border-graphite/10 items-stretch">
              
              {/* COLUMNA 1 (4 COLS): Panel de Inspección Técnica de Producto */}
              <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl sm:rounded-[24px] p-5 lg:p-6 flex flex-col justify-between relative overflow-hidden shadow-premium-image group">
                {/* Header Tag */}
                <div className="w-full flex items-center justify-between text-[10px] font-sans uppercase tracking-wider text-graphite/60 font-semibold border-b border-graphite/10 pb-2.5">
                  <span>DISPOSITIVO ANALIZADO</span>
                  <span className="text-accent font-bold px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                    SERIE 01
                  </span>
                </div>

                {/* Product Photo Stage with subtle radial aura */}
                <div className="relative w-full aspect-[3/4] max-w-[220px] mx-auto flex items-center justify-center my-3">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(180,36,124,0.08)_0%,transparent_70%)] blur-xl pointer-events-none" />
                  <img 
                    src="/images/liso-pure-cutout.webp" 
                    alt="Plancha a vapor LISO - Vista técnica completa" 
                    className="w-full h-full object-contain relative z-10 group-hover:scale-104 transition-transform duration-500 ease-mech-s drop-shadow-md"
                    loading="lazy"
                  />
                </div>

                {/* Technical Verification Badges */}
                <div className="w-full space-y-2 pt-3 border-t border-graphite/10 font-sans text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-graphite/65">Potencia nominal</span>
                    <span className="font-sans font-bold text-graphite">1200 W directa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-graphite/65">Placa térmica</span>
                    <span className="font-sans font-bold text-graphite">150 °C digital</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-graphite/65">Depósito calibrado</span>
                    <span className="font-sans font-bold text-graphite">100 ml (2–3 prendas)</span>
                  </div>
                </div>
              </div>

              {/* COLUMNA 2 (8 COLS): Matriz Bicolor de Honestidad (2 subcolumnas) */}
              <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                
                {/* SUBCOL A: DONDE REALMENTE BRILLA */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-graphite/10">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <h4 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-graphite">
                      DONDE LISO REALMENTE BRILLA
                    </h4>
                  </div>

                  <ul className="space-y-3.5 pt-1">
                    {honestyLabelData.does.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite leading-relaxed transition-all duration-200 ease-mech-s"
                      >
                        <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <div className="space-y-0.5">
                          <p className="font-bold text-graphite leading-snug">{item.title}</p>
                          <p className="text-graphite/75 text-[11.5px] sm:text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SUBCOL B: PARA LO QUE NO ESTÁ HECHA */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-graphite/10">
                    <span className="w-5 h-5 rounded-full bg-graphite text-white flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <h4 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-graphite">
                      PARA LO QUE NO ESTÁ HECHA
                    </h4>
                  </div>

                  <ul className="space-y-3.5 pt-1">
                    {honestyLabelData.doesNot.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite leading-relaxed transition-all duration-200 ease-mech-s"
                      >
                        <X className="w-4 h-4 text-accent flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <div className="space-y-0.5">
                          <p className="font-bold text-graphite leading-snug">{item.title}</p>
                          <p className="text-graphite/75 text-[11.5px] sm:text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

            {/* =========================================================================
                MOBILE HEROIC PRODUCT STAGE & SEGMENTED CONTROL (< 768px)
                Replicating Liquid+ reference (Image 3): Large Hero Product + Capsule Switcher + Detail Card
                ========================================================================= */}
            <div className="block md:hidden pb-6 border-b border-graphite/10">
              
              {/* 1. Large Heroic Product Showcase (Hero Size, Visible & Impactful) */}
              <div className="relative w-full max-w-[320px] mx-auto mb-4 flex flex-col items-center">
                {/* Background radial steam/magenta glow */}
                <div 
                  className="pointer-events-none absolute inset-0 -m-4 bg-[radial-gradient(ellipse_at_center,rgba(180,36,124,0.14)_0%,rgba(255,195,130,0.08)_45%,transparent_70%)] blur-2xl z-0" 
                  aria-hidden="true" 
                />

                {/* Floating Specs Pill */}
                <div className="relative z-10 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-graphite/[0.04] border border-graphite/12 text-graphite/80 text-[10px] font-sans font-bold uppercase tracking-wider rounded-full shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    SERIE 01 · 1200 W DIRECTA · 150 °C
                  </span>
                </div>

                {/* Large Product Cutout */}
                <div className="relative w-full h-52 sm:h-56 flex items-center justify-center z-10">
                  <img 
                    src="/images/liso-pure-cutout.webp" 
                    alt="Plancha a vapor portátil LISO - Inspección técnica" 
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)] transform scale-105" 
                    loading="lazy" 
                  />
                </div>

                <p className="text-[11px] font-sans text-graphite/60 mt-1 font-medium text-center">
                  Placa giratoria 90° · Pantalla LED en vivo · Depósito 100 ml
                </p>
              </div>

              {/* 2. Capsule Segmented Tab Switcher (Liquid+ Style) */}
              <div className="flex items-center p-1 bg-graphite/[0.05] border border-graphite/15 rounded-full mb-4 max-w-[340px] mx-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => setMobileTab('does')}
                  className={`flex-1 py-2.5 px-3 text-center rounded-full font-sans text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    mobileTab === 'does'
                      ? 'bg-graphite text-white shadow-md'
                      : 'text-graphite/65 hover:text-graphite active:bg-graphite/10'
                  }`}
                >
                  Lo que hace mejor ({honestyLabelData.does.length})
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('doesNot')}
                  className={`flex-1 py-2.5 px-3 text-center rounded-full font-sans text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    mobileTab === 'doesNot'
                      ? 'bg-graphite text-white shadow-md'
                      : 'text-graphite/65 hover:text-graphite active:bg-graphite/10'
                  }`}
                >
                  Para lo que no es ({honestyLabelData.doesNot.length})
                </button>
              </div>

              {/* 3. Detail Content Card */}
              <div className="bg-[#FAF8F5] border border-graphite/12 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="pb-3 mb-3 border-b border-graphite/10 flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm sm:text-base text-graphite tracking-tight">
                    {mobileTab === 'does' ? 'Donde LISO realmente brilla:' : 'Para lo que no está hecha:'}
                  </h4>
                  <span className={`text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded-full ${
                    mobileTab === 'does' ? 'bg-emerald-100 text-emerald-800' : 'bg-accent/15 text-accent'
                  }`}>
                    {mobileTab === 'does' ? '5 Puntos Fuertes' : '3 Limitaciones'}
                  </span>
                </div>

                {/* Active Tab List */}
                {mobileTab === 'does' ? (
                  <ul className="space-y-3.5 pt-1 animate-fadeIn">
                    {honestyLabelData.does.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-bold text-graphite leading-snug">{item.title}</p>
                          <p className="text-graphite/75 text-[11.5px] leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-3.5 pt-1 animate-fadeIn">
                    {honestyLabelData.doesNot.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <div className="space-y-0.5">
                          <p className="font-bold text-graphite leading-snug">{item.title}</p>
                          <p className="text-graphite/75 text-[11.5px] leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>

            {/* Label Footer Note */}
            <div className="mt-8 pt-4 border-t border-graphite/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-sans font-medium text-graphite/60">
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
