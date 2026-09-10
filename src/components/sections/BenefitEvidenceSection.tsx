import React, { useState } from 'react';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { Reveal } from '../ui/Reveal';
import { ChevronLeft, ChevronRight, Check, Sparkles, Flame, ShieldCheck } from 'lucide-react';

const TEMP_MODES = [
  {
    level: 'Nivel 1',
    temp: '120 °C',
    fabric: 'Seda, satén y telas delicadas',
    desc: 'Vapor suave continuo para alisar fibras sensibles sin riesgo de quemadura ni brillos.',
    steam: 'Vapor Suave (15 g/min)',
    status: 'Seguro para prendas delicadas'
  },
  {
    level: 'Nivel 2',
    temp: '140 °C',
    fabric: 'Algodón, mezclas y camisas',
    desc: 'Flujo constante de vapor a presión para eliminar arrugas rebeldes en pocos segundos.',
    steam: 'Vapor Fuerte (22 g/min)',
    status: 'Modo diario recomendado'
  },
  {
    level: 'Modo Seco',
    temp: '150 °C',
    fabric: 'Lino, mezclilla y cuellos',
    desc: 'Planchado directo con placa térmica a 150 °C sin vapor para marcar pliegues y fijar cuellos.',
    steam: 'Fijación Térmica en Seco',
    status: 'Máxima firmeza en detalles'
  }
];

