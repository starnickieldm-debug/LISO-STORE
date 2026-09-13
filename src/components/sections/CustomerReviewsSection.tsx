import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';

interface CustomerReview {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  productVariant: string;
  headline: string;
  text: string;
  highlightBenefit: string;
}

const reviewsData: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Kim P.',
    location: 'Comprador Verificado',
    date: '25 de agosto de 2026',
    rating: 5,
    productVariant: 'Magenta Original · 110 V',
    headline: '«Salgo impecable incluso cuando voy de afán con el tiempo medido»',
    text: '¡Quedé impresionada con esta plancha de vapor! Calienta sorprendentemente rápido, así que no tengo que esperar casi nada para empezar a vaporizar mi ropa. Funciona perfecto y hace un trabajo increíble eliminando arrugas, incluso cuando voy con prisa antes de salir. Me encantó que incluye el vaso medidor que facilita llenar el tanque y el guante de protección para usarla con total tranquilidad. Es compacta, perfecta para viajes porque no quita espacio y la uso en casa para retoques rápidos de todos los días. Muy feliz con mi compra.',
    highlightBenefit: 'Rapidez de afán y kit completo con guante'
  },
  {
    id: 'rev-2',
    name: 'Wendy S.',
    location: 'Comprador Verificado',
    date: '3 de septiembre de 2026',
    rating: 5,
    productVariant: 'Magenta Original · 110 V',
    headline: '«El cabezal giratorio a 90° hace que arreglarse sea mucho más rápido»',
    text: '¡Me encanta esta plancha! Calienta al instante y hace un trabajo excelente alisando la ropa directo en el gancho. Es súper liviana y fácil de manejar. La cabeza giratoria es sumamente práctica para cambiar entre pasadas verticales y horizontales, y los accesorios incluidos junto con la bolsa de transporte son un gran plus. Ha hecho que tener mis prendas listas sea mucho más fácil y rápido. Definitivamente una compra excelente, la recomiendo con los ojos cerrados.',
    highlightBenefit: 'Cabezal giratorio 90° y ligereza'
  },
  {
    id: 'rev-3',
    name: 'Elianet R.',
    location: 'Comprador Verificado',
    date: '2 de septiembre de 2026',
    rating: 5,
    productVariant: 'Gris Titanio · 110 V',
    headline: '«Adiós a sacar la plancha pesada y la tabla por una sola prenda»',
    text: 'Me gustó muchísimo. Calienta muy rápido y hace que quitar arrugas sea facilísimo sin tener que sacar una plancha tradicional grande ni armar la mesa. Me encanta especialmente que sea 2 en 1: la puedo usar como vaporizador en vertical o directamente como plancha en seco. Es compacta, fácil de guardar y deja la ropa impecable y presentable en muy poco tiempo tanto en casa como de viaje.',
    highlightBenefit: 'Modo 2 en 1 (vapor y seco) sin tabla'
  },
  {
    id: 'rev-4',
    name: 'Lourdes M.',
    location: 'Comprador Verificado',
    date: '25 de agosto de 2026',
    rating: 5,
    productVariant: 'Magenta Original · 110 V',
    headline: '«Práctica, rápida y cabe perfecto en cualquier maleta de mano»',
    text: 'Me encanta lo fácil y cómoda que es de usar esta plancha 2 en 1. Calienta de inmediato, alisa muy bien cualquier arruga y el calor de contacto cumple perfectamente la función de plancha. Su tamaño es ideal para viajar, casi no ocupa espacio en la maleta. Es una elección excelente para cualquiera que busque una solución mucho más práctica y rápida que el planchado de siempre.',
    highlightBenefit: 'Ultra compacta para maletas y clóset'
  },
  {
    id: 'rev-5',
    name: 'Elier M.',
    location: 'Comprador Verificado',
    date: '5 de septiembre de 2026',
    rating: 5,
    productVariant: 'Gris Titanio · 110 V',
    headline: '«Para quienes viajamos seguido, es una solución rápida y confiable»',
    text: 'Buscaba una plancha portátil de vapor que fuera realmente cómoda y esta superó mis expectativas. Como persona que viaja con frecuencia y le gusta mantener su ropa siempre prolija y bien cuidada, aprecio mucho lo fácil que es de empacar y usar. Calienta rápido, responde de maravilla con las arrugas de la maleta y su diseño compacto es ideal para llevar a cualquier parte. Un infaltable en mis viajes.',
    highlightBenefit: 'Ideal para personas que viajan seguido'
  }
];

