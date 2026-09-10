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
            DESKTOP & TABLET: ASYMMETRIC BENTO GRID (>= 768px)
            Condensed high-impact single-screen layout (~600px height)
            ========================================================================= */}
        <Reveal direction="up" duration={700} className="hidden md:block">
          <div className="grid grid-cols-12 gap-6 items-stretch">
            
            {/* TARJETA HERO IZQUIERDA: 01 · ALISA DIRECTO EN EL GANCHO (7 Cols Desktop / 12 Cols Tablet) */}
            <div className="col-span-12 lg:col-span-7 bg-night-900/85 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden flex flex-col justify-between relative group hover:border-white/20 transition-all duration-300">
              {/* Soft ambient lighting */}
              <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/15 transition-all duration-500" />

              <div>
                {/* Header Moment 01 */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    01 · CONECTAR
                  </span>
                  <span className="text-[11px] font-sans font-semibold tracking-wider text-bone/50 uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                    CALIENTA EN 3 SEG · 150 °C
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-bone leading-[1.2] tracking-tight mt-4">
                  La conectas y alisas directo en el gancho.
                </h3>

                <p className="text-sm sm:text-base text-bone/75 leading-relaxed mt-2.5 max-w-xl font-normal">
                  Olvídate de sacar la tabla pesada y de esperar que caliente. Su placa giratoria y vapor continuo de 1200 W eliminan arrugas rebeldes en minutos.
                </p>

                {/* Key feature pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs font-sans text-bone/85 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    Cero tabla de planchar
                  </span>
                  <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs font-sans text-bone/85 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    Placa giratoria 90°
                  </span>
                  <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs font-sans text-bone/85 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    Ideal camisas y lino
                  </span>
                </div>
              </div>

              {/* Before/After Interactive Centerpiece */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-dark-card bg-night-950">
                  <BeforeAfterSlider 
                    beforeImage="/images/before-wrinkled-shirt.jpg"
                    afterImage="/images/after-smooth-shirt.jpg"
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-sans text-bone/50 px-1">
                  <span>← Desliza el separador para ver el antes y después</span>
                  <span className="text-accent font-medium">Prueba real de resultado</span>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: 2 TARJETAS APILADAS (5 Cols Desktop / 2 cols en Tablet) */}
            <div className="col-span-12 lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              
              {/* TARJETA SUPERIOR DERECHA: 02 · CONTROLAR (Temperatura en Vivo) */}
              <div className="bg-night-900/85 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-7 shadow-xl overflow-hidden flex flex-col justify-between relative group hover:border-white/20 transition-all duration-300">
                <div className="pointer-events-none absolute -left-16 -bottom-16 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />

                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-accent" />
                      02 · CONTROLAR
                    </span>
                    <span className="text-[11px] font-sans font-semibold tracking-wider text-bone/50 uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      PANTALLA DIGITAL LED
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-bone leading-tight tracking-tight mt-3">
                    Temperatura visible y vapor bajo control.
                  </h3>

                  <p className="text-xs sm:text-sm text-bone/75 leading-relaxed mt-1.5">
                    Ajusta los grados según el tejido para cuidar tus prendas sensibles sin riesgo de quemadura.
                  </p>

                  {/* Mode Selector Tabs */}
                  <div className="grid grid-cols-3 gap-1.5 mt-3.5">
                    {TEMP_MODES.map((mode, idx) => {
                      const isSelected = idx === selectedTempMode;
                      return (
                        <button
                          key={mode.level}
                          type="button"
                          onClick={() => setSelectedTempMode(idx)}
                          className={`p-2 text-left rounded-xl border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-white/10 border-accent shadow-sm ring-1 ring-accent' 
                              : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className={`text-[11px] font-sans font-bold block ${isSelected ? 'text-white' : 'text-bone/70'}`}>
                            {mode.level}
                          </span>
                          <span className="text-[10px] font-mono text-accent font-semibold block mt-0.5">
                            {mode.temp}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Macro Screen Stage */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full bg-night-950 border border-white/15 overflow-hidden rounded-xl shadow-md group/screen">
                    <img 
                      src="/images/screen-temperature-display.jpg" 
                      alt="Pantalla digital LED de la plancha LISO mostrando temperatura en tiempo real" 
                      className="w-full h-full object-cover object-center group-hover/screen:scale-105 transition-transform duration-500 ease-mech-s"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                    {/* Active Temperature Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-[10.5px] font-mono text-bone flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span>ACTIVA: <strong className="text-accent">{TEMP_MODES[selectedTempMode].temp}</strong></span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10.5px] font-sans text-bone/90 pointer-events-none">
                      <span className="truncate pr-2 font-medium">✓ {TEMP_MODES[selectedTempMode].status}</span>
                      <span className="text-bone/50 shrink-0 font-mono text-[10px]">{TEMP_MODES[selectedTempMode].steam}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TARJETA INFERIOR DERECHA: 03 · GUARDAR (Base de Apoyo) */}
              <div className="bg-night-900/85 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-7 shadow-xl overflow-hidden flex flex-col justify-between relative group hover:border-white/20 transition-all duration-300">
                <div className="pointer-events-none absolute -right-16 -bottom-16 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />

                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                      03 · GUARDAR
                    </span>
                    <span className="text-[11px] font-sans font-semibold tracking-wider text-bone/50 uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      BASE TÉRMICA INCLUIDA
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-bone leading-tight tracking-tight mt-3">
                    Pósala caliente entre prenda y prenda.
                  </h3>

                  <p className="text-xs sm:text-sm text-bone/75 leading-relaxed mt-1.5">
                    Su base de apoyo aislante te permite posarla caliente sobre cualquier mesa sin riesgo y tenerla siempre a mano en tu clóset.
                  </p>
                </div>

                {/* Desk Dock Visual Stage */}
                <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                  <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full bg-night-950 border border-white/15 overflow-hidden rounded-xl shadow-md group/dock">
                    <img 
                      src="/images/liso-desk-dock.jpg" 
                      alt="Plancha de vapor portátil LISO descansando en base de apoyo" 
                      className="w-full h-full object-cover object-center group-hover/dock:scale-105 transition-transform duration-500 ease-mech-s"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-[10.5px] font-sans text-bone flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>BASE RESISTENTE AL CALOR</span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10.5px] font-sans text-bone/90 pointer-events-none">
                      <span className="font-medium">✓ Apoyo seguro sin quemar muebles</span>
                      <span className="text-bone/50">Mínimo espacio</span>
                    </div>
                  </div>

                  {/* Micro Specs Footer */}
                  <div className="flex items-center justify-between text-xs font-sans text-bone/70 pt-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                      100 ml (2–3 prendas)
                    </span>
                    <span className="text-bone/50 font-mono text-[11px]">
                      Cable 1.8 m directo
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </Reveal>

        {/* =========================================================================
            MOBILE 3-MOMENT NARRATIVE STAGE (< 768px) — 100% Mobile-First Experience
            ========================================================================= */}
        <div className="block md:hidden">
          
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
