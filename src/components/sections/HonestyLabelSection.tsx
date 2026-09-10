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
          <div className="bg-white border-2 border-graphite p-4 sm:p-8 lg:p-10 shadow-card relative">
            
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
                DESKTOP TECHNICAL VERIFICATION MATRIX (>= 768px)
                Col 1 (4 cols): Product Inspection Stage (Visual Anchor with specs)
                Col 2 (8 cols): 2-Column Honesty Matrix (Brilla vs. No está hecha)
                ========================================================================= */}
            <div className="hidden md:grid grid-cols-12 gap-6 lg:gap-8 pb-8 border-b-2 border-graphite items-stretch">
              
              {/* COLUMNA 1 (4 COLS): Panel de Inspección Técnica de Producto */}
              <div className="col-span-12 lg:col-span-4 bg-graphite/[0.025] border border-graphite/15 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
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
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-graphite">
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
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-graphite">
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
                MOBILE SEGMENTED CONTROL (< 768px)
                ========================================================================= */}
            <div className="block md:hidden pb-6 border-b-2 border-graphite">
              
              {/* Mobile Visual Header Card */}
              <div className="bg-graphite/[0.03] border border-graphite/15 rounded-2xl p-4 mb-4 text-center">
                <div className="flex items-center justify-between text-[9.5px] font-sans text-graphite/60 uppercase tracking-wider mb-2">
                  <span>MUESTRA VERIFICADA</span>
                  <span className="text-accent font-bold">SERIE 01 · 1200 W</span>
                </div>
                <div className="w-24 h-24 mx-auto flex items-center justify-center my-1">
                  <img 
                    src="/images/liso-pure-cutout.webp" 
                    alt="LISO" 
                    className="w-full h-full object-contain drop-shadow-sm" 
                    loading="lazy" 
                  />
                </div>
                <p className="text-[11px] font-sans text-graphite/70 mt-1">
                  Placa giratoria 90° · Pantalla LED 150 °C · 100 ml
                </p>
              </div>

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

            {/* Cable Design Rationale Subcard with Real Photo */}
            <div className="mt-8 pt-4 bg-bone-50/80 border border-graphite/15 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-graphite/20 bg-night-950 flex-shrink-0 shadow-xs">
                <img 
                  src="/images/liso-cable.webp" 
                  alt="Cable reforzado de 1.8 metros con clavija estándar" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans uppercase tracking-wider font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    DISEÑO CON CABLE
                  </span>
                  <h5 className="font-display font-bold text-base sm:text-lg text-graphite">
                    {honestyLabelData.cordRationale.title}
                  </h5>
                </div>
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
