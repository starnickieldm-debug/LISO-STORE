import React, { useState, useEffect } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CTAButton } from '../ui/CTAButton';
import { DataStrip } from '../ui/DataStrip';
import { Star, Sparkles, ShieldCheck, Truck, Lock, Luggage, ArrowDown } from 'lucide-react';
import { RotatingGuaranteeStamp } from '../ui/RotatingGuaranteeStamp';

export const HeroSection: React.FC = () => {

  const { currentMarket } = useMarket();
  const prefersReduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [topBarsHeight, setTopBarsHeight] = useState(100);

  const discountPercent = currentMarket.compareAtPrice
    ? Math.round(((currentMarket.compareAtPrice - currentMarket.price) / currentMarket.compareAtPrice) * 100)
    : 33;

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
      <div className="relative flex-1 flex items-center w-full overflow-hidden pt-0 pb-4 sm:pb-6 lg:py-4">
        
        {/* Layer 1: Horizontal Ceramic Grid Texture (Strictly masked away from product image) */}
        <div 
          className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[54%] z-0 overflow-hidden select-none"
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 35%, transparent 75%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 35%, transparent 75%)',
          }}
          aria-hidden="true" 
        >
          <img 
            src="/images/textures/texture-hero-grid-enhanced.webp" 
            alt="" 
            className="w-full h-full object-cover object-left-top opacity-50 mix-blend-multiply filter contrast-125"
            loading="eager"
          />
        </div>

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

        {/* Layer 3: Product Image Stage with soft integrated fade */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-full lg:w-[57.5%] xl:w-[54.5%] 2xl:w-[51.5%] z-10 hidden lg:flex items-center justify-end overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 12%, black 28%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 12%, black 28%)',
          }}
        >
          <picture className="w-full h-full">
            <source 
              srcSet="/images/hero-steamer-editorial.webp 2048w, /images/hero-steamer-editorial-1024.webp 1024w" 
              sizes="(max-width: 1023px) 100vw, 55vw"
              type="image/webp" 
            />
            <img 
              src="/images/hero-steamer-editorial.jpg" 
              srcSet="/images/hero-steamer-editorial.jpg 2048w, /images/hero-steamer-editorial-1024.jpg 1024w"
              sizes="(max-width: 1023px) 100vw, 55vw"
              alt="Mujer alisando camisa en gancho con la plancha de vapor portátil LISO con vapor continuo a 150 °C" 
              className="w-full h-full object-cover object-[92%_center] transform origin-[85%_center] transition-all duration-1000 ease-mech-s"
              style={{
                filter: 'brightness(1.01) contrast(1.01)',
                ...(!prefersReduced ? {
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'scale(1.03)' : 'scale(1.06)',
                  willChange: loaded ? 'auto' : 'opacity, transform'
                } : undefined)
              }}
              loading="eager"
            />
          </picture>

          {/* Gentle feathering gradient overlay blending into hero background */}
          <div 
            className="absolute inset-y-0 left-0 w-36 xl:w-48 bg-gradient-to-r from-[#F5F1EA] via-[#F5F1EA]/50 to-transparent pointer-events-none z-20" 
            aria-hidden="true"
          />
        </div>

        <div className="max-w-[1600px] 2xl:max-w-[1680px] w-full mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 relative z-30 my-auto">
        
        {/* =========================================================================
            DESKTOP HERO COMPOSITION (>= 1024px)
            ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: Controlled width commercial content with strict hierarchy */}
          <div className="col-span-7 xl:col-span-6 max-w-xl xl:max-w-[620px] 2xl:max-w-[660px] pt-2">
            
            {/* 1. Prueba Social (Top Header) */}
            <div 
              className="flex items-center gap-1.5 mb-3 text-xs sm:text-[13px] font-sans text-graphite/85"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10px, 0)',
                transition: 'opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) 30ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) 30ms'
              } : undefined}
            >
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-graphite">
                4.9 ★★★★★ (+1.200 valoraciones verificadas del producto)
              </span>
            </div>

            {/* H1 Headline: Larger scale with airy line separation */}
            <h1 
              className="font-display text-4xl sm:text-5xl lg:text-[3.55rem] xl:text-[4.1rem] 2xl:text-[4.35rem] font-bold text-graphite tracking-[-0.03em] leading-[1.18] xl:leading-[1.2]"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
                transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 60ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 60ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              <span className="block">Tu ropa impecable</span>
              <span className="block italic font-display font-medium text-accent mt-1 sm:mt-1.5">
                en segundos.
              </span>
            </h1>

            {/* 2. Subtítulo Resaltado Estilo Marcador / Highlighter */}
            <div 
              className="mt-3.5 sm:mt-4 mb-2.5 sm:mb-3 flex flex-wrap items-center gap-2.5 sm:gap-3"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
                transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 100ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              <span className="relative inline-block px-2.5 py-1">
                <span className="relative z-10 font-sans text-sm sm:text-[15px] lg:text-base font-semibold text-graphite tracking-tight">
                  Sal impecable, incluso cuando vas de afán
                </span>
                {/* Trazo de resaltador estético con identidad de marca (plum/berry wash) */}
                <span 
                  className="absolute inset-x-0 inset-y-0.5 bg-gradient-to-r from-accent/25 via-accent/20 to-accent/14 rounded-[3px] -rotate-[0.4deg] -skew-x-2 -z-0 pointer-events-none shadow-[inset_0_0_0_1px_rgba(180,36,124,0.12)]"
                  aria-hidden="true" 
                />
              </span>

              {/* Enlace en color magenta: ¿No me crees? Mira ↓ */}
              <a 
                href="#demostracion-visual" 
                className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover font-sans text-xs sm:text-[13.5px] lg:text-sm font-bold tracking-tight transition-all duration-200 hover:translate-y-0.5 group cursor-pointer"
              >
                <span className="underline underline-offset-4 decoration-accent/40 group-hover:decoration-accent">
                  ¿No me crees? Mira
                </span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] text-accent transition-transform group-hover:translate-y-1" />
              </a>
            </div>

            {/* 3. Subheadline: Direct, objection-killing, low-density */}
            <p 
              className="text-base sm:text-lg text-graphite/80 leading-relaxed font-normal mt-1 max-w-lg"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 14px, 0)',
                transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 140ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              Plancha directo en el gancho o en tu cama.
            </p>

            {/* 4. Streamlined High-Impact Conversion Block (Open, Clean, Friction-Free) */}
            <div 
              className="mt-5 lg:mt-6 space-y-3 max-w-lg"
              style={!prefersReduced ? {
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 18px, 0)',
                transition: 'opacity 850ms cubic-bezier(0.16, 1, 0.3, 1) 220ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 220ms',
                willChange: loaded ? 'auto' : 'opacity, transform'
              } : undefined}
            >
              {/* Pricing & Free Shipping Incentive with Compare-At Price Anchor */}
              <div className="space-y-1">
                {currentMarket.formattedCompareAtPrice && (
                  <div className="flex items-center gap-2 text-xs font-sans text-graphite/55 tracking-wider">
                    <span>Antes: </span>
                    <span className="line-through decoration-graphite/40 font-medium">
                      {currentMarket.formattedCompareAtPrice}
                    </span>
                    <span className="px-1.5 py-0.5 bg-accent/10 border border-accent/30 text-accent font-bold text-[10px] rounded">
                      AHORRA {discountPercent}%
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-[2.25rem] font-display font-bold text-graphite tracking-tight leading-none">
                    {currentMarket.formattedPrice}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/25 text-accent text-[11px] font-sans font-bold uppercase tracking-wider rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Envío gratis incluido
                  </span>
                </div>
              </div>

              {/* Primary High-Conversion CTA Button */}
              <div>
                <CTAButton 
                  href="#oferta" 
                  size="large" 
                  className="w-full sm:w-auto min-w-[300px] shadow-[0_8px_28px_rgba(180,36,124,0.32)] hover:shadow-[0_12px_36px_rgba(180,36,124,0.48)] text-[15px] sm:text-base font-semibold tracking-wide py-3.5 sm:py-4 transition-all active:scale-[0.99]"
                >
                  Pide la tuya — {currentMarket.formattedPrice}
                </CTAButton>
              </div>

              {/* Reorganización de Garantía y Confianza */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-graphite/75 font-sans pt-0.5">
                <span className="inline-flex items-center gap-1.5 font-semibold text-graphite">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                  <span>Garantía de 30 días</span>
                </span>
                <span className="text-graphite/30">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-graphite/85">
                  <Luggage className="w-4 h-4 text-accent shrink-0" />
                  <span>Ideal para viajes</span>
                </span>
                <span className="text-graphite/30">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-graphite/85">
                  <Truck className="w-4 h-4 text-accent shrink-0" />
                  <span>Envío gratis</span>
                </span>
                <span className="text-graphite/30">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-graphite/85">
                  <Lock className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Pago seguro</span>
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Generous spacer establishing negative space for the product */}
          <div className="col-span-5 xl:col-span-6 h-[420px] xl:h-[460px] pointer-events-none" />

        </div>

        {/* =========================================================================
            MOBILE HERO COMPOSITION (< 1024px) — Visual-First (Liquid+ Reference Layout)
            Order: Visual Stage + Badge -> Social Proof Stars -> H1 -> Subheadline -> Price/CTA
            ========================================================================= */}
        <div className="block lg:hidden w-full">
          
          {/* 1. Mobile Visual Stage First (Edge-to-Edge Full Bleed Header Image like Liquid+) */}
          <div className="relative -mx-4 sm:-mx-8 w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] mb-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F1EA]">
              <picture className="w-full h-full">
                <source 
                  srcSet="/images/hero-steamer-editorial.webp 2048w, /images/hero-steamer-editorial-1024.webp 1024w" 
                  sizes="100vw"
                  type="image/webp" 
                />
                <img 
                  src="/images/hero-steamer-editorial.jpg" 
                  srcSet="/images/hero-steamer-editorial.jpg 2048w, /images/hero-steamer-editorial-1024.jpg 1024w"
                  sizes="100vw"
                  alt="Mujer alisando camisa en gancho con la plancha de vapor portátil LISO con vapor continuo a 150 °C" 
                  className="w-full h-full object-cover object-[95%_center]"
                  style={{
                    filter: 'brightness(1.01) contrast(1.01)'
                  }}
                  loading="eager"
                />
              </picture>

              {/* Soft bottom blend gradient into hero background on mobile */}
              <div 
                className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#F5F1EA] via-[#F5F1EA]/50 to-transparent pointer-events-none z-10" 
                aria-hidden="true"
              />
            </div>

            {/* Floating Circular Badge in bottom-right (Liquid+ Style) */}
            <div className="absolute -bottom-5 right-3.5 sm:right-6 z-20">
              <div className="w-[78px] h-[78px] rounded-full bg-[#FAF8F5] border-2 border-accent/40 shadow-xl p-1 flex items-center justify-center">
                <RotatingGuaranteeStamp 
                  size={70}
                  circularText="★ VAPOR A 150 °C ★ CERO TABLA ★"
                  centerText="1200 W"
                  textColor="text-graphite"
                  customIcon={<Sparkles className="w-4 h-4 text-accent stroke-[2.2]" />}
                />
              </div>
            </div>
          </div>

          {/* Mobile Commercial Content Block */}
          <div className="max-w-md mx-auto pt-1">

          {/* 1. Prueba Social (Top Header) */}
          <div className="flex items-center justify-center gap-1.5 pt-2 pb-0.5 text-xs font-sans text-graphite/85">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-graphite text-[11.5px] xs:text-xs">
              4.9 ★★★★★ (+1.200 valoraciones verificadas del producto)
            </span>
          </div>

          {/* 3. Mobile H1: Impactful headline with highlighted oval phrase (Liquid+ formula) */}
          <h1 className="text-center font-display text-[1.95rem] xs:text-[2.15rem] font-bold text-graphite tracking-tight leading-[1.18] my-2">
            <span className="block">Tu ropa impecable</span>
            <span className="relative inline-block px-2.5 py-0.5 mx-0.5 text-accent italic font-medium mt-0.5">
              <span className="relative z-10">en segundos</span>
              <svg 
                className="absolute inset-0 w-full h-full text-accent/35 -rotate-1 pointer-events-none" 
                viewBox="0 0 120 40" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <ellipse cx="60" cy="20" rx="58" ry="18" stroke="currentColor" strokeWidth="2.2" strokeDasharray="3 1" />
              </svg>
            </span>
          </h1>

          {/* Subtítulo resaltado estilo marcador / highlighter (Mobile) */}
          <div className="my-2 flex flex-wrap items-center justify-center gap-2">
            <span className="relative inline-block px-2.5 py-0.5 text-center">
              <span className="relative z-10 font-sans text-[12.5px] xs:text-[13px] font-semibold text-graphite tracking-tight">
                Sal impecable, incluso cuando vas de afán
              </span>
              <span 
                className="absolute inset-x-0 inset-y-0.5 bg-gradient-to-r from-accent/25 via-accent/20 to-accent/14 rounded-[3px] -rotate-[0.4deg] -skew-x-2 -z-0 pointer-events-none shadow-[inset_0_0_0_1px_rgba(180,36,124,0.12)]"
                aria-hidden="true" 
              />
            </span>

            {/* Enlace en color magenta: ¿No me crees? Mira ↓ */}
            <a 
              href="#demostracion-visual" 
              className="inline-flex items-center gap-1 text-accent font-sans text-[11.5px] xs:text-xs font-bold tracking-tight active:translate-y-0.5 transition-transform cursor-pointer"
            >
              <span className="underline underline-offset-4 decoration-accent/40">
                ¿No me crees? Mira
              </span>
              <ArrowDown className="w-3.5 h-3.5 stroke-[2.5] text-accent shrink-0" />
            </a>
          </div>

          {/* 4. Micro-bajada: Concise objection-killing value proposition */}
          <p className="text-center text-[12.5px] xs:text-[13px] text-graphite/75 leading-relaxed max-w-[340px] mx-auto mb-3">
            Plancha directo en el gancho o en tu cama.
          </p>

          {/* 5. Streamlined Conversion Section (Thumb-Zone Optimized) */}
          <div className="pt-1 space-y-2">
            {/* Price & Shipping badge with Compare-At Price Anchor */}
            <div className="space-y-0.5">
              {currentMarket.formattedCompareAtPrice && (
                <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-graphite/55 tracking-wider">
                  <span>Antes: </span>
                  <span className="line-through decoration-graphite/40 font-medium">
                    {currentMarket.formattedCompareAtPrice}
                  </span>
                  <span className="px-1.5 py-0.2 bg-accent/10 border border-accent/30 text-accent font-bold text-[9.5px] rounded">
                    AHORRA {discountPercent}%
                  </span>
                </div>
              )}
              <div className="flex items-center justify-center gap-2.5">
                <span className="text-[1.85rem] xs:text-[2rem] font-display font-bold text-graphite tracking-tight leading-none">
                  {currentMarket.formattedPrice}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-accent/10 border border-accent/25 text-accent text-[10.5px] font-sans font-bold uppercase tracking-wider rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {currentMarket.shippingLabel}
                </span>
              </div>
            </div>

            {/* Primary Buy CTA */}
            <CTAButton 
              href="#oferta" 
              size="large" 
              className="w-full shadow-[0_6px_24px_rgba(180,36,124,0.32)] active:scale-[0.98] py-3.5 text-[15px] font-semibold tracking-wide"
            >
              Pide la tuya — {currentMarket.formattedPrice}
            </CTAButton>

            {/* 3. Reorganización de Garantía y Confianza (Mobile) */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[10.5px] xs:text-[11px] text-graphite/75 font-sans pt-1 text-center">
              <span className="inline-flex items-center gap-1 font-semibold text-graphite">
                <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Garantía de 30 días</span>
              </span>
              <span className="text-graphite/30">•</span>
              <span className="inline-flex items-center gap-1 font-medium text-graphite/85">
                <Luggage className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Para viajes</span>
              </span>
              <span className="text-graphite/30">•</span>
              <span className="inline-flex items-center gap-1 font-medium text-graphite/85">
                <Truck className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Envío gratis</span>
              </span>
              <span className="text-graphite/30">•</span>
              <span className="inline-flex items-center gap-1 font-medium text-graphite/85">
                <Lock className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Pago seguro</span>
              </span>
            </div>
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
