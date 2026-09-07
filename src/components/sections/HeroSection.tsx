import React, { useState, useEffect } from 'react';
import { brandConfig, productSpecs } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CTAButton } from '../ui/CTAButton';
import { DataStrip } from '../ui/DataStrip';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { currentMarket } = useMarket();
  const prefersReduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [topBarsHeight, setTopBarsHeight] = useState(100);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Dynamically measure TrustBar + Navbar height to guarantee exact 100dvh viewport fit
  useEffect(() => {
    const measureTopBars = () => {
      if (window.scrollY > 10) return;
      const trustBar = document.querySelector('aside[aria-label="Condiciones de compra y confianza"]');
      const navbar = document.querySelector('header');
      const h1 = trustBar ? trustBar.getBoundingClientRect().height : 36;
      const h2 = navbar ? navbar.getBoundingClientRect().height : 64;
      if (h1 + h2 > 0) {
        setTopBarsHeight(Math.round(h1 + h2));
      }
    };

    measureTopBars();
    window.addEventListener('resize', measureTopBars);
    return () => window.removeEventListener('resize', measureTopBars);
  }, []);

  return (
    <section 
      id="hero"
      className="relative flex flex-col justify-between overflow-hidden bg-night-950 text-bone border-b border-white/10 w-full min-h-[calc(100dvh-100px)]"
      style={{ 
        backgroundColor: '#0B0C0F',
        minHeight: `calc(100dvh - ${topBarsHeight}px)`
      }}
    >
      {/* Upper Hero Stage: Flex-1 vertically centers content in remaining viewport space */}
      <div className="relative flex-1 flex items-center w-full overflow-hidden py-4 sm:py-6 lg:py-4">
        {/* Background Layer 1: Luxury draped silk fabric texture (subtle atmospheric grain) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/images/fabric-texture-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity scale-105"
          />
          {/* Soft dark gradient overlays to retain silk folds while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F] via-[#0B0C0F]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F]/90 via-transparent to-[#0B0C0F]" />
          <div className="absolute inset-0 bg-vignette-cinematic" />
        </div>

        {/* Layer 2: Giant structural branding word 'LISO' (subtle depth watermark, strictly BEHIND the product) */}
        <div 
          className="select-none pointer-events-none absolute right-0 -top-4 sm:-top-8 lg:-top-6 font-giant-structural font-semibold uppercase text-[15vw] sm:text-[13vw] lg:text-[10.5vw] tracking-tighter leading-none whitespace-nowrap z-0 overflow-hidden pr-2 sm:pr-6" 
          style={!prefersReduced ? {
            opacity: loaded ? 0.20 : 0,
            transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(16px, 0, 0)',
            transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) 300ms'
          } : { opacity: 0.20 }}
          aria-hidden="true" 
        >
          <span className="text-bone/12">LI</span>
          <span className="text-outline-bone-subtle">SO</span>
        </div>

        {/* Ambient Layer: Structural warm/magenta light halo behind the iron head */}
        <div 
          className="pointer-events-none absolute right-0 top-0 w-80 sm:w-[520px] h-80 sm:h-[520px] bg-halo-structural blur-3xl z-5" 
          aria-hidden="true" 
        />

        {/* Layer 3: Seamless Product Image Stage (Dedicated right-side visual stage in front of LISO watermark) */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-full lg:w-[51%] xl:w-[48%] z-10 hidden lg:flex items-center justify-end overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 10%, black 28%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 10%, black 28%, black 100%)',
          }}
        >
          <picture className="w-full h-full">
            <source srcSet="/images/hero-steamer-editorial.webp" type="image/webp" />
            <img 
              src="/images/hero-steamer-editorial.jpg" 
              alt="Plancha de vapor portátil LISO con placa giratoria y pantalla digital sobre prenda de seda" 
              className="w-full h-full object-cover object-[70%_center] transform origin-center transition-all duration-1000 ease-mech-s"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'scale(1)' : 'scale(1.03)',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
              loading="eager"
            />
          </picture>
          {/* Soft dissolved edges: top, left, and bottom fade so the iron has a pristine background without harsh cuts */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0C0F] via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0B0C0F]/70 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0B0C0F] via-transparent to-transparent" />
          {/* Subtle radial vignette darkening garment edges so the iron pops as the undisputed focal hero */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_48%,transparent_45%,rgba(11,12,15,0.55)_85%)]" />
        </div>

        {/* Layer 4: Atmospheric steam glow */}
        <div 
          className="pointer-events-none absolute right-4 top-2 w-72 sm:w-[460px] h-72 sm:h-[460px] bg-[radial-gradient(ellipse_at_center,rgba(232,227,218,0.10)_0%,rgba(180,36,124,0.04)_45%,transparent_70%)] blur-2xl z-20" 
          aria-hidden="true" 
        />

        <div className="max-w-[1480px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-30 my-auto">
        
        {/* =========================================================================
            DESKTOP HERO COMPOSITION (>= 1024px) — 100% Unchanged Layout
            ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Controlled width commercial content with strict hierarchy */}
          <div className="col-span-7 xl:col-span-6 max-w-xl xl:max-w-[560px] pt-2">
            
            {/* H1 Headline: Impactful 2-block composition with intentional line breaks */}
            <h1 
              className="font-display text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-bold text-bone tracking-[-0.025em] leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
                transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 60ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 60ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              <span className="block">Olvídate de la plancha pesada.</span>
              <span className="block text-bone/95 mt-1.5 font-normal">
                Tu ropa <span className="italic font-display font-medium text-white">impecable</span> en segundos.
              </span>
            </h1>

            {/* 3. Subheadline: Compact secondary explanatory paragraph */}
            <p 
              className="text-sm sm:text-[15px] lg:text-base text-bone/75 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] mt-4 lg:mt-5"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 14px, 0)',
                transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 140ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              ¿Te salió un plan de última hora y tienes la ropa toda arrugada? La conectas y en <strong className="font-semibold text-bone">{productSpecs.heatUpTime}</strong> ya está caliente. Puedes alisar la ropa directamente en la percha gracias a su <strong className="font-semibold text-bone">placa giratoria</strong> y ver la temperatura real en pantalla.
            </p>

            {/* 4. Price & Primary Conversion Card */}
            <div 
              className="hero-glass-card p-5 lg:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.5)] space-y-3.5 rounded-xl mt-6"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
                transition: 'opacity 850ms cubic-bezier(0.16, 1, 0.3, 1) 220ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 220ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              {/* Nivel 2: Precio */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pb-0.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-[2.2rem] font-display font-bold text-white tracking-tight drop-shadow-sm">
                    {currentMarket.formattedPrice}
                  </span>
                  <span className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-accent font-semibold">
                    {currentMarket.shippingLabel}
                  </span>
                </div>
                <span className="text-[11px] font-sans text-bone/50 font-medium">
                  Precio final neto
                </span>
              </div>

              {/* Nivel 2: CTA Principal + Acción Secundaria Textual */}
              <div className="flex items-center gap-3 pt-0.5">
                <CTAButton 
                  href="#oferta" 
                  size="large" 
                  className="flex-1 shadow-[0_4px_24px_rgba(180,36,124,0.4)] hover:shadow-[0_6px_30px_rgba(180,36,124,0.55)] text-[15px] font-semibold tracking-wide"
                >
                  Quiero mi ropa impecable
                </CTAButton>

                {/* Acción secundaria: Enlace textual discreto con menor peso y contraste */}
                <a 
                  href="#como-funciona" 
                  className="inline-flex items-center justify-start gap-1.5 py-2 px-2 text-xs font-sans font-medium text-bone/60 hover:text-white transition-colors group shrink-0"
                  aria-label="Ver cómo funciona LISO"
                >
                  <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-white/60">
                    Ver cómo funciona
                  </span>
                  <ArrowDown className="w-3.5 h-3.5 text-bone/40 group-hover:text-bone group-hover:translate-y-0.5 transition-all" />
                </a>
              </div>

              {/* Nivel 3: Beneficios de confianza (Bajo ruido, lectura limpia) */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-bone/70 pt-1 font-sans font-medium border-t border-white/5">
                <span className="inline-flex items-center gap-1.5 text-bone/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{currentMarket.shippingLabel}</span>
                </span>
                <span className="text-white/20">·</span>
                <span>Pago 100% seguro</span>
                <span className="text-white/20">·</span>
                <span>Atención postventa</span>
              </div>

              {/* Nota de laboratorio discreta */}
              <p className="text-[10px] font-sans text-bone/40 italic pt-0.5">
                {brandConfig.labClaimNote}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Generous spacer establishing negative space for the product */}
          <div className="col-span-5 xl:col-span-6 h-[420px] xl:h-[460px] pointer-events-none" />

        </div>

        {/* =========================================================================
            MOBILE HERO COMPOSITION (< 1024px) — 100% Mobile-First Native Stage
            ========================================================================= */}
        <div className="block lg:hidden py-1 max-w-lg mx-auto">
          
          {/* 1. Mobile Eyebrow Badge */}
          <div className="flex justify-center mb-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono font-medium uppercase tracking-[0.18em] text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>LISO CARE · EDICIÓN ORIGINAL</span>
            </div>
          </div>

          {/* 2. Mobile H1: Balanced title */}
          <h1 className="text-center font-display text-[1.85rem] xs:text-[2.15rem] font-bold text-bone tracking-tight leading-[1.14] drop-shadow-md">
            <span>Olvídate de la plancha pesada.</span>
            <span className="block text-bone/95 mt-1 font-normal text-[1.5rem] xs:text-[1.7rem]">
              Tu ropa <span className="italic font-display font-medium text-white">impecable</span> en segundos.
            </span>
          </h1>

          {/* 3. Mobile Focal Hero Product Stage (Centerpiece) */}
          <div className="relative my-4 w-full max-w-[380px] mx-auto">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-night-950 shadow-2xl">
              <picture className="w-full h-full">
                <source srcSet="/images/hero-steamer-editorial.webp" type="image/webp" />
                <img 
                  src="/images/hero-steamer-editorial.jpg" 
                  alt="Plancha de vapor portátil LISO con placa giratoria y pantalla digital sobre prenda de seda" 
                  className="w-full h-full object-cover object-[70%_center]"
                  loading="eager"
                />
              </picture>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0C0F] via-transparent to-transparent" />
              
              {/* Floating Spec Micro-Badges */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-mono text-bone/90 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>1200 W</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-mono text-bone/90 flex items-center gap-1.5 shadow-sm">
                <span>150 °C MAX</span>
              </div>
              <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-mono text-bone/90 flex items-center gap-1.5 shadow-sm">
                <span>PLACA 90°</span>
              </div>
            </div>
          </div>

          {/* 4. Short Subtitle */}
          <p className="text-center text-[13.5px] text-bone/75 leading-relaxed font-normal max-w-sm mx-auto mb-3.5">
            ¿Te salió un plan de última hora? La conectas y en <strong className="font-semibold text-bone">{productSpecs.heatUpTime}</strong> ya está lista. Alisas directamente en la percha sin montar la tabla.
          </p>

          {/* 5. Thumb-Zone Conversion Glass Card */}
          <div className="hero-glass-card p-4 rounded-xl space-y-3 shadow-2xl border border-white/10">
            <div className="flex items-baseline justify-between gap-2 pb-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[1.85rem] font-display font-bold text-white tracking-tight">
                  {currentMarket.formattedPrice}
                </span>
                <span className="text-[11px] font-sans uppercase tracking-wider text-accent font-semibold">
                  {currentMarket.shippingLabel}
                </span>
              </div>
              <span className="text-[10px] font-mono text-bone/50 uppercase tracking-wider">
                Envío GRATIS
              </span>
            </div>

            <CTAButton 
              href="#oferta" 
              size="large" 
              className="w-full shadow-[0_4px_24px_rgba(180,36,124,0.4)] active:scale-[0.98] text-[15px] font-semibold tracking-wide"
            >
              Quiero mi ropa impecable
            </CTAButton>

            <div className="flex items-center justify-between text-[11px] text-bone/70 pt-1 font-sans border-t border-white/10">
              <span className="flex items-center gap-1 text-bone/90">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Pago 100% seguro</span>
              </span>
              <span className="text-white/20">·</span>
              <span>Garantía oficial</span>
              <span className="text-white/20">·</span>
              <a href="#como-funciona" className="text-accent underline underline-offset-2">
                Cómo funciona
              </a>
            </div>
          </div>

        </div>

      </div>

      </div>

      {/* Nivel 4: DataStrip ligera y de soporte técnico alineada al fondo del viewport */}
      <div className="relative z-30 w-full mt-auto">
        <DataStrip />
      </div>
    </section>
  );
};
