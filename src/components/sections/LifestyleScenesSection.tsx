import React, { useState, useRef, useEffect } from 'react';
import { lifestyleScenes } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const sceneImages = [
  { webp: "/images/escena-01-camisa.webp", jpg: "/images/escena-01-camisa.jpg", alt: "Camisa de oficina colgada siendo alisada a vapor con LISO" },
  { webp: "/images/escena-02-vestido.webp", jpg: "/images/escena-02-vestido.jpg", alt: "Vestido verde de satén vaporizado en gancho con LISO" },
  { webp: "/images/escena-03-cortina.webp", jpg: "/images/escena-03-cortina.jpg", alt: "Cortina blanca vaporizada directamente en vertical con LISO" },
  { webp: "/images/escena-04-maleta.webp", jpg: "/images/escena-04-maleta.jpg", alt: "Plancha de viaje LISO empacada en maleta y bolso de mano" },
  { webp: "/images/escena-05-dock.webp", jpg: "/images/escena-05-dock.jpg", alt: "LISO descansando en su base de apoyo sobre superficie de mármol en el baño" },
];

export const LifestyleScenesSection: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15, rootMargin: '0px', triggerOnce: false, initialInView: false });
  const prefersReduced = useReducedMotion();
  const [activeScene, setActiveScene] = useState<number>(0);
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

  const scrollContainerTo = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const items = container.querySelectorAll('.mobile-snap-item');
    const targetItem = items[index] as HTMLElement;
    if (targetItem) {
      const targetLeft = targetItem.offsetLeft - container.offsetLeft - (container.clientWidth - targetItem.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll sincronizado: SOLO si la sección está visible en pantalla
  useEffect(() => {
    if (prefersReduced || isInteracting || !inView) return;

    const timer = setInterval(() => {
      setActiveScene((prev) => {
        const next = (prev + 1) % lifestyleScenes.length;
        scrollContainerTo(next);
        return next;
      });
    }, 4200);

    return () => clearInterval(timer);
  }, [prefersReduced, isInteracting, inView]);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const items = container.querySelectorAll('.mobile-snap-item');
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
      setActiveScene(closestIdx);
    }
  };

  const scrollToScene = (index: number) => {
    onUserInteraction();
    setActiveScene(index);
    scrollContainerTo(index);
  };

  return (
    <section 
      ref={ref}
      className="py-12 sm:py-16 lg:py-18 pb-20 sm:pb-24 lg:pb-20 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden"
      style={{ backgroundColor: '#F4EFE6' }}
    >

      {/* Background Texture: Architectural Waves (Horizontal Landscape) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/images/textures/texture-architectural-waves.webp" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-20 mix-blend-multiply filter contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4EFE6]/50 via-transparent to-[#F4EFE6]/60 pointer-events-none" />
      </div>

      {/* Ghost ambiental MAÑANA */}
      <div 
        className="select-none pointer-events-none absolute -right-6 top-10 font-sans font-medium text-[15vw] tracking-tighter leading-none text-graphite/[0.04] hidden md:block" 
        aria-hidden="true" 
      >
        MAÑANA
      </div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          title="Hay días en los que sacar la tabla no tiene sentido."
          subtitle="Una camisa antes de una reunión, una prenda delicada o la ropa que salió arrugada de la maleta. LISO está hecha para esos pequeños rescates del día a día."
          className="mb-8 sm:mb-10"
        />

        {/* =========================================================================
            DESKTOP EDITORIAL GRID (>= 768px) — 100% Unchanged Asymmetrical Layout
            ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Fila 1: Escena 01 - Camisa de oficina (6 cols, 50% simétrico) */}
          <Reveal direction="up" delay={0} duration={700} className="lg:col-span-6 flex">
            <div className="w-full bg-white rounded-2xl sm:rounded-[32px] p-5 sm:p-6 lg:p-7 shadow-premium hover:shadow-premium-hover flex flex-col justify-between group hover-lift transition-all duration-300">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-premium-image bg-night-950 mb-4 sm:mb-5">
                  <picture className="w-full h-full">
                    <source srcSet="/images/escena-01-camisa.webp" type="image/webp" />
                    <img 
                      src="/images/escena-01-camisa.jpg" 
                      alt="Camisa de oficina colgada siendo alisada a vapor con LISO" 
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-mech-s" 
                      loading="lazy" 
                    />
                  </picture>
                </div>
                <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-graphite leading-snug">
                  {lifestyleScenes[0].caption}
                </h3>
                <p className="text-xs sm:text-sm text-graphite/70 mt-2 leading-relaxed">
                  {lifestyleScenes[0].context}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Fila 1: Escena 02 - Vestido delicado (6 cols, 50% simétrico) */}
          <Reveal direction="up" delay={120} duration={700} className="lg:col-span-6 flex">
            <div className="w-full bg-white rounded-2xl sm:rounded-[32px] p-5 sm:p-6 lg:p-7 shadow-premium hover:shadow-premium-hover flex flex-col justify-between group hover-lift transition-all duration-300">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-premium-image bg-night-950 mb-4 sm:mb-5">
                  <picture className="w-full h-full">
                    <source srcSet="/images/escena-02-vestido.webp" type="image/webp" />
                    <img 
                      src="/images/escena-02-vestido.jpg" 
                      alt="Vestido verde de satén vaporizado en gancho con LISO" 
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-mech-s" 
                      loading="lazy" 
                    />
                  </picture>
                </div>
                <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-graphite leading-snug">
                  {lifestyleScenes[1].caption}
                </h3>
                <p className="text-xs sm:text-sm text-graphite/70 mt-2 leading-relaxed">
                  {lifestyleScenes[1].context}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Fila 2: Escena 03 - Cortina (4 cols) */}
          <Reveal direction="up" delay={0} duration={700} className="lg:col-span-4 flex">
            <div className="w-full bg-white rounded-2xl sm:rounded-[28px] p-4 sm:p-5 lg:p-6 shadow-premium hover:shadow-premium-hover flex flex-col justify-between group hover-lift transition-all duration-300">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-premium-image bg-night-950 mb-3.5 sm:mb-4">
                  <picture className="w-full h-full">
                    <source srcSet="/images/escena-03-cortina.webp" type="image/webp" />
                    <img 
                      src="/images/escena-03-cortina.jpg" 
                      alt="Cortina blanca vaporizada directamente en vertical con LISO" 
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-mech-s" 
                      loading="lazy" 
                    />
                  </picture>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-graphite leading-snug">
                  {lifestyleScenes[2].caption}
                </h3>
                <p className="text-xs sm:text-[13px] text-graphite/70 mt-1.5 leading-relaxed">
                  {lifestyleScenes[2].context}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Fila 2: Escena 04 - Hotel + maleta (4 cols) */}
          <Reveal direction="up" delay={100} duration={700} className="lg:col-span-4 flex">
            <div className="w-full bg-white rounded-2xl sm:rounded-[28px] p-4 sm:p-5 lg:p-6 shadow-premium hover:shadow-premium-hover flex flex-col justify-between group hover-lift transition-all duration-300">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-premium-image bg-night-950 mb-3.5 sm:mb-4">
                  <picture className="w-full h-full">
                    <source srcSet="/images/escena-04-maleta.webp" type="image/webp" />
                    <img 
                      src="/images/escena-04-maleta.jpg" 
                      alt="Plancha de viaje LISO empacada en maleta y bolso de mano" 
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-mech-s" 
                      loading="lazy" 
                    />
                  </picture>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-graphite leading-snug">
                  {lifestyleScenes[3].caption}
                </h3>
                <p className="text-xs sm:text-[13px] text-graphite/70 mt-1.5 leading-relaxed">
                  {lifestyleScenes[3].context}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Fila 2: Escena 05 - Producto sobre dock (4 cols) */}
          <Reveal direction="up" delay={200} duration={700} className="lg:col-span-4 flex">
            <div className="w-full bg-white rounded-2xl sm:rounded-[28px] p-4 sm:p-5 lg:p-6 shadow-premium hover:shadow-premium-hover flex flex-col justify-between group hover-lift transition-all duration-300">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-premium-image bg-night-950 mb-3.5 sm:mb-4">
                  <picture className="w-full h-full">
                    <source srcSet="/images/escena-05-dock.webp" type="image/webp" />
                    <img 
                      src="/images/escena-05-dock.jpg" 
                      alt="LISO descansando en su base de apoyo sobre superficie de mármol en el baño" 
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-mech-s" 
                      loading="lazy" 
                    />
                  </picture>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-graphite leading-snug">
                  {lifestyleScenes[4].caption}
                </h3>
                <p className="text-xs sm:text-[13px] text-graphite/70 mt-1.5 leading-relaxed">
                  {lifestyleScenes[4].context}
                </p>
              </div>
            </div>
          </Reveal>

        </div>

        {/* =========================================================================
            MOBILE STORY REEL (< 768px) — 100% Native Mobile-First Snap Carousel
            ========================================================================= */}
        <div className="block md:hidden">
          
          {/* Subtle scroll invitation cue */}
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[10px] font-sans font-bold tracking-widest text-graphite/50 uppercase">
              ESCENAS COTIDIANAS
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-sans text-accent font-semibold">
              <span>Desliza para explorar</span>
              <span className="text-xs animate-pulse">→</span>
            </span>
          </div>

          {/* Situation Pills Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-3 px-1 -mx-1">
            {lifestyleScenes.map((scene, idx) => {
              const isActive = activeScene === idx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => scrollToScene(idx)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full font-sans text-[10.5px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-accent text-white shadow-sm ring-1 ring-accent' 
                      : 'bg-graphite/[0.04] border border-graphite/10 text-graphite/60 hover:text-graphite active:bg-graphite/10'
                  }`}
                >
                  {scene.number} · {scene.title.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Horizontal Snap-Track */}
          <div 
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            onTouchStart={onUserInteraction}
            onPointerDown={onUserInteraction}
            className="mobile-snap-track gap-3.5 px-4 -mx-4 pb-4 pt-0.5"
          >
            {lifestyleScenes.map((scene, idx) => (
              <div
                key={scene.id}
                className="mobile-snap-item w-[76vw] max-w-[300px] bg-white p-4.5 rounded-2xl sm:rounded-3xl shadow-premium flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Slide Top Metadata */}
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-graphite/10 gap-2">
                    <span className="font-sans text-[10.5px] font-bold tracking-wider text-accent uppercase truncate">
                      {scene.number} · {scene.title}
                    </span>
                    <span className="font-sans text-[10px] font-semibold text-graphite/50 bg-graphite/[0.04] border border-graphite/10 px-2 py-0.5 rounded-full shrink-0">
                      {idx + 1} / {lifestyleScenes.length}
                    </span>
                  </div>

                  {/* High Quality Photograph */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-night-950 mb-3 shadow-premium-image">
                    <picture>
                      <source srcSet={sceneImages[idx].webp} type="image/webp" />
                      <img 
                        src={sceneImages[idx].jpg} 
                        alt={sceneImages[idx].alt}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Caption & Context with word wrap & overflow prevention */}
                  <div className="space-y-1 overflow-hidden">
                    <h3 className="font-display text-[15px] font-bold text-graphite leading-snug break-words">
                      {scene.caption}
                    </h3>
                    <p className="text-xs text-graphite/70 leading-relaxed font-normal break-words">
                      {scene.context}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 mt-2 border-t border-graphite/10 flex items-center justify-between text-[10px] font-sans font-medium text-graphite/45">
                  <span>LISO CARE</span>
                  <span>Retoque en 3 min</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 pb-2">
            {lifestyleScenes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToScene(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeScene === idx 
                    ? 'w-6 bg-accent' 
                    : 'w-1.5 bg-graphite/20 hover:bg-graphite/40'
                }`}
                aria-label={`Ir a escena ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
