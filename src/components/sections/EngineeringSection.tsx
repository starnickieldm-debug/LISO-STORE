import React, { useState, useEffect, useRef } from 'react';
import { productSpecs } from '../../config/siteContent';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DissectionPiece {
  id: string;
  num: string;
  name: string;
  category: string;
  phrase: string;
  hotspot: { x: number; y: number }; // Percentage position on liso-main.webp
}

// 6 anatomical dissection pieces with verbatim phrases
const pieces: DissectionPiece[] = [
  {
    id: "plate",
    num: "01",
    name: "PLACA GIRATORIA 90°",
    category: "CABEZAL ERGONÓMICO",
    phrase: "Plancha en la percha, en la tabla y en cuellos: el ángulo te sigue a ti.",
    hotspot: { x: 67, y: 37 }
  },
  {
    id: "chamber",
    num: "02",
    name: "CÁMARA TÉRMICA DE ALUMINIO",
    category: "SISTEMA TÉRMICO INTERNO",
    phrase: "El aluminio calienta en 3 s*: vapor listo antes de que cuelgues la camisa.",
    hotspot: { x: 53, y: 25 }
  },
  {
    id: "display",
    num: "03",
    name: "PANTALLA DIGITAL LED",
    category: "CONTROL TÉRMICO EN VIVO",
    phrase: "Ves la temperatura real: no adivinas si ya está lista.",
    hotspot: { x: 45, y: 42 }
  },
  {
    id: "cable",
    num: "04",
    name: "ALIMENTACIÓN DIRECTA 1200 W",
    category: "POTENCIA CONTINUA",
    phrase: "Potencia constante por cable: sin batería que muera con los meses.",
    hotspot: { x: 23, y: 88 }
  },
  {
    id: "handle",
    num: "05",
    name: "CARCASA BICAPA CON AGARRE",
    category: "AISLAMIENTO TÉRMICO",
    phrase: "Aislamiento bicapa: 150 °C por dentro; por fuera se toma con la mano.",
    hotspot: { x: 35, y: 64 }
  },
  {
    id: "voltage",
    num: "06",
    name: "MULTIVOLTAJE 110–240 V",
    category: "COMPATIBILIDAD GLOBAL",
    phrase: "El mismo aparato en cualquier continente: eliges tu enchufe.",
    hotspot: { x: 16, y: 92 }
  }
];

