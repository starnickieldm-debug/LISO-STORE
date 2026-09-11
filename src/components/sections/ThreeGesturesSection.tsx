import React, { useState, useRef, useEffect } from 'react';
import { threeGestures, brandConfig } from '../../config/siteContent';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Sparkles } from 'lucide-react';
import { RotatingGuaranteeStamp } from '../ui/RotatingGuaranteeStamp';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { Reveal } from '../ui/Reveal';

const TEMP_MODES = [
  {
    level: 'Nivel 1',
    temp: '120 °C',
    fabric: 'Seda, satén y telas delicadas',
    desc: 'Vapor suave continuo para alisar fibras sensibles sin riesgo de quemadura ni brillos.'
  },
  {
    level: 'Nivel 2',
    temp: '140 °C',
    fabric: 'Algodón, mezclas y camisas',
    desc: 'Flujo constante de vapor a presión para eliminar arrugas rebeldes en pocos segundos.'
  },
  {
    level: 'Modo Seco',
    temp: '150 °C',
    fabric: 'Lino, mezclilla y cuellos',
    desc: 'Planchado directo con placa térmica a 150 °C sin vapor para marcar pliegues y fijar cuellos.'
  }
];

export const ThreeGesturesSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1, rootMargin: '0px', triggerOnce: false, initialInView: false });
  const prefersReduced = useReducedMotion();

  // =========================================================================
  // STATE & REFS: 3 GESTOS (PASO A PASO)
  // =========================================================================
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isInteractingStep, setIsInteractingStep] = useState<boolean>(false);
  const stepCarouselRef = useRef<HTMLDivElement>(null);
  const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onStepInteraction = () => {
    setIsInteractingStep(true);
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    stepTimerRef.current = setTimeout(() => setIsInteractingStep(false), 7000);
  };

  const scrollStepContainerTo = (stepIndex: number) => {
    const container = stepCarouselRef.current;
    if (!container) return;
    const items = container.querySelectorAll('.step-snap-item');
    const targetItem = items[stepIndex] as HTMLElement;
    if (targetItem) {
      const targetLeft = targetItem.offsetLeft - container.offsetLeft - (container.clientWidth - targetItem.clientWidth) / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (prefersReduced || isInteractingStep || !inView) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 3;
        scrollStepContainerTo(next);
        return next;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, [prefersReduced, isInteractingStep, inView]);

  const scrollToStep = (stepIndex: number) => {
    onStepInteraction();
    setActiveStep(stepIndex);
    scrollStepContainerTo(stepIndex);
  };

  const handleStepCarouselScroll = () => {
    if (!stepCarouselRef.current) return;
    const container = stepCarouselRef.current;
    const scrollLeft = container.scrollLeft;
    const items = container.querySelectorAll('.step-snap-item');
    if (items.length > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      const containerCenter = scrollLeft + container.clientWidth / 2;
      items.forEach((item, idx) => {
        const el = item as HTMLElement;
        const itemCenter = el.offsetLeft - container.offsetLeft + el.clientWidth / 2;
        const diff = Math.abs(containerCenter - itemCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveStep(closestIdx);
    }
  };

  // =========================================================================
  // STATE & REFS: 3 MOMENTOS (RESULTADO Y CARACTERÍSTICAS)
  // =========================================================================
  const [activeMoment, setActiveMoment] = useState<number>(0);
  const [selectedTempMode, setSelectedTempMode] = useState<number>(1);
  const [isInteractingMoment, setIsInteractingMoment] = useState<boolean>(false);
  const momentCarouselRef = useRef<HTMLDivElement>(null);
  const momentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onMomentInteraction = () => {
    setIsInteractingMoment(true);
    if (momentTimerRef.current) clearTimeout(momentTimerRef.current);
    momentTimerRef.current = setTimeout(() => setIsInteractingMoment(false), 7000);
  };

  const scrollMomentContainerTo = (index: number) => {
    const container = momentCarouselRef.current;
    if (!container) return;
    const items = container.querySelectorAll('.moment-snap-item');
    const targetItem = items[index] as HTMLElement;
    if (targetItem) {
      const targetLeft = targetItem.offsetLeft - container.offsetLeft - (container.clientWidth - targetItem.clientWidth) / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (prefersReduced || isInteractingMoment || !inView) return;
    const timer = setInterval(() => {
      setActiveMoment((prev) => {
        const next = (prev + 1) % 3;
        scrollMomentContainerTo(next);
        return next;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [prefersReduced, isInteractingMoment, inView]);

  const scrollToMoment = (momentIndex: number) => {
    onMomentInteraction();
    setActiveMoment(momentIndex);
    scrollMomentContainerTo(momentIndex);
  };

  const handleMomentCarouselScroll = () => {
    if (!momentCarouselRef.current) return;
    const container = momentCarouselRef.current;
    const scrollLeft = container.scrollLeft;
    const items = container.querySelectorAll('.moment-snap-item');
    if (items.length > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      const containerCenter = scrollLeft + container.clientWidth / 2;
      items.forEach((item, idx) => {
        const el = item as HTMLElement;
        const itemCenter = el.offsetLeft - container.offsetLeft + el.clientWidth / 2;
        const diff = Math.abs(containerCenter - itemCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveMoment(closestIdx);
    }
  };

  const stepImages = [
    {
      webp: "/images/paso-01-llenar.webp",
      jpg: "/images/paso-01-llenar.jpg",
      alt: "Llenado de agua con el vaso medidor en el depósito de la plancha LISO"
    },
    {
      webp: "/images/paso-02-encender.webp",
      jpg: "/images/paso-02-encender.jpg",
      alt: "Pantalla digital LED de la plancha LISO marcando 150 °C"
    },
    {
      webp: "/images/paso-03-planchar.webp",
      jpg: "/images/paso-03-planchar.jpg",
      alt: "Planchado a vapor en gancho sobre abrigo de lana con la plancha LISO"
    }
  ];

  return (
    <section 
      ref={ref}
      id="como-funciona" 
      className="py-12 sm:py-16 lg:py-20 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      {/* Background Texture: Flowing Satin (Horizontal Landscape) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/images/textures/texture-flowing-satin.webp" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-22 mix-blend-multiply filter contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-[#FAF8F5]/70 pointer-events-none" />
      </div>

      <div className="max-w-[1600px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 relative z-10">
        
        {/* =========================================================================
            BLOQUE 1: CÓMO SE USA — 3 GESTOS RÁPIDOS
            ========================================================================= */}
        <div className="max-w-3xl mb-8 sm:mb-10 lg:mb-12">
          {/* Main Editorial Heading: Exact title without subtitle */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-graphite tracking-tight leading-[1.18]">
            Dejar tu ropa lista es así de simple.
          </h2>
        </div>

        {/* DESKTOP PROCESS GRID (>= 768px) — Vertical 4:5 Cards + Decoupled Captions */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 relative items-stretch">
          {threeGestures.map((item, idx) => (
            <div
              key={item.step}
              className="group flex flex-col justify-between"
              style={prefersReduced ? undefined : {
                opacity: inView ? 1 : 0,
                transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
                transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms`,
                willChange: inView ? 'auto' : 'opacity, transform'
              }}
            >
              {/* Full-Bleed Portrait Photo Card (4:5 Ratio) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:rounded-[28px] bg-night-950 shadow-premium-image hover:shadow-premium-hover transition-all duration-500 ease-mech-s">
                <picture>
                  <source srcSet={stepImages[idx].webp} type="image/webp" />
                  <img 
                    src={stepImages[idx].jpg} 
                    alt={stepImages[idx].alt}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-mech-s"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/30 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Decoupled Caption Row Underneath */}
              <div className="mt-5 sm:mt-6 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-graphite text-white font-sans text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:bg-accent transition-colors duration-300">
                  {idx + 1}
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-graphite tracking-tight group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] font-medium text-graphite/90 leading-snug">
                    {item.description}
                  </p>
                  <p className="text-xs sm:text-sm text-graphite/60 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE PROCESS CAROUSEL (< 768px) — Native Mobile Snap-Stage */}
        <div className="block md:hidden">
          {/* Subtle scroll invitation cue */}
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[10px] font-sans font-bold tracking-widest text-graphite/50 uppercase">
              PASO A PASO EN VIVO
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-sans text-accent font-semibold">
              <span>Desliza para ver más</span>
              <span className="text-xs animate-pulse">→</span>
            </span>
          </div>

          {/* Step Pill Navigation Tabs */}
          <div className="flex items-center justify-between gap-1.5 p-1 bg-graphite/[0.04] border border-graphite/10 rounded-xl mb-3.5">
            {threeGestures.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`flex-1 py-2 px-1 text-center rounded-lg font-sans text-[11px] font-bold tracking-wider uppercase transition-all ${
                    isActive 
                      ? 'bg-accent text-white shadow-sm' 
                      : 'text-graphite/60 hover:text-graphite active:bg-graphite/5'
                  }`}
                >
                  {item.step} · {idx === 0 ? 'LLENA' : idx === 1 ? 'ENCIENDE' : 'ALISA'}
                </button>
              );
            })}
          </div>

          {/* Horizontal Snap-Track */}
          <div 
            ref={stepCarouselRef}
            onScroll={handleStepCarouselScroll}
            onTouchStart={onStepInteraction}
            onPointerDown={onStepInteraction}
            className="mobile-snap-track gap-3.5 px-4 -mx-4 pb-3 pt-1"
          >
            {threeGestures.map((item, idx) => (
              <div
                key={item.step}
                className="step-snap-item mobile-snap-item w-[76vw] max-w-[290px] flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-night-950 shadow-premium-image">
                  <picture>
                    <source srcSet={stepImages[idx].webp} type="image/webp" />
                    <img 
                      src={stepImages[idx].jpg} 
                      alt={stepImages[idx].alt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/30 via-transparent to-black/10 pointer-events-none" />
                </div>

                <div className="mt-3.5 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-graphite text-white font-sans text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h3 className="font-display text-[15px] font-bold text-graphite leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-graphite/90 leading-snug">
                      {item.description}
                    </p>
                    <p className="text-[11px] text-graphite/60 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2 pb-1">
            {[0, 1, 2].map((dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToStep(dotIdx)}
                aria-label={`Ir al paso ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === dotIdx ? 'w-6 bg-accent' : 'w-1.5 bg-graphite/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* =========================================================================
            BLOQUE 2: INFORMACIÓN DE TIEMPO (2 A 3 MINUTOS POR PRENDA)
            ========================================================================= */}
        <div className="mt-8 sm:mt-10 lg:mt-12 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:py-6 lg:px-8 shadow-premium hover:shadow-premium-hover flex flex-row items-center justify-between gap-3.5 sm:gap-6 relative overflow-hidden group transition-all duration-300">
          {/* Left: Rotating Seal Stamp (Compact 68px on mobile, 110px on desktop) */}
          <div className="shrink-0">
            <div className="block sm:hidden">
              <RotatingGuaranteeStamp 
                size={68}
                circularText="★ 2 A 3 MIN POR PRENDA ★ CERO TABLA ★"
                centerText="1200 W"
                textColor="text-graphite"
                customIcon={<Sparkles className="w-3.5 h-3.5 text-accent stroke-[2.2]" />}
              />
            </div>
            <div className="hidden sm:block">
              <RotatingGuaranteeStamp 
                size={110}
                circularText="★ 2 A 3 MIN POR PRENDA ★ CERO TABLA ★"
                centerText="1200 W"
                textColor="text-graphite"
                customIcon={<Sparkles className="w-5 h-5 text-accent stroke-[2.2]" />}
              />
            </div>
          </div>

          {/* Right: Laboratory Note & Result Claim */}
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
            <p className="font-display text-sm sm:text-lg md:text-xl lg:text-[1.5rem] font-bold text-graphite tracking-tight leading-snug">
              Entre 2 y 3 minutos por prenda. Sin tabla ni accesorios extra.
            </p>
            <p className="text-[10px] sm:text-xs text-graphite/60 font-normal">
              *{brandConfig.labClaimNote}
            </p>
          </div>
        </div>

        {/* Invisible anchor target for backwards compatibility with any #beneficios links */}
        <div id="beneficios" className="scroll-mt-24" aria-hidden="true" />

        {/* =========================================================================
            BLOQUE 3 & 4: RESULTADO VISIBLE & CARACTERÍSTICAS DEMOSTRADAS
            Integrado de forma continua dentro de la misma sección
            ========================================================================= */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          
          {/* Section Sub-heading: Exactly as requested */}
          <div className="max-w-3xl mb-8 sm:mb-10 lg:mb-12">
            <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.65rem] font-bold text-graphite tracking-tight leading-[1.15]">
              No necesitas una sesión de planchado.
            </h2>
          </div>

          {/* =========================================================================
              DESKTOP & TABLET: ASYMMETRIC BENTO GRID (>= 768px)
              ========================================================================= */}
          <Reveal direction="up" duration={700} className="hidden md:block">
            <div className="space-y-6 lg:space-y-8">
              
              {/* =========================================================================
                  BLOQUE GRANDE PANORÁMICO: 01 · INMEDIATEZ (Antes / Después)
                  ========================================================================= */}
              <div className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-8 lg:p-10 shadow-premium hover:shadow-premium-hover relative group transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  
                  {/* Columna Izquierda: Información (5 Cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase block">
                      01 · INMEDIATEZ
                    </span>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-bold text-graphite leading-[1.18] tracking-tight">
                      Enciende en 15 segundos y alisa directo en el gancho.
                    </h3>

                    <p className="text-sm sm:text-base text-graphite/70 leading-relaxed font-normal">
                      No tienes que sacar la tabla pesada ni esperar una eternidad a que caliente. La prendes, le das una pasada a la prenda de hoy y sales listo.
                    </p>

                    {/* Micro proof badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite/[0.03] border border-graphite/10 text-graphite/80 text-xs font-medium">
                        ✓ Cero tabla de planchar
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite/[0.03] border border-graphite/10 text-graphite/80 text-xs font-medium">
                        ✓ Lista en 15 segundos
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite/[0.03] border border-graphite/10 text-graphite/80 text-xs font-medium">
                        ✓ Placa giratoria 90°
                      </span>
                    </div>

                    <p className="text-[11px] font-sans text-graphite/45 italic pt-1">
                      ← Desliza el separador sobre la prenda para comparar el acabado →
                    </p>
                  </div>

                  {/* Columna Derecha: Slider Antes/Después Panorámico (7 Cols) */}
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl sm:rounded-[24px] overflow-hidden shadow-premium-image bg-night-950">
                      <BeforeAfterSlider 
                        beforeImage="/images/before-wrinkled-shirt.jpg"
                        afterImage="/images/after-smooth-shirt.jpg"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* =========================================================================
                  DÚO DE TARJETAS DE CARACTERÍSTICAS: 02 · POTENCIA & 03 · SEGURIDAD
                  ========================================================================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {/* TARJETA 02: POTENCIA REAL */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 lg:p-8 shadow-premium hover:shadow-premium-hover flex flex-col justify-between relative group transition-all duration-300">
                  <div>
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase block mb-1.5">
                      02 · POTENCIA REAL
                    </span>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-graphite leading-tight tracking-tight">
                      1200 W y calor a 150 °C que sí alisan.
                    </h3>

                    <p className="text-xs sm:text-sm text-graphite/70 leading-relaxed mt-1.5">
                      Los vaporizadores comunes solo echan vapor tibio y humedecen la tela. LISO combina vapor a presión con calor cerámico para fijar cuellos y pliegues rebeldes.
                    </p>

                    {/* Mode Selector Tabs */}
                    <div className="grid grid-cols-3 gap-2 my-4">
                      {TEMP_MODES.map((mode, idx) => {
                        const isSelected = idx === selectedTempMode;
                        return (
                          <button
                            key={mode.level}
                            type="button"
                            onClick={() => setSelectedTempMode(idx)}
                            className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-accent/10 border-accent shadow-xs' 
                                : 'bg-graphite/[0.02] border-graphite/10 hover:border-graphite/20 hover:bg-graphite/[0.04]'
                            }`}
                          >
                            <span className={`text-[11px] font-sans font-bold block ${isSelected ? 'text-graphite' : 'text-graphite/70'}`}>
                              {mode.level}
                            </span>
                            <span className="text-[10px] font-sans text-accent font-semibold block mt-0.5">
                              {mode.temp}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Macro Screen Stage */}
                  <div className="relative aspect-[16/9] w-full bg-night-950 overflow-hidden rounded-2xl shadow-premium-image mt-2">
                    <img 
                      src="/images/screen-temperature-display.jpg" 
                      alt="Pantalla digital LED de la plancha LISO mostrando temperatura en tiempo real" 
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-mech-s"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* TARJETA 03: SEGURIDAD & BASE DE APOYO */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 lg:p-8 shadow-premium hover:shadow-premium-hover flex flex-col justify-between relative group transition-all duration-300">
                  <div>
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase block mb-1.5">
                      03 · SEGURIDAD
                    </span>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-graphite leading-tight tracking-tight">
                      Bomba 100% antigoteo y base de apoyo térmico.
                    </h3>

                    <p className="text-xs sm:text-sm text-graphite/70 leading-relaxed mt-1.5">
                      Cero manchas de agua hirviendo en tu ropa antes de salir. Su base de apoyo te permite posarla caliente sobre cualquier mesa con total tranquilidad.
                    </p>

                    {/* Supporting Trust Pills */}
                    <div className="flex flex-wrap gap-2 my-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-graphite/[0.03] border border-graphite/10 text-graphite/80 text-xs font-medium">
                        ✓ Bomba 100% antigoteo
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-graphite/[0.03] border border-graphite/10 text-graphite/80 text-xs font-medium">
                        ✓ Base resistente al calor
                      </span>
                    </div>
                  </div>

                  {/* Desk Dock Visual Stage */}
                  <div className="relative aspect-[16/9] w-full bg-night-950 overflow-hidden rounded-2xl shadow-premium-image mt-2">
                    <img 
                      src="/images/liso-desk-dock.jpg" 
                      alt="Plancha de vapor portátil LISO descansando en base de apoyo" 
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-mech-s"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>

            </div>
          </Reveal>

          {/* =========================================================================
              MOBILE 3-MOMENT NARRATIVE STAGE (< 768px)
              ========================================================================= */}
          <div className="block md:hidden">
            {/* Subtle scroll invitation cue */}
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[10px] font-sans font-bold tracking-widest text-graphite/50 uppercase">
                3 MOMENTOS CLAVE
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-sans text-accent font-semibold">
                <span>Desliza para explorar</span>
                <span className="text-xs animate-pulse">→</span>
              </span>
            </div>

            {/* Segmented Controller Tab Bar */}
            <div className="flex items-center gap-1.5 p-1 bg-graphite/[0.04] border border-graphite/10 rounded-xl mb-3.5">
              {([
                { idx: 0, label: '01 · AL GANCHO' },
                { idx: 1, label: '02 · POTENCIA' },
                { idx: 2, label: '03 · SEGURIDAD' }
              ]).map((moment) => (
                <button
                  key={moment.idx}
                  type="button"
                  onClick={() => scrollToMoment(moment.idx)}
                  className={`flex-1 py-2 px-1 text-center rounded-lg font-sans text-[10.5px] xs:text-[11px] font-bold tracking-wider uppercase transition-all ${
                    activeMoment === moment.idx
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-graphite/60 hover:text-graphite active:bg-graphite/5'
                  }`}
                >
                  {moment.label}
                </button>
              ))}
            </div>

            {/* Horizontal Snap-Track */}
            <div 
              ref={momentCarouselRef}
              onScroll={handleMomentCarouselScroll}
              onTouchStart={onMomentInteraction}
              onPointerDown={onMomentInteraction}
              className="mobile-snap-track gap-4 px-4 -mx-4 pb-3 pt-1"
            >
              {/* Moment 01: Al Gancho */}
              <div className="moment-snap-item mobile-snap-item w-[calc(100vw-2rem)] max-w-[390px] bg-white p-5 sm:p-6 rounded-2xl shadow-premium flex flex-col justify-between text-graphite overflow-hidden snap-center">
                <div className="space-y-3">
                  <span className="text-accent font-bold font-sans text-[11px] uppercase tracking-wider block">
                    01 · AL GANCHO
                  </span>

                  <div className="space-y-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-graphite leading-tight break-words">
                      Enciende en 15 segundos y alisa directo en el gancho.
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-graphite/70 leading-relaxed break-words">
                      Sin sacar la tabla pesada ni esperar una eternidad. Le das una pasada rápida a la prenda de hoy y sales listo.
                    </p>
                  </div>

                  <div className="rounded-xl overflow-hidden shadow-premium-image bg-night-950 mt-2">
                    <BeforeAfterSlider 
                      beforeImage="/images/before-wrinkled-shirt.jpg"
                      afterImage="/images/after-smooth-shirt.jpg"
                    />
                  </div>
                </div>

                <p className="text-[10px] font-sans text-graphite/45 italic pt-2.5 text-center">
                  ← Desliza el divisor central sobre la prenda →
                </p>
              </div>

              {/* Moment 02: Potencia */}
              <div className="moment-snap-item mobile-snap-item w-[calc(100vw-2rem)] max-w-[390px] bg-white p-5 sm:p-6 rounded-2xl shadow-premium flex flex-col justify-between text-graphite overflow-hidden snap-center">
                <div className="space-y-2.5">
                  <span className="text-accent font-bold font-sans text-[11px] uppercase tracking-wider block">
                    02 · POTENCIA
                  </span>

                  <div className="space-y-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-graphite leading-tight break-words">
                      1200 W y calor a 150 °C que sí alisan.
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-graphite/70 leading-relaxed break-words">
                      A diferencia del vapor tibio que solo humedece la ropa, la placa cerámica a 150 °C fija cuellos, solapas y puños.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 py-1">
                    {TEMP_MODES.map((mode, idx) => {
                      const isSelected = idx === selectedTempMode;
                      return (
                        <button
                          key={mode.level}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTempMode(idx);
                          }}
                          className={`p-2 text-left rounded-lg border transition-all ${
                            isSelected 
                              ? 'bg-accent/10 border-accent shadow-xs' 
                              : 'bg-graphite/[0.02] border-graphite/10'
                          }`}
                        >
                          <span className={`text-[10.5px] font-sans font-bold block ${isSelected ? 'text-graphite' : 'text-graphite/70'}`}>
                            {mode.level}
                          </span>
                          <span className="text-[10px] font-sans text-accent font-semibold block">
                            {mode.temp}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative aspect-[16/10] w-full bg-night-950 overflow-hidden rounded-xl shadow-premium-image mt-1">
                    <img 
                      src="/images/screen-temperature-display.jpg" 
                      alt="Pantalla digital LED de la plancha LISO" 
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                </div>

                <p className="text-[10px] font-sans text-graphite/50 text-center pt-2.5">
                  {TEMP_MODES[selectedTempMode].fabric}
                </p>
              </div>

              {/* Moment 03: Seguridad */}
              <div className="moment-snap-item mobile-snap-item w-[calc(100vw-2rem)] max-w-[390px] bg-white p-5 sm:p-6 rounded-2xl shadow-premium flex flex-col justify-between text-graphite overflow-hidden snap-center">
                <div className="space-y-2.5">
                  <span className="text-accent font-bold font-sans text-[11px] uppercase tracking-wider block">
                    03 · SEGURIDAD
                  </span>

                  <div className="space-y-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-graphite leading-tight break-words">
                      Bomba 100% antigoteo y descanso seguro.
                    </h3>
                    <p className="text-xs sm:text-[12.5px] text-graphite/70 leading-relaxed break-words">
                      Cero manchas de agua hirviendo. Pósala caliente en su base de apoyo sobre cualquier mesa con total tranquilidad.
                    </p>
                  </div>

                  <div className="relative aspect-[16/10] w-full bg-night-950 overflow-hidden rounded-xl shadow-premium-image mt-1">
                    <img 
                      src="/images/liso-desk-dock.jpg" 
                      alt="Plancha LISO descansando en base de apoyo resistente al calor" 
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2.5 text-[10.5px] font-sans text-accent font-medium">
                  <span>✓ 100% Antigoteo</span>
                  <span className="text-graphite/30">•</span>
                  <span>✓ Base térmica segura</span>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-1.5 pt-2 pb-1">
              {[0, 1, 2].map((dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToMoment(dotIdx)}
                  aria-label={`Ir al momento ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMoment === dotIdx ? 'w-6 bg-accent' : 'w-1.5 bg-graphite/20'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
