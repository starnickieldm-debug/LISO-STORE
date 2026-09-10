import React, { useState, useRef } from 'react';
import { threeGestures, brandConfig } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Droplet, Power, Sparkles } from 'lucide-react';

export const ThreeGesturesSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -50px 0px', triggerOnce: true });
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToStep = (stepIndex: number) => {
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
    const itemWidth = carouselRef.current.clientWidth * 0.85;
    if (itemWidth > 0) {
      const currentIdx = Math.round(scrollLeft / itemWidth);
      const clamped = Math.max(0, Math.min(currentIdx, 2));
      setActiveStep(clamped);
    }
  };

  const icons = [
    <Droplet className="w-4 h-4 text-bone/70 group-hover:text-accent transition-colors" />,
    <Power className="w-4 h-4 text-accent" />,
    <Sparkles className="w-4 h-4 text-bone/70 group-hover:text-accent transition-colors" />
  ];

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
      alt: "Planchado a vapor en percha sobre abrigo de lana con la plancha LISO"
    }
  ];

  return (
    <section 
      id="como-funciona" 
      className="py-20 sm:py-24 lg:py-28 bg-night-900 text-bone border-b border-white/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#121318' }}
    >
      {/* Background Texture: Pizarra oscura con exposición reducida */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/images/section2-slate-texture.jpg" 
          alt="" 
          className="w-full h-full object-cover object-center scale-105 opacity-60"
          style={{ filter: 'brightness(0.6) contrast(1.1)' }}
        />
        {/* Soft dark gradient overlays for luxury editorial contrast and smooth section blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F] via-transparent to-[#0B0C0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F]/40 via-transparent to-[#0B0C0F]/40" />
      </div>

      {/* Ambient Layer: Radial cálido arriba-izquierda */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.08)_0%,transparent_65%)] blur-2xl z-1" 
        aria-hidden="true" 
      />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Centered Editorial Section Header with authoritative scale and tight spacing */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14 space-y-2.5">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-bone tracking-tight leading-[1.15]">
            Solo 3 pasos para usarla
          </h2>
          <p className="text-base sm:text-lg text-bone/70 max-w-xl mx-auto font-normal leading-relaxed">
            Olvídate de armar la tabla y de la plancha pesada.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP PROCESS GRID (>= 768px) — 100% Unchanged 3-Col Layout
            ========================================================================= */}
        <div ref={ref} className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 relative items-stretch">
          {threeGestures.map((item, idx) => (
            <React.Fragment key={item.step}>
              <div
                className="relative bg-night-950/70 backdrop-blur-md border border-white/[0.09] hover:border-accent/40 p-5 sm:p-6 lg:p-7 flex flex-col justify-between group transition-all duration-300 ease-mech-s shadow-dark-card rounded-xl hover-lift"
                style={prefersReduced ? undefined : {
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
                  transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 140}ms`,
                  willChange: inView ? 'auto' : 'opacity, transform'
                }}
              >
                <div>
                  {/* Step Identifier Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08]">
                    <span className="font-sans text-xs font-bold tracking-[0.16em] text-accent uppercase">
                      PASO {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      {icons[idx]}
                    </div>
                  </div>

                  {/* Prominent Real Demonstration Photograph */}
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden rounded-lg bg-night-950 border border-white/10 group-hover:border-white/20 transition-colors shadow-md">
                    <picture>
                      <source srcSet={stepImages[idx].webp} type="image/webp" />
                      <img 
                        src={stepImages[idx].jpg} 
                        alt={stepImages[idx].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-mech-s"
                        loading="lazy"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content Block */}
                  <div className="pt-4 sm:pt-5 space-y-1.5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-bone group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] font-medium text-bone/90 leading-snug">
                      {item.description}
                    </p>
                    <p className="text-xs sm:text-sm text-bone/60 leading-relaxed font-normal pt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {/* Subtle Editorial Horizontal Arrow Connector (Desktop only, between cards 01-02 and 02-03) */}
                {idx < 2 && (
                  <div 
                    className="hidden md:flex items-center justify-center absolute -right-3.5 lg:-right-4.5 xl:-right-5.5 top-[28%] -translate-y-1/2 z-20 pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="w-7 lg:w-9 xl:w-11 h-[1px] bg-gradient-to-r from-accent/70 via-accent to-white/40 relative">
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0.5 border-solid border-t-transparent border-b-transparent border-l-accent border-t-[3.5px] border-b-[3.5px] border-l-[6px]" />
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* =========================================================================
            MOBILE PROCESS CAROUSEL (< 768px) — 100% Native Mobile-First Snap Stage
            ========================================================================= */}
        <div className="block md:hidden">
          
          {/* Step Pill Navigation Tabs */}
          <div className="flex items-center justify-between gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl mb-4">
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
                      : 'text-bone/60 hover:text-bone active:bg-white/5'
                  }`}
                >
                  {item.step} · {idx === 0 ? 'LLENA' : idx === 1 ? 'ENCIENDE' : 'PLANCHA'}
                </button>
              );
            })}
          </div>

          {/* Horizontal Snap-Track */}
          <div 
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="mobile-snap-track gap-3.5 px-4 -mx-4 pb-3 pt-0.5"
          >
            {threeGestures.map((item, idx) => (
              <div
                key={item.step}
                className="mobile-snap-item w-[85vw] max-w-[340px] bg-night-950/90 border border-white/15 p-5 rounded-2xl shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="font-sans text-xs font-bold tracking-widest text-accent uppercase">
                      PASO {item.step} DE 03
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      {icons[idx]}
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-black border border-white/10 mb-3.5 shadow-md">
                    <picture>
                      <source srcSet={stepImages[idx].webp} type="image/webp" />
                      <img 
                        src={stepImages[idx].jpg} 
                        alt={stepImages[idx].alt}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  {/* Copy */}
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-bone">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-bone/90 leading-snug">
                      {item.description}
                    </p>
                    <p className="text-xs text-bone/60 leading-relaxed pt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>

                {/* Mini Footer Pill */}
                <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-sans uppercase tracking-wider font-semibold text-bone/50">
                  <span>DESLIZA PARA CONTINUAR</span>
                  <span className="text-accent font-bold">0{idx + 1} / 03</span>
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
                  activeStep === dotIdx ? 'w-6 bg-accent' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Bottom Process Conclusion (El Resultado del Proceso) */}
        <div className="mt-8 sm:mt-16 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-accent font-semibold">
              EL RESULTADO
            </span>
          </div>

          <p className="font-display text-lg sm:text-2xl font-bold text-bone tracking-tight">
            Entre 2 y 3 minutos por prenda.
          </p>

          <p className="text-xs sm:text-sm font-sans text-bone/60 uppercase tracking-widest font-medium mt-1">
            Sin tabla de planchar · Sin accesorios extra
          </p>

          <p className="text-[10px] font-sans text-bone/40 italic pt-1.5">
            *{brandConfig.labClaimNote}
          </p>
        </div>

      </div>
    </section>
  );
};
