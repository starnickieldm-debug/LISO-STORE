import React from 'react';
import { brandConfig, productSpecs } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';
import { DataStrip } from '../ui/DataStrip';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { currentMarket } = useMarket();
  return (
    <section 
      className="relative pt-4 pb-0 sm:pt-6 overflow-hidden bg-night-950 text-bone border-b border-white/10"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      {/* Upper Hero Stage: Isolated from DataStrip so the image cannot cover elements below */}
      <div className="relative overflow-hidden">
        {/* Background Layer 1: Luxury draped silk fabric texture (retained with subtle contrast) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/images/fabric-texture-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
          />
          {/* Soft dark gradient overlays to retain silk folds while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F] via-[#0B0C0F]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F]/90 via-transparent to-[#0B0C0F]" />
          <div className="absolute inset-0 bg-vignette-cinematic" />
        </div>

        {/* Layer 2: Seamless Product Image Stage (Contained inside upper stage, never overlaps elements below) */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-full lg:w-[58%] xl:w-[54%] z-10 hidden lg:flex items-center justify-end overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 12%, black 35%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 12%, black 35%, black 100%)',
          }}
        >
          <picture className="w-full h-full">
            <source srcSet="/images/hero-steamer-editorial.webp" type="image/webp" />
            <img 
              src="/images/hero-steamer-editorial.jpg" 
              alt="Plancha de vapor portátil LISO con placa giratoria y pantalla digital sobre prenda de seda" 
              className="w-full h-full object-cover object-center scale-100 transform origin-center"
              loading="eager"
            />
          </picture>
          {/* Soft dissolved edges: top, left, and strong bottom fade so the iron never cuts abruptly and stays above bottom elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F]/40 via-transparent via-65% to-[#0B0C0F] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F] via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Ambient Layer: Structural warm/magenta light halo */}
        <div 
          className="pointer-events-none absolute right-0 top-0 w-80 sm:w-[550px] h-80 sm:h-[550px] bg-halo-structural blur-3xl z-15" 
          aria-hidden="true" 
        />

        {/* Layer 3: Original giant structural word 'LISO' superimposed over the new image */}
        <div 
          className="select-none pointer-events-none absolute right-2 sm:right-5 lg:right-8 top-1 sm:top-2 lg:top-4 font-giant-structural font-semibold uppercase text-[16vw] sm:text-[14vw] lg:text-[11vw] tracking-tighter leading-none whitespace-nowrap z-20 ghost-fade-vertical pr-4 sm:pr-6 lg:pr-8 overflow-visible" 
          aria-hidden="true" 
        >
          <span className="text-bone/45">LI</span>
          <span className="text-outline-bone-hero">SO</span>
        </div>

        {/* Layer 4: Atmospheric steam glow in front of the letter */}
        <div 
          className="pointer-events-none absolute right-0 top-0 w-72 sm:w-[480px] h-72 sm:h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(232,227,218,0.12)_0%,rgba(180,36,124,0.05)_45%,transparent_70%)] blur-2xl z-22" 
          aria-hidden="true" 
        />

        <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 pb-12 sm:pb-16 relative z-30">
        
        {/* Responsive Grid: Left 7 cols for Copy & CTA, Right 5 cols allows image to breathe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Editorial Copy & Glass Conversion Card */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 lg:space-y-6 pt-1 sm:pt-2">
            
            {/* H1 Headline with increased font size, italic 'impecable', and subtle luxury depth */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.1rem] font-bold text-bone tracking-tight leading-[1.08] max-w-2xl lg:max-w-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              <span className="block">Olvídate de la plancha pesada.</span>
              <span className="block text-bone/95 mt-1 sm:mt-1.5">
                Tu ropa <span className="italic font-normal text-white">impecable</span> en segundos.
              </span>
            </h1>

            {/* Subheadline with subtle depth and clear typography */}
            <p className="text-base sm:text-lg text-bone/85 leading-relaxed max-w-2xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              ¿Te salió un plan de última hora y tienes la ropa toda arrugada? La conectas y en <strong className="font-semibold text-white">{productSpecs.heatUpTime}</strong> ya está caliente. Puedes alisar la ropa directamente en la percha gracias a su <strong className="font-semibold text-white">placa giratoria</strong>, y además ves la temperatura real en la pantalla.
            </p>

            {/* Micro value proposition */}
            <p className="text-xs sm:text-sm font-sans text-accent font-semibold tracking-wide uppercase">
              — {brandConfig.tagline}
            </p>

            {/* Price & Primary CTA Block */}
            <div className="hero-glass-card p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-3.5 max-w-2xl rounded-xl border border-white/15">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-3xl sm:text-4xl font-display font-bold text-bone drop-shadow-sm">
                  {currentMarket.formattedPrice}
                </span>
                <span className="text-xs font-sans uppercase tracking-wider text-bone/70 font-semibold">
                  Precio final neto · {currentMarket.shippingLabel}
                </span>
              </div>

              {/* Main CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <CTAButton href="#oferta" size="large" className="w-full sm:w-auto shadow-[0_4px_20px_rgba(180,36,124,0.4)]">
                  Quiero mi ropa impecable — {currentMarket.formattedPrice}
                </CTAButton>

                <CTAButton 
                  href="#como-funciona" 
                  variant="ghost" 
                  size="default" 
                  className="w-full sm:w-auto text-xs font-sans font-semibold uppercase tracking-wider text-bone/85 hover:text-white"
                >
                  <span>Ver cómo funciona</span>
                  <ArrowDown className="w-3.5 h-3.5 ml-1.5 inline" />
                </CTAButton>
              </div>

              {/* Trust signals (Clean sans typography) */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-bone/80 pt-1 font-sans font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  {currentMarket.shippingLabel}
                </span>
                <span className="text-white/30">·</span>
                <span>Pago 100% seguro</span>
                <span className="text-white/30">·</span>
                <span>Atención postventa</span>
              </div>

              {/* Mandatory Lab Note */}
              <p className="text-[11px] font-sans text-bone/50 italic pt-0.5">
                {brandConfig.labClaimNote}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Spacer to let the seamless background image shine */}
          <div className="lg:col-span-5 hidden lg:block h-[560px] xl:h-[620px] pointer-events-none" />

        </div>

        {/* Mobile View of the image: seamlessly placed below text on small screens */}
        <div 
          className="block lg:hidden mt-8 w-full max-w-lg mx-auto overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <picture className="w-full h-auto">
            <source srcSet="/images/hero-steamer-editorial.webp" type="image/webp" />
            <img 
              src="/images/hero-steamer-editorial.jpg" 
              alt="Plancha de vapor portátil LISO con placa giratoria y pantalla digital sobre prenda de seda" 
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </picture>
        </div>

      </div>

      </div>

      {/* Editorial spec data-strip: secured below hero stage with z-30 and clean separation */}
      <div className="relative z-30">
        <DataStrip />
      </div>
    </section>
  );
};
