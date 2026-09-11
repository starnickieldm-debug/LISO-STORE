import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface UgcItem {
  id: string;
  videoSrc: string;
  posterSrc: string;
  alt: string;
}

const ugcItems: UgcItem[] = [
  {
    id: 'ugc-01',
    videoSrc: '/videos/ugc/ugc-01.mp4',
    posterSrc: '/images/ugc/ugc-01.webp',
    alt: 'Demostración de planchado vertical continuo con LISO'
  },
  {
    id: 'ugc-02',
    videoSrc: '/videos/ugc/ugc-02.mp4',
    posterSrc: '/images/ugc/ugc-02.webp',
    alt: 'Alisado de blusa directo en gancho'
  },
  {
    id: 'ugc-03',
    videoSrc: '/videos/ugc/ugc-03.mp4',
    posterSrc: '/images/ugc/ugc-03.webp',
    alt: 'Deslizamiento vertical sobre gabardina'
  },
  {
    id: 'ugc-04',
    videoSrc: '/videos/ugc/ugc-04.mp4',
    posterSrc: '/images/ugc/ugc-04.webp',
    alt: 'Vaporizador portátil para prendas delicadas'
  },
  {
    id: 'ugc-05',
    videoSrc: '/videos/ugc/ugc-05.mp4',
    posterSrc: '/images/ugc/ugc-05.webp',
    alt: 'Camisa amarilla sin arrugas en segundos'
  },
  {
    id: 'ugc-06',
    videoSrc: '/videos/ugc/ugc-06.mp4',
    posterSrc: '/images/ugc/ugc-06.webp',
    alt: 'Planchado express de camisa blanca en gancho'
  },
  {
    id: 'ugc-07',
    videoSrc: '/videos/ugc/ugc-07.mp4',
    posterSrc: '/images/ugc/ugc-07.webp',
    alt: 'Retoque rápido de polo sobre cama sin tabla'
  },
  {
    id: 'ugc-08',
    videoSrc: '/videos/ugc/ugc-08.mp4',
    posterSrc: '/images/ugc/ugc-08.webp',
    alt: 'Vapor continuo y seguro sobre vestido estampado'
  },
  {
    id: 'ugc-09',
    videoSrc: '/videos/ugc/ugc-09.mp4',
    posterSrc: '/images/ugc/ugc-09.webp',
    alt: 'Prenda lisa en minutos lista para salir'
  }
];

