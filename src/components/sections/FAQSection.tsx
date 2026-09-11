import React from 'react';
import { faqItems } from '../../config/siteContent';
import { Accordion } from '../ui/Accordion';
import { HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  return (
    <section 
      id="faq" 
      className="py-12 sm:py-16 lg:py-18 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#EFEBE2' }}
    >
      <div className="max-w-[1600px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN (Desktop Sticky Lifestyle Photographic Anchor)
              ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] w-full overflow-hidden rounded-3xl lg:rounded-[32px] bg-night-950 shadow-premium-lg group">
              <picture>
                <source srcSet="/images/faq-steamer-editorial.webp" type="image/webp" />
                <img 
                  src="/images/faq-steamer-editorial.jpg" 
                  alt="Plancha de vapor LISO reposando sobre camisa gris con vapor a 150 °C en pantalla digital"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-mech-s"
                  loading="lazy"
                />
              </picture>
              
              {/* Subtle depth vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/25 via-transparent to-black/10 pointer-events-none" />
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (Editorial Header + Discrete Rounded Pill FAQ Accordion)
              ========================================================================= */}
          <div className="lg:col-span-7">
            {/* Editorial Header */}
            <div className="mb-6 sm:mb-8 space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-graphite tracking-tight leading-[1.18]">
                Preguntas frecuentes.
              </h2>
              <p className="text-sm sm:text-base text-graphite/70 font-normal leading-relaxed max-w-xl">
                Respuestas claras y directas a lo que todos nos preguntamos antes de comprar.
              </p>
            </div>

            {/* Pill Accordion List */}
            <Accordion items={faqItems} isDarkTheme={false} />

            {/* Bottom Help Contact Link */}
            <div className="mt-8 p-4 rounded-2xl bg-white/70 border border-graphite/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-graphite/70">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-accent shrink-0" />
                <span>¿Tienes otra pregunta sobre tu pedido o el funcionamiento?</span>
              </div>
              <a 
                href="/pqr" 
                className="font-sans font-bold text-accent hover:text-graphite uppercase tracking-wider transition-colors shrink-0"
              >
                Radicar PQR / Soporte →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
