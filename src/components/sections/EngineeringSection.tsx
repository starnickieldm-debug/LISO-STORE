import React, { useState, useEffect, useRef } from 'react';
import { productSpecs } from '../../config/siteContent';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { RotatingGuaranteeStamp } from '../ui/RotatingGuaranteeStamp';

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
    phrase: "Plancha en el gancho, en la tabla y en cuellos: el ángulo te sigue a ti.",
    hotspot: { x: 67, y: 37 }
  },
  {
    id: "chamber",
    num: "02",
    name: "CÁMARA TÉRMICA DE ALUMINIO",
    category: "SISTEMA TÉRMICO INTERNO",
    phrase: "El aluminio calienta en pocos segundos: vapor listo antes de que cuelgues la camisa.",
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
    phrase: "Potencia constante por cable: sin batería que pierda fuerza con los meses.",
    hotspot: { x: 23, y: 88 }
  },
  {
    id: "handle",
    num: "05",
    name: "CARCASA BICAPA CON AGARRE",
    category: "AISLAMIENTO TÉRMICO",
    phrase: "Aislamiento bicapa: 150 °C en la placa térmica; mango frío y seguro al tacto.",
    hotspot: { x: 35, y: 64 }
  },
  {
    id: "voltage",
    num: "06",
    name: "CLAVIJA ESTÁNDAR + 110–240 V",
    category: "CONEXIÓN Y VOLTAJE",
    phrase: "Clavija plana estándar (110 V) para cualquier toma y multivoltaje para viajes.",
    hotspot: { x: 16, y: 92 }
  }
];

