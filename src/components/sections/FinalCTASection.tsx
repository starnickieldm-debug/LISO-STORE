import React from 'react';
import { brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';
import { Check } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  const { currentMarket } = useMarket();
  return (
    <section 
      className="py-20 sm:py-32 bg-night-950 text-bone border-b border-night-700 relative overflow-hidden bg-macro-fabric"
      style={{ backgroundColor: '#0B0C0F' }}
    >
      {/* Layer 1 (z-0): Border cinematic vignette */}
      <div 
        className="pointer-events-none absolute inset-0 bg-vignette-cinematic z-0" 
        aria-hidden="true" 
      />

      {/* 12s Dawn Breath Breathing Radial Glow */}
      <div 
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[radial-gradient(ellipse_at_bottom,rgba(217,119,6,0.18)_0%,rgba(180,36,124,0.08)_40%,transparent_75%)] blur-3xl animate-dawn-breath z-0" 
        aria-hidden="true" 
      />

      {/* Giant structural word 'SIN TABLA' en Playfair Display (Par sólido/outline 10-12% / 25-30% con fade, presente en móvil y desktop) */}
      <div 
        className="select-none pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-2 font-giant-structural font-semibold uppercase text-[15vw] sm:text-[14vw] md:text-[13vw] tracking-tighter leading-none whitespace-nowrap text-center ghost-fade-vertical z-0 overflow-visible" 
        aria-hidden="true" 
      >
        <span className="text-bone/12">SIN </span>
        <span className="text-outline-bone-hero">TABLA</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Placement */}
          <div className="lg:col-span-6">
            <div className="shadow-studio-hard-dark border border-white/10 rounded-[24px] overflow-hidden group">
              <picture className="w-full h-full">
                <source srcSet="/images/final-cta-steamer.webp" type="image/webp" />
                <img 
                  src="/images/final-cta-steamer.jpg" 
                  alt="Vaporizando un saco directamente en la percha con la plancha LISO"
                  className="w-full h-full object-cover object-center aspect-square group-hover:scale-102 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>

          {/* Right Column: Emotionally grounded copy & high-conversion CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* H2 Headline with clamp and descender-safe mask */}
            <h2 className="font-h2-clamp font-semibold leading-[1.12] text-luminance-h2">
              <span className="block line-mask-reveal">
                <span className="block animate-fade-in-up">Tu ropa lista cuando la necesitas.</span>
              </span>
            </h2>

            {/* Subheading */}
            <p className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-bone">
              La arreglas en minutos y sigues con tu día.
            </p>

            <p className="text-base sm:text-lg text-bone/75 leading-relaxed">
              Dale unos minutos de vapor, gira la placa para los cuellos y los detalles, y listo: tu prenda queda preparada sin tener que montar todo el ritual de planchar.
            </p>

            {/* Reassurance points */}
            <ul className="space-y-3 text-xs sm:text-sm font-sans pt-2">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-accent stroke-[3] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-bone">Atención directa y soporte postventa</p>
                  <p className="text-bone/70 text-xs sm:text-sm">Canal directo de contacto si necesitas asistencia con tu pedido.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-accent stroke-[3] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-bone">{currentMarket.shippingLabel}</p>
                  <p className="text-bone/70 text-xs sm:text-sm">Con seguimiento para que sepas dónde está tu pedido.</p>
                </div>
              </li>
            </ul>

            {/* Direct CTA */}
            <div className="pt-4">
              <CTAButton href="#oferta" size="large" className="w-full sm:w-auto">
                Quiero LISO — {currentMarket.formattedPrice}
              </CTAButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