export const EngineeringSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Hook for entry animation (fade + scale 0.98 -> 1 over 650ms)
  const [sectionRef, inView] = useInView<HTMLDivElement>({ threshold: 0.12, triggerOnce: true });
  const prefersReduced = useReducedMotion();

  // Micro-proof states
  // 01: Plate angle selection
  const [plateAngle, setPlateAngle] = useState<0 | 45 | 90>(0);

  // 02: 3-second countdown (single-run when active, no infinite loop)
  const [chamberCount, setChamberCount] = useState<number>(prefersReduced ? 0 : 3);
  const [isSteamReady, setIsSteamReady] = useState<boolean>(prefersReduced ? true : false);

  // 03: Digital temperature counter 90 -> 150 (single run upon selection)
  const [tempCounter, setTempCounter] = useState<number>(prefersReduced ? 150 : 90);

  // 06: Plug selection US -> EU -> UK -> AU
  const [selectedPlug, setSelectedPlug] = useState<'US' | 'EU' | 'UK' | 'AU'>('US');

  const hotspotButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indexButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const activePiece = pieces[activeIndex];

  // Preload rotation series 0, 45, 90 on mount
  useEffect(() => {
    const rotationAssets = [
      '/images/liso-placa-0.webp',
      '/images/liso-placa-45.webp',
      '/images/liso-placa-90.webp'
    ];
    rotationAssets.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Single-run countdown when piece 02 is selected (no autoplay infinite loop)
  useEffect(() => {
    if (activeIndex !== 1) {
      setChamberCount(prefersReduced ? 0 : 3);
      setIsSteamReady(prefersReduced ? true : false);
      return;
    }

    if (prefersReduced) {
      setChamberCount(0);
      setIsSteamReady(true);
      return;
    }

    setChamberCount(3);
    setIsSteamReady(false);

    const t3 = setTimeout(() => setChamberCount(2), 700);
    const t2 = setTimeout(() => setChamberCount(1), 1400);
    const t1 = setTimeout(() => {
      setChamberCount(0);
      setIsSteamReady(true);
    }, 2100);

    return () => {
      clearTimeout(t3);
      clearTimeout(t2);
      clearTimeout(t1);
    };
  }, [activeIndex, prefersReduced]);

  // Single-run temperature counter 90 -> 150 when piece 03 is selected
  useEffect(() => {
    if (activeIndex !== 2) {
      setTempCounter(prefersReduced ? 150 : 90);
      return;
    }

    if (prefersReduced) {
      setTempCounter(150);
      return;
    }

    setTempCounter(90);
    const t1 = setTimeout(() => setTempCounter(112), 250);
    const t2 = setTimeout(() => setTempCounter(130), 500);
    const t3 = setTimeout(() => setTempCounter(144), 750);
    const t4 = setTimeout(() => setTempCounter(150), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [activeIndex, prefersReduced]);

  // Select piece & mark initial hint as dismissed
  const selectPiece = (index: number) => {
    setActiveIndex(index);
    if (!hasInteracted) setHasInteracted(true);
  };

  // Keyboard navigation across hotspots & index items (Tab & Arrow keys)
  const handleKeyNav = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (currentIndex + 1) % pieces.length;
      selectPiece(next);
      hotspotButtonsRef.current[next]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (currentIndex - 1 + pieces.length) % pieces.length;
      selectPiece(prev);
      hotspotButtonsRef.current[prev]?.focus();
    }
  };

  // Mobile Touch Swipe Handling (Swipe between pieces)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left -> next piece
        selectPiece((activeIndex + 1) % pieces.length);
      } else {
        // swipe right -> prev piece
        selectPiece((activeIndex - 1 + pieces.length) % pieces.length);
      }
    }
    touchStartX.current = null;
  };

  // Leader line endpoint calculation (drawn from hotspot toward the right)
  const leaderTargetX = Math.min(activePiece.hotspot.x + (activePiece.hotspot.x > 50 ? 18 : 24), 96);
  const leaderTargetY = activePiece.hotspot.y;

  // Shared Micro-Proof Renderer for Desktop Rail & Mobile Touch Stage
  const renderMicroProof = () => {
    switch (activeIndex) {
      case 0:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[4/3] bg-black/50 border border-white/15 overflow-hidden rounded-lg">
              <img 
                src="/images/liso-placa-0.webp" 
                alt="Placa giratoria LISO ángulo 0 grados vertical" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                  prefersReduced ? 'duration-0' : 'duration-200'
                } ${plateAngle === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
              <img 
                src="/images/liso-placa-45.webp" 
                alt="Placa giratoria LISO ángulo 45 grados intermedio" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                  prefersReduced ? 'duration-0' : 'duration-200'
                } ${plateAngle === 45 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
              <img 
                src="/images/liso-placa-90.webp" 
                alt="Placa giratoria LISO ángulo 90 grados horizontal" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                  prefersReduced ? 'duration-0' : 'duration-200'
                } ${plateAngle === 90 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />

              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/80 border border-white/20 text-[10px] font-sans text-accent font-bold">
                {plateAngle}° ACTIVO
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {([0, 45, 90] as const).map((deg) => (
                <button
                  key={deg}
                  type="button"
                  onClick={() => {
                    setPlateAngle(deg);
                    if (!hasInteracted) setHasInteracted(true);
                  }}
                  className={`py-2.5 px-1 min-h-[46px] text-center font-sans text-xs uppercase tracking-tight font-bold transition-all border active:scale-95 ${
                    plateAngle === deg
                      ? 'bg-accent text-white border-accent shadow-subtle'
                      : 'bg-white/5 text-bone/70 border-white/15 hover:border-white/40 hover:text-white active:bg-white/10'
                  }`}
                  aria-label={`Ver placa a ${deg} grados`}
                >
                  <span>{deg}°</span>
                  <span className="block text-[9px] font-sans font-normal opacity-70 truncate">
                    {deg === 0 ? 'Vertical' : deg === 45 ? 'Cuellos' : 'Plano'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 flex flex-col justify-center h-full">
            <div className="p-5 bg-night-950 border border-white/15 space-y-4 rounded-lg">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-bone/60 uppercase tracking-wider font-semibold">TIEMPO AL ARRANQUE</span>
                <span className="text-accent font-bold">150 °C OBJETIVO</span>
              </div>

              <div className="py-4 text-center space-y-2 border-y border-white/10 bg-white/[0.02]">
                <div className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-bone">
                  {isSteamReady ? (
                    <span className="text-accent">VAPOR LISTO</span>
                  ) : (
                    <span>{chamberCount} s*</span>
                  )}
                </div>
                <span className="text-[11px] font-sans uppercase tracking-widest text-bone/60 block font-medium">
                  {isSteamReady ? 'Vaporización continua a 150 °C' : 'Calentamiento instantáneo de cámara...'}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="h-2 w-full bg-white/10 rounded-none overflow-hidden">
                  <div 
                    className={`h-full bg-bone ${
                      prefersReduced ? 'duration-0' : 'transition-all duration-300 ease-mech-s'
                    }`}
                    style={{ width: isSteamReady ? '100%' : `${((3 - chamberCount) / 3) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-sans text-bone/50 font-medium">
                  <span>0 s (Enchufe)</span>
                  <span>3 s* (Vapor listo)</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-sans text-bone/50 italic text-center">
              *Según pruebas de laboratorio del fabricante.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[4/3] bg-black/50 border border-white/15 overflow-hidden rounded-lg">
              <img 
                src="/images/liso-pantalla.webp" 
                alt="Pantalla digital LED de la plancha LISO con lectura térmica en tiempo real" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-2.5 inset-x-2.5 p-2 bg-black/85 backdrop-blur-xs border border-white/20 flex items-center justify-between font-sans text-xs">
                <span className="text-bone/70 uppercase font-medium">LECTURA TÉRMICA:</span>
                <span className="text-bone font-bold tracking-wider">{tempCounter} °C</span>
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between text-xs font-sans rounded-lg">
              <span className="text-bone/70 font-medium">MODOS ACTIVOS:</span>
              <span className="text-accent font-bold">2 NIVELES + PLANCHADO EN SECO</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[16/9] bg-black/50 border border-white/15 overflow-hidden rounded-lg">
              <img 
                src="/images/liso-cable.webp" 
                alt="Detalle del cable de alimentación directa de alta potencia" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-night-950 border border-white/15 space-y-3 font-sans text-xs rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-bone font-bold text-[11px]">
                  <span>1200 W CONSTANTE</span>
                  <span>100% SOSTENIDO</span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-none overflow-hidden">
                  <div className="h-full bg-bone w-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-bone/50 text-[11px] font-medium">
                  <span>MODELOS A BATERÍA</span>
                  <span>DECAE TRAS 3 MIN</span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-none overflow-hidden">
                  <div className="h-full bg-white/20 w-[35%]" />
                </div>
              </div>

              <p className="text-[11px] text-bone/60 pt-1 leading-snug font-sans border-t border-white/10">
                Alimentación directa por red: presión de vapor continua sin pérdida de temperatura ni degradación de celdas.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[16/9] bg-black/50 border border-white/15 overflow-hidden rounded-lg">
              <img 
                src="/images/liso-mango.webp" 
                alt="Textura estriada del mango térmico de agarre ergonómico" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-center font-sans">
              <div className="p-3 bg-night-950 border border-white/15 rounded-lg">
                <span className="text-[10px] text-bone/50 uppercase block font-medium">CÁMARA INTERNA</span>
                <span className="text-xl font-bold text-bone mt-0.5 block">150 °C</span>
                <span className="text-[9px] text-bone/40 block mt-0.5 font-medium">Por dentro</span>
              </div>

              <div className="p-3 bg-night-950 border border-accent/40 shadow-[0_0_12px_rgba(180,36,124,0.15)] rounded-lg">
                <span className="text-[10px] text-accent uppercase font-bold block">SUPERFICIE MANGO</span>
                <span className="text-xl font-bold text-accent mt-0.5 block">≤42 °C</span>
                <span className="text-[9px] text-bone/60 block mt-0.5 font-medium">Se toma con la mano</span>
              </div>
            </div>

            <p className="text-[11px] font-sans text-bone/70 text-center">
              Cámara de aire bicapa en ABS ignífugo: aislamiento que previene cualquier quemadura accidental.
            </p>
          </div>
        );
      case 5:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[4/3] bg-black/50 border border-white/15 overflow-hidden rounded-lg">
              <img 
                src="/images/liso-plug-us.webp" 
                alt="Clavija eléctrica estándar US tipo A/B" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                  prefersReduced ? 'duration-0' : 'duration-200'
                } ${selectedPlug === 'US' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
              <img 
                src="/images/liso-plug-eu.webp" 
                alt="Clavija eléctrica estándar EU tipo C/F continental" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                  prefersReduced ? 'duration-0' : 'duration-200'
                } ${selectedPlug === 'EU' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
              <img 
                src="/images/liso-plug-uk.webp" 
                alt="Clavija eléctrica estándar UK tipo G de 3 pines" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                  prefersReduced ? 'duration-0' : 'duration-200'
                } ${selectedPlug === 'UK' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
              <img 
                src="/images/liso-plug-au.webp" 
                alt="Clavija eléctrica estándar AU tipo I de 3 clavijas" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                  prefersReduced ? 'duration-0' : 'duration-200'
                } ${selectedPlug === 'AU' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />

              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/80 border border-white/20 text-[10px] font-sans text-bone font-bold">
                {selectedPlug} · 110–240 V
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {(['US', 'EU', 'UK', 'AU'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setSelectedPlug(code);
                    if (!hasInteracted) setHasInteracted(true);
                  }}
                  className={`py-2.5 min-h-[44px] text-center font-sans text-xs font-bold transition-all border active:scale-95 ${
                    selectedPlug === code
                      ? 'bg-accent text-white border-accent shadow-subtle'
                      : 'bg-white/5 text-bone/70 border-white/15 hover:border-white/40 hover:text-white active:bg-white/10'
                  }`}
                  aria-label={`Ver clavija ${code}`}
                >
                  <span>{code}</span>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="ingenieria" 
      ref={sectionRef}
      className="py-20 sm:py-28 bg-night-950 text-bone border-b border-white/10 relative overflow-hidden technical-grid scroll-mt-16 sm:scroll-mt-20 select-none"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      {/* Subtle warm ambient lighting in top corner */}
      <div 
        className="pointer-events-none absolute -top-32 -left-32 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true" 
      />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header: Title "Ingeniería visible." with internal italic on "visible." */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-bone leading-[1.25] pb-2">
            Ingeniería <span className="italic font-normal">visible.</span>
          </h2>
          
          <p className="mt-3 sm:mt-4 text-base sm:text-lg font-sans font-normal leading-relaxed text-bone/75">
            Disección técnica del dispositivo. Cada componente responde a una función real de planchado sin adornos superfluos.
          </p>
        </div>

        {/* =========================================================================
            MOBILE COMPONENT INSPECTOR (< 1024px) — 100% Mobile-First Touch Experience
            ========================================================================= */}
        <div 
          className="block lg:hidden pb-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 1. Horizontal Component Pills Bar with smooth scrolling */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 mb-3 px-0.5 -mx-0.5">
            {pieces.map((p, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectPiece(idx)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl font-sans text-[10.5px] font-bold tracking-wider uppercase transition-all active:scale-95 ${
                    isActive 
                      ? 'bg-accent text-white shadow-sm ring-1 ring-accent' 
                      : 'bg-white/[0.04] border border-white/10 text-bone/60 hover:text-bone active:bg-white/10'
                  }`}
                >
                  {p.num} · {p.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* 2. Unified Mobile Inspection Card */}
          <div className="bg-night-900/95 border border-white/15 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            
            {/* Header: Category + Counter + Component Name + Phrase */}
            <div className="pb-3 border-b border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans uppercase tracking-widest text-accent font-bold">
                  {activePiece.category}
                </span>
                <span className="font-sans text-xs font-bold text-bone/50 tracking-wider">
                  PIEZA {activePiece.num} / 06
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-bone tracking-wide uppercase">
                {activePiece.name}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-bone/80 leading-relaxed pt-1">
                {activePiece.phrase}
              </p>
            </div>

            {/* Micro-Proof Interactive Stage */}
            <div className="min-h-[250px] flex flex-col justify-center">
              {renderMicroProof()}
            </div>

            {/* Stepper Footer Controls with Prev / Next and Dots */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => selectPiece((activeIndex - 1 + pieces.length) % pieces.length)}
                className="inline-flex items-center gap-1 text-xs font-sans font-medium text-bone/60 hover:text-white active:scale-95 py-1 px-2.5 rounded bg-white/5 border border-white/10 transition-all"
                aria-label="Pieza anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-1.5">
                {pieces.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectPiece(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-5 bg-accent' : 'w-1.5 bg-white/20'
                    }`}
                    aria-label={`Ir a pieza ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => selectPiece((activeIndex + 1) % pieces.length)}
                className="inline-flex items-center gap-1 text-xs font-sans font-medium text-bone/60 hover:text-white active:scale-95 py-1 px-2.5 rounded bg-white/5 border border-white/10 transition-all"
                aria-label="Pieza siguiente"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Swipe indicator */}
          <div className="text-center pt-2.5 text-[10px] font-sans text-bone/40 font-medium">
            ← Desliza para explorar los 6 componentes técnicos →
          </div>
        </div>

        {/* =========================================================================
            DESKTOP MAIN STAGE GRID (>= 1024px) — 100% Unchanged 3-Column Layout
            ========================================================================= */}
        <div 
          className="hidden lg:grid grid-cols-12 gap-8 lg:gap-10 items-start pb-16"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.98)',
            transition: prefersReduced ? 'none' : 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          
          {/* 1. LEFT INDEX (Desktop): Numbers 01–06 separated by hairlines (no cards with borders) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-between self-stretch border-r border-white/10 pr-6 xl:pr-8">
            <div className="space-y-0">
              <span className="text-[10px] font-sans uppercase tracking-widest text-bone/40 font-semibold block pb-3 border-b border-white/10">
                ÍNDICE ANATÓMICO
              </span>

              {pieces.map((piece, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={piece.id}
                    ref={(el) => (indexButtonsRef.current[idx] = el)}
                    type="button"
                    onClick={() => selectPiece(idx)}
                    onKeyDown={(e) => handleKeyNav(e, idx)}
                    style={{
                      transitionDelay: prefersReduced ? '0ms' : `${idx * 70}ms`
                    }}
                    className={`w-full py-4 text-left border-b border-white/10 flex items-center justify-between group transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer ${
                      isActive ? 'text-white' : 'text-bone/60 hover:text-bone'
                    }`}
                    aria-label={`Ver pieza ${piece.num}: ${piece.name}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Active = Número magenta en ambos */}
                      <span className={`font-sans text-sm tracking-wider font-bold transition-colors ${
                        isActive ? 'text-accent' : 'text-bone/40 group-hover:text-bone'
                      }`}>
                        {piece.num}
                      </span>
                      <span className="font-sans text-xs tracking-wider uppercase font-medium">
                        {piece.name}
                      </span>
                    </div>

                    <div className="flex items-center pl-2">
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        isActive ? 'bg-accent shadow-[0_0_8px_rgba(180,36,124,0.8)] scale-125' : 'bg-transparent group-hover:bg-white/30'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom OEM Note in Instrument Sans */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <p className="text-[11px] font-sans uppercase tracking-wider text-bone/50 leading-relaxed font-medium">
                Construcción OEM Asurson (Mod. 7005): aleación de aluminio inyectado y carcasa ignífuga de alta densidad.
              </p>
            </div>
          </div>

          {/* 2. CENTER: The Apparatus (liso-main.webp with interactive spotlight, leader line & 6 hotspots) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-[500px] bg-night-900 border border-white/15 overflow-hidden shadow-studio-hard-dark">
              
              {/* Center Raw Image: Unmodified liso-main.webp in eager mode */}
              <img 
                src="/images/liso-main.webp" 
                alt="Plancha de vapor LISO disección anatómica en perspectiva técnica" 
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                className="w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Dynamic Spotlight Layer: Attenuates the rest of the image, illuminates active piece */}
              <div 
                className="pointer-events-none absolute inset-0 transition-all duration-200 ease-mech-s"
                style={{
                  background: prefersReduced 
                    ? 'transparent' 
                    : `radial-gradient(circle 135px at ${activePiece.hotspot.x}% ${activePiece.hotspot.y}%, transparent 15%, rgba(11, 12, 15, 0.72) 100%)`
                }}
                aria-hidden="true"
              />

              {/* Ambient Active Pulse Ring around the illuminated piece */}
              <div 
                className={`pointer-events-none absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 shadow-[0_0_30px_rgba(180,36,124,0.35)] ${
                  prefersReduced ? 'duration-0' : 'transition-all duration-200 ease-mech-s'
                }`}
                style={{
                  left: `${activePiece.hotspot.x}%`,
                  top: `${activePiece.hotspot.y}%`
                }}
                aria-hidden="true"
              />

              {/* SVG Animated Dashed Leader Line from active hotspot */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible"
                aria-hidden="true"
              >
                <line 
                  x1={`${activePiece.hotspot.x}%`} 
                  y1={`${activePiece.hotspot.y}%`} 
                  x2={`${leaderTargetX}%`} 
                  y2={`${leaderTargetY}%`} 
                  stroke="#B4247C" 
                  strokeWidth="1.5" 
                  strokeDasharray="3 3"
                  className={prefersReduced ? 'duration-0' : 'transition-all duration-200 ease-mech-s'}
                />
                <circle 
                  cx={`${leaderTargetX}%`} 
                  cy={`${leaderTargetY}%`} 
                  r="2.5" 
                  fill="#B4247C" 
                  className={prefersReduced ? 'duration-0' : 'transition-all duration-200 ease-mech-s'}
                />
              </svg>

              {/* Initial Hint: "TOCA UNA PIEZA" (bone 50%) that fades after first interaction */}
              <div 
                className={`absolute top-3 inset-x-0 flex justify-center pointer-events-none z-30 transition-opacity duration-300 ${
                  hasInteracted ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden="true"
              >
                <span className="font-sans text-[10px] tracking-widest text-bone/50 uppercase bg-night-950/90 px-3 py-1 border border-white/10 shadow-sm font-semibold">
                  TOCA UNA PIEZA
                </span>
              </div>

              {/* 6 Hotspot <button> elements (28–32 px) with font-sans number */}
              {pieces.map((p, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={p.id}
                    ref={(el) => (hotspotButtonsRef.current[idx] = el)}
                    type="button"
                    onClick={() => selectPiece(idx)}
                    onKeyDown={(e) => handleKeyNav(e, idx)}
                    style={{ left: `${p.hotspot.x}%`, top: `${p.hotspot.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone cursor-pointer after:absolute after:-inset-2.5 after:content-[''] ${
                      isActive
                        ? 'bg-night-950 border-2 border-accent shadow-[0_0_18px_rgba(180,36,124,0.7)] scale-110 ring-2 ring-accent/30'
                        : 'bg-night-950/90 border border-white/40 hover:border-bone hover:scale-105 active:scale-95'
                    }`}
                    aria-label={`Hotspot ${p.num}: ${p.name}`}
                    aria-selected={isActive}
                    role="tab"
                  >
                    {/* Active = Número magenta en ambos */}
                    <span className={`font-sans text-[11px] font-bold ${
                      isActive ? 'text-accent' : 'text-bone/85 hover:text-white'
                    }`}>
                      {p.num}
                    </span>

                    {/* Subtle ping on inactive buttons */}
                    {!isActive && !prefersReduced && (
                      <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30 pointer-events-none" />
                    )}
                  </button>
                );
              })}

              {/* Corner technical markers */}
              <div className="absolute bottom-2.5 left-2.5 font-sans text-[9px] text-bone/40 uppercase tracking-widest pointer-events-none font-medium">
                DISECCIÓN 01–06
              </div>
              <div className="absolute bottom-2.5 right-2.5 font-sans text-[9px] text-bone/40 uppercase tracking-widest pointer-events-none font-medium">
                HOTSPOT {activePiece.num}
              </div>
            </div>
          </div>

          {/* 3. RIGHT RAIL: Formato ÚNICO y fijo que el usuario aprende una vez */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch bg-night-900/90 border border-white/15 p-6 sm:p-7 shadow-studio-hard-dark relative overflow-hidden">
            
            {/* Top: Category & Piece Title in Instrument Sans */}
            <div className="space-y-1.5 pb-4 border-b border-white/10 transition-all duration-200 ease-mech-s">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans uppercase tracking-widest text-accent font-bold">
                  {activePiece.category}
                </span>
                <span className="font-sans text-xs font-bold text-bone/50 tracking-wider">
                  {activePiece.num} / 06
                </span>
              </div>
              <h3 className="font-sans text-sm sm:text-base font-bold text-bone tracking-wider uppercase">
                {activePiece.name}
              </h3>
            </div>

            {/* Middle: Humanist phrase VERBATIM */}
            <div className="py-4 border-b border-white/10 min-h-[84px] flex items-center">
              <p className="text-sm sm:text-[15px] font-sans font-normal text-bone leading-relaxed">
                {activePiece.phrase}
              </p>
            </div>

            {/* Bottom: Dedicated Micro-proof Slot (Fixed dimensions with 200ms mechanical transitions) */}
            <div className="pt-4 flex-grow flex flex-col justify-center min-h-[260px] sm:min-h-[280px]">
              {renderMicroProof()}
            </div>

            {/* Bottom Stepper Indicator of the Rail */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-bone/50 font-medium">
              <div className="flex items-center gap-1.5">
                {pieces.map((_, i) => (
                  <span 
                    key={i} 
                    className={`h-1 transition-all duration-200 ${
                      i === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-white/20'
                    }`} 
                  />
                ))}
              </div>
              <span>PIEZA {activePiece.num} DE 06</span>
            </div>

          </div>

        </div>

        {/* Bottom 4 Essential Specs Cards (spec-strip inferior) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-4 bg-night-900 border border-white/15 hover:border-white/25 transition-colors">
            <span className="text-bone/50 block uppercase text-[10px] font-sans font-semibold tracking-wider">Potencia Sostenida</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.power}</span>
          </div>
          <div className="p-4 bg-night-900 border border-white/15 hover:border-white/25 transition-colors">
            <span className="text-bone/50 block uppercase text-[10px] font-sans font-semibold tracking-wider">Temperatura Máxima</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.maxTemperature}</span>
          </div>
          <div className="p-4 bg-night-900 border border-white/15 hover:border-white/25 transition-colors">
            <span className="text-bone/50 block uppercase text-[10px] font-sans font-semibold tracking-wider">Depósito Calibrado</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.tankCapacity} (~5 min)</span>
          </div>
          <div className="p-4 bg-night-900 border border-white/15 hover:border-white/25 transition-colors">
            <span className="text-bone/50 block uppercase text-[10px] font-sans font-semibold tracking-wider">Cámara Térmica</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.innerTankMaterial}</span>
          </div>
        </div>

        {/* Footnote on laboratory claims & Direct Link to Honesty Section */}
        <div className="mt-8 pt-4 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-[11px] font-sans text-bone/45 italic">
            *Según pruebas de laboratorio del fabricante.
          </p>

          <a
            href="#etiqueta"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-bone/70 hover:text-accent border-b border-bone/20 pb-0.5 transition-colors"
          >
            <span>Ver qué hace y qué NO hace en la Etiqueta de Honestidad ↓</span>
          </a>
        </div>

      </div>
    </section>
  );
};
