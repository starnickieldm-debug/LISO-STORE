import React from 'react';
import { brandConfig } from '../../config/siteContent';
import { useMarket } from '../../context/MarketContext';
import { CTAButton } from '../ui/CTAButton';
import { Check } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const FinalCTASection: React.FC = () => {
  const { currentMarket } = useMarket();
  return (
    <section 
      className="py-14 sm:py-32 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden"
      style={{ backgroundColor: '#F5F1EA' }}
    >
      {/* Background Texture: Topographic Curves (Horizontal Landscape) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <img 
          src="/images/textures/texture-topographic-curves.webp" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-20 mix-blend-multiply filter contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1EA]/50 via-transparent to-[#F5F1EA]/60 pointer-events-none" />
      </div>

      {/* 12s Dawn Breath Breathing Radial Glow (Unique Warm Glow in S12) */}
      <div 
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[radial-gradient(ellipse_at_bottom,rgba(217,119,6,0.14)_0%,rgba(180,36,124,0.07)_40%,transparent_75%)] blur-3xl animate-dawn-breath z-0" 
        aria-hidden="true" 
      />

      {/* Giant structural word 'SIN TABLA' en Playfair Display (Solido grafito 10% / outline hero) */}
      <div 
        className="select-none pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-2 font-giant-structural font-semibold uppercase text-[15vw] sm:text-[14vw] md:text-[13vw] tracking-tighter leading-none whitespace-nowrap text-center ghost-fade-vertical z-0 overflow-hidden max-w-full" 
        aria-hidden="true" 
      >
        <span className="text-graphite/10">SIN </span>
        <span className="text-outline-bone-hero">TABLA</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Visual Placement */}
          <Reveal direction="left" duration={750} className="lg:col-span-6">
            <div className="shadow-studio-hard border border-graphite/15 rounded-2xl sm:rounded-[24px] overflow-hidden group bg-white">
              <picture className="w-full h-full">
                <source srcSet="/images/final-cta-steamer.webp" type="image/webp" />
                <img 
                  src="/images/final-cta-steamer.jpg" 
                  alt="Vaporizando un saco directamente en el gancho con la plancha LISO"
                  className="w-full h-full object-cover object-center aspect-square group-hover:scale-102 transition-transform duration-500 ease-mech-s"
                  loading="lazy"
                />
              </picture>
            </div>
          </Reveal>

          {/* Right Column: Emotionally grounded copy & high-conversion CTA */}
          <Reveal direction="right" duration={750} delay={100} className="lg:col-span-6 space-y-6">
            {/* H2 Headline with clamp and descender-safe mask */}
            <h2 className="font-h2-clamp font-semibold leading-[1.12] text-graphite">
              <span className="block line-mask-reveal">
                <span className="block animate-fade-in-up">Tu ropa lista cuando la necesitas.</span>
              </span>
            </h2>

            {/* Subheading */}
            <p className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-graphite">
              La arreglas en minutos y sigues con tu día.
            </p>

            <p className="text-base sm:text-lg text-graphite/75 leading-relaxed">
              Dale unos minutos de vapor, gira la placa para los cuellos y los detalles, y listo: tu prenda queda preparada sin tener que montar todo el ritual de planchar.
            </p>

            {/* Reassurance points */}
            <ul className="space-y-3 text-xs sm:text-sm font-sans pt-2">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-accent stroke-[3] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-graphite">Garantía legal y soporte directo</p>
                  <p className="text-graphite/70 text-xs sm:text-sm">30 días de cobertura y canal de atención directa en Colombia.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-accent stroke-[3] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-graphite">{currentMarket.shippingLabel}</p>
                  <p className="text-graphite/70 text-xs sm:text-sm">Con seguimiento para que sepas dónde está tu pedido en todo momento.</p>
                </div>
              </li>
            </ul>

            {/* Direct CTA */}
            <div className="pt-4">
              <CTAButton href="#oferta" size="large" className="w-full sm:w-auto">
                Pedir LISO — {currentMarket.formattedPrice}
              </CTAButton>
            </div>

          </Reveal>

        </div>

      </div>
    </section>
  );
};
