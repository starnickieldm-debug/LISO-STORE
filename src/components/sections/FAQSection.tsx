import React from 'react';
import { faqItems } from '../../config/siteContent';
import { Accordion } from '../ui/Accordion';
import { HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  return (
    <section 
      id="faq" 
      className="py-16 sm:py-20 lg:py-28 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#EFEBE2' }}
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN (Desktop Sticky Lifestyle Photographic Anchor)
              ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] w-full overflow-hidden rounded-3xl lg:rounded-[32px] border border-graphite/15 bg-night-950 shadow-card group">
              <picture>
                <source srcSet="/images/hero-steamer-editorial.webp" type="image/webp" />
                <img 
                  src="/images/hero-steamer-editorial.jpg" 
                  alt="Plancha a vapor LISO en manos demostrando portabilidad y escala real"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-mech-s"
                  loading="lazy"
                />
              </picture>
              
              {/* Subtle bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Trust Pill Badge */}
              <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-night-950/80 backdrop-blur-md border border-white/15 text-bone flex items-center justify-between shadow-lg">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold block">
                    COMPRA PROTEGIDA
                  </span>
                  <p className="text-xs font-sans text-bone/90 font-medium">
                    Garantía legal 30 días · Envío gratis a Colombia
                  </p>
                </div>
                <span className="font-mono text-[11px] font-bold text-accent px-2 py-1 rounded-lg bg-accent/15 border border-accent/30 shrink-0">
                  LISO OFICIAL
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (Editorial Header + Discrete Rounded Pill FAQ Accordion)
              ========================================================================= */}
          <div className="lg:col-span-7">
            {/* Editorial Header */}
            <div className="mb-6 sm:mb-8 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                <span>[09]</span>
                <span>DUDAS FRECUENTES</span>
              </div>
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