export const EngineeringSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Hook for entry animation
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

  // Single-run countdown when piece 02 is selected
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

  // Keyboard navigation across hotspots & index items
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

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        selectPiece((activeIndex + 1) % pieces.length);
      } else {
        selectPiece((activeIndex - 1 + pieces.length) % pieces.length);
      }
    }
    touchStartX.current = null;
  };

  // Leader line endpoint calculation
  const leaderTargetX = Math.min(activePiece.hotspot.x + (activePiece.hotspot.x > 50 ? 18 : 24), 96);
  const leaderTargetY = activePiece.hotspot.y;

  // Shared Micro-Proof Renderer
  const renderMicroProof = () => {
    switch (activeIndex) {
      case 0:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[4/3] bg-[#181615]/70 border border-white/15 overflow-hidden rounded-xl">
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

              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-[#181615]/90 border border-white/20 text-[10px] font-sans text-accent font-bold rounded">
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
                  className={`py-2.5 px-1 min-h-[46px] text-center font-sans text-xs uppercase tracking-tight font-bold transition-all border rounded-lg active:scale-95 ${
                    plateAngle === deg
                      ? 'bg-accent text-white border-accent shadow-sm'
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
            <div className="p-5 bg-night-950/80 border border-white/15 space-y-4 rounded-xl">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-bone/60 uppercase tracking-wider font-semibold">TIEMPO AL ARRANQUE</span>
                <span className="text-accent font-sans font-bold">150 °C OBJETIVO</span>
              </div>

              <div className="py-4 text-center space-y-2 border-y border-white/10 bg-white/[0.02] rounded-lg">
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
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-accent ${
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
            <div className="relative aspect-[4/3] bg-[#181615]/70 border border-white/15 overflow-hidden rounded-xl">
              <img 
                src="/images/liso-pantalla.webp" 
                alt="Pantalla digital LED de la plancha LISO con lectura térmica en tiempo real" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-2.5 inset-x-2.5 p-2.5 bg-[#181615]/90 backdrop-blur-xs border border-white/20 flex items-center justify-between font-sans text-xs rounded-lg">
                <span className="text-bone/70 uppercase font-medium">LECTURA TÉRMICA:</span>
                <span className="text-accent font-sans font-bold tracking-wider">{tempCounter} °C</span>
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between text-xs font-sans rounded-xl">
              <span className="text-bone/70 font-medium">MODOS ACTIVOS:</span>
              <span className="text-accent font-sans font-bold">2 NIVELES + PLANCHADO EN SECO</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[16/9] bg-[#181615]/70 border border-white/15 overflow-hidden rounded-xl">
              <img 
                src="/images/liso-cable.webp" 
                alt="Detalle del cable de alimentación directa de alta potencia" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-night-950/80 border border-white/15 space-y-3 font-sans text-xs rounded-xl">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-bone font-bold text-[11px]">
                  <span>1200 W CONSTANTE</span>
                  <span className="text-accent font-sans">100% SOSTENIDO</span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-bone/50 text-[11px] font-medium">
                  <span>MODELOS A BATERÍA</span>
                  <span className="font-sans">DECAE TRAS 3 MIN</span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20 w-[35%]" />
                </div>
              </div>

              <p className="text-[11px] text-bone/60 pt-1 leading-snug font-sans border-t border-white/10">
                Alimentación directa por cable: presión de vapor continua sin pérdida de temperatura ni degradación de celdas.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[16/9] bg-[#181615]/70 border border-white/15 overflow-hidden rounded-xl">
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
              <div className="p-3 bg-night-950/80 border border-white/15 rounded-xl">
                <span className="text-[10px] text-bone/50 uppercase block font-medium">CÁMARA INTERNA</span>
                <span className="text-xl font-bold text-bone mt-0.5 block font-sans">150 °C</span>
                <span className="text-[9px] text-bone/40 block mt-0.5 font-medium">Por dentro</span>
              </div>

              <div className="p-3 bg-night-950/80 border border-accent/40 shadow-[0_0_12px_rgba(180,36,124,0.15)] rounded-xl">
                <span className="text-[10px] text-accent uppercase font-bold block">SUPERFICIE MANGO</span>
                <span className="text-xl font-bold text-accent mt-0.5 block font-sans">≤42 °C</span>
                <span className="text-[9px] text-bone/60 block mt-0.5 font-medium">Seguro al tacto</span>
              </div>
            </div>

            <p className="text-[11px] font-sans text-bone/70 text-center">
              Cámara de aire bicapa en ABS ignífugo: aislamiento que previene cualquier molestia o calor en la mano.
            </p>
          </div>
        );
      case 5:
        return (
          <div className="space-y-3.5">
            <div className="relative aspect-[4/3] bg-[#181615]/70 border border-white/15 overflow-hidden rounded-xl">
              <img 
                src="/images/liso-plug-us.webp" 
                alt="Clavija eléctrica plana estándar Tipo A/B (110 V)" 
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-[#181615]/90 border border-white/20 text-[10px] font-sans text-bone font-bold rounded">
                110 V · MULTIVOLTAJE 110–240 V
              </div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 space-y-1 text-xs font-sans rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-bone font-semibold">Estándar Colombia (110 V)</span>
                <span className="text-accent font-bold">Clavija plana Tipo A/B</span>
              </div>
              <p className="text-bone/65 text-[11px] leading-snug">
                Se conecta directo a cualquier toma de pared del país sin adaptadores. Compatible con 110–240 V si viajas.
              </p>
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
      className="py-12 sm:py-16 lg:py-18 bg-night-950 text-bone relative overflow-hidden scroll-mt-16 sm:scroll-mt-20 select-none"
      style={{ backgroundColor: '#211F1D' }}
    >
      {/* Background Texture: Grid Architecture from User Reference (Rotated Horizontal) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/images/textures/texture-grid-inverted.webp" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-20 mix-blend-screen"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#211F1D]/50 via-transparent to-[#211F1D]/75 pointer-events-none" />
      </div>

      {/* Subtle warm ambient lighting in top-left */}
      <div 
        className="pointer-events-none absolute -top-32 -left-32 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true" 
      />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* =========================================================================
            HEADER: Centered Title + Subtitle + Floating Top-Right Rotating Seal
            ========================================================================= */}
        <div className="relative mb-8 sm:mb-10 lg:mb-12 text-center max-w-3xl mx-auto">
          {/* Title */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-bone leading-[1.2]">
            Ingeniería <span className="italic font-normal">visible.</span>
          </h2>
          
          {/* Subtitle */}
          <p className="mt-3.5 sm:mt-4 text-base sm:text-lg font-sans font-normal leading-relaxed text-bone/75 max-w-2xl mx-auto">
            Disección técnica del dispositivo. Toca cada componente para inspeccionar su función real de planchado sin adornos superfluos.
          </p>

          {/* Floating Rotating Seal (Liquid+ Style Corner Stamp) */}
          <div className="hidden xl:block absolute -top-2 -right-64 2xl:-right-80 pointer-events-none">
            <RotatingGuaranteeStamp 
              size={110}
              circularText="★ 1200 W POTENCIA ★ 150 °C CONTROL ★ CERO TABLA ★"
              centerText="LISO"
              textColor="text-bone"
              customIcon={<Sparkles className="w-4 h-4 text-accent stroke-[2.2]" />}
            />
          </div>
        </div>

        {/* =========================================================================
            MOBILE COMPONENT INSPECTOR (< 1024px) — Touch-First Interactive Stage
            (No horizontal swipe: Explicit tap-to-inspect on badges to generate curiosity)
            ========================================================================= */}
        <div className="block lg:hidden pb-8">
          {/* Interactive Tap Prompt (Generates curiosity and invites tapping) */}
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[10px] font-sans font-bold tracking-widest text-accent uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping inline-block" />
              <span>DISECCIÓN TÉCNICA</span>
            </span>
            <span className="text-[11px] font-sans text-bone/70 font-semibold flex items-center gap-1">
              <span>Toca un componente</span>
              <span className="text-accent animate-bounce">↓</span>
            </span>
          </div>

          {/* 1. Horizontal Component Pills Bar with enhanced tap affordance */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2.5 mb-3 px-1 -mx-1">
            {pieces.map((p, idx) => {
              const isActive = idx === activeIndex;
              const shortNames = [
                'PLACA 90°',
                'CÁMARA VAPOR',
                'PANTALLA LED',
                'CABLE 1200W',
                'MANGO SEGURO',
                'CLAVIJA 110V'
              ];
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectPiece(idx)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl font-sans text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-accent text-white shadow-[0_0_18px_rgba(180,36,124,0.45)] ring-1 ring-accent scale-[1.03]' 
                      : 'bg-white/[0.06] border border-white/15 text-bone/70 hover:text-white hover:bg-white/10 active:bg-white/15'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className={`w-4 h-4 rounded-full text-[9.5px] flex items-center justify-center font-bold ${
                    isActive ? 'bg-white text-accent' : 'bg-white/15 text-bone/70'
                  }`}>
                    {p.num}
                  </span>
                  <span>{shortNames[idx]}</span>
                </button>
              );
            })}
          </div>

          {/* 2. Unified Mobile Inspection Card */}
          <div 
            key={activePiece.id} 
            className="bg-night-900/95 border border-white/15 rounded-3xl p-5 shadow-2xl space-y-4 animate-fadeIn"
          >
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

            {/* Stepper Footer Controls */}
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
        </div>

        {/* =========================================================================
            DESKTOP MAIN STAGE GRID (>= 1024px) — Symmetrical 3-Card Interactive Lab
            ========================================================================= */}
        <div 
          className="hidden lg:grid grid-cols-12 gap-6 xl:gap-8 items-stretch pb-16"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={prefersReduced ? undefined : {
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.98)',
            transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          
          {/* 1. LEFT CARD: ÍNDICE ANATÓMICO INTERACTIVO */}
          <div className="lg:col-span-3 bg-night-900/85 border border-white/15 rounded-3xl p-6 xl:p-7 flex flex-col justify-between shadow-2xl backdrop-blur-md">
            <div>
              {/* Card Header */}
              <div className="pb-3 mb-3 border-b border-white/10">
                <span className="text-[10px] font-sans uppercase tracking-widest text-accent font-bold block mb-0.5">
                  ANATOMÍA TÉCNICA
                </span>
                <h3 className="font-display text-lg font-bold text-bone">
                  Índice de Piezas
                </h3>
              </div>

              {/* 6 Anatomical Buttons */}
              <div className="space-y-1">
                {pieces.map((piece, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <button
                      key={piece.id}
                      ref={(el) => (indexButtonsRef.current[idx] = el)}
                      type="button"
                      onClick={() => selectPiece(idx)}
                      onKeyDown={(e) => handleKeyNav(e, idx)}
                      className={`w-full py-3 px-3 rounded-xl text-left flex items-center justify-between group transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer ${
                        isActive 
                          ? 'bg-accent/15 border border-accent/40 shadow-sm' 
                          : 'bg-white/[0.02] border border-transparent hover:border-white/10 hover:bg-white/[0.04]'
                      }`}
                      aria-label={`Ver pieza ${piece.num}: ${piece.name}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-6 h-6 rounded-full font-sans text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                          isActive 
                            ? 'bg-accent text-white' 
                            : 'bg-white/10 text-bone/60 group-hover:text-bone group-hover:bg-white/15'
                        }`}>
                          {piece.num}
                        </span>
                        <div className="min-w-0">
                          <span className={`font-sans text-[11px] xl:text-xs tracking-wider uppercase font-semibold block truncate transition-colors ${
                            isActive ? 'text-white' : 'text-bone/70 group-hover:text-bone'
                          }`}>
                            {piece.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center pl-2 shrink-0">
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          isActive ? 'bg-accent shadow-[0_0_8px_rgba(180,36,124,0.8)] scale-125' : 'bg-transparent'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom OEM Note */}
            <div className="mt-6 pt-3.5 border-t border-white/10">
              <p className="text-[10.5px] font-sans uppercase tracking-wider text-bone/50 leading-relaxed font-medium">
                Aleación de aluminio inyectado y polímero aislante de alta resistencia.
              </p>
            </div>
          </div>

          {/* 2. CENTER STAGE: THE FLOATING APPARATUS (liso-cutout.webp Floating on Background with Aura & Hotspots) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[480px] select-none">
            
            {/* Background Warm Steam Glow (Floating Depth Aura) */}
            <div 
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(180,36,124,0.22)_0%,rgba(255,195,130,0.10)_40%,transparent_70%)] blur-3xl animate-pulse" />
              <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-white/10 pointer-events-none" />
            </div>

            <div className="relative w-full aspect-square max-w-[460px] flex items-center justify-center select-none">
              {/* Floating Cutout Apparatus */}
              <img 
                src="/images/liso-cutout.webp" 
                alt="Plancha de vapor LISO disección anatómica en perspectiva técnica" 
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 500px"
                className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter"
              />

              {/* Ambient Active Pulse Ring */}
              <div 
                className={`pointer-events-none absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 shadow-[0_0_30px_rgba(180,36,124,0.35)] ${
                  prefersReduced ? 'duration-0' : 'transition-all duration-200 ease-mech-s'
                }`}
                style={{
                  left: `${activePiece.hotspot.x}%`,
                  top: `${activePiece.hotspot.y}%`
                }}
                aria-hidden="true"
              />

              {/* SVG Animated Dashed Leader Line */}
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

              {/* Initial Hint */}
              <div 
                className={`absolute top-2 inset-x-0 flex justify-center pointer-events-none z-30 transition-opacity duration-300 ${
                  hasInteracted ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden="true"
              >
                <span className="font-sans text-[10px] tracking-widest text-bone/70 uppercase bg-night-900/90 px-3 py-1 border border-white/15 shadow-sm font-semibold rounded-full backdrop-blur-sm">
                  TOCA UN COMPONENTE
                </span>
              </div>

              {/* 6 Hotspot Buttons */}
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
                    <span className={`font-sans text-[11px] font-bold ${
                      isActive ? 'text-accent' : 'text-bone/85 hover:text-white'
                    }`}>
                      {p.num}
                    </span>

                    {!isActive && !prefersReduced && (
                      <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30 pointer-events-none" />
                    )}
                  </button>
                );
              })}

              {/* Corner technical markers */}
              <div className="absolute bottom-2 left-2 font-sans text-[9px] text-bone/40 uppercase tracking-widest pointer-events-none font-medium">
                DISECCIÓN 01–06
              </div>
              <div className="absolute bottom-2 right-2 font-sans text-[9px] text-bone/40 uppercase tracking-widest pointer-events-none font-medium">
                HOTSPOT {activePiece.num}
              </div>
            </div>

          </div>

          {/* 3. RIGHT CARD: PANEL DE INSPECCIÓN Y MICRO-PRUEBA EN VIVO */}
          <div className="lg:col-span-4 bg-night-900/85 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            
            {/* Top: Category & Piece Title */}
            <div className="space-y-1.5 pb-4 border-b border-white/10 transition-all duration-200 ease-mech-s">
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
            </div>

            {/* Middle: Humanist phrase VERBATIM */}
            <div className="py-4 border-b border-white/10 min-h-[74px] flex items-center">
              <p className="text-sm sm:text-[14.5px] font-sans font-normal text-bone/90 leading-relaxed">
                {activePiece.phrase}
              </p>
            </div>

            {/* Bottom: Dedicated Live Micro-proof Slot */}
            <div className="py-4 flex-grow flex flex-col justify-center min-h-[260px] sm:min-h-[280px]">
              {renderMicroProof()}
            </div>

            {/* Bottom Stepper Indicator of the Rail */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-bone/50 font-medium">
              <div className="flex items-center gap-1.5">
                {pieces.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectPiece(i)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === activeIndex ? 'w-6 bg-accent' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Ir a pieza ${i + 1}`}
                  />
                ))}
              </div>
              <span className="font-sans text-[11px]">PIEZA {activePiece.num} DE 06</span>
            </div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM 4 ESSENTIAL SPECS CARDS (Rounded Liquid+ Style)
            ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-4 bg-night-900/90 border border-white/15 rounded-2xl hover:border-white/25 transition-colors">
            <span className="text-bone/50 block uppercase text-[10px] font-sans font-semibold tracking-wider">Potencia Sostenida</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.power}</span>
          </div>
          <div className="p-4 bg-night-900/90 border border-white/15 rounded-2xl hover:border-white/25 transition-colors">
            <span className="text-bone/50 block uppercase text-[10px] font-sans font-semibold tracking-wider">Temperatura Máxima</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.maxTemperature}</span>
          </div>
          <div className="p-4 bg-night-900/90 border border-white/15 rounded-2xl hover:border-white/25 transition-colors">
            <span className="text-bone/50 block uppercase text-[10px] font-sans font-semibold tracking-wider">Depósito Calibrado</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.tankCapacity} (~5 min)</span>
          </div>
          <div className="p-4 bg-night-900/90 border border-white/15 rounded-2xl hover:border-white/25 transition-colors">
            <span className="text-bone/50 block uppercase text-[10px] font-sans font-semibold tracking-wider">Cámara Térmica</span>
            <span className="text-lg font-bold text-bone mt-1 block font-sans">{productSpecs.innerTankMaterial}</span>
          </div>
        </div>

        {/* Footnote on laboratory claims & Direct Link to Honesty Section */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border-t border-white/10">
          <p className="text-[11px] font-sans text-bone/45 italic">
            *Según pruebas de laboratorio del fabricante.
          </p>

          <a
            href="#etiqueta"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-accent hover:text-white transition-colors"
          >
            <span>Ver qué hace y qué NO hace en la Etiqueta de Honestidad ↓</span>
          </a>
        </div>

      </div>
    </section>
  );
};