export const BenefitEvidenceSection: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState<0 | 1 | 2>(0);
  const [selectedTempMode, setSelectedTempMode] = useState<number>(1);

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

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header: Connected entry to the 3-moment narrative */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-sans text-accent font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EL MÉTODO DE 3 PASOS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.65rem] font-bold text-bone tracking-tight leading-[1.15]">
            Menos vueltas para tener tu ropa lista.
          </h2>
          <p className="text-sm sm:text-lg text-bone/70 font-normal leading-relaxed max-w-2xl">
            Olvídate de sacar la tabla cada vez que una prenda necesita un retoque. LISO está pensada para resolverlo en minutos.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP 3-MOMENT BENTO STORYLINE (>= 1024px) — High-Conversion Layout
            ========================================================================= */}
        <div className="hidden lg:block space-y-8">
          
          {/* MOMENTO 01: CONECTAR */}
          <Reveal direction="up" duration={700}>
            <div className="relative bg-night-900/85 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-300">
              {/* Soft ambient lighting */}
              <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
              
              <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
                {/* Columna Narrativa (5 cols) */}
                <div className="col-span-5 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase">
                      01 · CONECTAR
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-[11px] font-sans font-semibold tracking-wider text-bone/50 uppercase">
                      1200 W · RÁPIDO · 150 °C
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-bone leading-[1.18] tracking-tight">
                    La conectas y empiezas en segundos.
                  </h3>

                  <p className="text-base text-bone/75 leading-relaxed font-normal">
                    Con LISO puedes alisar directamente en el gancho, sin montar la tabla ni preparar todo lo que normalmente implica planchar.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans text-bone/70">
                    <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-md font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                      Sin tabla de planchar
                    </span>
                    <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-md font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                      Calentamiento rápido
                    </span>
                  </div>
                </div>

                {/* Columna Visual: Comparador Interactivo (7 cols) */}
                <div className="col-span-7">
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-dark-card bg-night-950">
                    <BeforeAfterSlider 
                      beforeImage="/images/before-wrinkled-shirt.jpg"
                      afterImage="/images/after-smooth-shirt.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Conector Editorial 01 → 02 */}
          <div className="flex flex-col items-center py-1" aria-hidden="true">
            <div className="w-[1px] h-6 bg-gradient-to-b from-white/15 to-accent/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/20" />
            <div className="w-[1px] h-6 bg-gradient-to-b from-accent/60 to-white/15" />
          </div>

          {/* MOMENTO 02: CONTROLAR (Con simulador de temperatura interactivo) */}
          <Reveal direction="up" duration={700}>
            <div className="relative bg-night-900/85 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-300">
              {/* Soft ambient lighting */}
              <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

              <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
                {/* Columna Narrativa (5 cols) */}
                <div className="col-span-5 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase">
                      02 · CONTROLAR
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-[11px] font-sans font-semibold tracking-wider text-bone/50 uppercase">
                      2 NIVELES DE VAPOR · MODO SECO
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-bone leading-[1.18] tracking-tight">
                    Tienes la temperatura a la vista y el vapor bajo control.
                  </h3>

                  <p className="text-base text-bone/75 leading-relaxed font-normal">
                    Elige la temperatura que necesitas y ajusta el vapor según la prenda que estés tratando. Así sabes exactamente cómo la estás cuidando.
                  </p>

                  {/* Interactive Fabric Mode Tabs */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-sans uppercase tracking-wider text-bone/50 font-semibold block">
                      ELIGE TU TIPO DE PRENDA:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {TEMP_MODES.map((mode, idx) => {
                        const isSelected = idx === selectedTempMode;
                        return (
                          <button
                            key={mode.level}
                            type="button"
                            onClick={() => setSelectedTempMode(idx)}
                            className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-white/10 border-accent shadow-sm ring-1 ring-accent' 
                                : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                            }`}
                          >
                            <span className={`text-xs font-sans font-bold block ${isSelected ? 'text-white' : 'text-bone/70'}`}>
                              {mode.level}
                            </span>
                            <span className="text-[11px] font-mono text-accent font-semibold block mt-0.5">
                              {mode.temp}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Mode Explanation Card */}
                  <div className="p-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs font-sans font-semibold text-bone">
                      <span>{TEMP_MODES[selectedTempMode].fabric}</span>
                      <span className="text-[10.5px] text-accent font-mono">{TEMP_MODES[selectedTempMode].steam}</span>
                    </div>
                    <p className="text-xs text-bone/65 leading-relaxed">
                      {TEMP_MODES[selectedTempMode].desc}
                    </p>
                  </div>
                </div>

                {/* Columna Visual: Studio Macro Display Stage (7 cols) */}
                <div className="col-span-7">
                  <div className="relative aspect-[16/10] w-full bg-night-950 border border-white/15 overflow-hidden rounded-2xl shadow-dark-card group">
                    <img 
                      src="/images/screen-temperature-display.jpg" 
                      alt="Pantalla digital LED de la plancha LISO mostrando temperatura en tiempo real" 
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-mech-s"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Dynamic Floating Badges over the Macro Display */}
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-xs font-mono text-bone flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span>TEMPERATURA ACTIVA: <strong className="text-accent">{TEMP_MODES[selectedTempMode].temp}</strong></span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-lg text-xs font-sans text-bone/90 font-medium">
                        ✓ {TEMP_MODES[selectedTempMode].status}
                      </span>
                      <span className="px-3 py-1.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-lg text-[11px] font-sans text-bone/60">
                        Pantalla digital LED en vivo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Conector Editorial 02 → 03 */}
          <div className="flex flex-col items-center py-1" aria-hidden="true">
            <div className="w-[1px] h-6 bg-gradient-to-b from-white/15 to-accent/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/20" />
            <div className="w-[1px] h-6 bg-gradient-to-b from-accent/60 to-white/15" />
          </div>

          {/* MOMENTO 03: GUARDAR */}
          <Reveal direction="up" duration={700}>
            <div className="relative bg-night-900/85 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-300">
              {/* Soft ambient lighting */}
              <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

              <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
                {/* Columna Narrativa (5 cols) */}
                <div className="col-span-5 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase">
                      03 · GUARDAR
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-[11px] font-sans font-semibold tracking-wider text-bone/50 uppercase">
                      100 ML ≈ 5 MIN ≈ 2–3 PRENDAS
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-bone leading-[1.18] tracking-tight">
                    La dejas a mano y está lista cuando la vuelves a necesitar.
                  </h3>

                  <p className="text-base text-bone/75 leading-relaxed font-normal">
                    Su base de apoyo te permite guardarla fácilmente después de usarla, sin tener que desmontar nada ni buscarle un lugar especial.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans text-bone/70">
                    <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-md font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                      Base de apoyo resistente al calor
                    </span>
                    <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-md font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                      Siempre a mano en tu clóset o mesa de noche
                    </span>
                  </div>
                </div>

                {/* Columna Visual: Hábitat del producto (7 cols) */}
                <div className="col-span-7">
                  <div className="relative aspect-[16/10] w-full bg-night-950 border border-white/15 overflow-hidden rounded-2xl shadow-dark-card group">
                    <img 
                      src="/images/liso-desk-dock.jpg" 
                      alt="Plancha de vapor portátil LISO con base de apoyo y vaso dosificador" 
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-mech-s"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Specs */}
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-xs font-sans text-bone flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      <span>BASE TÉRMICA INCLUIDA</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-bone/90 pointer-events-none">
                      <span className="px-3 py-1.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-lg">
                        ✓ Posarla caliente con total seguridad
                      </span>
                      <span className="px-3 py-1.5 bg-black/75 backdrop-blur-md border border-white/15 rounded-lg text-bone/60">
                        Ocupa mínimo espacio
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

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
                className={`flex-1 py-2 px-1 text-center rounded-lg font-sans text-[10.5px] xs:text-[11px] font-bold tracking-wider uppercase transition-all active:scale-95 ${
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
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-sans font-medium">
                  <span className="text-accent font-bold uppercase tracking-wider">01 · CONECTAR</span>
                  <span className="text-bone/50 uppercase">1200 W · RÁPIDO · 150 °C</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-bone leading-tight">
                    La conectas y empiezas en segundos.
                  </h3>
                  <p className="text-xs sm:text-sm text-bone/75 leading-relaxed">
                    Con LISO puedes alisar directamente en el gancho, sin montar la tabla ni preparar todo lo que normalmente implica planchar.
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
                    ✓ Calentamiento rápido
                  </span>
                </div>
              </div>
            )}

            {/* Moment 02: Controlar */}
            {activeMoment === 1 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-sans font-medium">
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

                {/* Interactive Fabric Mode Tabs (Mobile) */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {TEMP_MODES.map((mode, idx) => {
                    const isSelected = idx === selectedTempMode;
                    return (
                      <button
                        key={mode.level}
                        type="button"
                        onClick={() => setSelectedTempMode(idx)}
                        className={`p-2 text-left rounded-lg border transition-all ${
                          isSelected 
                            ? 'bg-white/10 border-accent shadow-sm' 
                            : 'bg-white/[0.02] border-white/10'
                        }`}
                      >
                        <span className={`text-[11px] font-sans font-bold block ${isSelected ? 'text-white' : 'text-bone/70'}`}>
                          {mode.level}
                        </span>
                        <span className="text-[10px] font-mono text-accent font-semibold block">
                          {mode.temp}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* LED Screen Macro */}
                <div className="relative aspect-[4/3] w-full bg-night-950 border border-white/15 overflow-hidden rounded-xl shadow-md">
                  <img 
                    src="/images/screen-temperature-display.jpg" 
                    alt="Pantalla digital LED de la plancha LISO" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded border border-white/15 text-[10px] font-sans text-bone flex items-center justify-between">
                    <span>{TEMP_MODES[selectedTempMode].fabric}</span>
                    <strong className="text-accent">{TEMP_MODES[selectedTempMode].temp}</strong>
                  </div>
                </div>

                {/* Explanation text */}
                <p className="text-[11px] text-bone/65 leading-normal bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                  {TEMP_MODES[selectedTempMode].desc}
                </p>
              </div>
            )}

            {/* Moment 03: Guardar */}
            {activeMoment === 2 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-sans font-medium">
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
                    alt="Plancha LISO descansando en base de apoyo resistente al calor" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-md text-[11px] font-sans text-bone/80 font-medium">
                    ✓ Base de apoyo resistente al calor
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-md text-[11px] font-sans text-bone/80 font-medium">
                    ✓ Lista en tu clóset o mesa de noche
                  </span>
                </div>
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveMoment(prev => (prev === 0 ? 2 : (prev - 1) as 0 | 1 | 2))}
                className="inline-flex items-center gap-1 text-xs font-sans font-medium text-bone/60 hover:text-white active:scale-95 py-1 px-2.5 rounded bg-white/5 border border-white/10 transition-all cursor-pointer"
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
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeMoment === idx ? 'w-5 bg-accent' : 'w-1.5 bg-white/20'
                    }`}
                    aria-label={`Ir al momento ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveMoment(prev => (prev === 2 ? 0 : (prev + 1) as 0 | 1 | 2))}
                className="inline-flex items-center gap-1 text-xs font-sans font-medium text-bone/60 hover:text-white active:scale-95 py-1 px-2.5 rounded bg-white/5 border border-white/10 transition-all cursor-pointer"
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
