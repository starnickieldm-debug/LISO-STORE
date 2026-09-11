import React, { useState, useRef, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Sparkles, Thermometer, Zap, Droplets } from 'lucide-react';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';

const fastSteps = [
  {
    step: "01",
    num: "1",
    label: "LLENA",
    pillLabel: "① LLENA",
    subtext: "100 ml con el vaso incluido. Sin peso muerto en la mano.",
    imageWebp: "/images/paso-01-llenar.webp",
    imageJpg: "/images/paso-01-llenar.jpg",
    alt: "Llenado de agua con el vaso medidor en el depósito de la plancha LISO"
  },
  {
    step: "02",
    num: "2",
    label: "ENCIENDE",
    pillLabel: "② ENCIENDE",
    subtext: "Lista en solo 15 segundos con temperatura real en pantalla.",
    imageWebp: "/images/paso-02-encender.webp",
    imageJpg: "/images/paso-02-encender.jpg",
    alt: "Pantalla digital LED de la plancha LISO marcando 150 °C"
  },
  {
    step: "03",
    num: "3",
    label: "ALISA",
    pillLabel: "③ ALISA",
    subtext: "Directo en el gancho. Pasadas rápidas para salir impecable.",
    imageWebp: "/images/paso-03-planchar.webp",
    imageJpg: "/images/paso-03-planchar.jpg",
    alt: "Planchado a vapor en gancho sobre abrigo de lana con la plancha LISO"
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
            PARTE 1: CÓMO SE USA — 3 GESTOS RÁPIDOS
            ========================================================================= */}
        <div className="max-w-3xl mb-6 sm:mb-8 lg:mb-10">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-graphite tracking-tight leading-[1.18]">
            Dejar tu ropa impecable es así de simple.
          </h2>
        </div>

        {/* DESKTOP PROCESS GRID (>= 768px) — 3 Fast Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 relative items-stretch">
          {fastSteps.map((item, idx) => (
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
              {/* Portrait Photo Card (4:5 Ratio) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:rounded-[28px] bg-night-950 shadow-premium-image hover:shadow-premium-hover transition-all duration-500 ease-mech-s">
                <picture>
                  <source srcSet={item.imageWebp} type="image/webp" />
                  <img 
                    src={item.imageJpg} 
                    alt={item.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-mech-s"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/30 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Minimal, Punchy Caption */}
              <div className="mt-4 sm:mt-5 flex items-start gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-graphite text-white font-sans text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:bg-accent transition-colors duration-300">
                  {item.num}
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h3 className="font-display text-base sm:text-lg lg:text-xl font-bold text-graphite tracking-tight group-hover:text-accent transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-graphite/70 leading-snug font-medium">
                    {item.subtext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE PROCESS CAROUSEL (< 768px) */}
        <div className="block md:hidden">
          {/* Step Pill Navigation Tabs */}
          <div className="flex items-center justify-between gap-1.5 p-1 bg-graphite/[0.04] border border-graphite/10 rounded-xl mb-3">
            {fastSteps.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`flex-1 py-1.5 px-1 text-center rounded-lg font-sans text-[11px] font-bold tracking-wider uppercase transition-all ${
                    isActive 
                      ? 'bg-accent text-white shadow-xs' 
                      : 'text-graphite/60 hover:text-graphite active:bg-graphite/5'
                  }`}
                >
                  {item.pillLabel}
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
            className="mobile-snap-track gap-3.5 px-4 -mx-4 pb-2.5 pt-0.5"
          >
            {fastSteps.map((item) => (
              <div
                key={item.step}
                className="step-snap-item mobile-snap-item w-[74vw] max-w-[280px] flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-night-950 shadow-premium-image">
                  <picture>
                    <source srcSet={item.imageWebp} type="image/webp" />
                    <img 
                      src={item.imageJpg} 
                      alt={item.alt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/30 via-transparent to-black/10 pointer-events-none" />
                </div>

                <div className="mt-3 flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-graphite text-white font-sans text-[10.5px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {item.num}
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h3 className="font-display text-[15px] font-bold text-graphite leading-snug">
                      {item.label}
                    </h3>
                    <p className="text-xs text-graphite/70 leading-snug font-medium">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1 pb-1">
            {[0, 1, 2].map((dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToStep(dotIdx)}
                aria-label={`Ir al paso ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === dotIdx ? 'w-5 bg-accent' : 'w-1.5 bg-graphite/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* LÍNEA RESUMEN SUTIL Y SECUNDARIA */}
        <div className="mt-5 sm:mt-7 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-graphite/[0.04] border border-graphite/10 text-graphite/70 text-xs sm:text-[13px] font-sans font-medium text-center">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent stroke-[2.2] shrink-0" />
            <span>Entre 2 y 3 minutos por prenda. Sin tabla ni accesorios extra.</span>
          </div>
        </div>

        {/* Anchor target for backwards compatibility with any #beneficios links */}
        <div id="beneficios" className="scroll-mt-24" aria-hidden="true" />

        {/* =========================================================================
            PARTE 2: RESULTADO VISIBLE (HERO ANTES/DESPUÉS) + 3 CARACTERÍSTICAS
            Inmediatamente después, integrado en la misma narrativa
            ========================================================================= */}
        <div className="mt-8 sm:mt-10 lg:mt-12 max-w-[1120px] mx-auto">
          
          <div className="mb-3.5 sm:mb-5">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-graphite tracking-tight leading-[1.18]">
              No necesitas una sesión de planchado.
            </h3>
          </div>

          {/* BLOQUE HERO VISUAL: ANTES / DESPUÉS (Tamaño compacto y calibrado) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[28px] p-4 sm:p-6 lg:p-7 shadow-premium hover:shadow-premium-hover relative group transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
              
              {/* Columna Izquierda: Copy corto, directo y centrado */}
              <div className="lg:col-span-5 space-y-2 sm:space-y-3 flex flex-col justify-center py-1 sm:py-2">
                <h4 className="font-display text-xl sm:text-2xl lg:text-[1.85rem] font-bold text-graphite leading-[1.2] tracking-tight">
                  Enciende en 15 segundos y alisa directo en el gancho.
                </h4>

                <p className="text-xs sm:text-sm lg:text-[15px] text-graphite/70 leading-relaxed font-normal">
                  Calor cerámico a 150 °C para dejar tus prendas listas sin armar la tabla.
                </p>

                <p className="text-[10.5px] sm:text-[11px] font-sans text-graphite/45 italic pt-0.5">
                  ← Desliza el separador para comparar el acabado →
                </p>
              </div>

              {/* Columna Derecha: Slider Antes/Después Panorámico Compacto */}
              <div className="lg:col-span-7">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-premium-image bg-night-950">
                  <BeforeAfterSlider 
                    beforeImage="/images/before-wrinkled-shirt.jpg"
                    afterImage="/images/after-smooth-shirt.jpg"
                    aspectRatio="aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/11]"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* 3 BENEFICIOS TÉCNICOS ULTRA COMPACTOS Y ESCANEABLES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3.5 sm:mt-4">
            {/* 150 °C · Calor cerámico */}
            <div className="bg-white/85 border border-graphite/10 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 lg:p-4 flex items-center gap-3 shadow-xs hover:border-accent/40 transition-colors">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/25 text-accent flex items-center justify-center shrink-0">
                <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="font-display text-base sm:text-lg lg:text-xl font-bold text-graphite block leading-tight tracking-tight">
                  150 °C
                </span>
                <span className="text-[11px] sm:text-xs text-graphite/70 font-sans font-medium block mt-0.5">
                  Calor cerámico
                </span>
              </div>
            </div>

            {/* 15 segundos · Lista para salir */}
            <div className="bg-white/85 border border-graphite/10 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 lg:p-4 flex items-center gap-3 shadow-xs hover:border-accent/40 transition-colors">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/25 text-accent flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="font-display text-base sm:text-lg lg:text-xl font-bold text-graphite block leading-tight tracking-tight">
                  15 segundos
                </span>
                <span className="text-[11px] sm:text-xs text-graphite/70 font-sans font-medium block mt-0.5">
                  Lista para salir
                </span>
              </div>
            </div>

            {/* ANTIGOTEO · Sin manchas de agua */}
            <div className="bg-white/85 border border-graphite/10 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 lg:p-4 flex items-center gap-3 shadow-xs hover:border-accent/40 transition-colors">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/25 text-accent flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="font-display text-base sm:text-lg lg:text-xl font-bold text-graphite block leading-tight tracking-tight uppercase">
                  ANTIGOTEO
                </span>
                <span className="text-[11px] sm:text-xs text-graphite/70 font-sans font-medium block mt-0.5">
                  Sin manchas de agua
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
