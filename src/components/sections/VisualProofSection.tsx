import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface DemoClip {
  id: string;
  videoSrc: string;
  posterSrc: string;
  label: string;
  alt: string;
}

const demoClips: DemoClip[] = [
  {
    id: 'saten-azul',
    videoSrc: '/videos/demo/demo-01-saten-azul.mp4',
    posterSrc: '/images/demo/demo-01-saten-azul.webp',
    label: 'Satén · Alisado al contacto',
    alt: 'Demostración de planchado sobre camisa de satén azul'
  },
  {
    id: 'verde-gancho',
    videoSrc: '/videos/demo/demo-02-verde-gancho.mp4',
    posterSrc: '/images/demo/demo-02-verde-gancho.webp',
    label: 'Seda · Acabado espejo',
    alt: 'Demostración de planchado sobre tela de seda clara'
  },
  {
    id: 'burbuja-rosa',
    videoSrc: '/videos/demo/demo-03-burbuja-rosa.mp4',
    posterSrc: '/images/demo/demo-03-burbuja-rosa.webp',
    label: 'Textura 3D · Aplanado instantáneo',
    alt: 'Demostración de alisado en tejido texturizado burbuja rosa'
  },
  {
    id: 'celeste-gancho',
    videoSrc: '/videos/demo/demo-04-celeste-gancho.mp4',
    posterSrc: '/images/demo/demo-04-celeste-gancho.webp',
    label: 'Directo en gancho · Sin tabla',
    alt: 'Demostración de vaporizado vertical en gancho'
  },
  {
    id: 'turquesa-algodon',
    videoSrc: '/videos/demo/demo-05-denim-oscuro.mp4',
    posterSrc: '/images/demo/demo-05-denim-oscuro.webp',
    label: 'Algodón · Un solo pase',
    alt: 'Demostración de alisado en camisa de algodón turquesa'
  },
  {
    id: 'denim-claro',
    videoSrc: '/videos/demo/demo-06-denim-claro.mp4',
    posterSrc: '/images/demo/demo-06-denim-claro.webp',
    label: 'Denim · Tejido pesado',
    alt: 'Demostración de planchado en prenda denim de mezclilla'
  }
];

