import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  className?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
}

const DEFAULT_BEFORE_IMAGE = "/images/before-wrinkled-shirt.jpg";
const DEFAULT_AFTER_IMAGE = "/images/after-smooth-shirt.jpg";

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  className = '',
  beforeImage = DEFAULT_BEFORE_IMAGE,
  afterImage = DEFAULT_AFTER_IMAGE,
  beforeAlt = "Prenda con pliegues marcados y arrugas sacada del clóset",
  afterAlt = "Prenda con fibra alisada en el gancho a vapor continuo de 150 °C"
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Interactive Drag Container - Pure clean image with functional divider */}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] bg-night-950 overflow-hidden select-none cursor-ew-resize group touch-none rounded-2xl"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={(e) => {
          e.stopPropagation();
          handleTouchMove(e);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          setIsDragging(false);
        }}
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Deslizador comparativo de planchado antes y después"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setSliderPos(p => Math.max(p - 5, 5));
          if (e.key === 'ArrowRight') setSliderPos(p => Math.min(p + 5, 95));
        }}
      >
        {/* Layer 1: AFTER (Bottom / Smooth Finish) */}
        <div className="absolute inset-0 bg-night-950">
          <img
            src={afterImage}
            alt={afterAlt}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Layer 2: BEFORE (Top Clipped / Wrinkled Finish) */}
        <div
          className="absolute inset-y-0 left-0 border-r-2 border-accent overflow-hidden bg-night-950"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="absolute inset-y-0 left-0 h-full object-cover select-none pointer-events-none"
            style={{ width: containerWidth || '100%', maxWidth: 'none' }}
            loading="lazy"
          />
        </div>

        {/* Divider Drag Line & Central Handle with expanded touch target */}
        <div
          className="absolute inset-y-0 w-[2px] bg-accent z-20 pointer-events-none flex items-center justify-center -translate-x-1/2 shadow-lg"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-night-950 text-white border-2 border-accent flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <MoveHorizontal className="w-4 h-4 text-accent stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
