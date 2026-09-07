import React, { useState, useEffect, useRef } from 'react';
import { LedTemperatureCounter } from './LedTemperatureCounter';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Rotate3d, Compass } from 'lucide-react';

interface Hero3DProductProps {
  className?: string;
}

export const Hero3DProduct: React.FC<Hero3DProductProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Rotational angles for dampened scrub
  const [yaw, setYaw] = useState(15);
  const [pitch, setPitch] = useState(-5);
  const targetYaw = useRef(15);
  const targetPitch = useRef(-5);
  const currentYaw = useRef(15);
  const currentPitch = useRef(-5);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;

    let animId: number;

    const updateInertia = () => {
      // Damped lerp (0.07 damping factor for physical machinery feel)
      currentYaw.current += (targetYaw.current - currentYaw.current) * 0.07;
      currentPitch.current += (targetPitch.current - currentPitch.current) * 0.07;
      
      setYaw(Math.round(currentYaw.current * 10) / 10);
      setPitch(Math.round(currentPitch.current * 10) / 10);

      animId = requestAnimationFrame(updateInertia);
    };

    animId = requestAnimationFrame(updateInertia);

    // Scroll listener to drive scrub smoothly without scroll-jacking
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through hero
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
        targetYaw.current = 15 + progress * 40; // rotate from 15deg to 55deg on scroll
        targetPitch.current = -5 + Math.sin(progress * Math.PI) * 8;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReduced]);

  // Pointer move interaction for micro-scrub
  const handlePointerMove = (e: React.PointerEvent) => {
    if (prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetYaw.current += x * 8;
    targetPitch.current += -y * 6;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsInteracting(true)}
      onPointerLeave={() => setIsInteracting(false)}
      className={`relative w-full aspect-[4/3] max-h-[460px] flex items-center justify-center select-none ${className}`}
      aria-label="Modelo 3D del producto conducido por scroll con pantalla digital LED"
    >
      {/* 3D Perspective Stage */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {/* Dampened Rotating Assembly */}
        <div
          className="relative w-64 sm:w-76 md:w-84 aspect-[3/4] flex items-center justify-center transition-transform"
          style={{
            transformStyle: 'preserve-3d',
            transform: prefersReduced
              ? 'rotateY(20deg) rotateX(-6deg)'
              : `rotateY(${yaw}deg) rotateX(${pitch}deg)`,
            transition: prefersReduced ? 'none' : 'transform 0.05s linear'
          }}
        >
          {/* Main Steamer Silhouette & Components */}
          <div className="relative w-48 sm:w-56 h-72 sm:h-80 flex flex-col items-center">
            
            {/* 1. Pivoting Ceramic Soleplate Head */}
            <div 
              className="relative z-20 w-40 sm:w-44 h-24 bg-gradient-to-br from-night-700 via-night-800 to-night-900 rounded-[28px] border border-white/20 shadow-rim-warm flex items-center justify-between px-4 py-2"
              style={{ transform: 'rotate(-12deg) translateZ(30px)', backgroundColor: '#181A20' }}
            >
              {/* Ceramic Surface & Nozzles */}
              <div className="w-full flex items-center justify-between">
                {/* Steam Nozzles */}
                <div className="flex flex-col gap-1.5 opacity-90">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(180,36,124,0.8)]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                  </div>
                  <div className="flex gap-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                  </div>
                </div>

                {/* Soleplate Core Spec */}
                <div className="text-right">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-bone/60 block font-bold">
                    CERÁMICA
                  </span>
                  <span className="font-mono text-[11px] text-accent font-bold">
                    150 °C
                  </span>
                </div>
              </div>

              {/* Edge Rim Light */}
              <div className="absolute inset-0 rounded-[28px] border border-white/10 pointer-events-none" />
            </div>

            {/* 2. Neck Pivot Joint */}
            <div 
              className="w-16 h-8 -mt-2 z-10 bg-night-800 border-x border-white/15 shadow-inner flex items-center justify-center"
              style={{ transform: 'translateZ(15px)', backgroundColor: '#181A20' }}
            >
              <div className="w-8 h-2 bg-accent/40 rounded-full" />
            </div>

            {/* 3. Ergonomic Main Body Handle with Digital LED Readout */}
            <div 
              className="relative z-20 w-28 sm:w-32 h-44 sm:h-48 bg-gradient-to-b from-night-800 via-night-900 to-night-950 rounded-b-2xl border border-white/15 shadow-dark-card flex flex-col items-center justify-between p-3.5"
              style={{ transform: 'translateZ(25px)', backgroundColor: '#121318' }}
            >
              {/* Integrated Digital LED Window (MOMENTO-FIRMA 1) */}
              <div className="w-full bg-black/90 border border-white/25 rounded-md p-2 text-center shadow-inner mt-1">
                <div className="text-[8px] font-mono text-bone/50 tracking-wider uppercase font-semibold">
                  TEMPERATURA REAL
                </div>
                <div className="text-xl sm:text-2xl font-bold mt-0.5">
                  <LedTemperatureCounter 
                    start={90} 
                    end={150} 
                    duration={600} 
                    isDarkTheme={true} 
                  />
                </div>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[8px] font-mono text-bone/70 uppercase">
                    VAPOR ACTIVO
                  </span>
                </div>
              </div>

              {/* Ergonomic grip lines */}
              <div className="w-full space-y-1 my-auto opacity-30">
                <div className="h-[1px] bg-white/40 w-3/4 mx-auto" />
                <div className="h-[1px] bg-white/40 w-2/3 mx-auto" />
                <div className="h-[1px] bg-white/40 w-1/2 mx-auto" />
              </div>

              {/* LISO Branding debossed */}
              <div className="font-display font-bold text-[10px] tracking-[0.25em] text-bone/40 uppercase">
                LISO · 1200W
              </div>
            </div>

            {/* 4. Cylindrical Water Reservoir (100 ml) */}
            <div 
              className="relative -mt-4 z-10 w-24 sm:w-28 h-20 bg-gradient-to-b from-white/5 to-white/10 rounded-b-xl border-x border-b border-white/15 backdrop-blur-xs flex flex-col items-center justify-end pb-2"
              style={{ transform: 'translateZ(10px)', backgroundColor: '#181A20' }}
            >
              <div className="text-[9px] font-mono text-bone/50 tracking-tight">
                100 ml MAX
              </div>
              <div className="w-12 h-1 bg-accent/40 rounded-full mt-1" />
            </div>

          </div>
        </div>
      </div>

      {/* Technical Spec & Scrub HUD Overlay */}
      <div className="absolute top-2 left-2 flex items-center gap-2 text-[10px] font-mono text-bone/60 bg-night-900/80 px-2.5 py-1 border border-white/10 backdrop-blur-sm">
        <Rotate3d className="w-3.5 h-3.5 text-accent animate-pulse" />
        <span>3D SCRUB V2 · GIRO: {Math.round(yaw)}°</span>
      </div>

      {/* Production Asset Notice */}
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-bone/40 bg-night-950/90 px-2 py-0.5 border border-white/10">
        GEOMETRÍA VECTORIAL REAL · LISTO PARA .GLB
      </div>
    </div>
  );
};
