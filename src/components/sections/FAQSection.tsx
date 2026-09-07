import React from 'react';
import { faqItems } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { Accordion } from '../ui/Accordion';

export const FAQSection: React.FC = () => {
  return (
    <section 
      id="faq" 
      className="py-20 sm:py-28 bg-night-900 text-bone border-b border-night-700 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#121318' }}
    >
      {/* Ambient Layer (a): Radial cálido arriba-izquierda al 6% */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_top_left,rgba(255,195,130,0.06)_0%,transparent_65%)] blur-2xl" 
        aria-hidden="true" 
      />

      <div className="max-w-[1140px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          number="11"
          overline="DUDAS FRECUENTES"
          title="Preguntas frecuentes."
          subtitle="Respuestas claras y directas a lo que todos nos preguntamos antes de comprar."
          theme="dark"
        />

        {/* Accordion Component with all 12 official questions */}
        <div className="mt-8">
          <Accordion items={faqItems} isDarkTheme={true} />
        </div>
      </div>
    </section>
  );
};
