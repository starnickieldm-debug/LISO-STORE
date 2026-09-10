import React, { useState, useEffect } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CTAButton } from '../ui/CTAButton';
import { DataStrip } from '../ui/DataStrip';
import { CheckCircle2 } from 'lucide-react';

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
      className="relative flex flex-col justify-between overflow-hidden bg-bone text-graphite border-b border-graphite/10 w-full min-h-[calc(100dvh-100px)]"
      style={{ 
        backgroundColor: '#F5F1EA',
        minHeight: `calc(100dvh - ${topBarsHeight}px)`
      }}
    >
      {/* Upper Hero Stage: Flex-1 vertically centers content in remaining viewport space */}
      <div className="relative flex-1 flex items-center w-full overflow-hidden py-4 sm:py-6 lg:py-4">
        
        {/* Layer 2: Giant structural branding word 'LISO' (solid graphite watermark, strictly BEHIND the product) */}
        <div 
          className="select-none pointer-events-none absolute right-0 -top-4 sm:-top-8 lg:-top-6 font-giant-structural font-bold uppercase text-[15vw] sm:text-[13vw] lg:text-[11vw] tracking-tighter leading-none whitespace-nowrap z-0 overflow-hidden pr-2 sm:pr-6" 
          style={!prefersReduced ? {
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(16px, 0, 0)',
            transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) 300ms'
          } : undefined}
          aria-hidden="true" 
        >
          <span className="text-graphite/[0.06]">LISO</span>
        </div>

        {/* Ambient Layer: 20% Graphite Orbit Hairline behind product */}
        <div 
          className="pointer-events-none absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 w-[360px] sm:w-[480px] lg:w-[560px] h-[360px] sm:h-[480px] lg:h-[560px] rounded-full orbit-hairline z-5 hidden sm:block"
          aria-hidden="true" 
        />

        {/* Layer 3: Seamless Product Image Stage (Dedicated right-side visual stage in front of LISO watermark) */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-full lg:w-[51%] xl:w-[48%] z-10 hidden lg:flex items-center justify-end overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 10%, black 26%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 10%, black 26%, black 100%)',
          }}
        >
          <picture className="w-full h-full">
            <source srcSet="/images/hero-steamer-editorial.webp" type="image/webp" />
            <img 
              src="/images/hero-steamer-editorial.jpg" 
              alt="Plancha de vapor portátil LISO con placa giratoria y pantalla digital sobre prenda de seda" 
              className="w-full h-full object-cover object-[70%_center] transform origin-center transition-all duration-1000 ease-mech-s"
              style={{
                filter: 'brightness(1.06) contrast(1.06)',
                ...(!prefersReduced ? {
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'scale(1)' : 'scale(1.03)',
                  willChange: loaded ? 'auto' : 'opacity, transform'
                } : undefined)
              }}
              loading="eager"
            />
          </picture>
        </div>

        <div className="max-w-[1480px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-30 my-auto">
        
        {/* =========================================================================
            DESKTOP HERO COMPOSITION (>= 1024px)
            ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Controlled width commercial content with strict hierarchy */}
          <div className="col-span-7 xl:col-span-6 max-w-xl xl:max-w-[560px] pt-2">
            
            {/* H1 Headline: Impactful 2-block composition with intentional line breaks */}
            <h1 
              className="font-display text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-bold text-graphite tracking-[-0.025em] leading-[1.1]"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
                transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 60ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 60ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              <span className="block">Olvídate de la plancha pesada.</span>
              <span className="block text-graphite/90 mt-1.5 font-normal">
                Tu ropa <span className="italic font-display font-medium text-accent">impecable</span> en segundos.
              </span>
            </h1>

            {/* 3. Subheadline: Direct, high-converting value proposition */}
            <p 
              className="text-base sm:text-lg text-graphite/80 leading-relaxed font-normal mt-3.5 lg:mt-4 max-w-lg"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 14px, 0)',
                transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 140ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              Alisa directo en el gancho y sin sacar la tabla. Vapor continuo a 150 °C listo en segundos.
            </p>

            {/* 4. Streamlined High-Impact Conversion Block (Open, Clean, Friction-Free) */}
            <div 
              className="mt-6 lg:mt-7 space-y-4 max-w-md"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
                transition: 'opacity 850ms cubic-bezier(0.16, 1, 0.3, 1) 220ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 220ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              {/* Pricing & Free Shipping Incentive */}
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-[2.25rem] font-display font-bold text-graphite tracking-tight leading-none">
                  {currentMarket.formattedPrice}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/25 text-accent text-[11px] font-sans font-bold uppercase tracking-wider rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Envío gratis incluido
                </span>
              </div>

              {/* Primary High-Conversion CTA Button */}
              <div>
                <CTAButton 
                  href="#oferta" 
                  size="large" 
                  className="w-full sm:w-auto min-w-[300px] shadow-[0_8px_28px_rgba(180,36,124,0.32)] hover:shadow-[0_12px_36px_rgba(180,36,124,0.48)] text-[15px] sm:text-base font-semibold tracking-wide py-3.5 sm:py-4 transition-all active:scale-[0.99]"
                >
                  Pedir LISO — {currentMarket.formattedPrice}
                </CTAButton>
              </div>

              {/* Core Frictionless Trust Strip */}
              <div className="flex items-center gap-3 text-xs text-graphite/70 font-sans font-medium pt-0.5">
                <span className="inline-flex items-center gap-1 text-graphite font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Entrega garantizada</span>
                </span>
                <span className="text-graphite/25">·</span>
                <span>PSE y tarjetas</span>
                <span className="text-graphite/25">·</span>
                <span>Garantía de 30 días</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Generous spacer establishing negative space for the product */}
          <div className="col-span-5 xl:col-span-6 h-[420px] xl:h-[460px] pointer-events-none" />

        </div>

        {/* =========================================================================
            MOBILE HERO COMPOSITION (< 1024px) — 100% Mobile-First Native Stage
            Optimized for 1st fold visibility: Title -> Product -> Price -> CTA
            ========================================================================= */}
        <div className="block lg:hidden py-1 max-w-md mx-auto">
          
          {/* 1. Mobile H1: Compact, high-impact headline */}
          <h1 className="text-center font-display text-[1.65rem] xs:text-[1.85rem] font-bold text-graphite tracking-tight leading-[1.12] mb-1">
            <span>Olvídate de la plancha pesada.</span>
            <span className="block text-graphite/90 mt-0.5 font-normal text-[1.3rem] xs:text-[1.45rem]">
              Tu ropa <span className="italic font-display font-medium text-accent">impecable</span> en segundos.
            </span>
          </h1>

          {/* 2. Micro-bajada: 1 single punchy line of value proposition */}
          <p className="text-center text-[12.5px] xs:text-[13px] text-graphite/75 leading-snug max-w-[320px] mx-auto mb-2">
            Alisa directo en el gancho y sin sacar la tabla. Vapor continuo a 150 °C listo en segundos.
          </p>

          {/* 3. Mobile Focal Hero Product Stage (Editorial Dark Luxury Anchor) */}
          <div className="relative my-2 w-full max-w-[360px] mx-auto">
            {/* Ambient warm/magenta glow behind the product */}
            <div 
              className="pointer-events-none absolute inset-0 -m-3 bg-[radial-gradient(ellipse_at_center,rgba(180,36,124,0.18)_0%,rgba(255,195,130,0.08)_40%,transparent_70%)] blur-2xl z-0" 
              aria-hidden="true" 
            />

            <div className="relative aspect-[16/10] xs:aspect-[16/9.5] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-premium-image z-10">
              <picture className="w-full h-full">
                <source srcSet="/images/hero-steamer-editorial.webp" type="image/webp" />
                <img 
                  src="/images/hero-steamer-editorial.jpg" 
                  alt="Plancha de vapor portátil LISO con placa giratoria y pantalla digital sobre prenda de seda" 
                  className="w-full h-full object-cover object-[70%_center]"
                  style={{
                    filter: 'brightness(1.06) contrast(1.06)'
                  }}
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          {/* 4. Streamlined Conversion Section (Thumb-Zone Optimized) */}
          <div className="pt-1.5 space-y-2.5">
            {/* Price & Shipping badge */}
            <div className="flex items-center justify-center gap-2.5">
              <span className="text-[1.85rem] xs:text-[2rem] font-display font-bold text-graphite tracking-tight leading-none">
                {currentMarket.formattedPrice}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-accent/10 border border-accent/25 text-accent text-[10.5px] font-sans font-bold uppercase tracking-wider rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                {currentMarket.shippingLabel}
              </span>
            </div>

            {/* Primary Buy CTA */}
            <CTAButton 
              href="#oferta" 
              size="large" 
              className="w-full shadow-[0_6px_24px_rgba(180,36,124,0.32)] active:scale-[0.98] py-3.5 text-[15px] font-semibold tracking-wide"
            >
              Pedir LISO — {currentMarket.formattedPrice}
            </CTAButton>

            {/* Trust Points: Compact single row */}
            <div className="flex items-center justify-center gap-2.5 text-[11px] text-graphite/70 font-sans font-medium pt-0.5">
              <span className="inline-flex items-center gap-1 text-graphite font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Envío gratis</span>
              </span>
              <span className="text-graphite/25">·</span>
              <span>PSE y tarjetas</span>
              <span className="text-graphite/25">·</span>
              <span>Garantía 30 días</span>
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