export const VisualProofSection: React.FC = () => {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  const [playingMap, setPlayingMap] = useState<Record<string, boolean>>({});
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Play/pause toggle for user tap
  const handleTogglePlay = useCallback((id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setPlayingMap(prev => ({ ...prev, [id]: true }));
      }).catch(() => {});
    } else {
      video.pause();
      setPlayingMap(prev => ({ ...prev, [id]: false }));
    }
  }, []);

  // Desktop autoplay controller: play when section is in view, pause when out
  useEffect(() => {
    if (prefersReduced) return;

    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

    if (inView) {
      if (isDesktop) {
        demoClips.forEach(clip => {
          const v = videoRefs.current[clip.id];
          if (v) {
            v.muted = true;
            v.play().then(() => {
              setPlayingMap(prev => ({ ...prev, [clip.id]: true }));
            }).catch(() => {});
          }
        });
      } else {
        const activeClip = demoClips[mobileActiveIndex];
        if (activeClip) {
          const v = videoRefs.current[activeClip.id];
          if (v) {
            v.muted = true;
            v.play().then(() => {
              setPlayingMap(prev => ({ ...prev, [activeClip.id]: true }));
            }).catch(() => {});
          }
        }
      }
    } else {
      demoClips.forEach(clip => {
        const v = videoRefs.current[clip.id];
        if (v && !v.paused) {
          v.pause();
          setPlayingMap(prev => ({ ...prev, [clip.id]: false }));
        }
      });
    }
  }, [inView, prefersReduced, mobileActiveIndex]);

  // Mobile horizontal scroll tracking
  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.offsetWidth * 0.84;
    const newIdx = Math.round(scrollLeft / itemWidth);
    if (newIdx >= 0 && newIdx < demoClips.length && newIdx !== mobileActiveIndex) {
      setMobileActiveIndex(newIdx);

      demoClips.forEach((clip, idx) => {
        const v = videoRefs.current[clip.id];
        if (v) {
          if (idx === newIdx) {
            v.muted = true;
            v.play().catch(() => {});
            setPlayingMap(prev => ({ ...prev, [clip.id]: true }));
          } else {
            v.pause();
            setPlayingMap(prev => ({ ...prev, [clip.id]: false }));
          }
        }
      });
    }
  };

  const scrollToMobileIndex = (index: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const itemWidth = el.offsetWidth * 0.84;
    el.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setMobileActiveIndex(index);
  };

  return (
    <section
      id="demostracion-visual"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-28 bg-night-950 text-bone relative overflow-hidden select-none border-b border-white/10"
      style={{ backgroundColor: '#1F1D1B' }}
    >
      {/* Background Texture: Subtle architectural grid */}
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

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <Reveal direction="up" duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            
            {/* Minimal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-bone/80 font-medium">
                Demostración pura
              </span>
            </div>

            {/* EXACT Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl 2xl:text-5.5xl font-bold text-bone tracking-tight leading-[1.12]">
              Ahora mira por qué.
            </h2>

            {/* EXACT Subheadline */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-bone/70 max-w-2xl mx-auto leading-relaxed mt-3 sm:mt-4">
              De arrugada a impecable. En segundos.
            </p>
          </div>
        </Reveal>

        {/* =========================================================================
            DESKTOP GRID (≥ 1024px) — 3 Columns × 2 Rows (6 Vertical Videos)
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 max-w-[1240px] mx-auto">
          {demoClips.map((clip, index) => {
            const isPlaying = playingMap[clip.id] ?? false;

            return (
              <Reveal key={clip.id} direction="up" delay={index * 80} duration={600}>
                <div
                  onClick={() => handleTogglePlay(clip.id)}
                  className="group relative aspect-[9/16] rounded-2xl xl:rounded-3xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/30 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] cursor-pointer"
                  role="region"
                  aria-label={clip.alt}
                >
                  {/* Silent Video (no audio track) */}
                  <video
                    ref={(el) => { videoRefs.current[clip.id] = el; }}
                    src={clip.videoSrc}
                    poster={clip.posterSrc}
                    playsInline
                    loop
                    muted
                    preload="none"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    onPlay={() => setPlayingMap(prev => ({ ...prev, [clip.id]: true }))}
                    onPause={() => setPlayingMap(prev => ({ ...prev, [clip.id]: false }))}
                  />

                  {/* Discrete Subtle Indicator Top: ANTES → DESPUÉS */}
                  <div className="absolute top-3.5 left-3.5 pointer-events-none z-20">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-bone/85 tracking-wider uppercase font-medium">
                      Antes → Después
                    </span>
                  </div>

                  {/* Center Play Indicator when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center transition-opacity z-10 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Minimal Bottom Label */}
                  <div className="absolute inset-x-0 bottom-0 pt-16 pb-3.5 px-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end pointer-events-none z-20">
                    <p className="text-[12px] xl:text-[13px] font-sans font-medium text-bone/80 leading-snug">
                      {clip.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* =========================================================================
            MOBILE CAROUSEL (< 1024px) — Horizontal Snap Feed (84vw + Peek)
           ========================================================================= */}
        <div className="lg:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 sm:gap-4 pb-4 pt-1 px-4 sm:px-6 -mx-4 sm:-mx-6 scrollbar-none scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {demoClips.map((clip) => {
              const isPlaying = playingMap[clip.id] ?? false;

              return (
                <div
                  key={clip.id}
                  onClick={() => handleTogglePlay(clip.id)}
                  className="flex-none w-[84vw] max-w-[300px] snap-center aspect-[9/16] rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-2xl relative cursor-pointer active:scale-[0.99] transition-transform"
                  role="region"
                  aria-label={clip.alt}
                >
                  <video
                    ref={(el) => { videoRefs.current[clip.id] = el; }}
                    src={clip.videoSrc}
                    poster={clip.posterSrc}
                    playsInline
                    loop
                    muted
                    preload="none"
                    className="w-full h-full object-cover"
                    onPlay={() => setPlayingMap(prev => ({ ...prev, [clip.id]: true }))}
                    onPause={() => setPlayingMap(prev => ({ ...prev, [clip.id]: false }))}
                  />

                  {/* Top Discrete Indicator */}
                  <div className="absolute top-3 left-3 pointer-events-none z-20">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono text-bone/85 tracking-wider uppercase font-medium">
                      Antes → Después
                    </span>
                  </div>

                  {/* Center Play Indicator when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-10">
                      <div className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 ml-0.5 fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Label */}
                  <div className="absolute inset-x-0 bottom-0 pt-12 pb-3 px-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-20">
                    <p className="text-[12px] font-sans font-medium text-bone/85 leading-snug">
                      {clip.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile 6-Dots Pagination Indicator (○ ● ○ ○ ○ ○) */}
          <div className="flex items-center justify-center gap-2 mt-5" aria-hidden="true">
            {demoClips.map((clip, index) => (
              <button
                key={clip.id}
                type="button"
                onClick={() => scrollToMobileIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileActiveIndex === index
                    ? 'w-6 bg-accent'
                    : 'w-2 bg-white/25 hover:bg-white/40'
                }`}
                aria-label={`Ver demostración ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* =========================================================================
            CLOSING MICROCOPY — "Una transformación que se explica sola."
           ========================================================================= */}
        <Reveal direction="up" delay={150} duration={600}>
          <div className="text-center pt-10 sm:pt-14 lg:pt-16">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-bone/50 select-none">
              Una transformación que se explica sola.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
