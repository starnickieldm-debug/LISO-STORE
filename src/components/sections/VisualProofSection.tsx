import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DemoClip {
  id: string;
  videoSrc: string;
  posterSrc: string;
  alt: string;
}

const demoClips: DemoClip[] = [
  {
    id: 'saten-azul',
    videoSrc: '/videos/demo/demo-01-saten-azul.mp4',
    posterSrc: '/images/demo/demo-01-saten-azul.webp',
    alt: 'Demostración de planchado sobre camisa de satén azul'
  },
  {
    id: 'verde-gancho',
    videoSrc: '/videos/demo/demo-02-verde-gancho.mp4',
    posterSrc: '/images/demo/demo-02-verde-gancho.webp',
    alt: 'Demostración de planchado sobre tela de seda clara'
  },
  {
    id: 'burbuja-rosa',
    videoSrc: '/videos/demo/demo-03-burbuja-rosa.mp4',
    posterSrc: '/images/demo/demo-03-burbuja-rosa.webp',
    alt: 'Demostración de alisado en tejido texturizado burbuja rosa'
  },
  {
    id: 'celeste-gancho',
    videoSrc: '/videos/demo/demo-04-celeste-gancho.mp4',
    posterSrc: '/images/demo/demo-04-celeste-gancho.webp',
    alt: 'Demostración de vaporizado vertical en gancho'
  },
  {
    id: 'turquesa-algodon',
    videoSrc: '/videos/demo/demo-05-denim-oscuro.mp4',
    posterSrc: '/images/demo/demo-05-denim-oscuro.webp',
    alt: 'Demostración de alisado en camisa de algodón turquesa'
  },
  {
    id: 'denim-claro',
    videoSrc: '/videos/demo/demo-06-denim-claro.mp4',
    posterSrc: '/images/demo/demo-06-denim-claro.webp',
    alt: 'Demostración de planchado en prenda denim de mezclilla'
  }
];

export const VisualProofSection: React.FC = () => {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Autoplay all clips simultaneously in silent loop
  useEffect(() => {
    if (prefersReduced) return;

    const playAll = () => {
      demoClips.forEach(clip => {
        const v = videoRefs.current[clip.id];
        if (v) {
          v.defaultMuted = true;
          v.muted = true;
          if (v.paused) {
            v.play().catch(() => {});
          }
        }
      });
    };

    if (inView) {
      playAll();
    } else {
      Object.values(videoRefs.current).forEach(v => {
        if (v && !v.paused) {
          v.pause();
        }
      });
    }

    const handleVisibility = () => {
      if (!document.hidden && inView) {
        playAll();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [inView, prefersReduced]);

  // Scroll tracking for navigation buttons and indicator dots
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    const firstCard = el.querySelector('[data-demo-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 280;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), demoClips.length - 1));
  }, []);

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-demo-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 280;
    const scrollDistance = cardWidth * 2;
    el.scrollBy({
      left: direction === 'left' ? -scrollDistance : scrollDistance,
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-demo-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 280;
    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  return (
    <section
      id="demostracion-visual"
      ref={sectionRef}
      className="py-10 sm:py-12 lg:py-16 bg-night-950 text-bone relative overflow-hidden select-none border-b border-white/10"
      style={{ backgroundColor: '#1F1D1B' }}
    >
      {/* Background Texture: Architectural Grid */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/images/textures/texture-grid-inverted.webp" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-10 mix-blend-screen"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1D1B] via-transparent to-[#1F1D1B] pointer-events-none" />
      </div>

      {/* Atmospheric Ambient Glow */}
      <div 
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-3xl" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Clean, No eyebrow pill, Wide layout */}
        <Reveal direction="up" duration={600}>
          <div className="text-center w-full max-w-none mx-auto mb-6 sm:mb-8 px-2">
            {/* Section Headline */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] xl:text-[2.75rem] font-bold text-bone tracking-tight leading-tight lg:whitespace-nowrap">
              Mírala en acción.
            </h2>

            {/* EXACT Subheadline */}
            <p className="font-sans text-xs sm:text-sm md:text-base lg:text-[15px] xl:text-[16.5px] text-bone/70 max-w-none leading-relaxed mt-2 sm:mt-2.5 lg:whitespace-nowrap">
              De arrugada a impecable. En segundos.
            </p>
          </div>
        </Reveal>

        {/* Carousel Multi-Card Container (Single-Row Horizontal Scroll) */}
        <div className="relative group/carousel">
          {/* Left Arrow Button (desktop/tablet) */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByDirection('left')}
              aria-label="Ver demostraciones anteriores"
              className="hidden sm:flex absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/80 hover:bg-black border border-white/25 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}

          {/* Right Arrow Button (desktop/tablet) */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByDirection('right')}
              aria-label="Ver siguientes demostraciones"
              className="hidden sm:flex absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/80 hover:bg-black border border-white/25 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}

          {/* Side Fades */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-r from-[#1F1D1B] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-l from-[#1F1D1B] to-transparent z-20" />

          {/* Horizontal Scroll Track: 100% clean video cards */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none no-scrollbar scroll-smooth px-3 sm:px-6 py-2"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {demoClips.map((clip) => (
              <div 
                key={clip.id}
                data-demo-card="true"
                className="group/card flex-none w-[70vw] sm:w-[230px] lg:w-[255px] xl:w-[275px] aspect-[9/16] rounded-2xl lg:rounded-3xl overflow-hidden bg-black/60 border border-white/15 hover:border-accent/40 shadow-xl relative snap-center select-none transition-all duration-300"
                role="region"
                aria-label={clip.alt}
              >
                {/* 100% Clean Video: Zero overlays, zero badges, zero labels, continuous silent loop */}
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[clip.id] = el;
                      el.defaultMuted = true;
                      el.muted = true;
                    }
                  }}
                  src={clip.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
                  onLoadedData={(e) => {
                    const v = e.currentTarget;
                    v.defaultMuted = true;
                    v.muted = true;
                    if (v.paused) {
                      v.play().catch(() => {});
                    }
                  }}
                  onCanPlay={(e) => {
                    const v = e.currentTarget;
                    if (v.paused) {
                      v.play().catch(() => {});
                    }
                  }}
                  onEnded={(e) => {
                    e.currentTarget.play().catch(() => {});
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Minimal pagination dot indicators (Mobile/Tablet only, hidden on Desktop) */}
        <div className="lg:hidden flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5" aria-hidden="true">
          {demoClips.map((clip, index) => (
            <button
              key={clip.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'w-6 bg-accent shadow-[0_0_8px_rgba(180,36,124,0.6)]' 
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ir a la demostración ${index + 1}`}
            />
          ))}
        </div>

        {/* Closing Microcopy */}
        <Reveal direction="up" delay={150} duration={600}>
          <div className="text-center pt-6 sm:pt-8">
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-bone/50 select-none">
              Una transformación que se explica sola.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
