import React, { useState } from 'react';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { Reveal } from '../ui/Reveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BenefitEvidenceSection: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState<0 | 1 | 2>(0);

  return (
    <section 
      id="beneficios"
      className="py-20 sm:py-24 lg:py-28 bg-night-950 text-bone border-b border-white/10 relative overflow-hidden bg-macro-fabric scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      {/* Ghost watermark: Quiet architectural depth */}
      <div 
        className="select-none pointer-events-none absolute -left-6 top-16 font-sans font-medium uppercase text-[15vw] tracking-tighter leading-none text-outline-bone-ghost ghost-fade-vertical hidden md:block opacity-20" 
        aria-hidden="true" 
      >
        150°
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header: Connected entry to the 3-moment narrative */}
        <div className="max-w-3xl mb-8 sm:mb-14 lg:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>NARRATIVA EN 3 MOMENTOS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.65rem] font-bold text-bone tracking-tight leading-[1.15]">
            Menos vueltas para tener tu ropa lista.
          </h2>
          <p className="text-sm sm:text-lg text-bone/70 font-normal leading-relaxed max-w-2xl">
            Olvídate de sacar la tabla cada vez que una prenda necesita un retoque. LISO está pensada para resolverlo en minutos.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP 3-MOMENT SEQUENCE (>= 1024px) — 100% Unchanged Editorial Layout
            ========================================================================= */}
        <div className="hidden lg:block space-y-12 sm:space-y-16 lg:space-y-20">
          
          {/* MOMENTO 01: CONECTAR (Cadencia: Grande / Dominante) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Columna Narrativa */}
            <Reveal 
              direction="left" 
              duration={700}
              className="lg:col-span-5 xl:col-span-5 order-1 lg:order-1 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold tracking-[0.16em] text-accent uppercase">
                  01 · CONECTAR
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[11px] font-mono tracking-wider text-bone/50 uppercase">
                  1200 W · 3 s* · 150 °C
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-bone leading-[1.18] tracking-tight">
                La conectas y empiezas en segundos.
              </h3>

              <p className="text-base sm:text-[17px] text-bone/75 leading-relaxed font-normal">
                Con LISO puedes alisar directamente sobre la percha, sin montar la tabla ni preparar todo lo que normalmente implica planchar.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans text-bone/70">
                <span className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md font-medium">
                  Sin tabla de planchar
                </span>
                <span className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md font-medium">
                  Calor listo en 3 s*
                </span>
              </div>
            </Reveal>

            {/* Columna Visual Dominante: Comparador Interactivo */}
            <Reveal 
              direction="right" 
              delay={100}
              duration={700}
              className="lg:col-span-7 xl:col-span-7 order-2 lg:order-2"
            >
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-dark-card bg-night-950">
                <BeforeAfterSlider 
                  beforeImage="/images/before-wrinkled-shirt.jpg"
                  afterImage="/images/after-smooth-shirt.jpg"
                />
              </div>
            </Reveal>
          </div>

          {/* Divisor Narrativo Conector 01 → 02 */}
          <div className="flex items-center justify-center gap-3 py-2 text-white/10" aria-hidden="true">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-white/15" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-white/15" />
          </div>

          {/* MOMENTO 02: CONTROLAR (Cadencia: Íntimo / Macro de Precisión) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Columna Visual Íntima (Desktop: Izquierda, Mobile: Después del texto) */}
            <Reveal 
              direction="left" 
              delay={100}
              duration={700}
              className="lg:col-span-5 xl:col-span-5 order-2 lg:order-1"
            >
              <div className="relative w-full aspect-[4/3] max-w-[480px] mx-auto lg:mx-0 bg-night-950 border border-white/15 overflow-hidden rounded-xl shadow-dark-card group">
                <img 
                  src="/images/screen-temperature-display.jpg" 
                  alt="Pantalla digital LED de la plancha LISO mostrando temperatura en tiempo real" 
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-bone/70 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-md">
                  <span>CONTROL TÉRMICO DIGITAL</span>
                  <span className="text-accent font-bold">150 °C MAX</span>
                </div>
              </div>
            </Reveal>

            {/* Columna Narrativa con mayor detalle */}
            <Reveal 
              direction="right" 
              duration={700}
              className="lg:col-span-7 xl:col-span-7 order-1 lg:order-2 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold tracking-[0.16em] text-accent uppercase">
                  02 · CONTROLAR
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[11px] font-mono tracking-wider text-bone/50 uppercase">
                  2 NIVELES DE VAPOR · MODO SECO
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-bone leading-[1.18] tracking-tight">
                Tienes la temperatura a la vista y el vapor bajo control.
              </h3>

              <p className="text-base sm:text-[17px] text-bone/75 leading-relaxed font-normal">
                Elige la temperatura que necesitas y ajusta el vapor según la prenda que estés tratando. Así sabes exactamente cómo la estás cuidando.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
                <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-md space-y-0.5">
                  <span className="font-semibold text-bone block">Nivel 1 & 2 de Vapor</span>
                  <span className="text-bone/60 text-[11px]">Para sedas, lana, algodón y lino</span>
                </div>
                <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-md space-y-0.5">
                  <span className="font-semibold text-bone block">Planchado en Seco</span>
                  <span className="text-bone/60 text-[11px]">Fijación térmica sin humedad</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Divisor Narrativo Conector 02 → 03 */}
          <div className="flex items-center justify-center gap-3 py-2 text-white/10" aria-hidden="true">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-white/15" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-white/15" />
          </div>

          {/* MOMENTO 03: GUARDAR (Cadencia: Grande / Hábitat & Dock) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Columna Narrativa */}
            <Reveal 
              direction="left" 
              duration={700}
              className="lg:col-span-5 xl:col-span-5 order-1 lg:order-1 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold tracking-[0.16em] text-accent uppercase">
                  03 · GUARDAR
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[11px] font-mono tracking-wider text-bone/50 uppercase">
                  100 ML ≈ 5 MIN ≈ 2–3 PRENDAS
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-bone leading-[1.18] tracking-tight">
                La dejas a mano y está lista cuando la vuelves a necesitar.
              </h3>

              <p className="text-base sm:text-[17px] text-bone/75 leading-relaxed font-normal">
                Su base de apoyo te permite guardarla fácilmente después de usarla, sin tener que desmontar nada ni buscarle un lugar especial.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans text-bone/70">
                <span className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md font-medium">
                  Base dock térmica incluida
                </span>
                <span className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md font-medium">
                  Siempre a mano sobre tu escritorio
                </span>
              </div>
            </Reveal>

            {/* Columna Visual Dominante: Hábitat del producto */}
            <Reveal 
              direction="right" 
              delay={100}
              duration={700}
              className="lg:col-span-7 xl:col-span-7 order-2 lg:order-2"
            >
              <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] bg-night-950 border border-white/15 overflow-hidden rounded-xl shadow-dark-card group">
                <img 
                  src="/images/liso-desk-dock.jpg" 
                  alt="Plancha de vapor portátil LISO con base dock y vaso medidor sobre escritorio" 
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>
          </div>

        </div>

        {/* =========================================================================
            MOBILE 3-MOMENT NARRATIVE STAGE (< 1024px) — 100% Mobile-First Experience
            ========================================================================= */}
        <div className="block lg:hidden">
          
          {/* Segmented Controller Tab Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl mb-4">
            {([
              { idx: 0 as const, label: '01 · CONECTAR' },
              { idx: 1 as const, label: '02 · CONTROLAR' },
              { idx: 2 as const, label: '03 · GUARDAR' }
            ]).map((moment) => (
              <button
                key={moment.idx}
                type="button"
                onClick={() => setActiveMoment(moment.idx)}
                className={`flex-1 py-2 px-1 text-center rounded-lg font-mono text-[10.5px] xs:text-[11px] font-bold tracking-wider uppercase transition-all active:scale-95 ${
                  activeMoment === moment.idx
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-bone/60 hover:text-bone active:bg-white/5'
                }`}
              >
                {moment.label}
              </button>
            ))}
          </div>

          {/* Unified Moment Card */}
          <div className="bg-night-900/90 border border-white/15 p-4 sm:p-5 rounded-2xl shadow-xl space-y-4">
            
            {/* Moment 01: Conectar */}
            {activeMoment === 0 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-mono">
                  <span className="text-accent font-bold uppercase tracking-wider">01 · CONECTAR</span>
                  <span className="text-bone/50 uppercase">1200 W · 3 s* · 150 °C</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-bone leading-tight">
                    La conectas y empiezas en segundos.
                  </h3>
                  <p className="text-xs sm:text-sm text-bone/75 leading-relaxed">
                    Con LISO puedes alisar directamente sobre la percha, sin montar la tabla ni preparar todo lo que normalmente implica planchar.
                  </p>
                </div>

                {/* Before/After Interactive Slider */}
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-md bg-night-950">
                  <BeforeAfterSlider 
                    beforeImage="/images/before-wrinkled-shirt.jpg"
                    afterImage="/images/after-smooth-shirt.jpg"
                  />
                </div>

                {/* Key feature pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-md text-[11px] font-sans text-bone/80 font-medium">
                    ✓ Sin tabla de planchar
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-md text-[11px] font-sans text-bone/80 font-medium">
                    ✓ Calor listo en 3 s*
                  </span>
                </div>
              </div>
            )}

            {/* Moment 02: Controlar */}
            {activeMoment === 1 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-mono">
                  <span className="text-accent font-bold uppercase tracking-wider">02 · CONTROLAR</span>
                  <span className="text-bone/50 uppercase">2 NIVELES · MODO SECO</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-bone leading-tight">
                    Tienes la temperatura a la vista y vapor bajo control.
                  </h3>
                  <p className="text-xs sm:text-sm text-bone/75 leading-relaxed">
                    Elige la temperatura que necesitas y ajusta el vapor según la prenda. Sabes exactamente cómo la estás cuidando.
                  </p>
                </div>

                {/* LED Screen Macro */}
                <div className="relative aspect-[4/3] w-full bg-night-950 border border-white/15 overflow-hidden rounded-xl shadow-md">
                  <img 
                    src="/images/screen-temperature-display.jpg" 
                    alt="Pantalla digital LED de la plancha LISO" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-bone/80 bg-black/75 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-md">
                    <span>CONTROL TÉRMICO DIGITAL</span>
                    <span className="text-accent font-bold">150 °C MAX</span>
                  </div>
                </div>

                {/* 2 Mode Subcards */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans pt-1">
                  <div className="p-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                    <span className="font-semibold text-bone block text-[11px]">Nivel 1 & 2 de Vapor</span>
                    <span className="text-bone/60 text-[10px] leading-tight block mt-0.5">Seda, lana, algodón</span>
                  </div>
                  <div className="p-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg">
                    <span className="font-semibold text-bone block text-[11px]">Planchado en Seco</span>
                    <span className="text-bone/60 text-[10px] leading-tight block mt-0.5">Fijación sin humedad</span>
                  </div>
                </div>
              </div>
            )}

            {/* Moment 03: Guardar */}
            {activeMoment === 2 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-mono">
                  <span className="text-accent font-bold uppercase tracking-wider">03 · GUARDAR</span>
                  <span className="text-bone/50 uppercase">100 ML ≈ 2–3 PRENDAS</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-bone leading-tight">
                    La dejas a mano y está lista cuando la vuelves a necesitar.
                  </h3>
                  <p className="text-xs sm:text-sm text-bone/75 leading-relaxed">
                    Su base de apoyo te permite guardarla fácilmente después de usarla, sin desmontar nada ni buscar un lugar especial.
                  </p>
                </div>

                {/* Desk Dock Visual */}
                <div className="relative aspect-[16/11] w-full bg-night-950 border border-white/15 overflow-hidden rounded-xl shadow-md">
                  <img 
                    src="/images/liso-desk-dock.jpg" 
                    alt="Plancha LISO descansando en base dock sobre escritorio" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-md text-[11px] font-sans text-bone/80 font-medium">
                    ✓ Base dock térmica incluida
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-md text-[11px] font-sans text-bone/80 font-medium">
                    ✓ Siempre lista sobre el mueble
                  </span>
                </div>
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveMoment(prev => (prev === 0 ? 2 : (prev - 1) as 0 | 1 | 2))}
                className="inline-flex items-center gap-1 text-xs font-mono font-medium text-bone/60 hover:text-white active:scale-95 py-1 px-2.5 rounded bg-white/5 border border-white/10 transition-all"
                aria-label="Momento anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-1.5">
                {([0, 1, 2] as const).map(idx => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMoment(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeMoment === idx ? 'w-5 bg-accent' : 'w-1.5 bg-white/20'
                    }`}
                    aria-label={`Ir al momento ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveMoment(prev => (prev === 2 ? 0 : (prev + 1) as 0 | 1 | 2))}
                className="inline-flex items-center gap-1 text-xs font-mono font-medium text-bone/60 hover:text-white active:scale-95 py-1 px-2.5 rounded bg-white/5 border border-white/10 transition-all"
                aria-label="Momento siguiente"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