export const CustomerReviewsSection: React.FC = () => {
  const { currentMarket } = useMarket();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : 320;
    const newIdx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIdx, 0), reviewsData.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : 360;
    const delta = direction === 'left' ? -cardWidth : cardWidth;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cards = el.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
    setActiveIndex(index);
  };

  return (
    <section 
      id="opiniones" 
      className="py-12 sm:py-16 lg:py-20 bg-night-950 text-bone relative overflow-hidden scroll-mt-16 sm:scroll-mt-20 border-b border-white/10"
      style={{ backgroundColor: '#1F1D1B' }}
    >
      {/* Subtle Background Inverted Grid Texture */}
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
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(180,36,124,0.14)_0%,transparent_70%)] blur-3xl" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <Reveal direction="up" duration={600}>
          <div className="text-center w-full max-w-none mx-auto mb-8 sm:mb-10 lg:mb-12 px-2">
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl font-bold text-bone tracking-tight leading-tight lg:whitespace-nowrap">
              Experiencias reales de quienes ya la usan a diario
            </h2>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-bone/75 leading-relaxed mt-2.5 sm:mt-3 lg:whitespace-nowrap">
              Opiniones verificadas de personas que dejaron de pelear con la plancha pesada y eligieron tener su ropa lista en minutos.
            </p>
          </div>
        </Reveal>

        {/* Rating Scorecard Bar */}
        <Reveal direction="up" duration={700}>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-7 mb-10 backdrop-blur-sm max-w-4xl mx-auto shadow-2xl">
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
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block font-display text-xl sm:text-2xl font-bold text-accent">
                    98%
                  </span>
                  <span className="text-xs text-bone/75 font-sans leading-tight mt-0.5 block">
                    Prendas listas en menos de 3 minutos
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block font-display text-xl sm:text-2xl font-bold text-accent">
                    99%
                  </span>
                  <span className="text-xs text-bone/75 font-sans leading-tight mt-0.5 block">
                    Destaca el cabezal giratorio a 90°
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="block font-display text-xl sm:text-2xl font-bold text-accent">
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

        {/* Reviews Carousel Container */}
        <div className="relative group/reviews">
          
          {/* Left Arrow (Desktop / Tablet) */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollByDirection('left')}
              aria-label="Ver opiniones anteriores"
              className="hidden sm:flex absolute -left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/85 hover:bg-black border border-white/20 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow (Desktop / Tablet) */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollByDirection('right')}
              aria-label="Ver siguientes opiniones"
              className="hidden sm:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/85 hover:bg-black border border-white/20 text-white shadow-2xl items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 px-1 scrollbar-none focus:outline-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="w-[88vw] sm:w-[380px] lg:w-[420px] shrink-0 snap-start bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative group/card backdrop-blur-xs"
              >
                {/* Decorative subtle quote mark */}
                <Quote className="absolute top-5 right-5 w-8 h-8 text-white/5 group-hover/card:text-accent/20 transition-colors pointer-events-none" />

                <div>
                  {/* Top Bar: Stars + Verified Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-sans font-semibold">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      {review.location}
                    </span>
                  </div>

                  {/* Benefit Chip */}
                  <div className="mb-2.5">
                    <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-accent/90">
                      {review.highlightBenefit}
                    </span>
                  </div>

                  {/* Bold Headline */}
                  <h3 className="font-display font-bold text-base sm:text-lg text-bone leading-snug tracking-tight mb-3">
                    {review.headline}
                  </h3>

                  {/* Body Text */}
                  <p className="font-sans text-sm text-bone/80 leading-relaxed">
                    {review.text}
                  </p>
                </div>

                {/* Footer: User Info & Product Spec */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 text-accent font-display font-bold text-xs flex items-center justify-center uppercase">
                      {review.name.slice(0, 2)}
                    </div>
                    <div>
                      <span className="block font-sans font-bold text-xs sm:text-sm text-bone">
                        {review.name}
                      </span>
                      <span className="block text-[11px] text-bone/50 font-sans">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-bone/60 font-sans text-right max-w-[130px] truncate">
                    {review.productVariant}
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-5">
            {reviewsData.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Ir a reseña ${i + 1}`}
                className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                  activeIndex === i 
                    ? 'w-6 bg-accent' 
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

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
