import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Play, ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { CTAButton } from '../ui/CTAButton';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface UgcItem {
  id: string;
  videoSrc: string;
  posterSrc: string;
  tag: string;
  scenario: string;
  alt: string;
}

const ugcItems: UgcItem[] = [
  {
    id: 'julissa',
    videoSrc: '/videos/ugc/ugc-01-julissa.mp4',
    posterSrc: '/images/ugc/ugc-01-julissa.webp',
    tag: 'Directo en el gancho',
    scenario: 'Gabardina verde · Deslizamiento vertical',
    alt: 'Demostración de planchado vertical en gancho'
  },
  {
    id: 'magoayala',
    videoSrc: '/videos/ugc/ugc-02-magoayala.mp4',
    posterSrc: '/images/ugc/ugc-02-magoayala.webp',
    tag: 'Sin tabla ni esperas',
    scenario: 'Camisa amarilla · Cuellos y arrugas rebeldes',
    alt: 'Eliminación visible de arrugas en cuello de camisa en gancho'
  },
  {
    id: 'tuhogar',
    videoSrc: '/videos/ugc/ugc-03-tuhogar.mp4',
    posterSrc: '/images/ugc/ugc-03-tuhogar.webp',
    tag: 'Retoque rápido',
    scenario: 'Polo en la cama · Sin armar la tabla',
    alt: 'Alisado de manga de polo sobre la cama sin tabla'
  },
  {
    id: 'azul',
    videoSrc: '/videos/ugc/ugc-04-vestido-azul.mp4',
    posterSrc: '/images/ugc/ugc-04-vestido-azul.webp',
    tag: 'Prendas delicadas',
    scenario: 'Vestido de vuelos · Vapor continuo y seguro',
    alt: 'Vaporización vertical de vestido azul en gancho'
  }
];

