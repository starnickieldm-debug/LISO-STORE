import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Video, 
  FileText,
  Quote
} from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';

interface UgcItem {
  id: string;
  videoSrc: string;
  posterSrc: string;
  alt: string;
}

interface WrittenReview {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  productVariant: string;
  headline: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  highlightBenefit: string;
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

const writtenReviews: WrittenReview[] = [
  {
    id: 'w-rev-1',
    name: 'Kim P.',
    location: 'Compra Verificada',
    date: '25 de agosto de 2026',
    rating: 5,
    productVariant: 'Magenta Original · 110 V',
    headline: '«Salgo impecable incluso cuando voy de afán con el tiempo medido»',
    text: '¡Quedé impresionada con esta plancha de vapor! Calienta sorprendentemente rápido, así que no tengo que esperar casi nada para empezar a vaporizar mi ropa. Funciona perfecto y hace un trabajo increíble eliminando arrugas, incluso cuando voy con prisa antes de salir. Me encantó que incluye el vaso medidor que facilita llenar el tanque y el guante de protección para usarla con total tranquilidad. Es compacta, perfecta para viajes porque no quita espacio y la uso en casa para retoques rápidos de todos los días.',
    imageSrc: '/images/paso-01-llenar.webp',
    imageAlt: 'Llenado rápido del depósito de agua con vaso dosificador',
    highlightBenefit: 'Rapidez de afán y kit con guante'
  },
  {
    id: 'w-rev-2',
    name: 'Wendy S.',
    location: 'Compra Verificada',
    date: '3 de septiembre de 2026',
    rating: 5,
    productVariant: 'Magenta Original · 110 V',
    headline: '«El cabezal giratorio a 90° hace que arreglarse sea mucho más rápido»',
    text: '¡Me encanta esta plancha! Calienta al instante y hace un trabajo excelente alisando la ropa directo en el gancho. Es súper liviana y fácil de manejar. La cabeza giratoria es sumamente práctica para cambiar entre pasadas verticales y horizontales, y los accesorios incluidos junto con la bolsa de transporte son un gran plus. Ha hecho que tener mis prendas listas sea mucho más fácil y rápido. Definitivamente una compra excelente.',
    imageSrc: '/images/box-contents.webp',
    imageAlt: 'Kit completo LISO con bolsa de viaje, base térmica y accesorios',
    highlightBenefit: 'Cabezal giratorio 90° y ligereza'
  },
  {
    id: 'w-rev-3',
    name: 'Elianet R.',
    location: 'Compra Verificada',
    date: '2 de septiembre de 2026',
    rating: 5,
    productVariant: 'Gris Titanio · 110 V',
    headline: '«Adiós a sacar la plancha pesada y la tabla por una sola prenda»',
    text: 'Me gustó muchísimo. Calienta muy rápido y hace que quitar arrugas sea facilísimo sin tener que sacar una plancha tradicional grande ni armar la mesa. Me encanta especialmente que sea 2 en 1: la puedo usar como vaporizador en vertical o directamente como plancha en seco. Es compacta, fácil de guardar y deja la ropa impecable y presentable en muy poco tiempo tanto en casa como de viaje.',
    imageSrc: '/images/paso-03-deslizar.webp',
    imageAlt: 'Alisado directo sobre el gancho sin armar tabla de planchar',
    highlightBenefit: 'Modo 2 en 1 sin armar tabla'
  },
  {
    id: 'w-rev-4',
    name: 'Lourdes M.',
    location: 'Compra Verificada',
    date: '25 de agosto de 2026',
    rating: 5,
    productVariant: 'Magenta Original · 110 V',
    headline: '«Práctica, rápida y cabe perfecto en cualquier maleta de mano»',
    text: 'Me encanta lo fácil y cómoda que es de usar esta plancha 2 en 1. Calienta de inmediato, alisa muy bien cualquier arruga y el calor de contacto cumple perfectamente la función de plancha. Su tamaño es ideal para viajar, casi no ocupa espacio en la maleta. Es una elección excelente para cualquiera que busque una solución mucho más práctica y rápida que el planchado de siempre.',
    imageSrc: '/images/escena-04-maleta.webp',
    imageAlt: 'Plancha LISO guardada de forma compacta en maleta de viaje',
    highlightBenefit: 'Ultra compacta para equipaje y clóset'
  },
  {
    id: 'w-rev-5',
    name: 'Elier M.',
    location: 'Compra Verificada',
    date: '5 de septiembre de 2026',
    rating: 5,
    productVariant: 'Gris Titanio · 110 V',
    headline: '«Para quienes viajamos seguido, es una solución rápida y confiable»',
    text: 'Buscaba una plancha portátil de vapor que fuera realmente cómoda y esta superó mis expectativas. Como persona que viaja con frecuencia y le gusta mantener su ropa siempre prolija y bien cuidada, aprecio mucho lo fácil que es de empacar y usar. Calienta rápido, responde de maravilla con las arrugas de la maleta y su diseño compacto es ideal para llevar a cualquier parte. Un infaltable en mis viajes.',
    imageSrc: '/images/escena-01-camisa.webp',
    imageAlt: 'Camisa de viaje planchada impecable en pocos segundos',
    highlightBenefit: 'Ideal para viajeros frecuentes'
  }
];

export const SocialProofSection: React.FC = () => {
  const { currentMarket } = useMarket();
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  // Active Tab State (Liquid+ style switcher)
  const [activeTab, setActiveTab] = useState<'videos' | 'reviews'>('videos');

  // Video State
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [canScrollLeftVideos, setCanScrollLeftVideos] = useState<boolean>(false);
  const [canScrollRightVideos, setCanScrollRightVideos] = useState<boolean>(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const videoScrollContainerRef = useRef<HTMLDivElement>(null);

  // Reviews State
  const [canScrollLeftReviews, setCanScrollLeftReviews] = useState<boolean>(false);
  const [canScrollRightReviews, setCanScrollRightReviews] = useState<boolean>(true);
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);
  const reviewsScrollContainerRef = useRef<HTMLDivElement>(null);

  // Exclusive audio toggle: unmuting one video mutes all others
  const toggleAudio = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;

    if (activeAudioId === id) {
      video.muted = true;
      setActiveAudioId(null);
    } else {
      Object.entries(videoRefs.current).forEach(([otherId, otherVideo]) => {
        if (otherVideo) {
          otherVideo.muted = otherId !== id;
        }
      });
      video.muted = false;
      setActiveAudioId(id);

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

    if (inView && activeTab === 'videos') {
      playAll();
    } else {
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
      if (!document.hidden && inView && activeTab === 'videos') {
        playAll();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [inView, prefersReduced, activeAudioId, activeTab]);

  // Video scroll tracking
  const handleVideoScroll = useCallback(() => {
    const el = videoScrollContainerRef.current;
    if (!el) return;

    setCanScrollLeftVideos(el.scrollLeft > 15);
    setCanScrollRightVideos(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    const firstCard = el.querySelector('[data-ugc-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 280;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveVideoIndex(Math.min(Math.max(idx, 0), ugcItems.length - 1));
  }, []);

  const scrollVideosByDirection = (direction: 'left' | 'right') => {
    const el = videoScrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-ugc-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 280;
    const scrollDistance = cardWidth * 2;
    el.scrollBy({
      left: direction === 'left' ? -scrollDistance : scrollDistance,
      behavior: 'smooth'
    });
  };

  const scrollVideosToIndex = (index: number) => {
    const el = videoScrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-ugc-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 280;
    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveVideoIndex(index);
  };

  // Written reviews scroll tracking
  const handleReviewsScroll = useCallback(() => {
    const el = reviewsScrollContainerRef.current;
    if (!el) return;

    setCanScrollLeftReviews(el.scrollLeft > 15);
    setCanScrollRightReviews(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    const firstCard = el.querySelector('[data-review-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 340;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveReviewIndex(Math.min(Math.max(idx, 0), writtenReviews.length - 1));
  }, []);

  const scrollReviewsByDirection = (direction: 'left' | 'right') => {
    const el = reviewsScrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-review-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 340;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollReviewsToIndex = (index: number) => {
    const el = reviewsScrollContainerRef.current;
    if (!el) return;
    const firstCard = el.querySelector('[data-review-card="true"]') as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 340;
    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveReviewIndex(index);
  };

  return (
    <section 
      id="social-proof"
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-night-950 text-bone relative overflow-hidden scroll-mt-20 select-none border-y border-white/10"
      style={{ backgroundColor: '#1F1D1B' }}
    >
      {/* Invisible anchor target for navbar compatibility */}
      <span id="opiniones" className="sr-only" aria-hidden="true">Opiniones y Reseñas</span>

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
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(180,36,124,0.16)_0%,transparent_70%)] blur-3xl" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Wide 1-line layout on desktop */}
        <Reveal direction="up" duration={600}>
          <div className="text-center w-full max-w-none mx-auto mb-6 sm:mb-8 px-2">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-bone tracking-tight leading-tight lg:whitespace-nowrap">
              ¿Ya viste por qué todos hablan de LISO?
            </h2>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-bone/75 max-w-none leading-relaxed mt-2 sm:mt-2.5 lg:whitespace-nowrap">
              Mira cómo este producto se está convirtiendo en el favorito de quienes quieren prendas impecables sin complicarse.
            </p>
          </div>
        </Reveal>

        {/* =========================================================================
            SCORECARD DE SATISFACCIÓN (Función e Información de la Imagen 3)
            ========================================================================= */}
        <Reveal direction="up" duration={700}>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-7 mb-8 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Left: Star Rating Hero */}
              <div className="sm:col-span-4 text-center sm:text-left sm:border-r border-white/10 sm:pr-6">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-bone tracking-tight leading-none">
                    4.9
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-sans text-bone/60 mt-0.5">
                      Calificación promedio
                    </span>
                  </div>
                </div>
                <p className="text-xs font-sans text-bone/70 flex items-center justify-center sm:justify-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% compras reales verificadas</span>
                </p>
              </div>

              {/* Right: Key Performance Signals */}
              <div className="sm:col-span-8 grid grid-cols-1 xs:grid-cols-3 gap-3.5 text-center xs:text-left">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block font-display text-2xl font-bold text-accent">
                    98%
                  </span>
                  <span className="text-xs text-bone/75 font-sans leading-tight mt-0.5 block">
                    Prendas listas en menos de 3 minutos
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block font-display text-2xl font-bold text-accent">
                    99%
                  </span>
                  <span className="text-xs text-bone/75 font-sans leading-tight mt-0.5 block">
                    Destaca el cabezal giratorio a 90°
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block font-display text-2xl font-bold text-accent">
                    96%
                  </span>
                  <span className="text-xs text-bone/75 font-sans leading-tight mt-0.5 block">
                    La lleva fija en su maleta de viaje
                  </span>
                </div>
              </div>

            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            SELECTOR SEGMENTADO EN CÁPSULA (Estilo Liquid+ Tabs - Imágenes 1 y 2)
            ========================================================================= */}
        <div className="flex items-center justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 bg-white/[0.05] border border-white/15 rounded-full backdrop-blur-md shadow-inner">
            
            {/* Pestaña: Videos de Uso */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('videos');
              }}
              className={`flex items-center gap-2 py-2 px-4 sm:px-6 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none ${
                activeTab === 'videos'
                  ? 'bg-accent text-white shadow-[0_4px_18px_rgba(180,36,124,0.45)] scale-[1.02]'
                  : 'text-bone/70 hover:text-bone hover:bg-white/[0.05]'
              }`}
            >
              <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Videos de uso ({ugcItems.length})</span>
            </button>

            {/* Pestaña: Opiniones Escritas */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('reviews');
                if (activeAudioId) {
                  Object.values(videoRefs.current).forEach(v => { if (v) v.muted = true; });
                  setActiveAudioId(null);
                }
              }}
              className={`flex items-center gap-2 py-2 px-4 sm:px-6 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none ${
                activeTab === 'reviews'
                  ? 'bg-accent text-white shadow-[0_4px_18px_rgba(180,36,124,0.45)] scale-[1.02]'
                  : 'text-bone/70 hover:text-bone hover:bg-white/[0.05]'
              }`}
            >
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              <span>Opiniones escritas ({writtenReviews.length})</span>
            </button>

          </div>
        </div>

        {/* =========================================================================
            CONTENIDO PESTAÑA 1: VIDEOS DE USO (9 VIDEOS VERTICALES)
            ========================================================= */}
        {activeTab === 'videos' && (
          <div className="relative group/carousel animate-fadeIn">
            {/* Left Arrow (desktop/tablet) */}
            {canScrollLeftVideos && (
              <button
                type="button"
                onClick={() => scrollVideosByDirection('left')}
                aria-label="Ver videos anteriores"
                className="hidden sm:flex absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/80 hover:bg-black border border-white/25 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            )}

            {/* Right Arrow (desktop/tablet) */}
            {canScrollRightVideos && (
              <button
                type="button"
                onClick={() => scrollVideosByDirection('right')}
                aria-label="Ver siguientes videos"
                className="hidden sm:flex absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/80 hover:bg-black border border-white/25 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            )}

            {/* Side Fades for aesthetic depth */}
            <div className="pointer-events-none absolute left-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-r from-[#1F1D1B] to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-l from-[#1F1D1B] to-transparent z-20" />

            {/* Horizontal Scroll Track with all 9 continuous videos */}
            <div 
              ref={videoScrollContainerRef}
              onScroll={handleVideoScroll}
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

                    {/* Audio Toggle Button in top-right */}
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

            {/* Pagination dot indicators for videos */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6" aria-hidden="true">
              {ugcItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollVideosToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeVideoIndex === index 
                      ? 'w-6 bg-accent shadow-[0_0_8px_rgba(180,36,124,0.6)]' 
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir al video ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            CONTENIDO PESTAÑA 2: OPINIONES ESCRITAS (TARJETAS ESTILO IMAGEN 1)
            ========================================================= */}
        {activeTab === 'reviews' && (
          <div className="relative group/reviews animate-fadeIn">
            {/* Left Arrow (desktop/tablet) */}
            {canScrollLeftReviews && (
              <button
                type="button"
                onClick={() => scrollReviewsByDirection('left')}
                aria-label="Ver opiniones anteriores"
                className="hidden sm:flex absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/80 hover:bg-black border border-white/25 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            )}

            {/* Right Arrow (desktop/tablet) */}
            {canScrollRightReviews && (
              <button
                type="button"
                onClick={() => scrollReviewsByDirection('right')}
                aria-label="Ver siguientes opiniones"
                className="hidden sm:flex absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 z-40 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/80 hover:bg-black border border-white/25 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            )}

            {/* Side Fades */}
            <div className="pointer-events-none absolute left-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-r from-[#1F1D1B] to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-l from-[#1F1D1B] to-transparent z-20" />

            {/* Horizontal Scroll Track for Written Reviews */}
            <div 
              ref={reviewsScrollContainerRef}
              onScroll={handleReviewsScroll}
              className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none no-scrollbar scroll-smooth px-3 sm:px-6 py-2"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {writtenReviews.map((rev) => (
                <div
                  key={rev.id}
                  data-review-card="true"
                  className="flex-none w-[82vw] sm:w-[320px] lg:w-[360px] rounded-2xl lg:rounded-3xl overflow-hidden bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 hover:border-white/30 shadow-2xl relative snap-center select-none transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image: Visual Photo of the Product / Experience (Image 1 Style) */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-black/50 border-b border-white/10">
                    <img
                      src={rev.imageSrc}
                      alt={rev.imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Benefit Tag */}
                    <div className="absolute bottom-2.5 left-3 z-10">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10.5px] font-sans font-medium text-bone">
                        {rev.highlightBenefit}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Bold Headline */}
                      <h3 className="font-display font-bold text-base sm:text-lg text-bone leading-snug tracking-tight mb-2">
                        {rev.headline}
                      </h3>

                      {/* Review Paragraph */}
                      <p className="font-sans text-xs sm:text-[13px] text-bone/80 leading-relaxed line-clamp-6">
                        {rev.text}
                      </p>
                    </div>

                    {/* Author & Verification Footer */}
                    <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-xs sm:text-sm text-bone">
                          {rev.name}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-emerald-400">
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          {rev.location}
                        </span>
                      </div>

                      <span className="text-[10px] text-bone/50 font-sans text-right">
                        {rev.productVariant}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination dot indicators for written reviews */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6" aria-hidden="true">
              {writtenReviews.map((rev, index) => (
                <button
                  key={rev.id}
                  type="button"
                  onClick={() => scrollReviewsToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeReviewIndex === index 
                      ? 'w-6 bg-accent shadow-[0_0_8px_rgba(180,36,124,0.6)]' 
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir a opinión ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section Bottom CTA Connector */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm font-sans text-bone/70 mb-3.5">
            Únete a quienes ya disfrutan de ropa impecable en segundos sin sacar la mesa de planchar.
          </p>
          <CTAButton
            href="#oferta"
            size="default"
            className="shadow-[0_8px_24px_rgba(180,36,124,0.3)] hover:shadow-[0_12px_32px_rgba(180,36,124,0.45)] text-sm font-semibold tracking-wide py-3 px-7"
          >
            Pide la tuya — {currentMarket.formattedPrice}
          </CTAButton>
        </div>

      </div>
    </section>
  );
};
