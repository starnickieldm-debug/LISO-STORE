import React from 'react';
import { faqItems } from '../../config/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { Accordion } from '../ui/Accordion';
import { Reveal } from '../ui/Reveal';

export const FAQSection: React.FC = () => {
  return (
    <section 
      id="faq" 
      className="py-20 sm:py-28 bg-bone text-graphite border-b border-graphite/10 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      style={{ backgroundColor: '#F5F1EA' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          overline="DUDAS FRECUENTES"
          title="Preguntas frecuentes."
          subtitle="Respuestas claras y directas a lo que todos nos preguntamos antes de comprar."
        />

        {/* Accordion Component with all 12 official questions */}
        <Reveal direction="up" duration={650} className="mt-8">
          <Accordion items={faqItems} isDarkTheme={false} />
        </Reveal>
      </div>
    </section>
  );
};