export const SocialProofSection: React.FC = () => {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.15, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  // Audio & playback state
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [playingState, setPlayingState] = useState<Record<string, boolean>>({});
  const [videoProgress, setVideoProgress] = useState<Record<string, number>>({});
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);

  // Video element references
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Play/pause toggle for a specific video
  const togglePlay = useCallback((id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setPlayingState(prev => ({ ...prev, [id]: true }));
      }).catch(() => {
        // Autoplay policy fallback
      });
    } else {
      video.pause();
      setPlayingState(prev => ({ ...prev, [id]: false }));
    }
  }, []);

  // Exclusive audio toggle: unmuting one video mutes all others
  const toggleAudio = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering play/pause
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

      // Make sure the video is playing when user wants audio
      if (video.paused) {
        video.play().then(() => {
          setPlayingState(prev => ({ ...prev, [id]: true }));
        }).catch(() => {});
      }
    }
  }, [activeAudioId]);

  // Autoplay videos muted when section enters viewport, pause when leaving
  useEffect(() => {
    if (prefersReduced) return;

    if (inView) {
      ugcItems.forEach(item => {
        const video = videoRefs.current[item.id];
        if (video) {
          video.muted = activeAudioId !== item.id;
          video.play().then(() => {
            setPlayingState(prev => ({ ...prev, [item.id]: true }));
          }).catch(() => {
            // Browser prevented initial autoplay
          });
        }
      });
    } else {
      // Pause all when scrolled out
      ugcItems.forEach(item => {
        const video = videoRefs.current[item.id];
        if (video && !video.paused) {
          video.pause();
          setPlayingState(prev => ({ ...prev, [item.id]: false }));
        }
      });
      if (activeAudioId) {
        setActiveAudioId(null);
      }
    }
  }, [inView, prefersReduced, activeAudioId]);

  // Handle mobile scroll snap index calculation
  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.offsetWidth * 0.78;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex >= 0 && newIndex < ugcItems.length && newIndex !== mobileActiveIndex) {
      setMobileActiveIndex(newIndex);
    }
  };

  const scrollToMobileIndex = (index: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const itemWidth = el.offsetWidth * 0.78;
    el.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setMobileActiveIndex(index);
  };

  return (
    <section 
      id="social-proof"
      ref={sectionRef}
      className="py-14 sm:py-20 lg:py-24 bg-night-950 text-bone relative overflow-hidden scroll-mt-20 select-none border-y border-white/10"
      style={{ backgroundColor: '#1F1D1B' }}
    >
      {/* Background Texture: Subtle Grid Inverted */}
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

      {/* Atmospheric Warm Radial Ambient Glow */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(180,36,124,0.12)_0%,transparent_70%)] blur-3xl" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <Reveal direction="up" duration={600}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            
            {/* Minimal Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-bone/80 font-medium">
                Demostraciones en vivo
              </span>
            </div>

            {/* EXACT Headline */}
            <h2 className="font-display text-2.5xl sm:text-4xl lg:text-5xl font-bold text-bone tracking-tight leading-[1.15]">
              ¿Ya viste por qué todos hablan de LISO?
            </h2>

            {/* EXACT Subheadline */}
            <p className="font-sans text-sm sm:text-base lg:text-lg text-bone/70 max-w-2xl mx-auto leading-relaxed mt-3 sm:mt-4">
              Mira cómo este producto se está convirtiendo en el favorito de quienes quieren prendas impecables sin complicarse.
            </p>
          </div>
        </Reveal>

        {/* =========================================================================
            DESKTOP GRID (≥ 1024px) — 4 Curated Vertical Video Cards
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-5 xl:gap-6 max-w-[1240px] mx-auto">
          {ugcItems.map((item, index) => {
            const isPlaying = playingState[item.id] ?? false;
            const isAudioActive = activeAudioId === item.id;
            const progress = videoProgress[item.id] ?? 0;

            return (
              <Reveal key={item.id} direction="up" delay={index * 90} duration={600}>
                <div 
                  onClick={() => togglePlay(item.id)}
                  className="group relative aspect-[9/16] rounded-2xl xl:rounded-3xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] cursor-pointer"
                  role="region"
                  aria-label={item.alt}
                >
                  {/* HTML5 Video Element */}
                  <video
                    ref={(el) => { videoRefs.current[item.id] = el; }}
                    src={item.videoSrc}
                    poster={item.posterSrc}
                    playsInline
                    loop
                    muted={!isAudioActive}
                    preload="none"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.duration) {
                        setVideoProgress(prev => ({
                          ...prev,
                          [item.id]: (v.currentTime / v.duration) * 100
                        }));
                      }
                    }}
                    onPlay={() => setPlayingState(prev => ({ ...prev, [item.id]: true }))}
                    onPause={() => setPlayingState(prev => ({ ...prev, [item.id]: false }))}
                  />

                  {/* Top Badges & Audio Control */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono font-medium text-bone/90 tracking-wide uppercase shadow-sm">
                      {item.tag}
                    </span>

                    {/* Audio Toggle Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleAudio(item.id, e)}
                      className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 border ${
                        isAudioActive 
                          ? 'bg-accent text-white border-accent shadow-[0_0_14px_rgba(180,36,124,0.6)] scale-105' 
                          : 'bg-black/55 text-bone/80 border-white/20 hover:bg-black/80 hover:text-white'
                      }`}
                      aria-label={isAudioActive ? "Silenciar audio" : "Escuchar audio"}
                    >
                      {isAudioActive ? (
                        <Volume2 className="w-3.5 h-3.5" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5 opacity-70" />
                      )}
                    </button>
                  </div>

                  {/* Center Pause/Play Indicator overlay on hover/paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center transition-opacity z-10">
                      <div className="w-12 h-12 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Information Shade & Progress Bar */}
                  <div className="absolute inset-x-0 bottom-0 pt-16 pb-3 px-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end pointer-events-none z-20">
                    <p className="text-[12px] xl:text-[13px] font-medium text-bone/90 leading-tight">
                      {item.scenario}
                    </p>

                    {/* Thin Audio Indicator when listening */}
                    {isAudioActive && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        <span className="text-[10px] font-mono text-accent font-semibold tracking-tight uppercase">
                          Audio activado
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Continuous Video Progress Line */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-white/15 z-30">
                    <div 
                      className="h-full bg-accent transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* =========================================================================
            MOBILE & TABLET FEED (< 1024px) — Horizontal Snap Feed
           ========================================================================= */}
        <div className="lg:hidden">
          <div 
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 sm:gap-4 pb-4 pt-1 px-4 sm:px-6 -mx-4 sm:-mx-6 scrollbar-none scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {ugcItems.map((item) => {
              const isPlaying = playingState[item.id] ?? false;
              const isAudioActive = activeAudioId === item.id;
              const progress = videoProgress[item.id] ?? 0;

              return (
                <div 
                  key={item.id}
                  onClick={() => togglePlay(item.id)}
                  className="flex-none w-[76vw] max-w-[280px] snap-center aspect-[9/16] rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-2xl relative cursor-pointer active:scale-[0.99] transition-transform"
                  role="region"
                  aria-label={item.alt}
                >
                  {/* HTML5 Video */}
                  <video
                    ref={(el) => { videoRefs.current[item.id] = el; }}
                    src={item.videoSrc}
                    poster={item.posterSrc}
                    playsInline
                    loop
                    muted={!isAudioActive}
                    preload="none"
                    className="w-full h-full object-cover"
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.duration) {
                        setVideoProgress(prev => ({
                          ...prev,
                          [item.id]: (v.currentTime / v.duration) * 100
                        }));
                      }
                    }}
                    onPlay={() => setPlayingState(prev => ({ ...prev, [item.id]: true }))}
                    onPause={() => setPlayingState(prev => ({ ...prev, [item.id]: false }))}
                  />

                  {/* Top Badges & Audio Control */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-20">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono font-medium text-bone/90 tracking-wide uppercase">
                      {item.tag}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleAudio(item.id, e)}
                      className={`pointer-events-auto p-1.5 rounded-full backdrop-blur-md transition-all border ${
                        isAudioActive 
                          ? 'bg-accent text-white border-accent shadow-md' 
                          : 'bg-black/60 text-bone/80 border-white/20'
                      }`}
                      aria-label={isAudioActive ? "Silenciar audio" : "Escuchar audio"}
                    >
                      {isAudioActive ? (
                        <Volume2 className="w-3.5 h-3.5" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5 opacity-70" />
                      )}
                    </button>
                  </div>

                  {/* Center Play Indicator when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-10">
                      <div className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 ml-0.5 fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Text & Progress */}
                  <div className="absolute inset-x-0 bottom-0 pt-12 pb-2.5 px-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-20">
                    <p className="text-[11.5px] font-medium text-bone/90 leading-tight">
                      {item.scenario}
                    </p>
                    {isAudioActive && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        <span className="text-[9px] font-mono text-accent font-semibold tracking-tight uppercase">
                          Audio activado
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Video Progress Line */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-white/15 z-30">
                    <div 
                      className="h-full bg-accent transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
            {ugcItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToMobileIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  mobileActiveIndex === index 
                    ? 'w-6 bg-accent' 
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ver video ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* =========================================================================
            OPTIONAL CTA BUTTON — Flow seamlessly towards Offer
           ========================================================================= */}
        <Reveal direction="up" delay={200} duration={600}>
          <div className="text-center pt-10 sm:pt-14">
            <CTAButton 
              href="#oferta" 
              variant="primary" 
              size="default" 
              className="shadow-[0_4px_24px_rgba(180,36,124,0.3)] hover:shadow-[0_4px_32px_rgba(180,36,124,0.5)]"
            >
              <span>Quiero LISO — $189.900</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
            <p className="text-[11px] sm:text-xs text-bone/50 font-sans mt-3">
              Envío gratis a toda Colombia · Pago contraentrega disponible
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
