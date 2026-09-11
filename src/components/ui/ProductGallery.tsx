import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export interface GalleryImage {
  id: string;
  webp: string;
  jpg: string;
  alt: string;
  label: string;
  badge?: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'base',
    webp: '/images/liso-oferta.webp',
    jpg: '/images/liso-oferta.jpg',
    alt: 'Plancha de vapor portátil LISO en su base de apoyo térmica resistente al calor',
    label: 'En su base',
    badge: 'KIT COMPLETO'
  },
  {
    id: 'accion',
    webp: '/images/hero-steamer-editorial.webp',
    jpg: '/images/hero-steamer-editorial.jpg',
    alt: 'LISO alisando directamente en el gancho con vapor continuo a 150 °C',
    label: 'En acción',
    badge: 'VAPOR EN ACCIÓN'
  },
  {
    id: 'caja',
    webp: '/images/box-contents.webp',
    jpg: '/images/box-contents.jpg',
    alt: 'Contenido completo de la caja LISO: plancha, base de apoyo, vaso dosificador y bolsa',
    label: 'En la caja',
    badge: 'TODO LO QUE RECIBES'
  },
  {
    id: 'pantalla',
    webp: '/images/liso-pantalla.webp',
    jpg: '/images/liso-pantalla.jpg',
    alt: 'Primer plano de la pantalla digital LED con temperatura real en vivo',
    label: 'Pantalla LED',
    badge: 'CONTROL TÉRMICO'
  },
  {
    id: 'habitat',
    webp: '/images/escena-05-dock.webp',
    jpg: '/images/escena-05-dock.jpg',
    alt: 'LISO descansando en su base sobre tocador en el baño',
    label: 'En el hogar',
    badge: 'SIEMPRE A MANO'
  }
];

interface ProductGalleryProps {
  selectedColor?: string;
  className?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  selectedColor = 'Negro',
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = GALLERY_IMAGES;
  const currentImage = images[activeIndex];

  const goToSlide = useCallback((index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    const timer = setTimeout(() => setIsTransitioning(false), 260);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const prevImage = useCallback(() => {
    goToSlide(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  }, [activeIndex, images.length, goToSlide]);

  const nextImage = useCallback(() => {
    goToSlide(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, images.length, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevImage, nextImage]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      nextImage();
    } else if (distance < -minSwipeDistance) {
      prevImage();
    }
  };

  return (
    <div className={`h-full w-full flex flex-col justify-between gap-3 ${className}`}>
      {/* 1. Main Stage Visual + Vertical Thumbnail Rail (sm+) */}
      <div className="flex-1 min-h-0 w-full flex flex-col sm:flex-row gap-3">
        {/* Vertical Thumbnails Rail (Liquid+ reference layout) */}
        <div className="hidden sm:flex flex-col gap-2 shrink-0 overflow-y-auto no-scrollbar py-0.5 w-14 sm:w-16 xl:w-20 select-none">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`group relative aspect-square rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'border-accent ring-2 ring-accent/60 shadow-[0_0_12px_rgba(180,36,124,0.3)] scale-[1.02] bg-accent/5' 
                    : 'border-graphite/15 opacity-70 hover:opacity-100 hover:border-graphite/30 bg-[#FAF8F5]'
                }`}
                aria-label={`Ver foto ${idx + 1}: ${img.label}`}
                aria-pressed={isActive}
              >
                <img 
                  src={img.webp} 
                  alt="" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {isActive && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-accent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Stage Visual (Expands dynamically to occupy all available vertical screen height) */}
        <div 
          className="flex-1 min-h-[300px] sm:min-h-0 relative w-full h-full overflow-hidden rounded-2xl border border-graphite/15 bg-[#FAF8F5] shadow-lg group select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <picture className="w-full h-full block">
            <source srcSet={currentImage.webp} type="image/webp" />
            <img 
              src={currentImage.jpg} 
              alt={currentImage.alt}
              className={`w-full h-full object-cover object-center transition-all duration-300 ease-mech-s ${
                isTransitioning ? 'opacity-70 scale-102 filter blur-[1px]' : 'opacity-100 scale-100 filter-none'
              }`}
              loading="lazy"
            />
          </picture>

          {/* Ambient Subtle Gradient on edges for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <div className="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-graphite/10 rounded-full text-[10px] font-sans text-accent font-bold tracking-wider uppercase shadow-xs">
              {currentImage.badge}
            </div>
            
            <div className="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-graphite/10 rounded-full text-[10px] font-sans text-graphite/80 font-semibold tracking-wider shadow-xs">
              0{activeIndex + 1} / 0{images.length}
            </div>
          </div>

          {/* Prev / Next Chevrons */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-accent border border-graphite/15 hover:border-accent text-graphite hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 opacity-90 hover:opacity-100 active:scale-95 cursor-pointer z-20 shadow-md"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-accent border border-graphite/15 hover:border-accent text-graphite hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 opacity-90 hover:opacity-100 active:scale-95 cursor-pointer z-20 shadow-md"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* Bottom Label Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-sans text-graphite z-10 pointer-events-none">
            <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-graphite/10 font-semibold truncate max-w-[80%] shadow-xs">
              {currentImage.label}
            </span>

            {/* Mobile Dots */}
            <div className="flex items-center gap-1.5 sm:hidden">
              {images.map((_, idx) => (
                <span 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    idx === activeIndex ? 'w-4 bg-accent' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mobile Thumbnails Row (< sm) */}
      <div className="grid grid-cols-5 gap-2 sm:hidden shrink-0 select-none">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`group relative aspect-square rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'border-accent ring-2 ring-accent/60 shadow-[0_0_12px_rgba(180,36,124,0.3)] scale-[1.02] bg-accent/5' 
                  : 'border-graphite/15 opacity-70 hover:opacity-100 bg-[#FAF8F5]'
              }`}
              aria-label={`Ver foto ${idx + 1}: ${img.label}`}
              aria-pressed={isActive}
            >
              <img 
                src={img.webp} 
                alt="" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Voltage and Certification Sub-bar */}
      <div className="shrink-0 p-2 sm:p-2.5 bg-[#FAF8F5] border border-graphite/12 rounded-lg text-[10.5px] sm:text-[11px] font-sans text-graphite/70 flex items-center justify-between gap-2">
        <span className="font-semibold text-graphite flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-accent stroke-[3] shrink-0" />
          <span>Voltaje 110–240 V Dual</span>
        </span>
        <span className="text-graphite/50 uppercase tracking-wider text-[10px]">
          Clavija plana Colombia (110 V)
        </span>
      </div>
    </div>
  );
};
