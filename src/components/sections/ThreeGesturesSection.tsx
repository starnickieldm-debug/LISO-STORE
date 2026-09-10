import React, { useState, useRef } from 'react';
import { threeGestures, brandConfig } from '../../config/siteContent';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Sparkles } from 'lucide-react';
import { RotatingGuaranteeStamp } from '../ui/RotatingGuaranteeStamp';

export const ThreeGesturesSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', triggerOnce: true });
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onUserInteraction = () => {
    setIsInteracting(true);
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 7000);
  };

  // Auto-scroll sincronizado con intervalos controlados
  React.useEffect(() => {
    if (prefersReduced || isInteracting || !inView) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 3;
        if (carouselRef.current) {
          const items = carouselRef.current.querySelectorAll('.mobile-snap-item');
          if (items[next]) {
            (items[next] as HTMLElement).scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
        return next;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [prefersReduced, isInteracting, inView]);

  const scrollToStep = (stepIndex: number) => {
    onUserInteraction();
    setActiveStep(stepIndex);
    if (carouselRef.current) {
      const items = carouselRef.current.querySelectorAll('.mobile-snap-item');
      if (items[stepIndex]) {
        (items[stepIndex] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const itemWidth = carouselRef.current.clientWidth * 0.76;
    if (itemWidth > 0) {
      const currentIdx = Math.round(scrollLeft / itemWidth);
      const clamped = Math.max(0, Math.min(currentIdx, 2));
      setActiveStep(clamped);
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
      id="como-funciona" 
      className="py-10 sm:py-14 lg:py-16 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* =========================================================================
            ASYMMETRIC EDITORIAL HEADER (Reference Formula: Problem + 3 Frictions + Solution)
            ========================================================================= */}
        <div className="max-w-3xl mb-8 sm:mb-10 lg:mb-12">
          {/* Main Problem Heading */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-graphite tracking-tight leading-[1.18]">
            Planchar da pereza por 3 razones:
          </h2>

          {/* Subheading Frictions + Floating Solution Text */}
          <div className="mt-2.5 sm:mt-3.5 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 text-base sm:text-lg md:text-xl lg:text-2xl text-graphite/70 font-normal">
            <span>Armar la tabla, esperar que caliente, y el peso de la plancha.</span>
            <span className="font-sans font-bold text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] text-graphite tracking-tight">
              LISO resolvió las 3
            </span>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP PROCESS GRID (>= 768px) — Vertical 4:5 Cards + Decoupled Captions
            ========================================================================= */}
        <div ref={ref} className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 relative items-stretch">
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
                {/* Subtle depth vignette */}
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

        {/* =========================================================================
            MOBILE PROCESS CAROUSEL (< 768px) — Native Mobile Snap-Stage
            ========================================================================= */}
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
                  {item.step} · {idx === 0 ? 'LLENA' : idx === 1 ? 'ENCIENDE' : 'PLANCHA'}
                </button>
              );
            })}
          </div>

          {/* Horizontal Snap-Track with User Interaction Tracking */}
          <div 
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            onTouchStart={onUserInteraction}
            onPointerDown={onUserInteraction}
            className="mobile-snap-track gap-3.5 px-4 -mx-4 pb-3 pt-1"
          >
            {threeGestures.map((item, idx) => (
              <div
                key={item.step}
                className="mobile-snap-item w-[76vw] max-w-[290px] flex flex-col"
              >
                {/* Full-Bleed Portrait Photo Card (4:5 Ratio) */}
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

                {/* Decoupled Caption Underneath */}
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
            LABORATORY VERIFICATION HIGHLIGHT CARD (Compact Horizontal on Mobile)
            ========================================================================= */}
        <div className="mt-7 sm:mt-10 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:py-6 lg:px-8 shadow-premium hover:shadow-premium-hover flex flex-row items-center justify-between gap-3.5 sm:gap-6 relative overflow-hidden group transition-all duration-300">
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

          {/* Right: Laboratory Note & Result Claim (Expanded Horizontally) */}
          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[9.5px] sm:text-xs font-sans uppercase tracking-[0.14em] text-accent font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                RESULTADO COMPROBADO
              </span>
            </div>
            <p className="font-display text-sm sm:text-lg md:text-xl lg:text-[1.5rem] font-bold text-graphite tracking-tight leading-snug">
              Entre 2 y 3 minutos por prenda. Sin tabla ni accesorios extra.
            </p>
            <p className="text-[10px] sm:text-xs text-graphite/60 font-normal">
              *{brandConfig.labClaimNote}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