export const SocialProofSection: React.FC = () => {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  // Audio state
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Video element references & scroll ref
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Exclusive audio toggle: unmuting one video mutes all others
  const toggleAudio = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;

    if (activeAudioId === id) {
      // Mute this video
      video.muted = true;
      setActiveAudioId(null);
    } else {
      // Mute all others first
      Object.entries(videoRefs.current).forEach(([otherId, otherVideo]) => {
        if (otherVideo) {
          otherVideo.muted = otherId !== id;
        }
      });
      video.muted = false;
      setActiveAudioId(id);

      // Ensure video is actively playing
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  }, [activeAudioId]);

  // Autoplay all videos simultaneously in silent loop
  useEffect(() => {
    if (prefersReduced) return;

    const playAll = () => {
      ugcItems.forEach(item => {
        const video = videoRefs.current[item.id];
        if (video) {
          video.defaultMuted = true;
          video.muted = activeAudioId !== item.id;
          if (video.paused) {
            video.play().catch(() => {});
          }
        }
      });
    };

    if (inView) {
      playAll();
    } else {
      // Pause when out of view to save resources
      Object.values(videoRefs.current).forEach(video => {
        if (video && !video.paused) {
          video.pause();
        }
      });
      if (activeAudioId) {
        setActiveAudioId(null);
      }
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
  }, [inView, prefersReduced, activeAudioId]);

  // Scroll tracking & arrow button state
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    const firstCard = el.querySelector('[data-ugc-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 280;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), ugcItems.length - 1));
  }, []);

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-ugc-card="true"]') as HTMLElement | null;
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
    const firstCard = el.querySelector('[data-ugc-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 280;
    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  return (
    <section 
      id="social-proof"
      ref={sectionRef}
      className="py-10 sm:py-12 lg:py-16 bg-night-950 text-bone relative overflow-hidden scroll-mt-20 select-none border-y border-white/10"
      style={{ backgroundColor: '#1F1D1B' }}
    >
      {/* Background Texture */}
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

      {/* Atmospheric Glow */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(180,36,124,0.12)_0%,transparent_70%)] blur-3xl" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Wide 1-line layout on desktop, saves vital vertical space */}
        <Reveal direction="up" duration={600}>
          <div className="text-center w-full max-w-none mx-auto mb-6 sm:mb-8 px-2">
            {/* Headline - 1 single line on desktop */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-bone tracking-tight leading-tight lg:whitespace-nowrap">
              ¿Ya viste por qué todos hablan de LISO?
            </h2>

            {/* Subheadline - 1 single line on desktop */}
            <p className="font-sans text-sm sm:text-base lg:text-lg text-bone/75 max-w-none leading-relaxed mt-2 sm:mt-2.5 lg:whitespace-nowrap">
              Mira cómo este producto se está convirtiendo en el favorito de quienes quieren prendas impecables sin complicarse.
            </p>
          </div>
        </Reveal>

        {/* Carousel Multi-Card Container */}
        <div className="relative group/carousel">
          {/* Left Arrow (desktop/tablet) */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByDirection('left')}
              aria-label="Ver videos anteriores"
              className="hidden sm:flex absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/80 hover:bg-black border border-white/25 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}

          {/* Right Arrow (desktop/tablet) */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByDirection('right')}
              aria-label="Ver siguientes videos"
              className="hidden sm:flex absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/80 hover:bg-black border border-white/25 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}

          {/* Side Fades for aesthetic depth */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-r from-[#1F1D1B] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-l from-[#1F1D1B] to-transparent z-20" />

          {/* Horizontal Scroll Track with all 9 continuous videos */}
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
            {ugcItems.map((item) => {
              const isAudioActive = activeAudioId === item.id;

              return (
                <div 
                  key={item.id}
                  data-ugc-card="true"
                  className="group/card flex-none w-[70vw] sm:w-[230px] lg:w-[255px] xl:w-[275px] aspect-[9/16] rounded-2xl lg:rounded-3xl overflow-hidden bg-black/60 border border-white/15 hover:border-accent/40 shadow-xl relative snap-center select-none transition-all duration-300"
                  role="region"
                  aria-label={item.alt}
                >
                  {/* HTML5 Video: 100% clean, no text overlays, continuous silent loop, no pause on click */}
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRefs.current[item.id] = el;
                        el.defaultMuted = true;
                        el.muted = activeAudioId !== item.id;
                      }
                    }}
                    src={item.videoSrc}
                    autoPlay
                    loop
                    muted={activeAudioId !== item.id}
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
                    onLoadedData={(e) => {
                      const v = e.currentTarget;
                      v.defaultMuted = true;
                      v.muted = activeAudioId !== item.id;
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

                  {/* ONLY Overlay: Audio Toggle Button in top-right */}
                  <div className="absolute top-3 right-3 z-30 pointer-events-auto">
                    <button
                      type="button"
                      onClick={(e) => toggleAudio(item.id, e)}
                      className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all duration-200 border flex items-center justify-center ${
                        isAudioActive 
                          ? 'bg-accent text-white border-accent shadow-[0_0_16px_rgba(180,36,124,0.7)] scale-105 ring-2 ring-white/30' 
                          : 'bg-black/60 text-bone/85 border-white/25 hover:bg-black/90 hover:text-white hover:border-white/50'
                      }`}
                      aria-label={isAudioActive ? 'Silenciar audio' : 'Activar sonido'}
                      title={isAudioActive ? 'Silenciar audio' : 'Activar sonido'}
                    >
                      {isAudioActive ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4 opacity-75" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal pagination dot indicators (Mobile/Tablet only, hidden on Desktop) */}
        <div className="lg:hidden flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5" aria-hidden="true">
          {ugcItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'w-6 bg-accent shadow-[0_0_8px_rgba(180,36,124,0.6)]' 
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ir al video ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
